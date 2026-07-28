import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.ts';
import Org from '../models/Org.ts';
import Subscription from '../models/Subscription.ts';
import Log from '../models/Log.ts';
import { authenticateJWT, AuthenticatedRequest } from '../middleware/auth.ts';
import { sendEmailNotification } from '../utils/mailer.ts';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-2026';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'super-secret-jwt-refresh-key-2026';

// Register User, automatically creates Org & Subscription
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, companyName, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create Organization
    const slug = (companyName || `${name}'s Organization`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const org = new Org({
      name: companyName || `${name}'s Organization`,
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
      ownerId: new mongoose.Types.ObjectId() // temporary placeholder
    });
    await org.save();

    // Create User with role (default member, but user can sign up as admin)
    const userRole = role === 'admin' ? 'admin' : 'member';
    const user = new User({
      name,
      email,
      password,
      role: userRole,
      orgId: org._id
    });
    await user.save();

    // Link Org to owner
    org.ownerId = user._id;
    await org.save();

    // Create Free Subscription for Org
    const subscription = new Subscription({
      orgId: org._id,
      plan: 'Free',
      status: 'Active',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 Days Free Trial
    });
    await subscription.save();

    // Log Activity
    await Log.create({
      userId: user._id,
      action: 'USER_REGISTERED',
      details: `User registered with Org ID: ${org._id} and plan: ${subscription.plan}`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    // Send Welcome Email
    sendEmailNotification({
      to: user.email,
      subject: 'Welcome to ELITE TECH GEAR',
      text: `Hello ${user.name},\n\nWelcome to ELITE TECH GEAR - Crafted by Shahmeer Akram. Your organization ${org.name} has been successfully registered under the Free plan. Ready for the next-generation digital hardware supply chain?\n\nOwner: Shahmeer\nAuthor: Shahmeer Akram`
    });

    // Issue tokens
    const accessToken = jwt.sign({ id: user._id, role: user.role, orgId: user.orgId }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        orgId: user.orgId
      },
      org: {
        id: org._id,
        name: org.name,
        plan: subscription.plan
      }
    });

  } catch (error: any) {
    console.error('Signup Error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const org = await Org.findById(user.orgId);
    const subscription = await Subscription.findOne({ orgId: user.orgId });

    // Issue Tokens
    const accessToken = jwt.sign({ id: user._id, role: user.role, orgId: user.orgId }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    user.refreshToken = refreshToken;
    await user.save();

    // Log login action
    await Log.create({
      userId: user._id,
      action: 'USER_LOGGED_IN',
      details: 'User successfully logged into the platform.',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        orgId: user.orgId
      },
      org: org ? {
        id: org._id,
        name: org.name,
        plan: subscription ? subscription.plan : 'Free'
      } : null
    });

  } catch (error: any) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Refresh Token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: 'Invalid or expired refresh token' });
    }

    // Issue a brand new access token
    const newAccessToken = jwt.sign({ id: user._id, role: user.role, orgId: user.orgId }, JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });

  } catch (error) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { id: string };
      const user = await User.findById(decoded.id);
      if (user) {
        user.refreshToken = undefined;
        await user.save();

        await Log.create({
          userId: user._id,
          action: 'USER_LOGGED_OUT',
          details: 'User successfully logged out.',
          ipAddress: req.ip,
          userAgent: req.headers['user-agent']
        });
      }
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get profile
router.get('/profile', authenticateJWT, async (req: AuthenticatedRequest, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
    const user = await User.findById(req.user.id).select('-password');
    const org = await Org.findById(req.user.orgId);
    const subscription = await Subscription.findOne({ orgId: req.user.orgId });

    res.json({ user, org, subscription });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

import mongoose from 'mongoose';
export default router;
