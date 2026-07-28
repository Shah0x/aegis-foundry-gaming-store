import React from 'react';

interface ShahmeerBrandLogoProps {
  size?: number;
  className?: string;
}

export default function ShahmeerBrandLogo({ size = 28, className = "" }: ShahmeerBrandLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id="cyanGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#80EEFF" />
        </linearGradient>
        <linearGradient id="cyanGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#00A3FF" />
        </linearGradient>
        <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Left Angle Bracket '<' */}
      <path 
        d="M 33 28 L 13 50 L 33 72" 
        stroke="url(#cyanGradLeft)" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        filter="url(#glowEffect)"
      />
      {/* Center Forward Slash '/' */}
      <path 
        d="M 59 10 L 41 90" 
        stroke="#FFFFFF" 
        strokeWidth="7" 
        strokeLinecap="round" 
        filter="url(#glowEffect)"
      />
      {/* Right Angle Bracket '>' */}
      <path 
        d="M 67 28 L 87 50 L 67 72" 
        stroke="url(#cyanGradRight)" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        filter="url(#glowEffect)"
      />
    </svg>
  );
}
