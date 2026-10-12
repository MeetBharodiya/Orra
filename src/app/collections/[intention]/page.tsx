'use client';
// ─── ORRA NAILS — Collection Page ────────────────────────────────────────────

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import NailArt from '@/components/nail/NailArt';
import { getProductsByIntention } from '@/data/products';
import { INTENTIONS, type IntentionId } from '@/data/config';
import { useRegionStore } from '@/store';
import { notFound } from 'next/navigation';

interface CollectionPageProps {
  params: Promise<{ intention: string }>;
}

function CollectionClient({ intention, intentionData }: { intention: IntentionId; intentionData: typeof INTENTIONS[IntentionId] }) {
  const { region } = useRegionStore();
  const products = getProductsByIntention(intention);

  const nailShape = ['soft-square', 'almond', 'almond', 'stiletto', 'soft-square'][
    Object.keys(INTENTIONS).indexOf(intention)
  ] as any;
  const nailFinish = ['glossy', 'chrome', 'glossy', 'matte', 'pearl'][
    Object.keys(INTENTIONS).indexOf(intention)
  ] as any;

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
              }}
            >
              {intentionData.description}
            </h1>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--cocoa)' }}>
              {products.length} pieces
            </p>
          </div>

          <div className="arch" style={{ background: 'rgba(255,255,255,0.4)', padding: '2rem', border: `1px solid ${intentionData.accent}40` }}>
            <NailArt
              shape={nailShape}
              finish={nailFinish}
              art="floral"
              baseColour="#E9DDCC"
              accentColour={intentionData.accent}
              size="md"
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

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { intention: intentionSlug } = await params;
  const intentionData = INTENTIONS[intentionSlug as IntentionId];
  if (!intentionData) notFound();

  return <CollectionClient intention={intentionSlug as IntentionId} intentionData={intentionData} />;
}
