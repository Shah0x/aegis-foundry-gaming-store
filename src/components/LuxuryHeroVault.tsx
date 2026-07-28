import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, Target, Sparkles, ArrowRight, Award, Cpu, CheckCircle2, Star } from 'lucide-react';
import ShahmeerBrandLogo from './ShahmeerBrandLogo';

export default function LuxuryHeroVault() {
  const [activeHighlight, setActiveHighlight] = useState(0);

  const heroHighlights = [
    {
      title: "FLAGSHIP LIQUID-COOLED PC",
      spec: "NVIDIA RTX 5090 24GB &bull; Ryzen 9 9950X &bull; 64GB DDR5 RAM",
      stat: "240+ FPS @ 4K",
      label: "ULTIMATE PERFORMANCE"
    },
    {
      title: "360HZ QUANTUM OLED DISPLAY",
      spec: "0.03ms GTG &bull; HDR 1000 True Black &bull; G-Sync Ultimate",
      stat: "0.5ms LATENCY",
      label: "ESPORTS PRO TIER"
    },
    {
      title: "HARDWARE STABILITY GUARANTEE",
      spec: "72-Hour Thermal Stress Test &bull; Custom XMP Memory Tuning",
      stat: "100% STABLE",
      label: "ZERO THROTTLING"
    }
  ];

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#020202] border-b border-white/10 mb-8 sm:mb-12">
      {/* Subtle Premium Dark Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[140px]" />
        <div className="absolute bottom-10 right-1/3 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/10 rounded-full blur-[100px] sm:blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-5 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/95 via-[#020202]/85 to-[#020202]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-20 grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-8">
          
          {/* Professional Status Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-black/80 border border-white/15 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md max-w-full"
          >
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-white uppercase tracking-[0.12em] sm:tracking-[0.18em] flex items-center gap-1.5 sm:gap-2 truncate">
              <Sparkles size={12} className="text-[#00F0FF] shrink-0" />
              <span className="truncate">PREMIUM GAMING HARDWARE &amp; WORKSTATIONS</span>
            </span>
          </motion.div>
          
          {/* Main Slogan & Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="space-y-2.5 sm:space-y-4"
          >
            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white font-display tracking-tight leading-[1.05] sm:leading-[1.02] uppercase italic">
              PLAY BEYOND LIMITS. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-cyan-200 to-white block sm:inline mt-1 sm:mt-0">
                FORGING GAMING LEGENDS.
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-base md:text-lg max-w-2xl leading-relaxed font-sans font-light">
              Discover custom liquid-cooled gaming PCs, 360Hz Quantum OLED displays, flagship graphics cards, and pro-tier peripherals. Engineered for zero latency, uncompromised frame rates, and absolute thermal stability.
            </p>
          </motion.div>

          {/* Interactive Feature Spec Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="bg-[#08080c]/90 border border-white/15 hover:border-[#00F0FF]/40 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 max-w-2xl relative overflow-hidden shadow-2xl transition-all duration-300 backdrop-blur-md"
          >
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 mb-3 border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold text-[#00F0FF]">
                <ShahmeerBrandLogo size={16} />
                <span className="truncate">FEATURED HARDWARE SPECIFICATION</span>
              </div>
              <span className="self-start xs:self-auto text-[9px] sm:text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold uppercase shrink-0">
                {heroHighlights[activeHighlight].label}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-white font-mono uppercase tracking-wider">
                  {heroHighlights[activeHighlight].title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 font-mono leading-relaxed" dangerouslySetInnerHTML={{ __html: heroHighlights[activeHighlight].spec }} />
              </div>
              <div className="shrink-0 bg-[#00F0FF]/10 border border-[#00F0FF]/30 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-left sm:text-center flex sm:flex-col justify-between items-center sm:items-center">
                <span className="text-xs sm:text-sm font-black font-mono text-[#00F0FF]">
                  {heroHighlights[activeHighlight].stat}
                </span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                  BENCHMARK
                </span>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-1.5 mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/5">
              {heroHighlights.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveHighlight(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeHighlight === i ? 'w-6 sm:w-8 bg-[#00F0FF]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Select highlight ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 pt-1 sm:pt-2"
          >
            <a 
              href="#inventory"
              className="bg-[#00F0FF] hover:bg-[#00F0FF]/90 text-black font-bold px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] group uppercase text-[11px] sm:text-xs tracking-wider sm:tracking-widest font-mono cursor-pointer active:scale-95"
            >
              <Target size={16} className="group-hover:rotate-90 transition-transform duration-300 shrink-0" />
              <span>BROWSE STORE CATALOG</span>
            </a>

            <a 
              href="#setups"
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-white/20 hover:border-[#00F0FF]/50 bg-white/5 hover:bg-white/10 text-white hover:text-[#00F0FF] font-mono text-[11px] sm:text-xs font-bold tracking-wider sm:tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>EXPLORE FEATURED SETUPS</span>
              <ArrowRight size={15} className="shrink-0" />
            </a>
          </motion.div>
          
          {/* Trust Guarantees */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-6 pt-4 sm:pt-5 border-t border-white/10 text-slate-300 text-[10px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-widest"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-[#00F0FF] shrink-0" />
              <span>3-YEAR DIRECT WARRANTY</span>
            </div>
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <div className="flex items-center gap-2">
              <Zap size={15} className="text-[#00F0FF] shrink-0" />
              <span>EXPRESS 48-HR AIR DELIVERY</span>
            </div>
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <div className="flex items-center gap-2 text-amber-400">
              <Star size={15} className="fill-amber-400 shrink-0" />
              <span>4.9/5 VERIFIED RATING</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column - Sleek Professional Showcase Image with Grayscale-to-Color Hover Effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 relative mt-2 lg:mt-0"
        >
          {/* Subtle Ambient Backdrop Glow */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-[#00F0FF]/20 via-purple-600/15 to-transparent blur-2xl z-0 rounded-2xl" />
          
          <div className="relative z-10 border border-white/20 bg-[#080808] rounded-2xl overflow-hidden group shadow-2xl hover:border-[#00F0FF]/50 transition-all duration-500">
            {/* Visual Header Tag */}
            <div className="bg-black/90 px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 flex items-center justify-between font-mono text-[11px] sm:text-xs">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
                <span>SIGNATURE HARDWARE SETUP</span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#00F0FF] font-bold bg-[#00F0FF]/10 px-2 sm:px-2.5 py-0.5 rounded border border-[#00F0FF]/20 uppercase">
                PRO RIG
              </span>
            </div>

            {/* Image Container with Sleek Responsive Grayscale-to-Color Hover Effect */}
            <div className="relative aspect-[16/11] sm:aspect-square overflow-hidden bg-black">
              <img 
                src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=1200" 
                alt="Aegis Foundry Custom Liquid Cooled Gaming PC" 
                className="w-full h-full object-cover grayscale md:grayscale sm:group-hover:grayscale-0 contrast-110 brightness-95 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/20 pointer-events-none" />
              
              <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[9px] sm:text-[10px] font-mono text-slate-300 transition-opacity duration-300 opacity-90 group-hover:opacity-100">
                <span className="hidden md:inline">HOVER TO REVEAL FULL COLOR</span>
                <span className="inline md:hidden">SIGNATURE LIQUID PC</span>
              </div>
            </div>

            {/* Spec Overlay Info */}
            <div className="p-3.5 sm:p-5 bg-[#080808] border-t border-white/10 space-y-2 sm:space-y-2.5">
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase">FLAGSHIP GPU</span>
                <span className="text-white font-bold">NVIDIA RTX 5090 24GB</span>
              </div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase">COOLING SYSTEM</span>
                <span className="text-[#00F0FF] font-bold">HARDLINE DUAL-LOOP LIQUID</span>
              </div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase">DISPLAY</span>
                <span className="text-purple-400 font-bold">360HZ QUANTUM OLED</span>
              </div>

              <div className="pt-2.5 sm:pt-3 border-t border-white/5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
                <span className="text-slate-300 font-bold">AEGIS CERTIFIED</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  72-HR STRESS TESTED
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}


