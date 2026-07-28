import React from 'react';
import { motion } from 'motion/react';
import { Monitor, Cpu, Target, Sparkles } from 'lucide-react';

export default function ExperienceShowroom() {
  const experiences = [
    {
      title: "THE COMPETITIVE EDGE",
      desc: "Sub-millisecond optical synapse mice, magnetic rapid-trigger keyboards, and 360Hz displays designed for apex rank placement.",
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=1200",
      icon: Target
    },
    {
      title: "THE CREATOR'S DESK",
      desc: "Multi-threaded rendering performance with dual color-calibrated displays. 99% Adobe RGB for ultimate precision.",
      image: "https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1200",
      icon: Monitor
    },
    {
      title: "THE COMMAND CENTER",
      desc: "A complete ergonomic cockpit command station. Heavy-duty aluminum mounting arms and triple-display array.",
      image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1200",
      icon: Cpu
    }
  ];

  return (
    <section className="py-24 bg-[#050505] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF] text-[10px] font-mono font-bold tracking-widest uppercase mb-4">
            <Sparkles size={14} />
            <span>CURATED SETUP SHOWROOM</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight italic">
            SHOP BY <span className="text-[#00F0FF]">EXPERIENCE</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 bg-[#0a0a0a]"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-75 group-hover:saturate-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-4">
                    <exp.icon size={20} />
                  </div>
                  <h3 className="text-xl font-black text-white font-display uppercase italic tracking-tight mb-2 group-hover:text-[#00F0FF] transition-colors">{exp.title}</h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
