import React from 'react';
import { motion } from 'motion/react';

interface BrandLogo {
  name: string;
  brandColor: string;
  glowColor: string;
  svg: React.ReactNode;
}

export default function BrandEcosystemTicker() {
  const brandLogos: BrandLogo[] = [
    {
      name: "NVIDIA",
      brandColor: "#76B900",
      glowColor: "rgba(118, 185, 0, 0.35)",
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 100 100" fill="currentColor">
          <path d="M78 30.5c-7.2-6.5-18.4-10.5-31-10.5-23.2 0-42 15.2-42 34 0 18.8 18.8 34 42 34 16.5 0 30.8-7.8 37.2-19.2h-11c-5.2 6.8-15.2 11.2-26.2 11.2-17.5 0-31.5-11.2-31.5-26 0-14.8 14-26 31.5-26 10 0 19 3.8 24.2 9.5h10.8z"/>
          <path d="M78 40.5c-4.5-4.2-11.8-6.5-19.8-6.5-14.5 0-26.2 9.5-26.2 21.2 0 11.8 11.8 21.2 26.2 21.2 9.2 0 17.2-3.8 21.8-9.8H68.5c-3.5 3.5-9.8 5.8-16.2 5.8-10.2 0-18.5-7-18.5-16s8.2-16 18.5-16c6.2 0 12.2 2.2 15.8 5.8H78z"/>
          <path d="M68 47.5c-2.2-2-5.8-3.2-9.8-3.2-6.8 0-12.2 4.2-12.2 9.8 0 5.5 5.5 9.8 12.2 9.8 4 0 7.5-1.2 9.8-3.2v-13.2z"/>
        </svg>
      )
    },
    {
      name: "AMD",
      brandColor: "#ED1C24",
      glowColor: "rgba(237, 28, 36, 0.35)",
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 100 100" fill="currentColor">
          <path d="M15 15h32v32H15V15zm38 0h32v32H53V15zm-38 38h32v32H15V53zm38 0h32v32H53V53z"/>
          <path d="M53 15l32 32H53V15zM15 53l32 32V53H15z" opacity="0.3"/>
        </svg>
      )
    },
    {
      name: "INTEL",
      brandColor: "#00C7FF",
      glowColor: "rgba(0, 199, 255, 0.35)",
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 12C29 12 12 29 12 50s17 38 38 38 38-17 38-38S71 12 50 12zm0 68c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z"/>
          <circle cx="50" cy="50" r="14"/>
        </svg>
      )
    },
    {
      name: "ASUS ROG",
      brandColor: "#FF0033",
      glowColor: "rgba(255, 0, 51, 0.35)",
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 100 100" fill="currentColor">
          <path d="M92 20L8 42l36 18 18 36L92 20zM32 46l44-14-28 28-16-14z"/>
        </svg>
      )
    },
    {
      name: "ALIENWARE",
      brandColor: "#00F0FF",
      glowColor: "rgba(0, 240, 255, 0.35)",
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10C30 10 14 28 14 50c0 21 12 33 36 40 24-7 36-19 36-40 0-22-16-40-36-40zm-10 38c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm20 0c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
        </svg>
      )
    },
    {
      name: "LOGITECH G",
      brandColor: "#00A8E8",
      glowColor: "rgba(0, 168, 232, 0.35)",
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 12c-21 0-38 17-38 38s17 38 38 38c18 0 33-12.5 37-29H68v-11h19.5c.3 1.3.5 2.7.5 4 0 21-17 38-38 38-21 0-38-17-38-38s17-38 38-38c10.5 0 20 4.2 26.8 11L67 34C62.5 29.5 56.5 27 50 27c-12.7 0-23 10.3-23 23s10.3 23 23 23c9.5 0 17.5-5.8 21-14H50V48h37.8z"/>
        </svg>
      )
    },
    {
      name: "CORSAIR",
      brandColor: "#FFC700",
      glowColor: "rgba(255, 199, 0, 0.35)",
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 12L15 85h70L50 12zm0 20l22 45H28l22-45z"/>
        </svg>
      )
    },
    {
      name: "RAZER",
      brandColor: "#00FF00",
      glowColor: "rgba(0, 255, 0, 0.35)",
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 12L12 33.8v32.4L50 88l38-21.8V33.8L50 12zm0 12.8l25 14.3v28.8L50 82.2 25 67.9V39.1L50 24.8z"/>
          <path d="M50 38l12 7v14l-12 7-12-7V45l12-7z"/>
        </svg>
      )
    },
    {
      name: "STEELSERIES",
      brandColor: "#FF5200",
      glowColor: "rgba(255, 82, 0, 0.35)",
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="12" fill="none"/>
          <circle cx="50" cy="50" r="14"/>
        </svg>
      )
    },
    {
      name: "MSI",
      brandColor: "#FF0000",
      glowColor: "rgba(255, 0, 0, 0.35)",
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 100 100" fill="currentColor">
          <path d="M20 20h15l15 35 15-35h15v60H65V42L52 70H48L35 42v38H20V20z"/>
        </svg>
      )
    },
    {
      name: "SAMSUNG",
      brandColor: "#00C7FF",
      glowColor: "rgba(0, 199, 255, 0.4)",
      svg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="50" rx="42" ry="22" stroke="currentColor" strokeWidth="8" fill="none"/>
          <circle cx="50" cy="50" r="8"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-8 bg-[#030303] border-b border-white/10 overflow-hidden flex flex-col items-center">
      <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.25em] mb-6">
        OFFICIAL BRAND PARTNERS
      </p>

      <div className="relative w-full max-w-[1600px] mx-auto flex overflow-hidden py-2">
        {/* Left & Right Smooth Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#030303] via-[#030303]/80 to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: [0, -1600] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex items-center gap-10 sm:gap-14 whitespace-nowrap px-4"
        >
          {[...brandLogos, ...brandLogos, ...brandLogos, ...brandLogos].map((brand, i) => (
            <div 
              key={i} 
              title={brand.name}
              className="flex items-center gap-3 px-4 py-2.5 bg-[#080808] border border-white/10 hover:border-white/30 rounded-xl transition-all duration-300 cursor-pointer group shrink-0"
              style={{
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
              }}
            >
              <div 
                className="transition-all duration-300 transform group-hover:scale-110 opacity-80 group-hover:opacity-100"
                style={{ 
                  color: brand.brandColor,
                }}
              >
                {brand.svg}
              </div>
              <span 
                className="text-xs sm:text-sm font-black font-mono tracking-widest uppercase text-slate-200 group-hover:text-white transition-colors"
                style={{ color: brand.brandColor }}
              >
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}



