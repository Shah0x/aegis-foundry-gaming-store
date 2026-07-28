import React, { memo, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, TrendingUp, Cpu, Hash, Layers } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/index.ts';

const DEFAULT_HARDWARE_IMAGES: Record<string, string> = {
  'Graphics Cards': 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=1000',
  'Keyboards': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=1000',
  'Monitors': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000',
  'Mice': 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=1000',
  'Processors': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000',
  'Cases': 'https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000',
  'Audio': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
  'Memory': 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=1000',
  'Peripherals': 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1000',
  'Cooling': 'https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000',
  'Power Supplies': 'https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000',
  'Storage': 'https://images.unsplash.com/photo-1597872200370-499df51441a4?auto=format&fit=crop&q=80&w=1000',
};

interface ProductCardProps {
  key?: React.Key;
  product: {
    _id: string;
    title: string;
    description: string;
    price: number;
    stockCount: number;
    category: string;
    imageUrl: string;
    featured?: boolean;
    assetId?: string;
    specifications?: string[];
  };
}

const ProductCard = memo(({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const isLowStock = product.stockCount < 5;
  const [imgSrc, setImgSrc] = useState<string>(product.imageUrl);

  useEffect(() => {
    setImgSrc(product.imageUrl);
  }, [product.imageUrl]);

  const handleImgError = () => {
    const fallback = DEFAULT_HARDWARE_IMAGES[product.category] || 'https://images.unsplash.com/photo-1587202372775-e0ca626245d6?auto=format&fit=crop&q=80&w=1000';
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      imageUrl: imgSrc,
      quantity: 1,
      stockCount: product.stockCount
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="group relative glass-dark rounded-lg overflow-hidden border border-white/10 transition-all duration-200 hover:border-cyan-500/40 flex flex-col h-full hover:shadow-[0_0_25px_rgba(0,247,255,0.15)]"
    >
      <div className="relative h-60 overflow-hidden bg-slate-950">
        <img 
          src={imgSrc || DEFAULT_HARDWARE_IMAGES[product.category]} 
          alt={product.title} 
          loading="lazy"
          onError={handleImgError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 saturate-[0.85] group-hover:saturate-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
        
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {product.featured && (
            <div className="bg-cyan-500 text-black px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,247,255,0.4)]">
              <TrendingUp size={12} className="fill-black" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">FEATURED</span>
            </div>
          )}
          {product.assetId && (
            <div className="bg-slate-950/80 backdrop-blur-md text-cyan-400 px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-cyan-500/20">
              <Hash size={12} />
              <span className="text-[10px] font-mono font-bold">{product.assetId}</span>
            </div>
          )}
        </div>

        {isLowStock && (
          <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-red-500/30">
            <Zap size={12} className="text-white fill-white animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">LOW STOCK</span>
          </div>
        )}
      </div>

      <div className="p-6 relative flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">{product.category}</span>
          <span className="text-xl font-bold text-cyan-400 font-mono tracking-tight">${product.price.toLocaleString()}</span>
        </div>
        
        <h3 className="text-xl font-bold text-white font-display mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors tracking-tight uppercase italic leading-snug">
          {product.title}
        </h3>
        
        <p className="text-xs text-slate-400 mb-4 line-clamp-2 min-h-[32px] font-normal leading-relaxed">
          {product.description}
        </p>

        {/* Specifications List */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="mb-6 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              <Layers size={10} />
              <span>KEY FEATURES</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {product.specifications.slice(0, 4).map((spec, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 px-2 py-1 rounded-lg text-[9px] font-mono text-slate-300 flex items-center gap-1.5 truncate">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full flex-shrink-0" />
                  <span className="truncate">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-mono text-xs tracking-wider uppercase disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed cursor-pointer"
            disabled={product.stockCount === 0}
          >
            {product.stockCount === 0 ? (
              <span>OUT OF STOCK</span>
            ) : (
              <>
                <Cpu size={16} />
                <span>ADD TO CART</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
