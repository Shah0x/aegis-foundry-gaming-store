import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu } from 'lucide-react';
import ProductCard from './ProductCard';

interface ExtendedProductMatrixProps {
  products: any[];
}

export default function ExtendedProductMatrix({ products }: ExtendedProductMatrixProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="matrix" className="py-24 bg-[#050505] border-b border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#00F0FF] mb-2 font-mono text-xs font-bold tracking-widest uppercase">
              <Cpu size={14} />
              <span>NEW ARRIVALS & TRENDING PRODUCTS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight italic">
              FEATURED <span className="text-[#00F0FF]">COLLECTION</span>
            </h2>
            <p className="text-slate-300 text-sm max-w-xl font-sans mt-2 font-light">
              Explore our latest high-performance arrivals, trending gaming gear, and essential workstation upgrades.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="animate-pulse bg-[#0a0a0a] rounded-xl h-96 border border-white/5"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.slice(0, 8).map((product, idx) => (
              <motion.div
                key={product._id || idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
