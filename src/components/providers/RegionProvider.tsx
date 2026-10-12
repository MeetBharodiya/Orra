'use client';
// ─── ORRA NAILS — Region Provider ────────────────────────────────────────────

import React, { useEffect, useState } from 'react';
import { useRegionStore } from '@/store';
import { REGIONS, CURRENCIES } from '@/data/config';

export default function RegionProvider({ children }: { children: React.ReactNode }) {
  const { initRegion, region, isDetected, setRegion } = useRegionStore();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    initRegion();
  }, [initRegion]);

  useEffect(() => {
    if (isDetected) {
      setShowBanner(true);
    }
  }, [isDetected]);

  const currentRegion = REGIONS[region] ?? REGIONS.DEFAULT;
  const currency = CURRENCIES[currentRegion.currency];

  return (
    <>
      {children}
      {/* Detection banner (one-time, dismissable) */}
      {showBanner && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--espresso)',
            color: 'var(--parchment)',
            padding: '12px 20px',
            borderRadius: 4,
            fontSize: 13,
            fontFamily: 'var(--font-ui)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 8px 32px rgba(43,27,19,0.25)',
            zIndex: 90,
            maxWidth: 'calc(100vw - 3rem)',
            border: '1px solid rgba(185,138,78,0.3)',
          }}
        >
          <span>
            Showing prices in {currency.code} for {currentRegion.country}.
          </span>
          <button
            onClick={() => setShowBanner(false)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--soft-gold)',
              fontFamily: 'var(--font-ui)',
              fontSize: 12,
              letterSpacing: '0.08em',
              padding: 0,
              textDecoration: 'underline',
              textUnderlineOffset: 2,
              whiteSpace: 'nowrap',
            }}
          >
            Change country
          </button>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(251,247,241,0.5)',
              fontSize: 16,
              lineHeight: 1,
              padding: '0 4px',
            }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
