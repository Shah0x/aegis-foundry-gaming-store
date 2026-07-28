import React from 'react';

export default function SkeletonProductCard() {
  return (
    <div className="glass-dark border border-white/5 rounded-lg p-8 h-[550px] flex flex-col justify-between overflow-hidden relative">
      <div className="absolute inset-0 shimmer pointer-events-none" />
      
      <div className="space-y-6">
        {/* Category & ID */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-white/10 w-20 rounded-lg" />
          <div className="h-4 bg-white/10 w-24 rounded-lg" />
        </div>
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-7 bg-white/10 w-3/4 rounded-lg" />
          <div className="h-7 bg-white/10 w-1/2 rounded-lg" />
        </div>

        {/* Image Frame */}
        <div className="h-48 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center">
          <div className="w-12 h-12 rounded-lg border-2 border-white/10 border-t-cyan-500 animate-spin" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Specs List */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 bg-white/10 w-16 rounded-lg" />
          <div className="h-6 bg-white/10 w-20 rounded-lg" />
          <div className="h-6 bg-white/10 w-14 rounded-lg" />
        </div>

        {/* Pricing & Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="h-8 bg-white/10 w-24 rounded-lg" />
          <div className="h-12 bg-white/10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
