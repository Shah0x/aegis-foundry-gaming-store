import express from 'express';
import Product from '../models/Product.ts';
import Log from '../models/Log.ts';
import { authenticateJWT, requireRole, AuthenticatedRequest } from '../middleware/auth.ts';

const router = express.Router();

// Get all products (Public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product (Public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Admin: Create/Update Product (RBAC)
router.post('/', authenticateJWT, requireRole(['admin']), async (req: AuthenticatedRequest, res) => {
  try {
    const { id, ...data } = req.body;
    if (id) {
      const updated = await Product.findByIdAndUpdate(id, data, { new: true });
      
      // Log update action
      await Log.create({
        userId: req.user?.id,
        action: 'PRODUCT_UPDATED',
        details: `Updated product ${updated.title} (Asset ID: ${updated.assetId})`,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      });

      return res.json(updated);
    }
    
    const newItem = new Product(data);
    await newItem.save();

    // Log creation action
    await Log.create({
      userId: req.user?.id,
      action: 'PRODUCT_CREATED',
      details: `Created new product ${newItem.title} (Asset ID: ${newItem.assetId})`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.status(201).json(newItem);
  } catch (error: any) {
    console.error('Failed to save product:', error);
    res.status(500).json({ error: 'Failed to save product' });
  }
});

// Admin: Delete Product (RBAC)
router.delete('/:id', authenticateJWT, requireRole(['admin']), async (req: AuthenticatedRequest, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      await Log.create({
        userId: req.user?.id,
        action: 'PRODUCT_DELETED',
        details: `Deleted product ${deletedProduct.title} (Asset ID: ${deletedProduct.assetId})`,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
