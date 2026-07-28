import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, ChevronRight, ChevronDown, Terminal, Shield, Info, HelpCircle, Headphones, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, toggleCart } from '../store/index';
import { motion, AnimatePresence } from 'motion/react';
import ShahmeerBrandLogo from './ShahmeerBrandLogo';

interface NavbarProps {
  onAdminToggle: () => void;
  isAdminView: boolean;
}

export default function Navbar({ onAdminToggle, isAdminView }: NavbarProps) {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const primaryNavLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Store', href: '#inventory' },
    { name: 'Deals', href: '#setups' },
  ];

  const secondaryNavLinks = [
    { name: 'Services & Warranty', href: '#services', icon: Shield, desc: 'Coverage & express courier' },
    { name: 'About Us', href: '#about', icon: Info, desc: 'Brand story & standards' },
    { name: 'Support & FAQ', href: '#support', icon: HelpCircle, desc: 'Setup help & questions' },
    { name: 'Contact', href: '#contact', icon: Headphones, desc: '24/7 Priority assistance' },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/10 h-20 flex items-center justify-between px-6 md:px-12 bg-[#020202]/90 backdrop-blur-xl font-sans">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 group cursor-pointer" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 bg-black border border-[#00F0FF]/40 rounded-xl flex items-center justify-center text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-transform duration-300 group-hover:scale-105">
            <ShahmeerBrandLogo size={26} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-white font-display tracking-tighter uppercase italic group-hover:text-[#00F0FF] transition-colors leading-none">
              AEGIS <span className="text-[#00F0FF]">FOUNDRY</span>
            </span>
            <span className="text-[8px] font-mono font-bold text-slate-400 tracking-widest uppercase">
              GAMING HARDWARE ECOSYSTEM
            </span>
          </div>
        </div>

        {/* Desktop Nav Links - Streamlined to Main Options + Dropdown */}
        <div className="hidden lg:flex items-center gap-8">
          {primaryNavLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-sans font-bold text-slate-300 hover:text-[#00F0FF] tracking-wider transition-colors uppercase relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-[#00F0FF] group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* Categorized Dropdown for Secondary Options */}
          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-xs font-sans font-bold text-slate-300 hover:text-[#00F0FF] tracking-wider transition-colors uppercase flex items-center gap-1.5 cursor-pointer py-2 group"
            >
              <span>Explore</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#00F0FF]' : 'text-slate-400 group-hover:text-[#00F0FF]'}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-64 bg-[#0a0a0f] border border-white/15 rounded-2xl p-2.5 shadow-2xl backdrop-blur-2xl z-50 mt-1"
                >
                  <div className="space-y-1">
                    {secondaryNavLinks.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group"
                        >
                          <div className="p-2 rounded-lg bg-black border border-white/10 text-slate-400 group-hover:text-[#00F0FF] group-hover:border-[#00F0FF]/30 transition-colors">
                            <IconComponent size={16} />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-sans mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          
          {/* Admin Mode Toggle */}
          <button 
            onClick={onAdminToggle}
            className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-200 border cursor-pointer ${
              isAdminView 
                ? 'bg-[#00F0FF] border-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]' 
                : 'bg-black/60 border-white/10 text-slate-300 hover:text-white hover:border-white/30'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isAdminView ? 'bg-black animate-pulse' : 'bg-[#00F0FF]'}`} />
            <span>{isAdminView ? 'EXIT ADMIN' : 'ADMIN PANEL'}</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button 
            onClick={() => dispatch(toggleCart())}
            className="relative text-white hover:text-[#00F0FF] transition-all h-10 w-10 flex items-center justify-center bg-black/80 rounded-xl border border-white/10 hover:border-[#00F0FF]/50 group cursor-pointer"
          >
            <ShoppingCart size={18} className="group-hover:scale-105 transition-transform" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  key={cartCount}
                  className="absolute -top-1.5 -right-1.5 bg-[#00F0FF] text-black text-[10px] font-mono font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(0,240,255,0.6)]"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center bg-black/80 rounded-xl border border-white/10 text-slate-300"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] bg-[#020202]/95 backdrop-blur-2xl flex flex-col pt-28 px-8 lg:hidden font-sans overflow-y-auto pb-12"
          >
            <div className="flex flex-col gap-5">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2">
                MAIN NAVIGATION
              </div>
              {primaryNavLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.2 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-bold text-white hover:text-[#00F0FF] font-display transition-colors uppercase italic tracking-tight flex items-center justify-between border-b border-white/5 pb-3"
                >
                  {link.name}
                  <ChevronRight size={18} className="text-[#00F0FF]" />
                </motion.a>
              ))}

              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-white/10 pb-2 mt-2">
                MORE OPTIONS
              </div>
              {secondaryNavLinks.map((link, idx) => {
                const IconComp = link.icon;
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (primaryNavLinks.length + idx) * 0.04, duration: 0.2 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base font-bold text-slate-300 hover:text-[#00F0FF] transition-colors border-b border-white/5 pb-3"
                  >
                    <div className="flex items-center gap-3">
                      <IconComp size={18} className="text-[#00F0FF]" />
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-500" />
                  </motion.a>
                );
              })}
              
              <button 
                onClick={() => { onAdminToggle(); setIsMobileMenuOpen(false); }}
                className="mt-4 w-full py-3.5 rounded-xl bg-[#00F0FF] text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              >
                <Terminal size={16} />
                <span>{isAdminView ? 'EXIT ADMIN' : 'ADMIN PANEL'}</span>
              </button>
            </div>

            <div className="mt-8 text-center text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest border-t border-white/5 pt-6">
              AEGIS FOUNDRY // THE HARDWARE BEHIND THE EXPERIENCE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

