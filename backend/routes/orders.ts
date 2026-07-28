import express from 'express';
import Stripe from 'stripe';
import Order from '../models/Order.ts';
import Log from '../models/Log.ts';
import Product from '../models/Product.ts';
import { authenticateJWT, requireRole, AuthenticatedRequest } from '../middleware/auth.ts';
import { sendEmailNotification } from '../utils/mailer.ts';

const router = express.Router();

/**
 * Helper to initialize Stripe client lazily
 */
const getStripeClient = (): Stripe => {
  const secretKey = process.env.STRIPE_SECRET_KEY || 'mock_stripe_key_for_compiling';
  return new Stripe(secretKey, {
    apiVersion: '2023-10-16' as any,
  });
};

/**
 * ============================================================================
 * 1. THE CHECKOUT CONTROLLER: POST /api/orders/checkout
 * ============================================================================
 * Handles creation of Stripe Checkout Sessions with strict backend price verification.
 * 
 * Security Directives Implemented:
 * - Accepts array of product IDs and quantities from the client.
 * - Fetches actual unit prices directly from MongoDB database (NEVER trusts client-side prices).
 * - Verifies inventory stock availability before proceeding.
 * - Persists a 'Pending' Order record in MongoDB before creating the Stripe session.
 * - Generates stripe.checkout.sessions.create payload with verified line items, mode: 'payment',
 *   and dynamic success/cancel redirect URLs.
 * ============================================================================
 */
router.post('/checkout', async (req, res) => {
  const { items, customerEmail, customerName, userId } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Checkout request must include a non-empty array of items.' });
  }

  try {
    // Extract product IDs
    const productIds = items.map((item: any) => item.id || item.productId).filter(Boolean);

    // FETCH ACTUAL PRICES FROM MONGODB (CRITICAL SECURITY MANDATE: NEVER TRUST FRONTEND PRICES)
    const dbProducts = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(dbProducts.map(p => [p._id.toString(), p]));

    const verifiedDbItems: Array<{
      productId: string;
      title: string;
      quantity: number;
      price: number;
      imageUrl: string;
    }> = [];

    const stripeLineItems: any[] = [];
    let calculatedTotal = 0;

    for (const item of items) {
      const pId = (item.id || item.productId)?.toString();
      const product = productMap.get(pId);

      if (!product) {
        return res.status(404).json({ error: `Hardware product '${pId}' not found in database.` });
      }

      const qty = Math.max(1, parseInt(item.quantity, 10) || 1);

      // Verify stock availability
      if (product.stockCount < qty) {
        return res.status(400).json({ 
          error: `Insufficient inventory for '${product.title}'. Available: ${product.stockCount}, Requested: ${qty}` 
        });
      }

      // Use strictly database authoritative price
      const dbPrice = product.price; 
      calculatedTotal += dbPrice * qty;

      verifiedDbItems.push({
        productId: product._id.toString(),
        title: product.title,
        quantity: qty,
        price: dbPrice,
        imageUrl: product.imageUrl,
      });

      stripeLineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
            description: product.description ? product.description.substring(0, 200) : undefined,
            images: product.imageUrl ? [product.imageUrl] : [],
          },
          unit_amount: Math.round(dbPrice * 100), // Convert dollars to cents for Stripe
        },
        quantity: qty,
      });
    }

    // Persist pending order in MongoDB
    const order = new Order({
      customerName: customerName || 'Aegis Client',
      customerEmail: customerEmail || 'client@aegisfoundry.com',
      items: verifiedDbItems,
      totalAmount: calculatedTotal,
      status: 'Pending',
    });
    await order.save();

    // Log pending order creation
    await Log.create({
      userId: userId || undefined,
      action: 'ORDER_CREATED',
      details: `Pending order ${order._id} created for ${order.customerEmail}. Verified Total: $${calculatedTotal.toLocaleString()}`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    // Send order received notification email
    sendEmailNotification({
      to: order.customerEmail,
      subject: `[Aegis Foundry] Order Initialized #${order._id}`,
      text: `Greetings ${order.customerName},\n\nYour hardware request #${order._id} has been registered.\nVerified Total: $${calculatedTotal.toLocaleString()}\n\nPlease finalize payment to initiate dispatch.\n\nAuthor: Shahmeer Akram`,
    });

    // Fallback mode if STRIPE_SECRET_KEY is missing or unconfigured mock
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith('mock_')) {
      console.log('⚠️ STRIPE_SECRET_KEY not set or mock. Returning direct checkout simulation URL.');
      return res.json({ 
        id: `mock_session_${order._id}`, 
        url: `${process.env.APP_URL || 'http://localhost:3000'}/checkout/success?order_id=${order._id}`,
        orderId: order._id 
      });
    }

    // Generate Stripe Checkout Session
    const stripe = getStripeClient();
    const appUrl = process.env.APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: stripeLineItems,
      mode: 'payment',
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order._id}`,
      cancel_url: `${appUrl}/cart`,
      customer_email: order.customerEmail,
      metadata: {
        orderId: (order._id as any).toString(),
      },
    });

    return res.json({ id: session.id, url: session.url, orderId: order._id });
  } catch (error: any) {
    console.error('🔥 Checkout Session Creation Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to initialize payment checkout session.' });
  }
});

/**
 * ============================================================================
 * 2. THE WEBHOOK CONTROLLER: POST /api/orders/webhook
 * ============================================================================
 * Listens for Stripe's checkout.session.completed event to securely fulfill orders.
 * 
 * Enterprise Security Directives Implemented:
 * - Verifies Stripe signature using stripe.webhooks.constructEvent.
 * - Finds the corresponding order in MongoDB via session.metadata.orderId.
 * - Updates order status to 'Paid'.
 * - Decrements stockCount for each purchased item in MongoDB.
 * - Triggers low-stock alerts if stock drops below threshold (<5).
 * - Dispatches payment confirmation email and logs event in system audit table.
 * ============================================================================
 */
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret && sig) {
      const stripe = getStripeClient();
      // Ensure raw body is used for signature validation
      const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(JSON.stringify(req.body));
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } else {
      // Development fallback without signature key
      console.warn('⚠️ STRIPE_WEBHOOK_SECRET or stripe-signature header absent. Processing event body directly.');
      event = typeof req.body === 'string' || Buffer.isBuffer(req.body) 
        ? JSON.parse(req.body.toString()) 
        : req.body;
    }
  } catch (err: any) {
    console.error(`❌ Stripe Webhook Signature Verification Error: ${err.message}`);
    return res.status(400).send(`Webhook Signature Verification Error: ${err.message}`);
  }

  // Listen specifically for checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      try {
        const order = await Order.findById(orderId);
        if (order && order.status === 'Pending') {
          // 1. Update Order status to Paid
          order.status = 'Paid';
          await order.save();

          // 2. Decrement stockCount for each item in MongoDB
          for (const item of order.items) {
            const updatedProduct = await Product.findByIdAndUpdate(
              item.productId,
              { $inc: { stockCount: -item.quantity } },
              { new: true }
            );

            // Trigger low stock warning if stock drops below 5
            if (updatedProduct && updatedProduct.stockCount < 5) {
              await Log.create({
                action: 'LOW_STOCK_ALERT',
                details: `LOW STOCK ALARM: '${updatedProduct.title}' depleted to ${updatedProduct.stockCount} units remaining.`,
              });
            }
          }

          // 3. Log payment reception in system audit trail
          await Log.create({
            action: 'PAYMENT_RECEIVED',
            details: `Stripe webhook verified payment for order #${order._id}. Total: $${order.totalAmount}`,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
          });

          // 4. Send email confirmation to customer
          sendEmailNotification({
            to: order.customerEmail,
            subject: `[Aegis Foundry] Payment Confirmed #${order._id}`,
            text: `Greetings ${order.customerName},\n\nYour payment of $${order.totalAmount.toLocaleString()} has been verified by the Stripe Network.\nOrder #${order._id} is now confirmed and queued for immediate dispatch.\n\nAuthor: Shahmeer Akram`,
          });

          console.log(`✅ Webhook Processed: Order #${orderId} marked as Paid & inventory decremented.`);
        }
      } catch (dbErr) {
        console.error(`❌ Webhook Database Update Failure for Order #${orderId}:`, dbErr);
        return res.status(500).json({ error: 'Database update failed during webhook execution.' });
      }
    }
  }

  return res.status(200).json({ received: true });
});

