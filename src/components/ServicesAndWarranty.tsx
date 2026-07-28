import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Truck, Award, Sparkles, Check, ArrowRight, Zap, Headphones, RefreshCw, Star } from 'lucide-react';

export default function ServicesAndWarranty() {
  const [activeTab, setActiveTab] = useState<'services' | 'tiers'>('services');

  const servicesList = [
    {
      id: 'express_delivery',
      icon: Truck,
      badge: 'PRIORITY LOGISTICS',
      title: 'EXPRESS 48-HOUR AIR COURIER',
      price: 'FREE ON ORDERS $500+',
      description: 'Custom anti-vibration crate packaging with real-time GPS telemetry tracking. Delivered directly to your door in 48 hours worldwide.',
      features: [
        'Custom foam-molded protective flight crates',
        'Real-time GPS tracking & temperature logs',
        'Fully insured against transport transit damage',
        'Delivered with signature required'
      ],
      highlight: '99.9% On-Time Delivery Rate'
    },
    {
      id: 'zero_tolerance_warranty',
      icon: ShieldCheck,
      badge: '3-YEAR COVERAGE',
      title: '3-YEAR ZERO-TOLERANCE WARRANTY',
      price: 'INCLUDED WITH ALL RIGS',
      description: 'Complete peace of mind. If any hardware component fails or degrades below factory spec, we ship a brand new replacement immediately.',
      features: [
        'Instant cross-shipment for zero downtime',
        'Zero deductibles or hidden diagnostic fees',
        'Covers GPU, CPU, AIO Liquid Coolers & RAM',
        'Direct technician chat for remote diagnostics'
      ],
      highlight: 'Instant Cross-Ship Replacement'
    },
    {
      id: 'custom_tuning',
      icon: Zap,
      badge: 'ARCHITECT SERVICE',
      title: 'WHITE-GLOVE TUNING & OVERCLOCKING',
      price: 'COMPLIMENTARY CONCIERGE',
      description: 'Every custom rig undergoes 72 hours of stress testing, custom BIOS memory timing optimization, and zero-throttling thermal verification.',
      features: [
        'XMP/EXPO Memory Profile Tuning',
        'Custom GPU Undervolting & Fan Curves',
        'Windows 11 Gaming OS De-bloating',
        'Pre-installed Drivers & Benchmark Validation'
      ],
      highlight: '72-Hour Thermal Stress Tested'
    }
  ];

  const membershipTiers = [
    {
      name: 'OPERATIVE TIER',
      tag: 'FREE FOR REGISTERED USERS',
      price: '$0 / year',
      color: 'border-slate-800 text-slate-300',
      badgeColor: 'bg-slate-800 text-slate-300',
      features: [
        'Access to standard inventory & sales',
        'Standard 1-Year Hardware Warranty',
        '48-Hour Email Tech Support Response',
        'Earn 1% Cashback in Store Credits'
      ]
    },
    {
      name: 'FOUNDER ELITE VIP',
      tag: 'RECOMMENDED FOR HARDWARE ENTHUSIASTS',
      price: '$199 / year',
      color: 'border-[#00F0FF] text-white shadow-[0_0_25px_rgba(0,240,255,0.15)]',
      badgeColor: 'bg-[#00F0FF] text-black font-bold',
      isPopular: true,
      features: [
        'Priority Access to RTX 5090 & Limited Restocks',
        '3-Year Zero-Tolerance Direct Hardware Warranty',
        '24/7 Priority Discord & Phone Architect Line',
        'Earn 5% Cashback in Store Credits',
        'Free Annual Liquid Thermal Maintenance'
      ]
    },
    {
      name: 'APEX ARCHITECT CLUB',
      tag: 'ULTIMATE CUSTOM HARDWARE CONCIERGE',
      price: '$499 / year',
      color: 'border-purple-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.15)]',
      badgeColor: 'bg-purple-500 text-white font-bold',
      features: [
        'Dedicated Senior Hardware Engineer Assigned',
        'White-Glove On-Site Setup & Cable Routing',
        'Lifetime Hardware Upgrade Trade-In Program',
        'Earn 10% Cashback in Store Credits',
        'Custom Laser Engraving on PC Chassis'
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#030303] border-b border-white/10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-r from-cyan-900/10 via-purple-900/10 to-amber-900/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-[10px] font-mono font-bold tracking-widest uppercase mb-3">
              <Award size={13} />
              <span>PREMIUM STORE SERVICES & PROTECTION</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight italic">
              SERVICES & <span className="text-[#00F0FF]">MEMBERSHIP PLANS</span>
            </h2>
            <p className="text-slate-300 text-sm font-sans mt-2 max-w-2xl font-light leading-relaxed">
              We stand behind every machine and accessory with white-glove logistics, zero-tolerance warranty replacement, and direct hardware architect access.
            </p>
          </div>

          {/* Toggle Button */}
          <div className="flex bg-[#080808] p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CORE SERVICES
            </button>
            <button
              onClick={() => setActiveTab('tiers')}
              className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === 'tiers'
                  ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              VIP MEMBERSHIPS
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'services' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesList.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="bg-[#080808] border border-white/10 hover:border-[#00F0FF]/40 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_0_30px_rgba(0,240,255,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-black border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                      <service.icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 uppercase tracking-wider">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white font-display uppercase tracking-tight italic mb-2 group-hover:text-[#00F0FF] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs font-mono font-bold text-[#00F0FF] uppercase tracking-wider mb-4">
                    {service.price}
                  </p>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10 mb-6">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                        <Check size={14} className="text-[#00F0FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Zap size={13} />
                    {service.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className={`bg-[#080808] border rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${tier.color}`}
              >
                {tier.isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-[#00F0FF] to-purple-500 text-black font-mono font-bold text-[9px] uppercase tracking-widest px-4 py-1 rounded-bl-xl">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <span className={`text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-3 ${tier.badgeColor}`}>
                      {tier.tag}
                    </span>
                    <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight italic">
                      {tier.name}
                    </h3>
                    <div className="mt-3 text-3xl font-black font-mono text-[#00F0FF]">
                      {tier.price}
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans">
                        <Check size={15} className="text-[#00F0FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const elem = document.getElementById('inventory');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    tier.isPopular 
                      ? 'bg-[#00F0FF] hover:bg-[#00F0FF]/90 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <span>JOIN {tier.name.split(' ')[0]}</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
