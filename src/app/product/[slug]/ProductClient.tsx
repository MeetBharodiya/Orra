'use client';
// ─── ORRA NAILS — Product Client ──────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ChevronDown, ChevronUp, ChevronLeft, ArrowRight } from 'lucide-react';
import NailArt from '@/components/nail/NailArt';
import ProductCard from '@/components/product/ProductCard';
import { getProductBySlug, PRODUCTS } from '@/data/products';
import { INTENTIONS, SIZE_CHART, SHAPES, type SizeId, type ShapeId } from '@/data/config';
import { getFormattedPrice } from '@/lib/pricing';
import { useBagStore, useRegionStore, useUIStore } from '@/store';
import { getLocalStorage } from '@/lib/region';
import { notFound } from 'next/navigation';

// ─── Accordion ────────────────────────────────────────────────────────────────
function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--oat)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-ui)',
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--espresso)',
          textAlign: 'left',
        }}
        aria-expanded={open}
      >
        {title}
        {open ? <ChevronUp size={14} strokeWidth={1.5} /> : <ChevronDown size={14} strokeWidth={1.5} />}
      </button>
      {open && (
        <div style={{ paddingBottom: '1.5rem', fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--cocoa)', lineHeight: 1.75 }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function ProductClient({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);
  if (!product) return notFound();

  const { region } = useRegionStore();
  const { addItem } = useBagStore();
  const { addToast } = useUIStore();

  const [selectedSize, setSelectedSize] = useState<SizeId>('M');
  const [customMeasurements, setCustomMeasurements] = useState<string[]>(['', '', '', '', '']);
  const [showCustom, setShowCustom] = useState(false);
  const [selectedShape, setSelectedShape] = useState<ShapeId>(product.shape);
  const [personalisation, setPersonalisation] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Auto-select saved size if available
  useEffect(() => {
    try {
      const saved = getLocalStorage('orra_saved_size');
      if (saved && ['XS', 'S', 'M', 'L', 'XL'].includes(saved)) {
        setSelectedSize(saved as SizeId);
      }
    } catch {}
  }, []);

  const intention = INTENTIONS[product.intention];
  const formattedPrice = getFormattedPrice(product, region);

  const SIZES: SizeId[] = ['XS', 'S', 'M', 'L', 'XL', 'Custom'];

  const handleAddToBag = () => {
    addItem({
      product,
      quantity,
      size: selectedSize === 'Custom' ? `Custom (${customMeasurements.join('/')})` : selectedSize,
      shape: selectedShape,
      personalisation: personalisation || undefined,
    });
    addToast(`${product.name} added to your bag.`);
  };

  // Pairs well with — same intention, different product
  const pairsWell = PRODUCTS.filter(
    (p) => p.intention === product.intention && p.id !== product.id
  ).slice(0, 3);

  return (
    <div style={{ paddingTop: 100 }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '4rem 1.5rem' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
          <Link href="/shop" style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--deep-olive)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <ChevronLeft size={12} strokeWidth={1.5} /> Shop
          </Link>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--oat)', margin: '0 6px' }}>/</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--espresso)' }}>{product.name}</span>
        </nav>

        {/* 7/5 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '5rem', alignItems: 'start' }}>
          {/* Left: Gallery */}
          <div>
            {/* Main arch */}
            <div
              className="arch"
              style={{
                aspectRatio: '4/5',
                background: intention.tint,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <NailArt
                {...product.nailArt}
                shape={selectedShape}
                size="xl"
                animate
              />
            </div>

            {/* Thumb row */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[product.nailArt, { ...product.nailArt, single: true }].map((config, i) => (
                <div
                  key={i}
                  className="arch"
                  style={{
                    width: 80,
                    height: 100,
                    background: intention.tint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: `1px solid ${i === 0 ? 'var(--gold)' : 'transparent'}`,
                  }}
                >
                  <NailArt {...product.nailArt} shape={selectedShape} size="sm" single={i === 1} singleIndex={2} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div>
            {/* Intention badge */}
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: intention.tint,
                borderRadius: 2,
                fontFamily: 'var(--font-ui)',
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: intention.accent,
                marginBottom: '1rem',
              }}
            >
              {intention.label}
            </span>

            {/* Name */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                color: 'var(--espresso)',
                marginBottom: '0.5rem',
                lineHeight: 1.1,
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                fontWeight: 400,
                color: 'var(--espresso)',
                marginBottom: '0.75rem',
              }}
            >
              {formattedPrice}
            </p>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.25rem' }}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={13} strokeWidth={0} fill={i < Math.round(product.rating) ? 'var(--gold)' : 'var(--oat)'} />
              ))}
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--deep-olive)' }}>
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Description */}
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--cocoa)', lineHeight: 1.75, marginBottom: '2rem' }}>
              {product.description}
            </p>

            {/* Hairline */}
            <div style={{ height: 1, background: 'rgba(185,138,78,0.25)', marginBottom: '1.75rem' }} />

            {/* Size Picker */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--espresso)' }}>
                  Size — {selectedSize}
                </p>
                <Link href="/fit" style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                  Find my size
                </Link>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => { setSelectedSize(sz); setShowCustom(sz === 'Custom'); }}
                    className={`size-chip ${selectedSize === sz ? 'selected' : ''}`}
                    aria-pressed={selectedSize === sz}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Size guide (XS–XL) */}
              {selectedSize !== 'Custom' && (
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'].map((f, fi) => (
                    <span key={f} style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)', background: 'var(--oat)', padding: '2px 6px', borderRadius: 2 }}>
                      {f}: {SIZE_CHART[selectedSize as Exclude<SizeId, 'Custom'>][fi]}mm
                    </span>
                  ))}
                </div>
              )}

              {/* Custom size inputs */}
              {showCustom && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--linen)', borderRadius: 4, border: '1px solid var(--oat)' }}>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--deep-olive)', marginBottom: '0.75rem' }}>
                    Enter each nail width in mm (6–20mm)
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'].map((f, fi) => (
                      <div key={f} style={{ flex: 1 }}>
                        <label htmlFor={`custom-${fi}`} style={{ display: 'block', fontSize: 10, fontFamily: 'var(--font-ui)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: 3 }}>{f[0]}</label>
                        <input
                          id={`custom-${fi}`}
                          type="number"
                          min={7}
                          max={20}
                          step={0.5}
                          value={customMeasurements[fi]}
                          onChange={(e) => {
                            const next = [...customMeasurements];
                            next[fi] = e.target.value;
                            setCustomMeasurements(next);
                          }}
                          placeholder="mm"
                          style={{ width: '100%', padding: '6px 4px', border: '1px solid var(--oat)', borderRadius: 2, fontFamily: 'var(--font-ui)', fontSize: 13, textAlign: 'center' }}
                        />
                      </div>
                    ))}
                  </div>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)', marginTop: '0.5rem' }}>
                    +{region === 'IN' ? '₹199' : '$4'} for custom sizing
                  </p>
                </div>
              )}
            </div>

            {/* Shape Picker */}
            <div style={{ marginBottom: '1.75rem' }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--espresso)', marginBottom: '0.75rem' }}>
                Shape — {SHAPES.find((s) => s.id === selectedShape)?.label}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {SHAPES.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setSelectedShape(shape.id)}
                    className={`size-chip ${selectedShape === shape.id ? 'selected' : ''}`}
                    aria-pressed={selectedShape === shape.id}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: 'auto', padding: '8px 12px', minWidth: 64 }}
                  >
                    <NailArt shape={shape.id} finish="glossy" art="none" baseColour={selectedShape === shape.id ? '#FBF7F1' : '#E9DDCC'} length="medium" size="sm" single singleIndex={2} />
                    <span style={{ fontSize: 9, letterSpacing: '0.1em' }}>{shape.label.split('/')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Personalisation */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label
                htmlFor="personalisation"
                style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--espresso)', marginBottom: '0.75rem' }}
              >
                Name or Initial (optional, +{region === 'IN' ? '₹249' : '$5'})
              </label>
              <input
                id="personalisation"
                type="text"
                maxLength={8}
                value={personalisation}
                onChange={(e) => setPersonalisation(e.target.value)}
                placeholder="e.g. A or Ananya"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--oat)',
                  borderRadius: 2,
                  fontFamily: 'var(--font-display)',
                  fontSize: 16,
                  color: 'var(--espresso)',
                  background: 'var(--linen)',
                }}
              />
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)', marginTop: 4 }}>Up to 8 characters</p>
            </div>

            {/* Quantity + CTA */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--oat)', borderRadius: 2, overflow: 'hidden' }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  style={{ width: 40, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--espresso)' }}
                >
                  −
                </button>
                <span style={{ width: 40, textAlign: 'center', fontFamily: 'var(--font-ui)', fontSize: 14 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  style={{ width: 40, height: 48, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--espresso)' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToBag}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <span>Add to bag</span>
              </button>
            </div>

            {/* Request custom change */}
            <a
              href="https://wa.me/message/orranails"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '12px',
                border: '1px solid var(--oat)',
                borderRadius: 2,
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                letterSpacing: '0.1em',
                color: 'var(--deep-olive)',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
                marginBottom: '1.25rem',
              }}
            >
              Request a custom change <ArrowRight size={12} strokeWidth={1.5} />
            </a>

            {/* Shipping line */}
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--deep-olive)', textAlign: 'center', lineHeight: 1.65 }}>
              Made fresh in 3 to 5 business days. Ships worldwide from India.
            </p>

            {/* Hairline */}
            <div style={{ height: 1, background: 'rgba(185,138,78,0.2)', margin: '1.75rem 0' }} />

            {/* Maker's note */}
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, color: 'var(--cocoa)', lineHeight: 1.7 }}>
              &ldquo;{product.tagline}&rdquo;
            </p>

            {/* Hairline */}
            <div style={{ height: 1, background: 'rgba(185,138,78,0.2)', margin: '1.75rem 0' }} />

            {/* Accordions */}
            <Accordion title="Details">
              <p>Shape: {SHAPES.find((s) => s.id === product.shape)?.label} · Length: {product.nailArt.length} · Finish: {product.nailArt.finish}</p>
              <p style={{ marginTop: '0.5rem' }}>10 hand-painted press-on nails, sized for a complete set.</p>
            </Accordion>

            <Accordion title="In the box">
              <ul style={{ paddingLeft: '1rem' }}>
                {['10 press-on nails', 'Nail glue', 'Adhesive tabs', 'Mini nail file', 'Cuticle stick', 'Clear travel and storage case'].map((item) => (
                  <li key={item} style={{ marginBottom: '0.25rem' }}>{item}</li>
                ))}
              </ul>
            </Accordion>

            <Accordion title="The ritual">
              <p>Prepare your nails by cleaning and gently pushing back cuticles. Apply glue or adhesive tabs, then press firmly from cuticle to tip. Wear for up to 2 weeks with glue, or 1–3 days with tabs.</p>
              <p style={{ marginTop: '0.75rem' }}>To remove: soak in warm water or apply cuticle oil. Never force them off.</p>
            </Accordion>

            <Accordion title="Sizing">
              <p>Sizes run XS through XL. Use our <Link href="/fit" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>Fit Atelier</Link> to find your size — takes about five minutes with a strip of tape.</p>
              <p style={{ marginTop: '0.75rem' }}>Custom sizing (7–20mm per finger) is available for +{region === 'IN' ? '₹199' : '$4'}.</p>
            </Accordion>

            <Accordion title="Shipping and returns">
              <p>We ship worldwide from India. Every order includes tracking. Processing takes 3 to 5 business days — we make your set fresh after you order.</p>
              <p style={{ marginTop: '0.75rem' }}>If something arrives damaged or incorrect, please message us within 48 hours and we will make it right.</p>
              {region !== 'IN' && (
                <p style={{ marginTop: '0.75rem', color: 'var(--gold)' }}>Import duties and taxes may apply in your country.</p>
              )}
            </Accordion>

            <Accordion title="Care">
              <p>Avoid prolonged soaking and harsh chemicals. To remove, soak in warm water or apply cuticle oil and gently ease off from the sides. Each set can be reused up to 2–3 times with care.</p>
            </Accordion>
          </div>
        </div>

        {/* Pairs well with */}
        {pairsWell.length > 0 && (
          <div style={{ marginTop: '6rem' }}>
            <div style={{ height: 1, background: 'rgba(185,138,78,0.2)', marginBottom: '3rem' }} />
            <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>Pairs well with</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
              {pairsWell.map((p, i) => (
                <ProductCard key={p.id} product={p} region={region} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom bar on mobile */}
      <div
        className="show-mobile"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--parchment)',
          borderTop: '1px solid var(--oat)',
          padding: '1rem 1.5rem',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 400, color: 'var(--espresso)' }}>{product.name}</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--espresso)' }}>{formattedPrice}</p>
        </div>
        <button onClick={handleAddToBag} className="btn btn-primary" style={{ flex: 1 }}>
          <span>Add to bag</span>
        </button>
      </div>
    </div>
  );
}
