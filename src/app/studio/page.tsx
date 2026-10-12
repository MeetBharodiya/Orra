'use client';
// ─── ORRA NAILS — Custom Studio ───────────────────────────────────────────────
// Split-screen: live NailArt preview + step-by-step design panel

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NailArt from '@/components/nail/NailArt';
import { useStudioStore, useBagStore, useUIStore, useRegionStore } from '@/store';
import {
  SHAPES, FINISHES, ART_OPTIONS, BASE_COLOURS, type ShapeId, type FinishId, type ArtId,
} from '@/data/config';
import { getStudioPrice, formatPrice } from '@/lib/pricing';
import { REGIONS, CURRENCIES } from '@/data/config';

const STEP_LABELS = ['Shape', 'Length', 'Colour', 'Finish', 'Art', 'Name & Size', 'Review'];
const LENGTHS = [
  { id: 'short', label: 'Short' },
  { id: 'medium', label: 'Medium' },
  { id: 'long', label: 'Long' },
] as const;

function StepDot({ active, done }: { active: boolean; done: boolean }) {
  return (
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: active ? 'var(--gold)' : done ? 'var(--espresso)' : 'var(--oat)',
        transform: active ? 'scale(1.4)' : 'none',
        transition: 'all 0.3s',
        flexShrink: 0,
      }}
    />
  );
}

