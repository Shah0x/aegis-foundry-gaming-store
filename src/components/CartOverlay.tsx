import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, toggleCart, removeFromCart, updateQuantity } from '../store/index.ts';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe((import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export default function CartOverlay() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post('/api/orders/checkout', {
        items: items.map(item => ({ id: item.id, quantity: item.quantity })),
        customerEmail: 'client@aegisfoundry.com',
        customerName: 'Aegis Client',
      });

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      const stripe = await stripePromise;
      if (stripe && data.id) {
        const result = await (stripe as any).redirectToCheckout({
          sessionId: data.id,
        });

        if (result.error) {
          alert(result.error.message);
        }
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.response?.data?.error || 'Checkout failed. Make sure STRIPE_SECRET_KEY is configured.');
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#020617] z-[101] shadow-2xl border-l border-white/10 flex flex-col font-sans"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="text-cyan-400" size={20} />
                <h2 className="text-lg font-bold text-white font-display tracking-tight uppercase italic">ENCRYPTED MANIFEST</h2>
              </div>
              <button 
                onClick={() => dispatch(toggleCart())}
                className="p-1.5 hover:bg-white/10 rounded-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="text-sm font-mono font-medium">Cart manifest is currently empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-slate-900/40 rounded-sm border border-white/5">
                    <div className="w-16 h-16 rounded-sm overflow-hidden glass border border-white/10 flex-shrink-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-sm line-clamp-1">{item.title}</h4>
                      <p className="text-cyan-400 font-mono text-xs font-bold mt-0.5">${item.price.toLocaleString()}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-white/10 rounded-sm overflow-hidden bg-slate-950">
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                            className="px-2 py-0.5 hover:bg-white/10 text-slate-400 text-xs font-mono"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-mono font-bold text-white">{item.quantity}</span>
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                            className="px-2 py-0.5 hover:bg-white/10 text-slate-400 text-xs font-mono"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-slate-950 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center text-slate-400 text-xs font-mono">
                  <span>Subtotal</span>
                  <span className="text-white font-bold font-mono">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 text-xs font-mono">
                  <span>Encrypted Protocol Tax</span>
                  <span className="text-white font-mono">$0.00</span>
                </div>
                <div className="h-px bg-white/10 my-1" />
                <div className="flex justify-between items-center text-lg font-bold text-white uppercase tracking-tight font-display">
                  <span>Total</span>
                  <span className="text-cyan-400 font-mono">${total.toLocaleString()}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3.5 rounded-sm transition-all flex items-center justify-center gap-2 font-mono text-xs tracking-wider uppercase cursor-pointer"
                >
                  <span>INITIATE STRIPE CHECKOUT</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
