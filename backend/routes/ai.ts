import express from 'express';
import { GoogleGenAI } from '@google/genai';
import Product from '../models/Product.ts';

const router = express.Router();

let aiClient: GoogleGenAI | null = null;
const getAIClient = (): GoogleGenAI | null => {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
};

// Fallback catalog context in case DB is offline or empty
const FALLBACK_PRODUCTS = [
  { title: 'Aegis Apex RTX 5090 Gaming PC', price: 4499, category: 'Workstation', specs: 'Ryzen 9 9950X, RTX 5090 24GB, 64GB DDR5, Liquid Cooled' },
  { title: 'Aegis Horizon RTX 5080 Custom Rig', price: 2899, category: 'Workstation', specs: 'Core i9-14900KS, RTX 5080, 32GB DDR5 7200MHz' },
  { title: '45" Ultrawide Curved Quantum OLED 240Hz', price: 1299, category: 'Monitors', specs: '0.03ms Response, HDR 1000 True Black' },
  { title: '360Hz Fast-IPS Tournament Display 27"', price: 899, category: 'Monitors', specs: '0.5ms GTG, G-Sync Ultimate, Factory Calibrated' },
  { title: 'Aegis Synapse Wireless Pro Mouse', price: 169, category: 'Peripherals', specs: '49g, 8000Hz Polling, 30K DPI Optical' },
  { title: 'Rapid-Trigger Hall Effect Keyboard', price: 232, category: 'Peripherals', specs: '0.1mm Actuation, CNC Aluminum Chassis' },
  { title: 'Aegis Acoustic Planar Magnetic Headset', price: 449, category: 'Audio', specs: 'Open-Back Spatial Driver, Balanced Cable' }
];

router.post('/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // 1. Fetch live products from DB or fallback
    let productContext = '';
    try {
      const products = await Product.find({}).lean();
      if (products && products.length > 0) {
        productContext = products
          .map((p: any) => `- ${p.title} [$${p.price}] SKU: ${p.assetId} | Category: ${p.category} | Stock: ${p.stockCount ?? 'In Stock'} | Specs: ${p.specifications?.join(', ') || ''}`)
          .join('\n');
      }
    } catch (dbErr) {
      console.warn('MongoDB query warning in AI route, using fallback catalog:', dbErr);
    }

    if (!productContext) {
      productContext = FALLBACK_PRODUCTS
        .map(p => `- ${p.title} [$${p.price}] | Category: ${p.category} | Specs: ${p.specs}`)
        .join('\n');
    }

    const systemInstruction = `You are the Aegis Foundry Senior Hardware Assistant.
Welcome the user warmly and professionally.
Provide expert shopping assistance and recommendations using our current hardware catalog:
${productContext}

Guidelines:
1. Be warm, professional, helpful, and concise.
2. Format lists with clear bullet points and bold item names.
3. Keep technical details understandable while highlighting real performance benefits (e.g. FPS, thermals, refresh rates, display clarity).
4. Only recommend products available in our store catalog.
5. If the user asks who created or owns the platform, state that the platform author & creator is Shahmeer Akram and owned by Shahmeer.`;

    const ai = getAIClient();

    if (ai) {
      // Build history contents if provided
      let contents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const msg of history.slice(-6)) {
          if (msg.role && msg.content) {
            contents.push({
              role: msg.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: msg.content }]
            });
          }
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        contents,
      });

      const replyText = response.text || "I am available to assist with all your Aegis Foundry hardware questions!";
      return res.json({ text: replyText });
    } else {
      console.warn('GEMINI_API_KEY environment variable not set, producing catalog assistant fallback response.');
      // Intelligent catalog-matched fallback if API key is not configured in server env
      const lowerMsg = message.toLowerCase();
      let reply = "Welcome to Aegis Foundry! I am your hardware setup specialist. ";

      if (lowerMsg.includes('pc') || lowerMsg.includes('rig') || lowerMsg.includes('gpu') || lowerMsg.includes('rtx') || lowerMsg.includes('computer')) {
        reply += "Here are our top recommended gaming PCs in stock:\n\n" +
          "• **Aegis Apex RTX 5090 Gaming PC ($4,499)** — Ryzen 9 9950X, RTX 5090 24GB VRAM, custom liquid cooling.\n" +
          "• **Aegis Horizon RTX 5080 Custom Rig ($2,899)** — Intel i9-14900KS, RTX 5080, 32GB DDR5 7200MHz.\n\n" +
          "Would you like recommendations based on specific games or work tasks?";
      } else if (lowerMsg.includes('monitor') || lowerMsg.includes('display') || lowerMsg.includes('screen') || lowerMsg.includes('oled')) {
        reply += "Here are our top high-performance displays:\n\n" +
          "• **45\" Ultrawide Curved Quantum OLED 240Hz ($1,299)** — 0.03ms response time, HDR 1000 True Black contrast.\n" +
          "• **27\" 360Hz Fast-IPS Tournament Display ($899)** — Ultra-low latency, G-Sync Ultimate, factory calibrated.\n\n" +
          "Which display size fits your setup space best?";
      } else if (lowerMsg.includes('keyboard') || lowerMsg.includes('mouse') || lowerMsg.includes('headset') || lowerMsg.includes('audio') || lowerMsg.includes('peripheral')) {
        reply += "Our precision gaming peripherals include:\n\n" +
          "• **Rapid-Trigger Hall Effect Keyboard ($232)** — 0.1mm actuation, CNC aluminum chassis.\n" +
          "• **Aegis Synapse Wireless Pro Mouse ($169)** — Ultra-lightweight 49g, 8000Hz polling rate.\n" +
          "• **Aegis Acoustic Planar Magnetic Headset ($449)** — Spatial audio driver for precise footstep placement.";
      } else {
        reply += "How can I assist you today? I can help you choose the right **Gaming PC**, **OLED Monitor**, **Mechanical Keyboard**, or custom setup package. Let me know what games or applications you plan to run!";
      }

      return res.json({ text: reply });
    }
  } catch (error: any) {
    console.error('Gemini Server-side Error:', error);
    // Graceful error recovery message instead of breaking user interface
    res.json({
      text: "I am connected to the Aegis Foundry inventory catalog! For recommendations on our RTX 5090 liquid-cooled PCs, 240Hz OLED displays, or rapid-trigger keyboards, feel free to ask!"
    });
  }
});

export default router;

