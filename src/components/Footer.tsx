import React, { useState } from 'react';
import { Shield, Globe, Terminal, ArrowUpRight, Lock, Target, Sparkles, Check } from 'lucide-react';
import ShahmeerBrandLogo from './ShahmeerBrandLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [currency, setCurrency] = useState('USD ($)');

  return (
    <footer className="bg-[#020202] border-t border-white/10 pt-24 pb-12 px-6 md:px-12 relative overflow-hidden font-sans">
      
      {/* Top Subtle Cyber Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-6">
            <div 
              className="flex items-center gap-3 group cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-10 h-10 bg-black border border-[#00F0FF]/40 rounded-xl flex items-center justify-center text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-transform duration-300 group-hover:scale-105">
                <ShahmeerBrandLogo size={26} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white font-display tracking-tighter uppercase italic leading-none">
                  AEGIS <span className="text-[#00F0FF]">FOUNDRY</span>
                </span>
                <span className="text-[9px] font-mono font-bold text-slate-400 tracking-widest uppercase">
                  THE HARDWARE BEHIND THE EXPERIENCE
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-sans font-light">
              We curate high-performance hardware for gamers, creators, and professionals. Explore custom liquid-cooled PCs, high-refresh displays, mechanical keyboards, and precision audio gear.
            </p>

            {/* Region & Currency Selector */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Globe size={12} className="text-[#00F0FF]" />
                GLOBAL REGION:
              </span>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-black border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-[#00F0FF] cursor-pointer"
              >
                <option value="USD ($)">GLOBAL (USD $)</option>
                <option value="EUR (€)">EUROPE (EUR €)</option>
                <option value="GBP (£)">UNITED KINGDOM (GBP £)</option>
                <option value="JPY (¥)">JAPAN (JPY ¥)</option>
                <option value="CAD ($)">CANADA (CAD $)</option>
              </select>
            </div>
          </div>

          {/* Column 1: Hardware Ecosystem */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Terminal size={14} className="text-[#00F0FF]" /> HARDWARE ECOSYSTEM
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li>
                <a href="#inventory" className="hover:text-[#00F0FF] transition-colors">Workstation Rigs</a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-[#00F0FF] transition-colors">Quantum OLED Displays</a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-[#00F0FF] transition-colors">Optical Peripherals</a>
              </li>
              <li>
                <a href="#inventory" className="hover:text-[#00F0FF] transition-colors">Planar Magnetic Audio</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Curated Experiences */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} className="text-[#00F0FF]" /> CURATED SETUPS
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li>
                <a href="#setups" className="hover:text-[#00F0FF] transition-colors">The Competitive Setup</a>
              </li>
              <li>
                <a href="#setups" className="hover:text-[#00F0FF] transition-colors">The Immersive Setup</a>
              </li>
              <li>
                <a href="#setups" className="hover:text-[#00F0FF] transition-colors">The Creator Setup</a>
              </li>
              <li>
                <a href="#setups" className="hover:text-[#00F0FF] transition-colors">The Command Center</a>
              </li>
              <li>
                <a href="#setups" className="hover:text-[#00F0FF] transition-colors">The Ultimate Build</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Concierge */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Shield size={14} className="text-[#00F0FF]" /> TRUST & CONCIERGE
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li>
                <a href="#philosophy" className="hover:text-[#00F0FF] transition-colors">Unthrottled Performance Focus</a>
              </li>
              <li>
                <a href="#signal" className="hover:text-[#00F0FF] transition-colors">Foundry Signal Journal</a>
              </li>
              <li>
                <span className="text-slate-400">48-Hour Air Courier Priority</span>
              </li>
              <li>
                <span className="text-slate-400">White-Glove Installation SLA</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Signature */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <p className="font-mono tracking-widest uppercase text-[11px] text-[#00F0FF] font-bold">
              Crafted by Shahmeer Akram &bull; Owner: Shahmeer Akram
            </p>
            <span className="hidden sm:inline text-white/20">•</span>
            <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
              &copy; {currentYear} Aegis Foundry Inc. All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 font-bold">
            <Lock size={12} />
            <span>256-BIT ENCRYPTED STRIPE CHECKOUT VERIFIED</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
