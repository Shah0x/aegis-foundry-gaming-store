import React from 'react';
import { motion } from 'motion/react';
import { Zap, Shield, ArrowRight } from 'lucide-react';

export default function SeasonalDeploymentVault() {
  return (
    <section className="py-24 bg-[#050505] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="p-10 md:p-16 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF] text-[10px] font-mono font-bold tracking-widest uppercase mb-6">
              <Zap size={14} />
              <span>SEASONAL OFFERS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white font-display uppercase tracking-tight italic mb-4 leading-none">
              FEATURED <br />
              <span className="text-[#00F0FF]">HARDWARE DEALS</span>
            </h2>
            <p className="text-slate-300 text-sm font-sans mb-8 leading-relaxed max-w-md">
              Upgrade your setup with high-performance liquid-cooled PCs and Quantum OLED displays, available now with fast global shipping.
            </p>
            <div className="flex items-center gap-6">
              <button className="bg-[#00F0FF] text-black font-bold font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-xl flex items-center gap-3 hover:bg-[#00F0FF]/90 transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] cursor-pointer">
                VIEW SEASONAL DEALS <ArrowRight size={16} />
              </button>
            </div>
          </div>
          
          <div className="relative h-[400px] lg:h-full bg-black">
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000" 
              alt="Seasonal Deployment" 
              className="w-full h-full object-cover saturate-75 mix-blend-lighten"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 text-xs font-mono text-slate-400">
              <Shield size={14} className="text-[#00F0FF]" />
              <span>SECURE ALLOCATION ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
