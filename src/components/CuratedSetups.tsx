import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/index';
import { 
  Sparkles, Layers, Check, ShoppingBag, Volume2, VolumeX, ShieldCheck, Flame, Zap, Award
} from 'lucide-react';

const gtaViArtworkImage = new URL('../assets/images/gta_vi_artwork_1785245509720.jpg', import.meta.url).href;

interface CuratedSetupsProps {
  products: any[];
}

export default function CuratedSetups({ products }: CuratedSetupsProps) {
  const dispatch = useDispatch();
  const [selectedSetupIndex, setSelectedSetupIndex] = useState(0);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // High-Aura Web Audio API synthesizer for beast audio feedback
  const playAuraSound = (type: 'tab' | 'cart') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      if (type === 'tab') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'cart') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc2.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        osc2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.3);
        osc2.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      // AudioContext fallback
    }
  };

  const curatedSetups = [
    {
      id: 'competitive',
      title: 'THE COMPETITIVE BEAST',
      badge: 'ESPORTS & RANKED DOMINANCE',
      tagline: 'LOW LATENCY & 360HZ DISPLAY',
      auraRating: 'AURA 9,850 // BEAST MODE',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200',
      description: 'Engineered specifically for esports dominance. Combines 360Hz refresh rates, sub-millisecond optical latency, and RTX 5080 raw frame power to give you the ultimate competitive edge.',
      includedHardware: [
        { title: 'Aegis Apex RTX 5080 Gaming PC', category: 'Workstation', price: 2899, spec: 'Ryzen 9 9950X, RTX 5080 16GB, 32GB DDR5 7200MHz', badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
        { title: '360Hz Fast-IPS Tournament Display 27"', category: 'Monitors', price: 899, spec: '0.5ms GTG, G-Sync Ultimate, Factory Calibrated', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
        { title: 'Aegis Synapse Wireless Pro Mouse (49g)', category: 'Peripherals', price: 169, spec: '8000Hz Polling Rate, 30K DPI Optical Sensor', badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
        { title: 'Rapid-Trigger Hall Effect Keyboard', category: 'Peripherals', price: 232, spec: '0.1mm Actuation, CNC Anodized Aluminum Chassis', badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20' }
      ]
    },
    {
      id: 'vice_city',
      title: 'VICE CITY NIGHTS (GTA VI EDITION)',
      badge: 'VICE CITY AURA+++ LOADOUT',
      tagline: 'QUANTUM OLED NEON DUSK & ULTRA RAYTRACING',
      auraRating: 'AURA 10,000 // MAXIMUM AURA',
      image: gtaViArtworkImage,
      description: 'Crafted for cinematic AAA immersion, Vice City ray-traced neon visuals, and maxed-out graphics settings. Powered by RTX 5090 paired with a curved 240Hz Quantum OLED display.',
      includedHardware: [
        { title: 'Aegis Horizon RTX 5090 Extreme PC', category: 'Workstation', price: 4499, spec: 'Core i9-14900KS, RTX 5090 24GB VRAM, 64GB DDR5', badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
        { title: '45" Ultrawide Curved Quantum OLED 240Hz', category: 'Monitors', price: 1299, spec: '0.03ms Response, HDR 1000 True Black, 21:9 Aspect', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
        { title: 'Aegis Acoustic Planar Headset', category: 'Audio', price: 449, spec: 'Open-Back Spatial Driver, Balanced High-Res Audio', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
        { title: 'Neon Dusk Ambient Desk Array', category: 'Accessories', price: 252, spec: 'RGB Screen-Sync Ambient Light, Heavy Steel Desk Stand', badgeColor: 'bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/20' }
      ]
    },
    {
      id: 'creator',
      title: 'THE CREATOR STUDIO RIG',
      badge: 'STREAMING, EDITING & 3D RENDER',
      tagline: 'DUAL 4K COLOR PRECISION & ZERO BOTTLENECK',
      auraRating: 'AURA 9,900 // STUDIO BEAST',
      image: 'https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1200',
      description: 'The ultimate dual-purpose workstation for developers, 4K video creators, and live streamers. Unmatched multi-threaded rendering speed with dual color-calibrated QD-OLED displays.',
      includedHardware: [
        { title: 'Aegis Foundry Studio Render Workstation', category: 'Workstation', price: 4199, spec: '64-Core Threadripper PRO, RTX 5090 24GB VRAM', badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
        { title: 'Dual 32" 4K QD-OLED Professional Displays', category: 'Monitors', price: 1499, spec: '99% Adobe RGB, Factory Calibrated ΔE < 1.0', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
        { title: 'Aegis Broadcast XLR Microphone System', category: 'Audio', price: 399, spec: '32-bit Float Recording, Zero-Noise Preamp Console', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
        { title: 'Tactile Stream Deck Studio Console', category: 'Peripherals', price: 202, spec: '15 Customizable LCD Keys, Dual Rotary Dials', badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20' }
      ]
    },
    {
      id: 'ultimate_build',
      title: 'THE APEX MONSTER LOADOUT',
      badge: 'CUSTOM LIQUID COOLING // FLAGSHIP',
      tagline: 'WHITE-GLOVE SETUP & UNTHROTTLED POWER',
      auraRating: 'AURA 10,000+ // GOD TIER',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
      description: 'Aegis Foundry’s pinnacle hardware collection. A fully custom dual-loop liquid cooled monster PC paired with a massive 57" dual-UHD monitor and white-glove setup.',
      includedHardware: [
        { title: 'Aegis Foundry Apex Founders Custom PC', category: 'Workstation', price: 6999, spec: 'Custom Hardline Watercooling, RTX 5090, 128GB DDR5', badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
        { title: '57" Dual-UHD Curved 240Hz Flagship Monitor', category: 'Monitors', price: 1999, spec: '7680x2160 Resolution, Quantum Mini-LED Panel', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
        { title: 'Aegis Custom Titanium Peripheral Package', category: 'Peripherals', price: 699, spec: 'Bespoke Anodized Magnetic Keyboard & Wireless Mouse', badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
        { title: 'White-Glove Setup & Dedicated Concierge', category: 'Services', price: 302, spec: '24/7 Dedicated Hardware Support & In-Person Setup', badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20' }
      ]
    }
  ];

  const currentSetup = curatedSetups[selectedSetupIndex];

  // Calculate clean accurate total price
  const totalPrice = currentSetup.includedHardware.reduce((sum, item) => sum + item.price, 0);

  const handleSelectTab = (index: number) => {
    setSelectedSetupIndex(index);
    playAuraSound('tab');
  };

  const handleAddSetupToCart = () => {
    playAuraSound('cart');
    
    // Add each distinct component cleanly to cart
    currentSetup.includedHardware.forEach((hw, idx) => {
      // Find matching real product if available or construct clean item
      const realMatch = products?.find(p => p.title?.toLowerCase().includes(hw.category.toLowerCase()));
      dispatch(addToCart({
        id: realMatch?._id || realMatch?.id || `bundle-${currentSetup.id}-${idx}`,
        title: hw.title,
        price: hw.price,
        imageUrl: realMatch?.imageUrl || currentSetup.image,
        quantity: 1,
        stockCount: 10
      }));
    });

    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3500);
  };

  return (
    <section id="setups" className="py-24 bg-[#030303] border-b border-white/10 relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-purple-900/10 via-cyan-900/15 to-pink-900/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header with HCI clear typography and sound toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-[10px] font-mono font-bold tracking-widest uppercase mb-3">
              <Sparkles size={13} />
              <span>CURATED BEAST ECOSYSTEM BUNDLES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight italic">
              SHOP BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-purple-400 to-pink-500">SETUP AURA</span>
            </h2>
            <p className="text-slate-300 text-sm font-sans mt-2 max-w-2xl font-light leading-relaxed">
              Every bundle is benchmarked and engineered to eliminate hardware bottlenecks. Zero clutter, pure performance.
            </p>
          </div>

          {/* Sound FX Toggle & Guarantee Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title="Toggle Audio Feedback"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                soundEnabled 
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20' 
                  : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span>AURA SOUND {soundEnabled ? 'ON' : 'MUTED'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
              <ShieldCheck size={15} className="text-emerald-400" />
              <span>100% MATCH GUARANTEE</span>
            </div>
          </div>
        </div>

        {/* Experience Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {curatedSetups.map((setup, idx) => {
            const isSelected = selectedSetupIndex === idx;
            return (
              <button
                key={setup.id}
                onClick={() => handleSelectTab(idx)}
                className={`p-4 rounded-xl text-left font-mono transition-all duration-300 border cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#0a0a0a] border-[#00F0FF] text-white shadow-[0_0_30px_rgba(0,240,255,0.2)]'
                    : 'bg-[#080808] border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F0FF] via-purple-500 to-pink-500" />
                )}
                <div className="text-[10px] text-[#00F0FF] font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>{setup.badge.split('//')[0]}</span>
                  {isSelected && <Flame size={12} className="text-amber-400 animate-pulse" />}
                </div>
                <div className="text-xs sm:text-sm font-black font-display uppercase tracking-wider text-white">
                  {setup.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Setup Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSetup.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-12 gap-8 bg-[#080808] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl"
          >
            {/* Visual Preview (Left) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 group bg-black">
                <img
                  src={currentSetup.image}
                  alt={currentSetup.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/30 opacity-90" />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[#00F0FF]/40 text-[#00F0FF] text-[10px] font-mono font-bold uppercase tracking-widest">
                  <Zap size={12} />
                  <span>{currentSetup.badge}</span>
                </div>

                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-purple-500/40 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-widest">
                  {currentSetup.auraRating}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight italic">
                  {currentSetup.title}
                </h3>
                <p className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-wider">
                  {currentSetup.tagline}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
                  {currentSetup.description}
                </p>
              </div>
            </div>

            {/* Hardware Component List (Right) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <Layers size={14} className="text-[#00F0FF]" />
                    INCLUDED HARDWARE ECOSYSTEM
                  </span>
                  <span className="text-xs font-mono text-[#00F0FF] font-bold">
                    {currentSetup.includedHardware.length} MATCHED COMPONENTS
                  </span>
                </div>

                <div className="space-y-3">
                  {currentSetup.includedHardware.map((hw, i) => (
                    <div 
                      key={i} 
                      className="p-3.5 bg-black/70 rounded-xl border border-white/10 hover:border-white/25 transition-all flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${hw.badgeColor}`}>
                            {hw.category}
                          </span>
                          <span className="text-xs font-bold text-white font-mono truncate">
                            {hw.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono truncate">
                          {hw.spec}
                        </p>
                      </div>

                      <span className="text-xs font-mono font-bold text-white shrink-0 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                        ${hw.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Price & Add Loadout Action */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                    TOTAL ECOSYSTEM PRICE
                  </span>
                  <span className="text-3xl font-black font-mono text-[#00F0FF] tracking-tight">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleAddSetupToCart}
                  className={`w-full sm:w-auto px-8 py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-102'
                      : 'bg-[#00F0FF] hover:bg-[#00F0FF]/90 text-black shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] active:scale-98'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check size={18} />
                      <span>LOADOUT ADDED TO CART</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>ADD COMPLETE LOADOUT</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