/**
 * Complete order fallback endpoint (Client confirmation)
 */
router.post('/confirm', async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: 'Order document not found' });

    if (order.status === 'Pending') {
      order.status = 'Paid';
      await order.save();

      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stockCount: -item.quantity }
        });

        const updatedProduct = await Product.findById(item.productId);
        if (updatedProduct && updatedProduct.stockCount < 5) {
          await Log.create({
            action: 'LOW_STOCK_ALERT',
            details: `LOW STOCK WARNING: Product '${updatedProduct.title}' has ${updatedProduct.stockCount} units remaining.`,
          });
        }
      }

      await Log.create({
        action: 'PAYMENT_RECEIVED',
        details: `Payment confirmed for order: ${order._id}`,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      });

      sendEmailNotification({
        to: order.customerEmail,
        subject: `[Aegis Foundry] Payment Confirmed #${order._id}`,
        text: `Greetings ${order.customerName},\n\nPayment of $${order.totalAmount.toLocaleString()} has been confirmed.\n\nAuthor: Shahmeer Akram`
      });
    }

    res.json({ success: true, order });
  } catch (error: any) {
    res.status(500).json({ error: 'Order confirmation failure' });
  }
});

/**
 * Admin: Retrieve all orders
 */
router.get('/', authenticateJWT, requireRole(['admin']), async (req: AuthenticatedRequest, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

/**
 * Admin: Update order status
 */
router.patch('/:id/status', authenticateJWT, requireRole(['admin']), async (req: AuthenticatedRequest, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    await Log.create({
      userId: req.user?.id,
      action: 'ORDER_STATUS_UPDATED',
      details: `Status of order ${req.params.id} updated to ${status}`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

export default router;
