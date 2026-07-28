# Aegis Foundry | Next-Generation Hardware Logistics & E-Commerce Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-In--Memory_/_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.style=for-the-badge)](LICENSE)

---

## 🌟 Mission Statement

**Aegis Foundry** is an enterprise-grade hardware retail and logistics platform engineered for high-performance computing enthusiasts, professional creators, and elite gamers. Built with modern full-stack architecture, real-time inventory telemetry, and Google Gemini AI recommendation intelligence, Aegis Foundry provides a seamless end-to-end shopping experience—from curated rig configurations to instant express checkout.

---

## ✨ Key Features

- **⚡ Real-Time Hardware Catalog**: Browse 20+ verified hardware components including GPUs, CPUs, custom liquid cooling loops, high-speed DDR5 memory, and workstation chassis.
- **🤖 Gemini AI Advisor**: Interactive AI Shopping Assistant powered by `@google/genai` (Gemini 2.5 Flash) that provides personalized component compatibility checks and build recommendations.
- **🖥️ Curated Rig Setups**: Pre-configured gaming and workstation setups (Ultimate 4K Rig, Studio Beast, Cyberpunk Mech) with instant one-click bundle cart additions.
- **🛡️ Warranty & Logistics Telemetry**: Live shipping tracking simulator, 2-year express hardware replacement plans, and priority courier dispatch tracking.
- **🛒 High-Performance Cart Engine**: Redux Toolkit persistent state with item quantity adjustments, stock limit validation, and real-time total calculations.
- **🔐 Secure Checkout & Admin Panel**: Integrated Stripe checkout interface and an administrative panel for catalog management, stock updates, and live analytics.
- **📱 Responsive Mobile-First Design**: Precision Tailwind layout that scales seamlessly from ultra-compact smartphones to 4K ultra-wide desktop displays.

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework**: React 19 + Vite 6
- **State Management**: Redux Toolkit & React-Redux
- **Styling**: Tailwind CSS v4 with custom dark themes and glassmorphism styling
- **Animations**: Motion (`motion/react`) for smooth transitions
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js + Express
- **AI Integration**: Google Gen AI SDK (`@google/genai` Gemini 2.5 Flash)
- **Database**: Mongoose (MongoDB Atlas / In-Memory MongoDB Server for dev/preview)
- **Payment Processing**: Stripe Node SDK

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/shahmeerakram/aegis-foundry.git
cd aegis-foundry
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (refer to `.env.example`):
```env
# Server & API Configuration
PORT=3000
GEMINI_API_KEY="your-gemini-api-key-here"

# Database Connection (Optional for Cloud DB, defaults to local/in-memory)
MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/aegis_foundry"

# Stripe Configuration (Optional)
STRIPE_SECRET_KEY="sk_test_..."
VITE_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 4. Run Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

---

## 🛠️ Build & Deployment Guide

### Building for Production
```bash
npm run build
```
This runs Vite compilation and outputs static production assets to the `dist/` directory.

### Deploying on Vercel
1. Import the repository into your Vercel Dashboard.
2. Select **Vite** as the Framework Preset.
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`
5. Add `GEMINI_API_KEY` to Environment Variables.
6. Click **Deploy**.

### Deploying on Cloud Run / Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

---

## 📸 Interface Screenshots

| Hero Vault & Catalog | Curated Hardware Setups | AI Assistant Integration |
| :---: | :---: | :---: |
| *(Hero Banner & Products)* | *(Workstation Setups)* | *(Gemini Live Advisor)* |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the Repository.
2. Create a feature branch (`git checkout -b feature/EpicFeature`).
3. Commit your changes (`git commit -m 'Add EpicFeature'`).
4. Push to the branch (`git push origin feature/EpicFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### **Crafted by Shahmeer Akram**

*Enterprise Hardware E-Commerce Platform*

</div>
