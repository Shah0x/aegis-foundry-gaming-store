import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Zap, Award } from 'lucide-react';

export default function FeaturedCampaigns() {
  const campaigns = [
    {
      title: 'THE ULTIMATE COMMAND CENTER',
      subtitle: 'DISPLAY + GAMING PC + ACCESSORIES',
      badge: 'FEATURED BUNDLE',
      desc: 'A complete multi-monitor setup featuring our flagship 57" Dual-UHD monitor, liquid-cooled gaming PC, and studio audio.',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1200',
      tag: 'FEATURED'
    },
    {
      title: 'THE COMPETITIVE EDGE',
      subtitle: 'HIGH REFRESH RATE + ULTRA-FAST PERIPHERALS',
      badge: 'ESPORTS APPROVED',
      desc: 'Sub-millisecond optical mice, magnetic rapid-trigger keyboards, and 360Hz gaming monitors built for competitive play.',
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=1200',
      tag: 'PRO GAMING'
    },
    {
      title: 'THE NIGHT SHIFT',
      subtitle: 'QUANTUM OLED + PREMIUM AUDIO + ERGONOMIC DESK',
      badge: 'CINEMATIC SETUP',
      tagline: 'OLED TRUE BLACKS & CLEAR ACOUSTICS',
      desc: 'High-contrast OLED gaming setup. Deep OLED visuals and spatial surround sound for immersive late-night gaming.',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200',
      tag: 'IMMERSIVE'
    },
    {
      title: 'THE FOUNDERS EDITION',
      subtitle: 'LIMITED COLLECTION // LIQUID-COOLED RIGS',
      badge: 'EXCLUSIVE EDITION',
      desc: 'Hand-crafted custom PCs built with premium liquid loops, custom cable routing, and priority warranty support.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
      tag: 'LIMITED BUILD'
    }
  ];

  return (
    <section className="py-24 bg-[#020202] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#00F0FF] mb-2 font-mono text-xs font-bold tracking-widest uppercase">
              <Sparkles size={14} />
              <span>CURATED PROMOTIONAL CAMPAIGNS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight italic">
              FEATURED <span className="text-[#00F0FF]">CAMPAIGNS</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl font-sans mt-2 font-light">
              Explore thematic campaign collections configured around specific gameplay styles, optical clarity standards, and custom craft.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 bg-[#00F0FF] rounded-full animate-ping" />
            <span>AUTHENTIC HARDWARE BUNDLES ACTIVE</span>
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campaigns.map((camp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative bg-[#080808] border border-white/10 hover:border-[#00F0FF]/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-2xl hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
            >
              {/* Image Banner Container */}
              <div className="relative aspect-[21/9] overflow-hidden bg-black">
                <img
                  src={camp.image}
                  alt={camp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-[0.85] group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
                
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-[#00F0FF]/30 text-[#00F0FF] text-[10px] font-mono font-bold uppercase tracking-widest">
                  {camp.badge}
                </div>

                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-widest">
                  {camp.tag}
                </div>
              </div>

              {/* Campaign Content */}
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#00F0FF] font-bold uppercase tracking-widest block mb-1">
                    {camp.subtitle}
                  </span>
                  <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight italic group-hover:text-[#00F0FF] transition-colors">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-sans font-light mt-2 leading-relaxed">
                    {camp.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                  <span className="uppercase tracking-wider">EXPLORE CAMPAIGN BUNDLE</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
