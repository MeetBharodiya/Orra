'use client';
// ─── ORRA NAILS — Shop Page ───────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { X, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import NailArt from '@/components/nail/NailArt';
import { PRODUCTS } from '@/data/products';
import { INTENTIONS, SHAPES, FINISHES } from '@/data/config';
import { useRegionStore } from '@/store';


const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
  { id: 'new', label: 'Newest First' },
];

export default function ShopPage() {
  const { region } = useRegionStore();
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState<string | false>(false);

  const toggleFilter = (key: string, val: string) => {
    setActiveFilters((prev) => {
      const current = prev[key] || [];
      const next = current.includes(val) ? current.filter((v) => v !== val) : [...current, val];
      if (next.length === 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: next };
    });
  };

  const removeFilter = (key: string, val: string) => {
    toggleFilter(key, val);
  };

  const clearAll = () => setActiveFilters({});

  const filtered = useMemo(() => {
    let products = [...PRODUCTS];

    // Apply filters
    if (activeFilters.intention?.length) {
      products = products.filter((p) => activeFilters.intention.includes(p.intention));
    }
    if (activeFilters.shape?.length) {
      products = products.filter((p) => activeFilters.shape.includes(p.shape));
    }
    if (activeFilters.finish?.length) {
      products = products.filter((p) => activeFilters.finish.includes(p.nailArt.finish));
    }

    // Sort
    switch (sort) {
      case 'price-asc': products.sort((a, b) => a.priceUSD - b.priceUSD); break;
      case 'price-desc': products.sort((a, b) => b.priceUSD - a.priceUSD); break;
      case 'rating': products.sort((a, b) => b.rating - a.rating); break;
      case 'new': products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }

    return products;
  }, [activeFilters, sort]);

  const activeFilterEntries = Object.entries(activeFilters).flatMap(([key, vals]) =>
    vals.map((val) => ({ key, val }))
  );

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Hero */}
      <div
        style={{
          background: 'var(--oat)',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(185,138,78,0.25)',
        }}
      >
        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>The Collection</p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 300,
            color: 'var(--espresso)',
          }}
        >
          All Pieces
        </h1>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--cocoa)', marginTop: '0.75rem' }}>
          {filtered.length} pieces
        </p>
      </div>

      {/* Filter Bar (sticky) */}
      <div
        style={{
          position: 'sticky',
          top: 100,
          background: 'var(--parchment)',
          borderBottom: '1px solid var(--oat)',
          zIndex: 10,
          padding: '0.875rem 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-w)',
            margin: '0 auto',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Filter groups */}
          {[
            {
              label: 'Intention',
              key: 'intention',
              options: Object.values(INTENTIONS).map((i) => ({ id: i.id, label: i.label })),
            },
            {
              label: 'Shape',
              key: 'shape',
              options: SHAPES.map((s) => ({ id: s.id, label: s.label })),
            },
            {
              label: 'Finish',
              key: 'finish',
              options: FINISHES.map((f) => ({ id: f.id, label: f.label })),
            },
          ].map(({ label, key, options }) => (
            <div key={key} style={{ position: 'relative' }}>
              <button
                onClick={() => setShowFilters(showFilters === key ? false : (key as any))}
                className="filter-chip"
                style={{
                  background: activeFilters[key]?.length ? 'var(--espresso)' : undefined,
                  color: activeFilters[key]?.length ? 'var(--parchment)' : undefined,
                }}
              >
                {label}
                {activeFilters[key]?.length ? ` (${activeFilters[key].length})` : ''}
                <ChevronDown size={12} strokeWidth={1.5} />
              </button>

              {showFilters === key && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    background: 'var(--parchment)',
                    border: '1px solid var(--oat)',
                    borderRadius: 4,
                    padding: '0.75rem',
                    minWidth: 180,
                    boxShadow: '0 8px 24px rgba(43,27,19,0.1)',
                    zIndex: 20,
                    marginTop: 4,
                  }}
                >
                  {options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => toggleFilter(key, opt.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '6px 8px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-ui)',
                        fontSize: 13,
                        color: 'var(--espresso)',
                        borderRadius: 2,
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          border: '1px solid var(--oat)',
                          borderRadius: 2,
                          background: activeFilters[key]?.includes(opt.id) ? 'var(--espresso)' : 'transparent',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--parchment)',
                          fontSize: 9,
                        }}
                      >
                        {activeFilters[key]?.includes(opt.id) ? '✓' : ''}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              style={{
                padding: '6px 28px 6px 10px',
                border: '1px solid var(--oat)',
                borderRadius: 2,
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                color: 'var(--espresso)',
                background: 'transparent',
                cursor: 'pointer',
                appearance: 'none',
              }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterEntries.length > 0 && (
          <div
            style={{
              maxWidth: 'var(--max-w)',
              margin: '0.75rem auto 0',
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {activeFilterEntries.map(({ key, val }) => (
              <button
                key={`${key}-${val}`}
                onClick={() => removeFilter(key, val)}
                className="filter-chip active"
              >
                {val} <X size={10} strokeWidth={2} />
              </button>
            ))}
            <button
              onClick={clearAll}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-ui)',
                fontSize: 11,
                color: 'var(--deep-olive)',
                letterSpacing: '0.1em',
                textDecoration: 'underline',
                textUnderlineOffset: 2,
              }}
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, color: 'var(--cocoa)', marginBottom: '1rem' }}>
              No pieces match those filters.
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--deep-olive)', marginBottom: '2rem' }}>
              Try removing a filter, or explore all our collections below.
            </p>
            <button onClick={clearAll} className="btn btn-primary">
              <span>Show all pieces</span>
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {filtered.map((product, i) => {
              // Editorial tile after every 6th product
              const elements = [];
              elements.push(
                <div key={product.id}>
                  <ProductCard product={product} region={region} index={i} />
                </div>
              );
              if ((i + 1) % 6 === 0 && i < filtered.length - 1) {
                elements.push(
                  <div
                    key={`editorial-${i}`}
                    style={{
                      gridColumn: 'span 2',
                      background: 'var(--oat)',
                      borderRadius: 4,
                      padding: '3rem 2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2rem',
                    }}
                  >
                    <div>
                      <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>From the Atelier</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--espresso)', lineHeight: 1.45 }}>
                        &ldquo;Made fresh in 3 to 5 business days, shipped from India with love.&rdquo;
                      </p>
                    </div>
                    <NailArt shape="almond" finish="glossy" art="floral" baseColour="#E8CFC3" accentColour="#B98A4E" size="md" />
                  </div>
                );
              }
              return elements;
            })}
          </div>
        )}
      </div>
    </div>
  );
}


