import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Shield, Globe, ArrowRight, 
  AlertCircle, Activity, Command, Layers,
  Star, Search, Sparkles
} from 'lucide-react';

import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CheckoutAndLogisticsEngine from './components/CheckoutAndLogisticsEngine';
import AdminPanel from './components/AdminPanel';
import AIShoppingAssistant from './components/AIShoppingAssistant';
import SkeletonProductCard from './components/SkeletonProductCard';
import Footer from './components/Footer';

import LuxuryHeroVault from './components/LuxuryHeroVault';
import BrandEcosystemTicker from './components/BrandEcosystemTicker';
import BrandManifesto from './components/BrandManifesto';
import PerformancePhilosophy from './components/PerformancePhilosophy';
import CuratedSetups from './components/CuratedSetups';
import ExperienceShowroom from './components/ExperienceShowroom';
import FeaturedCampaigns from './components/FeaturedCampaigns';
import ExtendedProductMatrix from './components/ExtendedProductMatrix';
import VerifiedClientIntel from './components/VerifiedClientIntel';
import FoundrySignal from './components/FoundrySignal';
import SeasonalDeploymentVault from './components/SeasonalDeploymentVault';
import ServicesAndWarranty from './components/ServicesAndWarranty';
import SupportAndContact from './components/SupportAndContact';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('/api/products').then(res => res.data),
  });

  const categories = ['All', ...Array.from(new Set((products || []).map((p: any) => p.category)))] as string[];

  const filteredProducts = (products || []).filter((p: any) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#00F0FF] selection:text-black antialiased overflow-x-hidden">
      <Navbar onAdminToggle={() => setIsAdminView(!isAdminView)} isAdminView={isAdminView} />
      <CheckoutAndLogisticsEngine />
      <AIShoppingAssistant products={products || []} />

      <AnimatePresence mode="wait">
        {isAdminView ? (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="pt-24 pb-12"
          >
            <AdminPanel />
          </motion.div>
        ) : (
          <motion.div
            key="store"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 1. HERO VAULT SHOWCASE */}
            <LuxuryHeroVault />

            {/* NEW ADDITIVE SECTION: BRAND ECOSYSTEM TICKER */}
            <BrandEcosystemTicker />

            {/* 2. BRAND MANIFESTO STATEMENT */}
            <BrandManifesto />

            {/* NEW ADDITIVE SECTION: EXTENDED PRODUCT MATRIX */}
            <ExtendedProductMatrix products={products || []} />

            {/* 3. PERFORMANCE PHILOSOPHY (4 PILLARS) */}
            <div id="philosophy">
              <PerformancePhilosophy />
            </div>
            
            {/* NEW ADDITIVE SECTION: EXPERIENCE SHOWROOM */}
            <ExperienceShowroom />

            {/* 4. SHOP BY DESIRED EXPERIENCE (CURATED SETUPS) */}
            <CuratedSetups products={products || []} />

            {/* 5. FEATURED CAMPAIGNS */}
            <FeaturedCampaigns />

            {/* 6. HARDWARE CATALOGUE / INVENTORY MATRIX */}
            <main id="inventory" className="py-20">
              <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                
                <section className="mb-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
                    <div>
                      <div className="flex items-center gap-2 text-[#00F0FF] mb-2 font-mono text-xs font-bold tracking-widest uppercase">
                        <Activity size={14} className="animate-pulse" />
                        <span>HARDWARE CATALOG // AVAILABLE INVENTORY</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight italic">
                        PRODUCT <span className="text-[#00F0FF]">CATALOG</span>
                      </h2>
                      <p className="text-slate-300 text-sm max-w-xl font-sans mt-2 font-light">
                        Explore our complete inventory of custom gaming PCs, high-refresh monitors, mechanical keyboards, and precision audio gear.
                      </p>
                      
                      {/* Live Telemetry Search */}
                      <div className="relative max-w-xl mt-4">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Search size={16} className="text-[#00F0FF]" />
                        </div>
                        <input
                          type="text"
                          placeholder="SEARCH PCS, MONITORS, KEYBOARDS, MICE..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-[#0a0a0a] border border-white/10 hover:border-[#00F0FF]/50 focus:border-[#00F0FF] rounded-xl pl-12 pr-4 py-3 text-xs font-mono text-white placeholder-slate-500 focus:outline-none transition-colors shadow-[0_0_20px_rgba(0,240,255,0.05)] focus:shadow-[0_0_20px_rgba(0,240,255,0.15)] uppercase"
                        />
                      </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 bg-[#0a0a0a] p-1.5 rounded-xl border border-white/10">
                      {categories.map(cat => (
                        <button 
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                            selectedCategory === cat 
                              ? 'bg-[#00F0FF] border-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]' 
                              : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[1,2,3,4,5,6].map(i => <SkeletonProductCard key={i} />)}
                    </div>
                  ) : isError ? (
                    <div className="py-20 text-center bg-[#0a0a0a] rounded-2xl border border-red-500/30 max-w-2xl mx-auto shadow-2xl p-8">
                      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-white font-display uppercase tracking-tight italic mb-3">DATABASE HANDSHAKE PENDING</h3>
                      <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed font-sans font-light">
                        Connecting to hardware reserves database. Please ensure MongoDB Atlas credentials or refresh to re-establish connection protocol.
                      </p>
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="py-20 text-center bg-[#0a0a0a] rounded-2xl border border-white/10 max-w-2xl mx-auto p-8">
                      <Command className="w-16 h-16 text-slate-600 mx-auto mb-6 opacity-50" />
                      <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight italic mb-3">NO HARDWARE MATCHED</h3>
                      <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed font-sans font-light">
                        Your search query did not match active stock reserves. Try adjusting filter criteria or contact concierge for custom builds.
                      </p>
                    </div>
                  ) : (
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      {filteredProducts?.map((product: any) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </motion.div>
                  )}
                </section>

              </div>
            </main>

            {/* 7. VERIFIED CLIENT INTEL (SOCIAL PROOF) */}
            <VerifiedClientIntel />

            {/* 8. FOUNDRY SIGNAL (EDITORIAL JOURNAL) */}
            <FoundrySignal />

            {/* NEW ADDITIVE SECTION: SEASONAL DEPLOYMENT VAULT */}
            <SeasonalDeploymentVault />

            {/* SERVICES & MEMBERSHIP PLANS */}
            <ServicesAndWarranty />

            {/* SUPPORT & DIRECT CONCIERGE CONTACT */}
            <SupportAndContact />

            {/* 9. GLOBAL LOGISTICS & SERVICE GUARANTEES */}
            <section className="py-20 bg-[#020202] border-y border-white/10">
              <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    icon: Shield, 
                    title: 'SECURE AES-256 CHECKOUT', 
                    desc: 'Encrypted financial transactions powered directly by Stripe Checkout PCI-DSS protocols.' 
                  },
                  { 
                    icon: Globe, 
                    title: 'GLOBAL AIR PRIORITY DISPATCH', 
                    desc: 'Express 48-hour tracked air courier manifests across 160+ sovereign territorial networks.' 
                  },
                  { 
                    icon: Cpu, 
                    title: 'DIRECT ARCHITECT ACCESS', 
                    desc: 'Direct concierge line with senior hardware engineers for ecosystem integration and custom tuning.' 
                  }
                ].map((service, i) => (
                  <div key={i} className="p-8 bg-[#080808] rounded-2xl border border-white/10 hover:border-[#00F0FF]/30 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-[#050505] rounded-xl flex items-center justify-center text-[#00F0FF] border border-[#00F0FF]/20 mb-6 group-hover:scale-105 transition-transform">
                      <service.icon size={22} />
                    </div>
                    <h3 className="text-base font-bold text-white font-display uppercase italic tracking-tight mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed font-sans font-light">
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* 10. FOOTER */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
