'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import NailArt from '@/components/nail/NailArt';
import { getProductsByIntention } from '@/data/products';
import { INTENTIONS, type IntentionId } from '@/data/config';
import { useRegionStore } from '@/store';

export default function CollectionClient({
  intention,
  intentionData,
}: {
  intention: IntentionId;
  intentionData: typeof INTENTIONS[IntentionId];
}) {
  const { region } = useRegionStore();
  const products = getProductsByIntention(intention);

  const nailShape = (['soft-square', 'almond', 'almond', 'stiletto', 'soft-square'][
    Object.keys(INTENTIONS).indexOf(intention)
  ] ?? 'almond') as any;

  const nailFinish = (['glossy', 'chrome', 'glossy', 'matte', 'pearl'][
    Object.keys(INTENTIONS).indexOf(intention)
  ] ?? 'glossy') as any;

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Collection Hero */}
      <div
        style={{
          background: intentionData.tint,
          padding: '5rem 1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }}>
          <div>
            <Link
              href="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                color: intentionData.accent,
                textDecoration: 'none',
                marginBottom: '1.5rem',
                letterSpacing: '0.08em',
              }}
            >
              <ChevronLeft size={14} strokeWidth={1.5} /> All pieces
            </Link>

            <p className="eyebrow" style={{ color: intentionData.accent, marginBottom: '0.75rem' }}>
              {intentionData.label}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 300,
                color: 'var(--espresso)',
                marginBottom: '1rem',
                lineHeight: 1.1,
              }}
            >
              {intentionData.tagline}
            </h1>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--cocoa)', maxWidth: 500, lineHeight: 1.75, marginBottom: '2rem' }}>
              {intentionData.description}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: intentionData.accent, background: 'rgba(255,255,255,0.6)', padding: '6px 14px', borderRadius: 2 }}>
                {intentionData.emoji} {intentionData.label} Collection
              </span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: intentionData.accent, background: 'rgba(255,255,255,0.6)', padding: '6px 14px', borderRadius: 2 }}>
                {products.length} Designs
              </span>
            </div>
          </div>

          {/* Hero Nail preview */}
          <div className="hide-mobile" style={{ width: 140, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <NailArt
              shape={nailShape}
              finish={nailFinish}
              art="none"
              baseColour={intentionData.accent}
              size="lg"
              single
              singleIndex={2}
              animate
            />
          </div>
        </div>
      </div>

      {/* Products */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '4rem 1.5rem' }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--cocoa)', marginBottom: '1.5rem' }}>
              More pieces coming soon.
            </p>
            <Link href="/shop" className="btn btn-primary">
              <span>Explore all pieces</span>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2.5rem' }}>
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} region={region} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
