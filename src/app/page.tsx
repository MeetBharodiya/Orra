'use client';
// ─── ORRA NAILS — Home Page ───────────────────────────────────────────────────
// Sections: Hero, Intentions, New Pieces, Ritual, Fit Atelier, Studio,
// Brand Story, Reviews (placeholder), Gifting, Instagram, Newsletter

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Star } from 'lucide-react';
import NailArt from '@/components/nail/NailArt';
import ProductCard from '@/components/product/ProductCard';
import { INTENTIONS, SIZE_CHART, SHAPES } from '@/data/config';
import { getNewProducts, getBestSellers, PRODUCTS } from '@/data/products';
import { useRegionStore } from '@/store';
import type { Metadata } from 'next';

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal, .arch-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centre = false,
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  centre?: boolean;
  light?: boolean;
}) {
  return (
    <div
      className="reveal"
      style={{
        textAlign: centre ? 'center' : 'left',
        marginBottom: '3rem',
      }}
    >
      {eyebrow && (
        <p
          className="eyebrow"
          style={{ color: light ? 'var(--soft-gold)' : 'var(--gold)', marginBottom: '0.75rem' }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="h2"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          color: light ? 'var(--parchment)' : 'var(--espresso)',
          marginBottom: subtitle ? '1rem' : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 15,
            color: light ? 'rgba(251,247,241,0.65)' : 'var(--cocoa)',
            maxWidth: 520,
            margin: centre ? '0 auto' : undefined,
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Fleur Divider ────────────────────────────────────────────────────────────
function FleurDivider({ light = false }: { light?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        color: light ? 'var(--soft-gold)' : 'var(--gold)',
        margin: '1.5rem 0',
      }}
    >
      <div style={{ flex: 1, height: 1, background: light ? 'rgba(217,181,124,0.3)' : 'rgba(185,138,78,0.3)' }} />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.7" />
        <path d="M10 3 Q12 6 10 10 Q8 6 10 3" fill="currentColor" opacity="0.5" />
        <path d="M10 17 Q12 14 10 10 Q8 14 10 17" fill="currentColor" opacity="0.5" />
        <path d="M3 10 Q6 8 10 10 Q6 12 3 10" fill="currentColor" opacity="0.5" />
        <path d="M17 10 Q14 8 10 10 Q14 12 17 10" fill="currentColor" opacity="0.5" />
      </svg>
      <div style={{ flex: 1, height: 1, background: light ? 'rgba(217,181,124,0.3)' : 'rgba(185,138,78,0.3)' }} />
    </div>
  );
}

// ─── Mini Fit Widget ──────────────────────────────────────────────────────────
const FINGER_LABELS = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];

function MiniFitWidget() {
  const [measurements, setMeasurements] = useState<(number | '')[]>(['', '', '', '', '']);
  const [result, setResult] = useState<string | null>(null);

  const recommendSize = (meas: number[]) => {
    const sizes = ['XS', 'S', 'M', 'L', 'XL'] as const;
    const counts: Record<string, number> = {};

    meas.forEach((mm, fi) => {
      let best: string | null = null;
      let bestDiff = Infinity;
      sizes.forEach((sz) => {
        const diff = Math.abs(SIZE_CHART[sz][fi] - mm);
        if (diff < bestDiff) { bestDiff = diff; best = sz; }
      });
      if (best) counts[best] = (counts[best] || 0) + 1;
    });

    const hasUnder8 = meas.some((m) => m < 8);
    const hasOver18 = meas.some((m) => m > 18);
    const maxCount = Math.max(...Object.values(counts));
    if (hasUnder8 || hasOver18 || maxCount < 3) return 'Custom';

    return Object.entries(counts).find(([, c]) => c === maxCount)?.[0] ?? 'M';
  };

  const handleChange = (i: number, val: string) => {
    const n = val === '' ? '' : Math.max(6, Math.min(20, parseFloat(val)));
    const next = [...measurements];
    next[i] = n;
    setMeasurements(next);

    const filled = next.filter((v) => v !== '') as number[];
    if (filled.length === 5) {
      setResult(recommendSize(filled));
    } else {
      setResult(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {FINGER_LABELS.map((label, i) => (
          <div key={label} style={{ flex: '1 1 80px', minWidth: 72 }}>
            <label
              htmlFor={`mini-fit-${i}`}
              style={{
                display: 'block',
                fontSize: 10,
                fontFamily: 'var(--font-ui)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--deep-olive)',
                marginBottom: 4,
              }}
            >
              {label}
            </label>
            <input
              id={`mini-fit-${i}`}
              type="number"
              min={6}
              max={20}
              step={0.5}
              value={measurements[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder="mm"
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1px solid var(--oat)',
                borderRadius: 2,
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                color: 'var(--espresso)',
                background: 'var(--parchment)',
                outline: 'none',
              }}
            />
          </div>
        ))}
      </div>

      {result && (
        <div
          style={{
            padding: '12px 16px',
            background: 'var(--linen)',
            border: '1px solid rgba(185,138,78,0.3)',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--espresso)' }}>
            You are a
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              fontWeight: 400,
              color: 'var(--espresso)',
            }}
          >
            {result}
          </span>
          <Link href="/fit" className="btn btn-outline btn-sm">
            <span>Full Guide</span>
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  useScrollReveal();
  const { region } = useRegionStore();
  const newProducts = getNewProducts().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);
  const displayProducts = [...newProducts, ...bestSellers].slice(0, 8);

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          background: 'var(--espresso)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: 100, // below header + announcement bar
        }}
      >
        {/* Leaf shadow overlay */}
        <div className="leaf-overlay" />

        {/* Grain on espresso */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px',
            opacity: 0.04,
            pointerEvents: 'none',
          }}
        />

        {/* Top gold hairline */}
        <div style={{ position: 'absolute', top: 100, left: '1.5rem', right: '1.5rem', height: 1, background: 'rgba(185,138,78,0.25)' }} />

        <div
          style={{
            maxWidth: 'var(--max-w)',
            margin: '0 auto',
            padding: '4rem 1.5rem',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) auto',
            gap: '4rem',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left: text */}
          <div>
            <p
              className="eyebrow reveal"
              style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}
            >
              Handmade Press-On Nails
            </p>

            <h1
              className="hero-headline reveal"
              style={{
                color: 'var(--parchment)',
                marginBottom: '1.5rem',
                maxWidth: 640,
              }}
            >
              Crafted with{' '}
              <em style={{ color: 'var(--soft-gold)', fontStyle: 'italic' }}>Intention.</em>
            </h1>

            <p
              className="reveal"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 16,
                color: 'rgba(251,247,241,0.7)',
                maxWidth: 480,
                marginBottom: '2.5rem',
                lineHeight: 1.75,
              }}
            >
              Hand-painted in India. Made fresh for you. Chosen by how you want to feel.
            </p>

            <div
              className="reveal"
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <Link href="/intention-finder" className="btn btn-light">
                <span>Find your intention</span>
              </Link>
              <Link
                href="/shop"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  color: 'rgba(251,247,241,0.65)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '14px 0',
                  borderBottom: '1px solid rgba(217,181,124,0.4)',
                }}
              >
                Shop all sets <ArrowRight size={13} strokeWidth={1.25} />
              </Link>
            </div>

            {/* Trust row */}
            <div
              className="reveal"
              style={{
                display: 'flex',
                gap: '2rem',
                marginTop: '3.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(185,138,78,0.2)',
                flexWrap: 'wrap',
              }}
            >
              {[
                { icon: '◇', label: 'Handmade to order' },
                { icon: '○', label: 'Reusable up to 3 wears' },
                { icon: '◈', label: 'Ships worldwide from India' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--gold)', fontSize: 14 }}>{icon}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'rgba(251,247,241,0.55)', letterSpacing: '0.06em' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: NailArt hero visual */}
          <div
            className="hide-mobile reveal"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}
          >
            {/* Large arch — main hand */}
            <div
              className="arch"
              style={{
                background: 'rgba(251,247,241,0.07)',
                padding: '2.5rem 2rem',
                border: '1px solid rgba(185,138,78,0.2)',
              }}
            >
              <NailArt
                shape="almond"
                finish="glossy"
                art="floral"
                baseColour="#E8CFC3"
                accentColour="#B98A4E"
                accentFingers={[1, 3]}
                length="medium"
                size="lg"
                animate
              />
            </div>

            {/* Smaller close-up arch overlapping */}
            <div
              className="arch"
              style={{
                background: 'rgba(251,247,241,0.07)',
                padding: '1.5rem',
                border: '1px solid rgba(185,138,78,0.2)',
                alignSelf: 'flex-start',
                marginTop: '-2rem',
                marginLeft: '2rem',
              }}
            >
              <NailArt
                shape="almond"
                finish="chrome"
                art="foil"
                baseColour="#D9B57C"
                accentColour="#B98A4E"
                length="medium"
                size="md"
                single
                singleIndex={2}
              />
            </div>
          </div>
        </div>

        {/* Bottom gold hairline */}
        <div style={{ position: 'absolute', bottom: 0, left: '1.5rem', right: '1.5rem', height: 1, background: 'rgba(185,138,78,0.2)' }} />
      </section>

      {/* ── 2. INTENTIONS ─────────────────────────────────────────────────── */}
      <section
        id="intentions"
        className="section"
        style={{ background: 'var(--linen)', paddingTop: 'var(--section-pad)', paddingBottom: 'var(--section-pad)' }}
      >
        <div className="section-inner">
          <SectionHeader
            eyebrow="Shop by Feeling"
            title={<>How do you want to <em>feel</em>?</>}
            centre
          />

          <div
            className="snap-x-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '1rem',
              overflowX: 'auto',
            }}
          >
            {Object.values(INTENTIONS).map((intention, i) => (
              <Link
                key={intention.id}
                href={`/collections/${intention.id}`}
                className="intention-card snap-item reveal"
                style={{
                  textDecoration: 'none',
                  color: 'var(--espresso)',
                  background: intention.tint,
                  minWidth: 180,
                  padding: '2.5rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {/* Nail preview */}
                <NailArt
                  shape={['soft-square', 'almond', 'almond', 'stiletto', 'soft-square'][i] as any}
                  finish={['glossy', 'chrome', 'glossy', 'matte', 'pearl'][i] as any}
                  art={['line', 'foil', 'floral', 'foil', 'line'][i] as any}
                  baseColour={
                    [
                      '#E9DDCC', '#D9B57C', '#E8CFC3', '#1A100B', '#F0EBE3',
                    ][i]
                  }
                  accentColour={intention.accent}
                  length="medium"
                  size="sm"
                  single
                  singleIndex={2}
                />

                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 20,
                      fontWeight: 400,
                      color: 'var(--espresso)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {intention.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 12,
                      color: 'var(--cocoa)',
                      lineHeight: 1.6,
                    }}
                  >
                    {intention.tagline}
                  </p>
                </div>

                <span
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: intention.accent,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  Explore <ChevronRight size={11} strokeWidth={1.5} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. NEW PIECES ─────────────────────────────────────────────────── */}
      <section
        id="new-pieces"
        className="section"
        style={{ background: 'var(--parchment)' }}
      >
        <div className="section-inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <SectionHeader
              eyebrow="Fresh to the Atelier"
              title="New pieces"
            />
            <Link href="/shop" className="btn btn-outline btn-sm hide-mobile">
              <span>View all</span>
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '2rem',
            }}
          >
            {PRODUCTS.slice(0, 8).map((product, i) => (
              <div key={product.id} className="reveal" style={{ animationDelay: `${i * 0.07}s` }}>
                <ProductCard product={product} region={region} index={i} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/shop" className="btn btn-primary">
              <span>View all pieces</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. THE RITUAL (dark) ──────────────────────────────────────────── */}
      <section
        id="ritual"
        className="section"
        style={{ background: 'var(--espresso)', position: 'relative', overflow: 'hidden' }}
      >
        <div className="leaf-overlay" />
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px', opacity: 0.035, pointerEvents: 'none',
          }}
        />

        <div className="section-inner" style={{ position: 'relative' }}>
          <SectionHeader
            eyebrow="The Ritual"
            title={<>Five minutes.<br />Two weeks of polish.</>}
            light
            centre
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              marginTop: '3rem',
            }}
          >
            {[
              {
                step: '01',
                title: 'Prepare',
                desc: 'Clean and buff your nails. Push back cuticles gently with the included stick.',
              },
              {
                step: '02',
                title: 'Place',
                desc: 'Choose glue for lasting wear (up to 2 weeks) or adhesive tabs for 1–3 days. Press firmly from cuticle to tip.',
              },
              {
                step: '03',
                title: 'Wear',
                desc: 'Your set is done. Wear them with care — avoid prolonged soaking. Remove with warm water or cuticle oil.',
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="reveal"
                style={{
                  padding: '2rem',
                  border: '1px solid rgba(185,138,78,0.2)',
                  borderRadius: 4,
                  background: 'rgba(251,247,241,0.04)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 40,
                    fontWeight: 300,
                    color: 'var(--gold)',
                    opacity: 0.5,
                    lineHeight: 1,
                    marginBottom: '1rem',
                  }}
                >
                  {step}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 24,
                    fontWeight: 300,
                    color: 'var(--parchment)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 14,
                    color: 'rgba(251,247,241,0.6)',
                    lineHeight: 1.75,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/ritual" className="btn btn-outline">
              <span>Read the full ritual</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. FIT ATELIER TEASER ────────────────────────────────────────── */}
      <section id="fit-teaser" className="section" style={{ background: 'var(--oat)' }}>
        <div className="section-inner">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            <div>
              <SectionHeader
                eyebrow="Fit Atelier"
                title={<>Find your <em>perfect fit.</em></>}
                subtitle="Measure your nails in five minutes with a strip of tape and a ruler. No guesswork."
              />
              <Link href="/fit" className="btn btn-primary">
                <span>Open the Fit Atelier</span>
              </Link>
            </div>

            <div className="reveal">
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 12,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--deep-olive)',
                  marginBottom: '1.25rem',
                }}
              >
                Quick check — enter in mm
              </p>
              <MiniFitWidget />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CUSTOM STUDIO TEASER ──────────────────────────────────────── */}
      <section id="studio-teaser" className="section" style={{ background: 'var(--parchment)' }}>
        <div className="section-inner">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
            <SectionHeader
              eyebrow="Custom Studio"
              title={<>Design it <em>exactly</em> as you imagine it.</>}
              subtitle="Choose your shape, base, finish and art — we confirm the design with you before we begin."
              centre
            />

            {/* Shape preview row */}
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {SHAPES.map((shape, i) => (
                <Link
                  key={shape.id}
                  href={`/studio?shape=${shape.id}`}
                  className="reveal"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textDecoration: 'none',
                    color: 'var(--espresso)',
                    padding: '1.25rem 1rem',
                    border: '1px solid var(--oat)',
                    borderRadius: 4,
                    background: 'var(--linen)',
                    transition: 'border-color 0.3s, transform 0.3s',
                    minWidth: 90,
                    animationDelay: `${i * 0.08}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--oat)';
                    e.currentTarget.style.transform = 'none';
                  }}
                >
                  <NailArt
                    shape={shape.id}
                    finish="glossy"
                    art="none"
                    baseColour="#E9DDCC"
                    length="medium"
                    size="sm"
                    single
                    singleIndex={2}
                  />
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textAlign: 'center' }}>
                    {shape.label}
                  </span>
                </Link>
              ))}
            </div>

            <Link href="/studio" className="btn btn-primary">
              <span>Open the Studio</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. BRAND STORY ───────────────────────────────────────────────── */}
      <section id="brand-story" className="section" style={{ background: 'var(--espresso)', position: 'relative', overflow: 'hidden' }}>
        <div className="leaf-overlay" />
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px', opacity: 0.035, pointerEvents: 'none',
          }}
        />
        <div className="section-inner" style={{ position: 'relative', maxWidth: 760 }}>
          <p className="eyebrow reveal" style={{ color: 'var(--soft-gold)', marginBottom: '1.5rem', textAlign: 'center' }}>
            The Atelier
          </p>
          <blockquote
            className="reveal"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 3vw, 2.25rem)',
              fontWeight: 300,
              color: 'var(--parchment)',
              textAlign: 'center',
              lineHeight: 1.45,
              marginBottom: '2.5rem',
              borderLeft: 'none',
              padding: 0,
            }}
          >
            &ldquo;Every set begins with a quiet question: what do you want your hands to say?&rdquo;
          </blockquote>
          <FleurDivider light />
          <p
            className="reveal"
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 15,
              color: 'rgba(251,247,241,0.65)',
              lineHeight: 1.85,
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            ORRA Nails began in a small studio in India, with a belief that the hands are one of the most
            expressive parts of us — and that what we put on them should be chosen with the same care we
            bring to everything we love. Each set is hand-painted to order, made fresh, and shipped to
            you with intention.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link href="/atelier" className="btn btn-outline">
              <span>Read our story</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. REVIEWS ───────────────────────────────────────────────────── */}
      {/* PLACEHOLDER CONTENT — Reviews are illustrative only, not real */}
      <section id="reviews" className="section" style={{ background: 'var(--linen)' }}>
        <div className="section-inner">
          <SectionHeader
            eyebrow="From the Atelier"
            title="Worn and loved"
            centre
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                name: 'Priya K.',
                location: 'Bangalore',
                rating: 5,
                text: 'I ordered the Oat Milk set and it is the most beautiful thing I have put on my nails. The size chart was spot on — I am a perfect M.',
                product: 'Oat Milk',
              },
              {
                name: 'Sophie R.',
                location: 'London',
                rating: 5,
                text: 'The Veil set arrived beautifully packaged. Every nail was perfect. I wore them for my engagement and could not have been happier.',
                product: 'Veil',
              },
              {
                name: 'Amara L.',
                location: 'Dubai',
                rating: 5,
                text: 'Golden Hour is everything. The chrome finish catches every light. I have already ordered Midnight Velvet for my next event.',
                product: 'Golden Hour',
              },
            ].map(({ name, location, rating, text, product }) => (
              <div
                key={name}
                className="card reveal"
                style={{ padding: '1.75rem' }}
              >
                <div style={{ display: 'flex', gap: 3, marginBottom: '1rem' }} aria-label={`${rating} stars`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={12} strokeWidth={0} fill={i < rating ? 'var(--gold)' : 'var(--oat)'} />
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 16,
                    color: 'var(--espresso)',
                    lineHeight: 1.65,
                    marginBottom: '1.25rem',
                  }}
                >
                  &ldquo;{text}&rdquo;
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 400, color: 'var(--espresso)' }}>{name}</p>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)' }}>{location}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.08em' }}>
                    {product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. GIFTING ───────────────────────────────────────────────────── */}
      <section id="gifting" className="section" style={{ background: 'var(--parchment)' }}>
        <div className="section-inner">
          <div
            style={{
              border: '1px solid rgba(185,138,78,0.3)',
              borderRadius: 4,
              padding: '3.5rem',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '3rem',
              alignItems: 'center',
            }}
          >
            <div
              className="arch reveal"
              style={{
                width: 200,
                background: 'var(--oat)',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <NailArt
                shape="almond"
                finish="pearl"
                art="line"
                baseColour="#F0EBE3"
                accentColour="#D9B57C"
                length="medium"
                size="md"
              />
            </div>
            <div className="reveal">
              <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Gift the Atelier</p>
              <h2 className="h2" style={{ fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: '1rem' }}>
                Give something <em>made</em> for them.
              </h2>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--cocoa)', lineHeight: 1.75, marginBottom: '2rem', maxWidth: 480 }}>
                Every ORRA set arrives in a clear travel case, ready to give. Add a gift note at checkout.
                We also offer custom sets — designed around the person you have in mind.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/shop" className="btn btn-primary">
                  <span>Shop gift sets</span>
                </Link>
                <Link href="/studio" className="btn btn-outline">
                  <span>Create a custom gift</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. INSTAGRAM STRIP ──────────────────────────────────────────── */}
      <section id="instagram" className="section" style={{ background: 'var(--oat)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="section-inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <p className="eyebrow">@orranails on Instagram</p>
            <a
              href="https://instagram.com/orranails"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                color: 'var(--deep-olive)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              Follow <ChevronRight size={12} strokeWidth={1.5} />
            </a>
          </div>

          {/* Placeholder Instagram tiles */}
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {PRODUCTS.slice(0, 6).map((product, i) => (
              <div
                key={product.id}
                className="arch"
                style={{
                  flexShrink: 0,
                  width: 160,
                  height: 200,
                  background: Object.values(INTENTIONS)[i % 5].tint,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <NailArt {...product.nailArt} size="sm" single singleIndex={2} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
