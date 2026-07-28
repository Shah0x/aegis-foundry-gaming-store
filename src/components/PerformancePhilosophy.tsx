import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Target, Eye, Shield, Activity, Gauge, Flame, Radio } from 'lucide-react';

export default function PerformancePhilosophy() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: 'performance',
      name: 'PERFORMANCE',
      tagline: 'UNCOMPROMISING PROCESSING POWER',
      icon: Cpu,
      stats: [
        { label: 'Thermal Efficiency', value: '99.4%' },
        { label: 'FPS Stability', value: '240Hz+ Lock' },
        { label: 'Bus Bandwidth', value: 'PCIe 5.0 x16' }
      ],
      desc: 'We engineer zero-bottleneck gaming rigs. Liquid-cooled processors, unthrottled GPU power limits, and tuned DDR5 RAM deliver unwavering framerates during intensive 4K raytracing and heavy render workloads.',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'precision',
      name: 'PRECISION',
      tagline: 'INSTANT INPUT RESPONSIVENESS',
      icon: Target,
      stats: [
        { label: 'Optical Debounce Delay', value: '0.001 ms' },
        { label: 'Sensor Precision', value: '30,000 DPI' },
        { label: 'Polling Frequency', value: '8,000 Hz' }
      ],
      desc: 'In competitive gaming, split seconds determine victory. High-speed optical switches, rapid-trigger magnetic hall keys, and lightweight mouse chassis eliminate mechanical lag for instant actuation.',
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'immersion',
      name: 'IMMERSION',
      tagline: 'STUNNING VISUALS & RICH AUDIO',
      icon: Eye,
      stats: [
        { label: 'OLED Contrast Ratio', value: '1,500,000:1' },
        { label: 'Audio Driver Tech', value: 'Planar Magnetic' },
        { label: 'Color Gamut Coverage', value: '99% DCI-P3' }
      ],
      desc: 'Experience games with unparalleled realism. Self-lit OLED true blacks, spatial audio positioning, and 0.03ms pixel response times place you directly inside the virtual environment.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'identity',
      name: 'CRAFTSMANSHIP',
      tagline: 'PREMIUM INDUSTRIAL DESIGN',
      icon: Shield,
      stats: [
        { label: 'Chassis Material', value: 'Anodized Aluminum' },
        { label: 'Cable Routing', value: 'Custom Sleeved' },
        { label: 'Lighting Sync', value: 'ARGB Ecosystem' }
      ],
      desc: 'Your setup is a personal sanctuary. From CNC-milled aluminum enclosures to custom cable management and clean illumination, Aegis Foundry hardware reflects craftsmanship in every detail.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200'
    }
  ];

  const activeData = pillars[activePillar];

  return (
    <section className="py-24 bg-[#020202] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#00F0FF] mb-2 font-mono text-xs font-bold tracking-widest uppercase">
              <Activity size={14} className="animate-pulse" />
              <span>THE FOUR PILLARS OF PERFORMANCE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight italic">
              PERFORMANCE <span className="text-[#00F0FF]">PHILOSOPHY</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl font-sans mt-2 font-light">
              Every system and peripheral in our collection is forged around four foundational standards of hardware excellence.
            </p>
          </div>

          {/* Interactive Pillars Nav */}
          <div className="flex flex-wrap gap-2 bg-black/80 p-1.5 rounded-xl border border-white/10">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={14} />
                  <span>{pillar.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Pillar Interactive Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-12 gap-8 items-center bg-[#080808] border border-white/10 rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-2xl"
          >
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                  <activeData.icon size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#00F0FF] tracking-widest uppercase block">
                    PILLAR 0{activePillar + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white font-display uppercase tracking-tight italic">
                    {activeData.tagline}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-light">
                {activeData.desc}
              </p>

              {/* Stat Telemetry Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                {activeData.stats.map((stat, i) => (
                  <div key={i} className="p-3 bg-black/60 rounded-lg border border-white/5">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1 uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <span className="text-base md:text-lg font-bold font-mono text-[#00F0FF]">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image Display Column */}
            <div className="lg:col-span-6 relative z-10">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group shadow-2xl bg-black">
                <img
                  src={activeData.image}
                  alt={activeData.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
                
                {/* Telemetry Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF]">
                    <Gauge size={14} />
                    <span>SYSTEM_TELEMETRY // VERIFIED</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    AEGIS SPEC STANDARD 2030
                  </span>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
