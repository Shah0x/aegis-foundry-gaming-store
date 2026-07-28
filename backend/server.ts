import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import 'dotenv/config';

import authRouter from './routes/auth.ts';
import productsRouter from './routes/products.ts';
import ordersRouter from './routes/orders.ts';
import logsRouter from './routes/logs.ts';
import subscriptionsRouter from './routes/subscriptions.ts';
import aiRouter from './routes/ai.ts';

import { seedDatabase } from './seed.ts';

const app = express();
const PORT = 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// CORS
app.use(cors());

// Stripe Webhook requires unparsed raw body buffer for signature verification
app.use('/api/orders/webhook', express.raw({ type: 'application/json' }));

// Global JSON parser for all standard API endpoints
app.use(express.json());

// Reusable Database Connection for Serverless Warmups
let isDbConnected = false;

const connectDB = async () => {
  if (isDbConnected && mongoose.connection.readyState === 1) {
    return;
  }
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      isDbConnected = true;
      console.log('✅ Connected to MongoDB Atlas (Enterprise Cloud Hub)');
      await seedDatabase();
    } catch (err) {
      console.error('❌ MongoDB Connection Failure:', err);
    }
  } else {
    console.warn('⚠️ MONGODB_URI not set.');
  }
};

// Auto-connect database on API routes
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    await connectDB();
  }
  next();
});

// Alias for checkout session creation
app.post('/api/create-checkout-session', (req, res, next) => {
  req.url = '/checkout';
  ordersRouter(req, res, next);
});

// Mount API Routers
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/logs', logsRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/ai', aiRouter);

// Centralized Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error('🔥 Server Error:', err);
  const status = err.status || 500;
  const message = err.message || 'Critical System Failure';
  res.status(status).json({ error: message, protocol: 'ERROR_0x' + status.toString(16) });
});

// Standalone Server & Vite Integration for local/container dev
if (!process.env.VERCEL) {
  async function startStandaloneServer() {
    if (process.env.NODE_ENV !== "production") {
      console.log('🚀 Developing in active Vite Hot Module routing mode...');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
        configFile: path.join(process.cwd(), 'vite.config.ts'),
      });
      app.use(vite.middlewares);
    } else {
      console.log('📦 Launching production engine from bundled dist resources...');
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 [Aegis Foundry] Server online at http://0.0.0.0:${PORT}`);
      console.log(`💻 Crafted by Shahmeer Akram | Owner: Shahmeer`);
    });
  }

  startStandaloneServer();
}

export default app;
