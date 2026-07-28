import express from 'express';
import Log from '../models/Log.ts';
import { authenticateJWT, requireRole, AuthenticatedRequest } from '../middleware/auth.ts';

const router = express.Router();

// Get all system activity logs (Admin Only RBAC)
router.get('/', authenticateJWT, requireRole(['admin']), async (req: AuthenticatedRequest, res) => {
  try {
    const logs = await Log.find()
      .populate('userId', 'name email role')
      .sort({ createdAt: -1 })
      .limit(200); // safety threshold

    res.json(logs);
  } catch (error) {
    console.error('Failed to fetch system logs:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// Post action log (Authorized API logs)
router.post('/', authenticateJWT, async (req: AuthenticatedRequest, res) => {
  try {
    const { action, details } = req.body;
    const log = new Log({
      userId: req.user?.id,
      action,
      details,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });
    await log.save();
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create log' });
  }
});

export default router;
