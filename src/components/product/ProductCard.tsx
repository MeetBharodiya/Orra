'use client';
// ─── ORRA NAILS — Product Card ────────────────────────────────────────────────

import React, { useState } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import NailArt from '@/components/nail/NailArt';
import type { Product } from '@/data/products';
import { getFormattedPrice } from '@/lib/pricing';
import { INTENTIONS } from '@/data/config';
import type { RegionCode } from '@/data/config';

interface ProductCardProps {
  product: Product;
  region: RegionCode;
  index?: number;
}

export default function ProductCard({ product, region, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const intention = INTENTIONS[product.intention];

  return (
    <Link
      href={`/product/${product.slug}`}
      className="product-card"
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'var(--espresso)',
        animationDelay: `${index * 0.08}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area — arch mask */}
      <div
        className="arch"
        style={{
          aspectRatio: '4/5',
          background: intention.tint,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '1rem',
          position: 'relative',
        }}
      >
        {/* Product badges */}
        {product.isNew && (
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: 'var(--espresso)',
              color: 'var(--parchment)',
              fontSize: 9,
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '4px 8px',
              borderRadius: 2,
              zIndex: 2,
            }}
          >
            New
          </div>
        )}
        {product.isBestSeller && !product.isNew && (
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: 'rgba(185,138,78,0.9)',
              color: 'var(--espresso)',
              fontSize: 9,
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '4px 8px',
              borderRadius: 2,
              zIndex: 2,
            }}
          >
            Loved
          </div>
        )}

        {/* NailArt hand */}
        <div
          className="product-image"
          style={{
            transform: hovered ? 'scale(1.04) translateY(-4px)' : 'scale(1)',
            transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <NailArt
            {...product.nailArt}
            size="md"
            animate={hovered}
          />
        </div>

        {/* Gold underline reveal on hover */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'var(--gold)',
            transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </div>

      {/* Info */}
      <div>
        {/* Intention badge */}
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: intention.accent,
            display: 'block',
            marginBottom: '0.3rem',
          }}
        >
          {intention.label}
        </span>

        {/* Name */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            fontWeight: 400,
            color: 'var(--espresso)',
            marginBottom: '0.3rem',
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </h3>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 13,
            color: 'var(--cocoa)',
            marginBottom: '0.75rem',
            lineHeight: 1.5,
          }}
        >
          {product.tagline}
        </p>

        {/* Rating + Price row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }} aria-label={`${product.rating} stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={11}
                strokeWidth={0}
                fill={i < Math.round(product.rating) ? 'var(--gold)' : 'var(--oat)'}
              />
            ))}
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)', marginLeft: 4 }}>
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontWeight: 400,
              color: 'var(--espresso)',
            }}
          >
            {getFormattedPrice(product, region)}
          </span>
        </div>
      </div>
    </Link>
  );
}