export default function StudioPage() {
  const { config, step, setConfig, setStep, reset, toQueryString, fromQueryString } = useStudioStore();
  const { addItem } = useBagStore();
  const { addToast } = useUIStore();
  const { region } = useRegionStore();

  const currentRegion = REGIONS[region] ?? REGIONS.DEFAULT;
  const currency = CURRENCIES[currentRegion.currency];

  // Load from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      fromQueryString(window.location.search);
    }
  }, [fromQueryString]);

  const price = getStudioPrice(
    {
      length: config.length,
      finish: config.finish,
      art: config.art,
      hasName: config.nameText.length > 0,
      isCustomSize: config.size === 'Custom',
      decoratedNailCount: config.accentFingers.length > 0 ? config.accentFingers.length : 10,
    },
    region,
  );

  const formattedPrice = formatPrice(price, currency.code);

  const handleShare = () => {
    const url = window.location.origin + '/studio' + toQueryString();
    navigator.clipboard.writeText(url).then(() => addToast('Design link copied to clipboard.'));
  };

  const handleRequestSet = () => {
    // Create a mock product for the bag
    const customProduct = {
      id: `studio-${Date.now()}`,
      slug: 'custom-studio',
      name: 'Custom Studio Set',
      intention: 'grounded' as const,
      shape: config.shape,
      size: config.size as any,
      priceUSD: price / (CURRENCIES[currency.code].rate || 1),
      priceINR: region === 'IN' ? price : price * 85,
      tagline: 'Designed by you, made by us.',
      description: `Custom set: ${SHAPES.find((s) => s.id === config.shape)?.label}, ${config.length}, ${config.finish} finish, ${config.art !== 'none' ? config.art + ' art' : 'no art'}.`,
      rating: 5,
      reviewCount: 0,
      nailArt: {
        shape: config.shape,
        length: config.length,
        baseColour: config.baseColour,
        finish: config.finish,
        art: config.art,
        accentFingers: config.accentFingers,
      },
    };

    addItem({
      product: customProduct as any,
      quantity: 1,
      size: config.size,
      shape: config.shape,
      personalisation: config.nameText || undefined,
      isCustomStudio: true,
      studioSummary: `${SHAPES.find((s) => s.id === config.shape)?.label} · ${config.length} · ${config.finish} · ${config.art}`,
    });

    addToast('Custom set added to your bag. We will confirm your design before we begin.');
  };

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 420px', maxWidth: '100vw', overflow: 'hidden' }}>
        {/* Left: Live Preview */}
        <div
          style={{
            background: BASE_COLOURS.find((c) => c.hex === config.baseColour)?.id === 'espresso' ? 'var(--oat)' : 'var(--linen)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem',
            position: 'sticky',
            top: 100,
            height: 'calc(100vh - 100px)',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: '2rem' }}>Your design</p>

          <div className="arch" style={{ background: 'rgba(255,255,255,0.3)', padding: '3rem 4rem' }}>
            <NailArt
              shape={config.shape}
              length={config.length}
              baseColour={config.baseColour}
              finish={config.finish}
              art={config.art}
              accentFingers={config.accentFingers}
              accentColour="#B98A4E"
              size="xl"
              animate
            />
          </div>

          {/* Accent finger toggle */}
          {config.art !== 'none' && (
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: '0.75rem' }}>
                Tap a finger to toggle art
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {['T', 'I', 'M', 'R', 'P'].map((label, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const next = config.accentFingers.includes(i)
                        ? config.accentFingers.filter((f) => f !== i)
                        : [...config.accentFingers, i];
                      setConfig({ accentFingers: next });
                    }}
                    aria-label={`Toggle art on ${['thumb', 'index', 'middle', 'ring', 'pinky'][i]}`}
                    aria-pressed={config.accentFingers.includes(i)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '1px solid',
                      borderColor: config.accentFingers.includes(i) ? 'var(--gold)' : 'var(--oat)',
                      background: config.accentFingers.includes(i) ? 'var(--espresso)' : 'transparent',
                      color: config.accentFingers.includes(i) ? 'var(--parchment)' : 'var(--espresso)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: 11,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 300, color: 'var(--espresso)' }}>
              {formattedPrice}
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)' }}>Made to order</p>
          </div>
        </div>

        {/* Right: Step Panel */}
        <div
          style={{
            background: 'var(--parchment)',
            borderLeft: '1px solid var(--oat)',
            overflowY: 'auto',
            height: 'calc(100vh - 100px)',
            position: 'sticky',
            top: 100,
          }}
        >
          {/* Step dots */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--oat)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {STEP_LABELS.map((label, i) => (
                <React.Fragment key={i}>
                  <button
                    onClick={() => setStep(i)}
                    title={label}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                    aria-label={`Go to step: ${label}`}
                  >
                    <StepDot active={step === i} done={step > i} />
                  </button>
                  {i < STEP_LABELS.length - 1 && (
                    <div style={{ flex: 1, height: 1, background: step > i ? 'var(--espresso)' : 'var(--oat)' }} />
                  )}
                </React.Fragment>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: '0.75rem' }}>
              {STEP_LABELS[step]}
            </p>
          </div>

          <div style={{ padding: '2rem 1.5rem' }}>
            {/* Step 0: Shape */}
            {step === 0 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 300, color: 'var(--espresso)', marginBottom: '1.5rem' }}>Choose your shape</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {SHAPES.map((shape) => (
                    <button
                      key={shape.id}
                      onClick={() => setConfig({ shape: shape.id })}
                      aria-pressed={config.shape === shape.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem 1.25rem',
                        border: `1px solid ${config.shape === shape.id ? 'var(--espresso)' : 'var(--oat)'}`,
                        borderRadius: 4,
                        background: config.shape === shape.id ? 'var(--espresso)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'left',
                      }}
                    >
                      <NailArt shape={shape.id} finish="glossy" art="none" baseColour={config.shape === shape.id ? '#FBF7F1' : '#E9DDCC'} length="medium" size="sm" single singleIndex={2} />
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: config.shape === shape.id ? 'var(--parchment)' : 'var(--espresso)' }}>
                        {shape.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Length */}
            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 300, color: 'var(--espresso)', marginBottom: '1.5rem' }}>Choose the length</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {LENGTHS.map((len) => (
                    <button
                      key={len.id}
                      onClick={() => setConfig({ length: len.id })}
                      aria-pressed={config.length === len.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        padding: '1.25rem',
                        border: `1px solid ${config.length === len.id ? 'var(--espresso)' : 'var(--oat)'}`,
                        borderRadius: 4,
                        background: config.length === len.id ? 'var(--espresso)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <NailArt shape={config.shape} finish="glossy" art="none" baseColour={config.length === len.id ? '#FBF7F1' : '#E9DDCC'} length={len.id} size="sm" single singleIndex={2} />
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: config.length === len.id ? 'var(--parchment)' : 'var(--espresso)' }}>{len.label}</p>
                        {len.id !== 'short' && (
                          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: config.length === len.id ? 'rgba(251,247,241,0.6)' : 'var(--deep-olive)' }}>
                            +{formatPrice(len.id === 'medium' ? (region === 'IN' ? 199 : 4) : (region === 'IN' ? 399 : 8), currency.code)}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Base Colour */}
            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 300, color: 'var(--espresso)', marginBottom: '1.5rem' }}>Choose a base colour</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {BASE_COLOURS.map((colour) => (
                    <button
                      key={colour.id}
                      onClick={() => setConfig({ baseColour: colour.hex })}
                      aria-label={colour.label}
                      aria-pressed={config.baseColour === colour.hex}
                      className={`swatch ${config.baseColour === colour.hex ? 'selected' : ''}`}
                      style={{ background: colour.hex, borderColor: config.baseColour === colour.hex ? 'var(--espresso)' : 'transparent' }}
                      title={colour.label}
                    />
                  ))}
                </div>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--espresso)', fontWeight: 400 }}>
                  Selected: {BASE_COLOURS.find((c) => c.hex === config.baseColour)?.label || 'Custom'}
                </p>

                {/* Hex picker */}
                <div style={{ marginTop: '1rem' }}>
                  <label htmlFor="hex-picker" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: '0.5rem' }}>
                    Custom colour
                  </label>
                  <input
                    id="hex-picker"
                    type="color"
                    value={config.baseColour}
                    onChange={(e) => setConfig({ baseColour: e.target.value })}
                    style={{ width: 48, height: 40, border: 'none', padding: 2, cursor: 'pointer', borderRadius: 2 }}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Finish */}
            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 300, color: 'var(--espresso)', marginBottom: '1.5rem' }}>Choose a finish</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {FINISHES.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setConfig({ finish: finish.id })}
                      aria-pressed={config.finish === finish.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem 1.25rem',
                        border: `1px solid ${config.finish === finish.id ? 'var(--espresso)' : 'var(--oat)'}`,
                        borderRadius: 4,
                        background: config.finish === finish.id ? 'var(--espresso)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: config.finish === finish.id ? 'var(--parchment)' : 'var(--espresso)' }}>
                        {finish.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Art */}
            {step === 4 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 300, color: 'var(--espresso)', marginBottom: '1.5rem' }}>Choose your art</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {ART_OPTIONS.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => {
                        setConfig({ art: art.id, accentFingers: art.id === 'none' ? [] : config.accentFingers.length ? config.accentFingers : [1, 3] });
                      }}
                      aria-pressed={config.art === art.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem 1.25rem',
                        border: `1px solid ${config.art === art.id ? 'var(--espresso)' : 'var(--oat)'}`,
                        borderRadius: 4,
                        background: config.art === art.id ? 'var(--espresso)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: config.art === art.id ? 'var(--parchment)' : 'var(--espresso)' }}>
                        {art.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Name & Size */}
            {step === 5 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 300, color: 'var(--espresso)', marginBottom: '1.5rem' }}>Name & size</h2>

                <label htmlFor="studio-name" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: '0.5rem' }}>
                  Name or initial (+{region === 'IN' ? '₹249' : '$5'})
                </label>
                <input
                  id="studio-name"
                  type="text"
                  maxLength={8}
                  value={config.nameText}
                  onChange={(e) => setConfig({ nameText: e.target.value })}
                  placeholder="e.g. A or Ananya"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--oat)', borderRadius: 2, fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: '1.5rem' }}
                />

                <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: '0.5rem' }}>
                  Size
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {(['XS', 'S', 'M', 'L', 'XL', 'Custom'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setConfig({ size: sz })}
                      className={`size-chip ${config.size === sz ? 'selected' : ''}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                {config.size === 'Custom' && (
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--deep-olive)', lineHeight: 1.65, padding: '0.75rem', background: 'var(--linen)', borderRadius: 4 }}>
                    Custom sizing (+{region === 'IN' ? '₹199' : '$4'}): We will contact you before crafting to confirm your exact measurements.
                  </p>
                )}

                <label style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: '0.5rem', marginTop: '1.5rem' }}>
                  Notes for us
                </label>
                <textarea
                  value={config.notes}
                  onChange={(e) => setConfig({ notes: e.target.value })}
                  placeholder="Anything else you'd like us to know..."
                  rows={3}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--oat)', borderRadius: 2, fontFamily: 'var(--font-ui)', fontSize: 13, resize: 'none' }}
                />
              </div>
            )}

            {/* Step 6: Review & Request */}
            {step === 6 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 300, color: 'var(--espresso)', marginBottom: '1.5rem' }}>Your custom set</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                  {[
                    ['Shape', SHAPES.find((s) => s.id === config.shape)?.label],
                    ['Length', config.length],
                    ['Colour', BASE_COLOURS.find((c) => c.hex === config.baseColour)?.label || config.baseColour],
                    ['Finish', config.finish],
                    ['Art', config.art],
                    ['Name', config.nameText || '—'],
                    ['Size', config.size],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--oat)' }}>
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--deep-olive)', letterSpacing: '0.06em' }}>{label}</span>
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--espresso)', fontWeight: 400 }}>{val}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 500, color: 'var(--espresso)' }}>Total</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: 'var(--espresso)' }}>{formattedPrice}</span>
                  </div>
                </div>

                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--cocoa)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Made to order. We confirm your design with you before we begin.
                </p>

                <button onClick={handleRequestSet} className="btn btn-primary" style={{ width: '100%', marginBottom: '0.75rem' }}>
                  <span>Request this set</span>
                </button>

                <button onClick={handleShare} className="btn btn-outline" style={{ width: '100%', marginBottom: '0.75rem' }}>
                  <span>Share design</span>
                </button>

                <button onClick={reset} style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--deep-olive)', padding: '8px', letterSpacing: '0.1em' }}>
                  Start over
                </button>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--oat)' }}>
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="btn btn-outline btn-sm"
                style={{ opacity: step === 0 ? 0.3 : 1 }}
              >
                <span>Back</span>
              </button>
              {step < STEP_LABELS.length - 1 && (
                <button onClick={() => setStep(step + 1)} className="btn btn-primary btn-sm">
                  <span>Next: {STEP_LABELS[step + 1]}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
