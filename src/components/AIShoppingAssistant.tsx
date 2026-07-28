import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, MessageSquare, Terminal, Zap, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIShoppingAssistantProps {
  products: any[];
}

export default function AIShoppingAssistant({ products }: AIShoppingAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: "Welcome to Aegis Foundry! How can I help you choose the right gaming PC, monitor, or hardware setup today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages
        })
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      const assistantReply = data.text || "How can I help you choose the right hardware setup today?";
      
      setMessages(prev => [...prev, { role: 'assistant', content: assistantReply }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I am ready to help you browse our gaming PCs, 240Hz OLED monitors, or custom mechanical keyboards! What specs are you looking for?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Anchored bottom-right with Pulse */}
      <div className="fixed bottom-10 right-10 z-[100]">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0px rgba(0, 247, 255, 0)",
              "0 0 30px rgba(0, 247, 255, 0.4)",
              "0 0 0px rgba(0, 247, 255, 0)"
            ]
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="rounded-lg"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center text-black border-2 border-cyan-400/50 relative overflow-hidden group shadow-[0_0_15px_rgba(0,247,255,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
            {isOpen ? <X size={28} /> : (
              <div className="relative">
                <MessageSquare size={28} />
                <motion.div 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles size={14} className="text-black" />
                </motion.div>
              </div>
            )}
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, x: 50 }}
            className="fixed bottom-32 right-10 w-full max-w-[400px] h-[600px] bg-[#020202]/95 z-[101] rounded-lg overflow-hidden border border-cyan-500/30 shadow-[0_0_60px_rgba(0,247,255,0.1)] flex flex-col backdrop-blur-3xl font-sans"
          >
            {/* Header */}
            <div className="p-6 border-b border-cyan-500/20 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center text-black shadow-[0_0_15px_rgba(0,247,255,0.3)]">
                  <Bot size={28} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white tracking-[0.1em] uppercase">HARDWARE ASSISTANT</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,247,255,1)]" />
                    <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-wider">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-cyan-700 hover:text-cyan-400 transition-colors p-2 hover:bg-cyan-500/10 rounded-lg border border-transparent hover:border-cyan-500/30"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] p-4 rounded-lg text-[11px] leading-relaxed font-medium ${
                    msg.role === 'user' 
                      ? 'bg-cyan-500 text-black rounded-tr-none shadow-[0_4px_15px_rgba(0,247,255,0.2)] font-sans' 
                      : 'bg-[#0a0a0a] border border-cyan-500/20 text-slate-200 rounded-tl-none font-sans relative overflow-hidden'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1.5 text-[9px] text-cyan-400 mb-1.5 font-mono font-semibold uppercase tracking-wider">
                        <span>Aegis Hardware Assistant</span>
                      </div>
                    )}
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#0a0a0a] border border-cyan-500/20 p-4 rounded-lg rounded-tl-none">
                    <div className="flex gap-2">
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-cyan-500/20 bg-[#020202]">
              <div className="relative">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about PCs, monitors, or keyboards..."
                  className="w-full bg-[#050505] border border-cyan-500/20 rounded-lg pl-6 pr-14 py-4 text-white text-[12px] font-sans outline-none focus:border-cyan-500 transition-all shadow-inner tracking-wide placeholder:text-slate-500"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500 hover:text-cyan-300 transition-all hover:scale-110"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between opacity-30">
                <div className="flex items-center gap-2"> 
                  <Terminal size={12} className="text-white" /> 
                  <span className="text-[9px] text-white font-mono font-black uppercase tracking-[0.2em]">AEGIS_FOUNDRY_CORE</span>
                </div>
                <Zap size={12} className="text-cyan-500 fill-cyan-500" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
