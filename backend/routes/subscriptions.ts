import express from 'express';
import Subscription from '../models/Subscription.ts';
import Log from '../models/Log.ts';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/auth.ts';

const router = express.Router();

// Get active subscription for user's organization
router.get('/', authenticateJWT, async (req: AuthenticatedRequest, res) => {
  try {
    const subscription = await Subscription.findOne({ orgId: req.user?.orgId });
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found for this organization' });
    }
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

// Upgrade subscription plan (e.g. Free -> Pro / Enterprise)
router.post('/upgrade', authenticateJWT, async (req: AuthenticatedRequest, res) => {
  try {
    const { plan } = req.body;
    if (!['Free', 'Pro', 'Enterprise'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid subscription plan level' });
    }

    const subscription = await Subscription.findOne({ orgId: req.user?.orgId });
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription record missing' });
    }

    const previousPlan = subscription.plan;
    subscription.plan = plan as 'Free' | 'Pro' | 'Enterprise';
    subscription.status = 'Active';
    subscription.expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year duration
    await subscription.save();

    // Log update
    await Log.create({
      userId: req.user?.id,
      action: 'SUBSCRIPTION_UPGRADED',
      details: `Upgraded subscription from ${previousPlan} to ${plan} for organization ${req.user?.orgId}`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.json({ success: true, subscription });
  } catch (error) {
    console.error('Subscription Upgrade Error:', error);
    res.status(500).json({ error: 'Failed to perform subscription upgrade' });
  }
});

export default router;
