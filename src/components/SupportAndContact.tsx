import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Headphones, Mail, Phone, MessageSquare, ChevronDown, Send, CheckCircle2, ShieldAlert, Sparkles, Clock, Globe } from 'lucide-react';

export default function SupportAndContact() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Hardware Inquiry',
    message: ''
  });

  const faqs = [
    {
      q: "How fast will my custom PC or gaming setup ship?",
      a: "Standard hardware orders ship within 24 hours via Express 48-Hour Air Courier. Custom liquid-cooled builds undergo 72 hours of stress testing and ship in custom foam-molded protective crates within 3-5 business days with real-time GPS telemetry."
    },
    {
      q: "How does the 3-Year Zero-Tolerance Warranty work?",
      a: "If any component (GPU, CPU, RAM, liquid pump, or monitor) fails or shows performance degradation below factory spec, contact our architect team. We cross-ship a brand new replacement part or full unit immediately before you even send back the original item."
    },
    {
      q: "Are all systems fully tested, updated, and ready out of the box?",
      a: "Yes! Every Aegis system arrives plug-and-play ready with Windows 11 Pro activated, official NVIDIA/AMD drivers installed, memory XMP/EXPO profiles tuned, and zero bloatware."
    },
    {
      q: "Can I request custom modifications, specific graphics cards, or laser engraving?",
      a: "Absolutely. Our hardware architects specialize in custom dual-loop liquid cooling, custom cabling, laser engraving, and custom component pairing. Use the contact form below or join our Discord Concierge to speak directly with an architect."
    },
    {
      q: "What payment methods and financing options do you accept?",
      a: "We accept all major credit cards, Apple Pay, Google Pay, and Stripe Checkout powered by 256-bit SSL encryption. We also offer flexible split financing options at checkout."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: 'General Hardware Inquiry', message: '' });
    }, 4000);
  };

  return (
    <section id="support" className="py-24 bg-[#020202] border-b border-white/10 relative overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-[10px] font-mono font-bold tracking-widest uppercase mb-4">
            <Headphones size={14} />
            <span>EXPERT HELP & DIRECT HARDWARE CONCIERGE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight italic">
            SUPPORT & <span className="text-[#00F0FF]">CONTACT CENTER</span>
          </h2>
          <p className="text-slate-300 text-sm md:text-base font-sans mt-3 font-light leading-relaxed">
            Have questions about system specs, custom builds, or shipping? Our senior hardware architects are here to assist you 24/7.
          </p>
        </div>

        {/* Quick Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: MessageSquare,
              title: "DISCORD ARCHITECT CONCIERGE",
              subtitle: "Instant Live Technical Chat",
              detail: "24/7 Architect Line",
              badge: "LIVE CHAT"
            },
            {
              icon: Phone,
              title: "DIRECT PHONE HELPLINE",
              subtitle: "+1 (800) 555-AEGIS",
              detail: "Mon-Sat 9am - 9pm EST",
              badge: "TOLL-FREE"
            },
            {
              icon: Mail,
              title: "EMAIL SUPPORT DESK",
              subtitle: "support@aegisfoundry.com",
              detail: "< 2 Hour Response Time",
              badge: "EXPRESS RESPONSE"
            }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-[#080808] rounded-2xl border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-black border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] group-hover:scale-105 transition-transform">
                  <item.icon size={20} />
                </div>
                <span className="text-[9px] font-mono font-bold px-2.5 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20 uppercase">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-display uppercase italic tracking-tight mb-1">
                {item.title}
              </h3>
              <p className="text-xs font-mono font-bold text-[#00F0FF] mb-1">
                {item.subtitle}
              </p>
              <p className="text-[11px] text-slate-400 font-sans">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start" id="contact">
          
          {/* FAQ Accordion (Left) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-6">
              <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight italic flex items-center gap-2">
                <Clock size={20} className="text-[#00F0FF]" />
                FREQUENTLY ASKED QUESTIONS
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Everything you need to know about purchasing, warranties, and delivery.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className="bg-[#080808] border border-white/10 rounded-xl overflow-hidden transition-colors hover:border-white/20"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-mono text-xs font-bold text-white hover:text-[#00F0FF] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-[#00F0FF]">0{index + 1}.</span>
                        {faq.q}
                      </span>
                      <ChevronDown 
                        size={16} 
                        className={`text-[#00F0FF] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-xs text-slate-300 font-sans leading-relaxed border-t border-white/5 font-light">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Direct Form (Right) */}
          <div className="lg:col-span-5 bg-[#080808] border border-white/10 rounded-2xl p-8 shadow-2xl relative">
            <div className="mb-6">
              <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight italic flex items-center gap-2">
                <Send size={20} className="text-[#00F0FF]" />
                DIRECT ARCHITECT CONTACT
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Send a direct message to our senior hardware engineers.
              </p>
            </div>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <CheckCircle2 size={48} className="text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-white font-display uppercase tracking-tight italic">
                  MESSAGE TRANSMITTED
                </h4>
                <p className="text-xs text-slate-300 font-sans max-w-xs mx-auto leading-relaxed">
                  Thank you! Our senior hardware architect will respond to your email within 60 minutes.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1 text-[10px]">
                    YOUR FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black border border-white/10 hover:border-[#00F0FF]/50 focus:border-[#00F0FF] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1 text-[10px]">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black border border-white/10 hover:border-[#00F0FF]/50 focus:border-[#00F0FF] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1 text-[10px]">
                    INQUIRY TYPE
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-black border border-white/10 hover:border-[#00F0FF]/50 focus:border-[#00F0FF] rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
                  >
                    <option value="General Hardware Inquiry">General Hardware Inquiry</option>
                    <option value="Custom PC Build Advice">Custom PC Build Advice</option>
                    <option value="Order Tracking & Shipping">Order Tracking & Shipping</option>
                    <option value="Warranty & Technical Support">Warranty & Technical Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold uppercase tracking-wider mb-1 text-[10px]">
                    YOUR MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your setup goals or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black border border-white/10 hover:border-[#00F0FF]/50 focus:border-[#00F0FF] rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#00F0FF] hover:bg-[#00F0FF]/90 text-black font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all cursor-pointer"
                >
                  <Send size={15} />
                  <span>TRANSMIT MESSAGE TO CONCIERGE</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
