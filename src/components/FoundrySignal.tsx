import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, ArrowUpRight, Clock, UserCheck, X, Sparkles, Terminal } from 'lucide-react';

export default function FoundrySignal() {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const articles = [
    {
      title: "DirectStorage 2.0 & SSD Performance in High-FPS Gaming",
      category: "HARDWARE GUIDE",
      author: "Aegis Tech Team",
      date: "OCTOBER 2028",
      readTime: "6 MIN READ",
      image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1200",
      excerpt: "How high-speed PCIe 5.0 SSDs and liquid cooling prevent performance throttling during heavy open-world gaming sessions.",
      content: `        As game engines transition to seamless texture streaming and real-time raytraced graphics, storage speed plays a vital role in game performance.
        
        Our internal benchmarks show that PCIe 5.0 NVMe drives operating under sustained high-speed reading can generate significant heat. Without proper cooling, thermal throttling can slow down game loading times and cause brief stutters during open-world gameplay.

        To ensure consistent speed, Aegis Foundry gaming PCs feature dedicated copper liquid cooling blocks attached directly to storage drives, keeping operating temperatures cool and framerates smooth even during long gaming sessions.
      `
    },
    {
      title: "Quantum OLED vs. Mini-LED: Choosing the Right Gaming Display",
      category: "DISPLAY GUIDE",
      author: "Aegis Display Team",
      date: "NOVEMBER 2028",
      readTime: "8 MIN READ",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200",
      excerpt: "A comparison of 0.03ms pixel response times, color vibrancy, and target tracking clarity at 360Hz refresh rates.",
      content: `        In fast-paced competitive games, motion clarity and instant target visibility dictate reaction speeds. While Mini-LED displays achieve bright highlights, local dimming can sometimes create subtle glow around bright objects.

        Quantum OLED (QD-OLED) technology controls illumination on a per-pixel level. Every pixel lights up individually to deliver pitch blacks and infinite contrast. Combined with ultra-fast 0.03ms response times, motion blur is eliminated so you can spot moving opponents with total confidence.
      `
    },
    {
      title: "Planar Magnetic Audio & Spatial Positional Sound in Games",
      category: "AUDIO GUIDE",
      author: "Aegis Audio Team",
      date: "DECEMBER 2028",
      readTime: "5 MIN READ",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Why planar magnetic headphone drivers provide superior sound clarity and precise footstep tracking compared to traditional speakers.",
      content: `        Traditional headphone drivers use a center coil pushing a cone diaphragm, which can flex and distort at higher volumes. Planar magnetic drivers utilize an ultra-thin membrane driven evenly across its entire surface.

        This design produces exceptionally clear sound with minimal distortion. In multiplayer games, this accurate soundstage allows you to hear opponent footsteps and footsteps direction with pinpoint clarity.
      `
    }
  ];

  return (
    <section id="signal" className="py-24 bg-[#020202] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#00F0FF] mb-2 font-mono text-xs font-bold tracking-widest uppercase">
              <Newspaper size={14} />
              <span>HARDWARE & BUYING GUIDES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight italic">
              NEWS & <span className="text-[#00F0FF]">GUIDES</span>
            </h2>
            <p className="text-slate-300 text-sm max-w-xl font-sans mt-2 font-light">
              In-depth articles, setup tips, and technology guides written by our hardware specialists to help you build your ideal gaming setup.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1.5 rounded-lg border border-[#00F0FF]/20">
            <Sparkles size={14} />
            <span>VOLUME 08 // ARCHITECTURE & DYNAMICS</span>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              onClick={() => setSelectedArticle(idx)}
              className="p-6 bg-[#080808] border border-white/10 hover:border-[#00F0FF]/40 rounded-2xl transition-all duration-300 group flex flex-col justify-between cursor-pointer hover:shadow-[0_0_25px_rgba(0,240,255,0.1)]"
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-black">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-75 group-hover:saturate-100"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#00F0FF]/30 text-[#00F0FF] text-[9px] font-mono font-bold uppercase tracking-widest">
                    {art.category}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 mb-3">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white font-display uppercase italic tracking-tight mb-3 group-hover:text-[#00F0FF] transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-sans font-light line-clamp-3 mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-300 group-hover:text-[#00F0FF] transition-colors">
                <span className="uppercase tracking-wider font-bold">READ BRIEFING</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle !== null && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#080808] border border-white/15 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-lg bg-black border border-white/10 hover:border-[#00F0FF] text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 text-[#00F0FF] text-[10px] font-mono font-bold tracking-widest uppercase">
                <Terminal size={12} />
                <span>FOUNDRY SIGNAL ARCHIVE // {articles[selectedArticle].category}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase italic tracking-tight leading-tight">
                {articles[selectedArticle].title}
              </h2>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-y border-white/10 py-3">
                <span>{articles[selectedArticle].author}</span>
                <span>•</span>
                <span>{articles[selectedArticle].date}</span>
              </div>

              <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
                <img
                  src={articles[selectedArticle].image}
                  alt={articles[selectedArticle].title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-slate-300 text-sm font-sans font-light leading-relaxed whitespace-pre-line space-y-4">
                {articles[selectedArticle].content}
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-lg bg-[#00F0FF] text-black font-mono font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#00F0FF]/90 transition-all"
                >
                  CLOSE BRIEFING
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
