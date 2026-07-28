import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ShieldCheck, Zap, CreditCard, Banknote, Gift, Wrench } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, toggleCart, removeFromCart, updateQuantity } from '../store/index.ts';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import axios from 'axios';

let stripePromise: Promise<Stripe | null> | null = null;
const getStripe = () => {
  const key = (import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY;
  if (!stripePromise && key) {
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export default function CheckoutAndLogisticsEngine() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'cod'>('stripe');
  const [whiteGlove, setWhiteGlove] = useState(false);
  
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const whiteGloveFee = whiteGlove ? 299 : 0;
  const total = Math.max(0, subtotal - discount) + whiteGloveFee;

  const isEligibleForGoldenTicket = total >= 2500;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'ELITE2028') {
      setDiscount(subtotal * 0.20); // 20% VIP discount
    } else if (couponCode.toUpperCase() === 'SUPREMACY') {
      setDiscount(1000); // $1000 flat off
    } else {
      setDiscount(0);
      alert('Invalid or expired access code.');
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    if (paymentMethod === 'cod') {
      alert(`Secure Regional COD Initiated for $${total.toLocaleString()}. Dispatch manifest generated.`);
      return;
    }

    try {
      const { data } = await axios.post('/api/orders/checkout', {
        items: items.map(item => ({ id: item.id, quantity: item.quantity })),
        customerEmail: 'elite@aegisfoundry.com',
        customerName: 'Syndicate VIP',
      });
      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch (error) {
      console.error("Payment failed", error);
      alert("Encryption handshake failed. Please verify neural link.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleCart())}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg sm:max-w-md md:max-w-lg bg-[#050505] z-[120] shadow-[-20px_0_50px_rgba(0,0,0,0.9)] border-l border-white/10 flex flex-col font-sans overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#080808] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF]">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white font-display tracking-wider uppercase italic leading-none">SECURED CART & LOGISTICS</h2>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{items.length} HARDWARE ITEMS SELECTED</p>
                </div>
              </div>
              <button 
                onClick={() => dispatch(toggleCart())}
                className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-600">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="text-xs font-mono font-bold tracking-widest uppercase text-slate-400">YOUR CART IS EMPTY</p>
                  <p className="text-xs text-slate-500 font-sans text-center max-w-xs">Explore our hardware catalog to add gaming rigs, displays, or optical peripherals.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-white/10 group hover:border-[#00F0FF]/40 transition-colors">
                    <div className="w-16 h-16 bg-black rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-white font-bold text-xs line-clamp-1 font-display tracking-tight uppercase italic">{item.title}</h4>
                        <span className="text-[#00F0FF] font-mono text-xs font-bold shrink-0">${item.price.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 pt-1">
                        <div className="flex items-center border border-white/15 rounded-lg overflow-hidden bg-black/60">
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                            className="px-2 py-0.5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold text-white min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="px-2 py-0.5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Engine Footer */}
            {items.length > 0 && (
              <div className="p-5 bg-[#080808] border-t border-white/10 space-y-4 shrink-0 overflow-y-auto max-h-[55vh] custom-scrollbar shadow-[0_-10px_30px_rgba(0,0,0,0.8)] z-10 relative">
                
                {/* Golden Ticket Notice */}
                {isEligibleForGoldenTicket && (
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/40 rounded-xl p-3">
                    <Gift size={18} className="text-[#D4AF37] shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-mono">Golden Ticket Bonus</p>
                      <p className="text-[10px] text-[#D4AF37]/80 font-sans">Qualified for the PS5 Pro Vault Edition quarterly drawing.</p>
                    </div>
                  </div>
                )}

                {/* White Glove Service */}
                <div 
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${whiteGlove ? 'bg-[#00F0FF]/10 border-[#00F0FF]/50' : 'bg-black/50 border-white/10 hover:border-white/20'}`}
                  onClick={() => setWhiteGlove(!whiteGlove)}
                >
                  <div className="flex items-center gap-3">
                    <Wrench size={16} className={whiteGlove ? "text-[#00F0FF]" : "text-slate-500"} />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">White-Glove Setup</span>
                      <span className="text-[10px] text-slate-400 font-sans">Professional assembly & cable management.</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00F0FF]">+ $299</span>
                </div>

                {/* Coupon Engine */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="VIP ACCESS CODE"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-black border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-[#00F0FF]/50 uppercase tracking-widest"
                  />
                  <button 
                    onClick={applyCoupon}
                    className="bg-white/10 border border-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {/* Subtotals */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-mono tracking-wider">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toLocaleString()}</span>
                  </div>
                  {whiteGlove && (
                    <div className="flex justify-between items-center text-slate-400 text-xs font-mono tracking-wider">
                      <span>Setup Fee</span>
                      <span className="text-white">${whiteGloveFee.toLocaleString()}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-[#00F0FF] text-xs font-mono tracking-wider">
                      <span>VIP Discount</span>
                      <span>-${discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-slate-400 text-xs font-mono tracking-wider">
                    <span>Global Express Delivery</span>
                    <span className="text-[#00F0FF]">FREE</span>
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full" />

                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">Total Price</span>
                  <span className="text-2xl font-black text-[#00F0FF] font-mono tracking-tighter leading-none">${total.toLocaleString()}</span>
                </div>

                {/* Payment Gateway Toggle */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button 
                    onClick={() => setPaymentMethod('stripe')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[10px] font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer ${paymentMethod === 'stripe' ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF]' : 'bg-black/60 border-white/10 text-slate-400 hover:text-white'}`}
                  >
                    <CreditCard size={14} />
                    STRIPE CARD
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[10px] font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer ${paymentMethod === 'cod' ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF]' : 'bg-black/60 border-white/10 text-slate-400 hover:text-white'}`}
                  >
                    <Banknote size={14} />
                    PAY ON DELIVERY
                  </button>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#00F0FF] hover:bg-[#00F0FF]/90 text-black font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                >
                  <Zap size={16} className="fill-black" />
                  <span>PROCEED TO CHECKOUT</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
