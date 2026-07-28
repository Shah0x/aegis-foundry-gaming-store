import React from 'react';
import { motion } from 'motion/react';
import { Cpu, ShieldCheck, Zap, ArrowUpRight, Sparkles } from 'lucide-react';

export default function BrandManifesto() {
  return (
    <section id="about" className="relative py-20 bg-[#040404] border-y border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Manifesto Statement */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF] text-[10px] font-mono font-bold tracking-widest uppercase">
              <Sparkles size={12} />
              <span>OUR MISSION & VALUES</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight italic leading-tight">
              GEARED FOR EXCELLENCE. <br />
              <span className="text-[#00F0FF]">BUILT FOR YOU.</span>
            </h2>

            <p className="text-slate-300 text-base md:text-lg font-sans font-light leading-relaxed max-w-2xl">
              At Aegis Foundry, we believe that true performance comes from combining cutting-edge processor power, crystal-clear audio, efficient cooling, and sleek ergonomic design. Every system, display, and accessory in our collection is selected to elevate your gaming and creative setup.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="px-3 py-1.5 rounded bg-white/5 border border-white/10">PERFORMANCE_TESTED</span>
              <span className="px-3 py-1.5 rounded bg-white/5 border border-white/10">OPTIMIZED_THERMALS</span>
              <span className="px-3 py-1.5 rounded bg-white/5 border border-white/10">EXPERT_VERIFIED</span>
            </div>
          </div>

          {/* 3 Core Pillars Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {[
              {
                icon: Cpu,
                title: "RIGOROUSLY BENCHMARKED GEAR",
                desc: "Every gaming system and peripheral undergoes comprehensive thermal, acoustic, and stability testing before shipment."
              },
              {
                icon: Zap,
                title: "INSTANT RESPONSIVENESS",
                desc: "High-speed optical switches and low-latency memory ensure instant feedback when every millisecond counts."
              },
              {
                icon: ShieldCheck,
                title: "GLOBAL WARRANTY & SUPPORT",
                desc: "Every order is backed by full hardware warranty protection, dedicated technical assistance, and express global delivery."
              }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="p-5 bg-black/60 rounded-xl border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 group flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] shrink-0 group-hover:scale-105 transition-transform">
                  <pillar.icon size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display uppercase italic tracking-tight mb-1 group-hover:text-[#00F0FF] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
