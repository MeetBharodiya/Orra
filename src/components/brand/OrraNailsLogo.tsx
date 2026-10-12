'use client';
// ─── ORRA NAILS — Logo SVG Component ─────────────────────────────────────────
// Recreates the brand logo:
// - "ORRA" in elegant high-contrast serif with sage botanical sprig + gold berries inside the O
// - "nails" in lowercase with wide letter-spacing between two gold hairlines

import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light'; // dark = espresso on linen, light = parchment on espresso
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function OrraNailsLogo({ variant = 'dark', size = 'md', className = '' }: LogoProps) {
  const textColour = variant === 'light' ? '#FBF7F1' : '#2B1B13';
  const goldColour = '#B98A4E';
  const sageColour = '#8A9A7B';

  const scales = { sm: 0.6, md: 1, lg: 1.5 };
  const scale = scales[size];
  const W = 160 * scale;
  const H = 72 * scale;

  return (
    <svg
      width={W}
      height={H}
      viewBox="0 0 160 72"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ORRA Nails — Crafted with Intention"
      role="img"
    >
      <title>ORRA Nails</title>
      <desc>ORRA Nails logo — handmade press-on nails crafted with intention</desc>

      {/* "ORRA" in Cormorant Garamond-style serif */}
      {/* O with botanical decoration */}
      <text
        x="8"
        y="42"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="40"
        fontWeight="300"
        fill={textColour}
        letterSpacing="0.04em"
      >
        ORRA
      </text>

      {/* Botanical sprig inside the O (positioned over the O letter) */}
      <g transform="translate(12, 12)" opacity="0.9">
        {/* Main stem */}
        <path
          d="M 12,28 Q 14,18 13,8"
          stroke={sageColour}
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
        />
        {/* Left leaves */}
        <path d="M 13,22 Q 9,19 8,15" stroke={sageColour} strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <path d="M 13,17 Q 9,13 9,9" stroke={sageColour} strokeWidth="0.8" fill="none" strokeLinecap="round" />
        {/* Right leaves */}
        <path d="M 13,20 Q 17,17 17,13" stroke={sageColour} strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <path d="M 13,15 Q 17,11 16,7" stroke={sageColour} strokeWidth="0.8" fill="none" strokeLinecap="round" />
        {/* Gold berries */}
        <circle cx="8" cy="15" r="1.4" fill={goldColour} opacity="0.85" />
        <circle cx="9" cy="9" r="1.2" fill={goldColour} opacity="0.75" />
        <circle cx="17" cy="13" r="1.4" fill={goldColour} opacity="0.85" />
        <circle cx="16" cy="7" r="1.1" fill={goldColour} opacity="0.7" />
        <circle cx="13" cy="8" r="1.3" fill={goldColour} opacity="0.8" />
      </g>

      {/* Top gold hairline */}
      <line x1="0" y1="50" x2="160" y2="50" stroke={goldColour} strokeWidth="0.6" opacity="0.5" />

      {/* "nails" lowercase with wide letter-spacing */}
      <text
        x="80"
        y="63"
        fontFamily="'Jost', system-ui, sans-serif"
        fontSize="10"
        fontWeight="300"
        fill={textColour}
        letterSpacing="0.35em"
        textAnchor="middle"
        opacity="0.85"
      >
        nails
      </text>

      {/* Bottom gold hairline */}
      <line x1="0" y1="68" x2="160" y2="68" stroke={goldColour} strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}
