import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, CheckCircle2, User, Quote, Award } from 'lucide-react';

export default function VerifiedClientIntel() {
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Esports Competitor",
      verifiedHardware: "Aegis Competitive Setup + 360Hz Display",
      quote: "The liquid-cooled rig delivered steady 240+ FPS during intense tournament matches without frame drops. The sub-0.5ms optical mouse offers instant responsiveness.",
      tier: "COMPETITIVE PLAYER",
      location: "Los Angeles, CA"
    },
    {
      name: "Elena Rostova",
      role: "3D Environmental Artist",
      verifiedHardware: "Aegis Creator Workstation + Dual QD-OLED 4K",
      quote: "Unreal Engine 5 shaders render significantly faster than our studio's previous workstations. Color accuracy on the QD-OLED panels is exceptional right out of the box.",
      tier: "CREATIVE STUDIO",
      location: "Stockholm, Sweden"
    },
    {
      name: "Kenji Takahashi",
      role: "Hardware Tech Enthusiast",
      verifiedHardware: "Aegis Ultimate Build // Custom Liquid Loop",
      quote: "The industrial design is immaculate. Clean hand-crafted liquid tubing, custom cable routing, and zero coil whine under full stress load. Exceptional hardware craftsmanship.",
      tier: "HARDWARE ENTHUSIAST",
      location: "Tokyo, Japan"
    }
  ];

  return (
    <section className="py-24 bg-[#040404] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF] text-[10px] font-mono font-bold tracking-widest uppercase mb-4">
            <ShieldCheck size={14} />
            <span>VERIFIED CUSTOMER REVIEWS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight italic">
            CUSTOMER <span className="text-[#00F0FF]">FEEDBACK</span>
          </h2>
          <p className="text-slate-400 text-sm font-sans mt-3 font-light leading-relaxed">
            Real reviews and experiences from gamers, digital creators, and hardware enthusiasts around the globe.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="p-8 bg-[#080808] rounded-2xl border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 flex flex-col justify-between shadow-2xl relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/20">
                    <CheckCircle2 size={12} />
                    <span>VERIFIED PURCHASE</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1 rounded border border-[#00F0FF]/20 uppercase">
                    {review.tier}
                  </span>
                </div>

                <Quote size={28} className="text-[#00F0FF]/20 mb-4" />

                <p className="text-slate-200 text-sm italic font-sans leading-relaxed mb-6 font-light">
                  "{review.quote}"
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold font-mono text-xs">
                    {review.name}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">
                    {review.location}
                  </span>
                </div>

                <p className="text-slate-400 text-[10px] font-sans">
                  {review.role}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00F0FF] pt-1">
                  <CheckCircle2 size={12} />
                  <span className="truncate">{review.verifiedHardware}</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
