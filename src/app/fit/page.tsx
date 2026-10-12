'use client';
// ─── ORRA NAILS — Fit Atelier ─────────────────────────────────────────────────

import React, { useState } from 'react';
import Link from 'next/link';
import { SIZE_CHART, type SizeId } from '@/data/config';

const FINGER_LABELS = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];
type FingerResult = { size: SizeId; diff: number };

function recommendSize(measurements: number[]): {
  overall: string;
  perFinger: { finger: string; mm: number; size: string; diff: number }[];
  isCustom: boolean;
} {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'] as const;
  const hasUnder8 = measurements.some((m) => m < 8);
  const hasOver18 = measurements.some((m) => m > 18);

  const perFinger = measurements.map((mm, fi) => {
    let best: typeof sizes[number] = 'M';
    let bestDiff = Infinity;
    sizes.forEach((sz) => {
      const diff = Math.abs(SIZE_CHART[sz][fi] - mm);
      if (diff < bestDiff || (diff === bestDiff && sizes.indexOf(sz) > sizes.indexOf(best))) {
        bestDiff = diff;
        best = sz;
      }
    });
    return { finger: FINGER_LABELS[fi], mm, size: best, diff: Math.abs(SIZE_CHART[best][fi] - mm) };
  });

  const counts: Record<string, number> = {};
  perFinger.forEach(({ size }) => { counts[size] = (counts[size] || 0) + 1; });
  const maxCount = Math.max(...Object.values(counts));
  const isCustom = hasUnder8 || hasOver18 || maxCount < 3;
  const overall = isCustom ? 'Custom' : Object.entries(counts).find(([, c]) => c === maxCount)?.[0] ?? 'M';

  return { overall, perFinger, isCustom };
}

export default function FitAtelierPage() {
  const [step, setStep] = useState(0);
  const [measurements, setMeasurements] = useState<(number | '')[]>(['', '', '', '', '']);
  const [result, setResult] = useState<ReturnType<typeof recommendSize> | null>(null);

  const handleMeasure = (i: number, val: string) => {
    const n = val === '' ? '' : parseFloat(val);
    const next = [...measurements];
    next[i] = n;
    setMeasurements(next);
  };

  const handleCalculate = () => {
    const filled = measurements.filter((v) => v !== '') as number[];
    if (filled.length < 5) return;
    setResult(recommendSize(filled));
    setStep(2);
  };

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'var(--oat)', padding: '4rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(185,138,78,0.25)' }}>
        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Find Your Size</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, color: 'var(--espresso)', marginBottom: '1rem' }}>
          The Fit Atelier
        </h1>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--cocoa)', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 }}>
          Five minutes. A strip of tape. The right size, every time.
        </p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '4rem 1.5rem' }}>
        {/* Steps nav */}
        <div style={{ display: 'flex', gap: 0, marginBottom: '3.5rem' }}>
          {['How to measure', 'Enter measurements', 'Your size'].map((label, i) => (
            <div key={i} style={{ flex: 1, borderBottom: `2px solid ${step >= i ? 'var(--gold)' : 'var(--oat)'}`, paddingBottom: '0.75rem', paddingRight: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: step >= i ? 'var(--gold)' : 'var(--deep-olive)' }}>
                Step {i + 1}
              </p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: step >= i ? 'var(--espresso)' : 'var(--deep-olive)', marginTop: 2 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Step 0: Instructions */}
        {step === 0 && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: 'var(--espresso)', marginBottom: '2rem' }}>
              How to measure your nails
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
              {[
                { n: '01', title: 'Get a strip of clear tape', desc: 'Cut a piece of transparent tape, about 2cm wide. You will use this to measure each nail.' },
                { n: '02', title: 'Press across your bare nail', desc: 'Lay the tape flat across the widest part of your nail bed, from one side of the cuticle to the other. Press gently so it moulds to the shape.' },
                { n: '03', title: 'Mark and measure', desc: 'Use a pen to mark the exact edges of your nail on the tape. Remove the tape and lay it flat, then measure the distance between the marks with a ruler. Record in millimetres.' },
                { n: '04', title: 'Repeat for all five fingers', desc: 'Do this for thumb, index, middle, ring and pinky on your dominant hand. Measure at the widest point of each nail.' },
              ].map(({ n, title, desc }) => (
                <div key={n} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: '1rem', alignItems: 'start' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 300, color: 'var(--gold)', opacity: 0.5, lineHeight: 1 }}>{n}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 400, color: 'var(--espresso)', marginBottom: '0.35rem' }}>{title}</p>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--cocoa)', lineHeight: 1.7 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--deep-olive)', padding: '1rem', background: 'var(--linen)', borderRadius: 4, lineHeight: 1.65, marginBottom: '2rem' }}>
              Measure at the widest point of each nail bed — typically just above the cuticle. If between sizes, go larger.
            </p>
            <button onClick={() => setStep(1)} className="btn btn-primary">
              <span>I&apos;m ready to measure</span>
            </button>
          </div>
        )}

        {/* Step 1: Measurements */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: 'var(--espresso)', marginBottom: '0.5rem' }}>
              Enter your measurements
            </h2>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--cocoa)', marginBottom: '2rem' }}>All in millimetres (6–20mm).</p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {FINGER_LABELS.map((label, i) => (
                <div key={label} style={{ flex: '1 1 100px' }}>
                  <label htmlFor={`fit-${i}`} style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: '0.5rem' }}>
                    {label}
                  </label>
                  <input
                    id={`fit-${i}`}
                    type="number"
                    min={6}
                    max={20}
                    step={0.5}
                    value={measurements[i]}
                    onChange={(e) => handleMeasure(i, e.target.value)}
                    placeholder="mm"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid var(--oat)',
                      borderRadius: 2,
                      fontFamily: 'var(--font-display)',
                      fontSize: 22,
                      textAlign: 'center',
                      color: 'var(--espresso)',
                      background: 'var(--parchment)',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Size chart reference */}
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-ui)', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'var(--oat)' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500, letterSpacing: '0.08em' }}>Size</th>
                    {FINGER_LABELS.map((f) => <th key={f} style={{ padding: '8px 12px', fontWeight: 400, color: 'var(--deep-olive)' }}>{f}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {(['XS', 'S', 'M', 'L', 'XL'] as const).map((sz) => (
                    <tr key={sz} style={{ borderBottom: '1px solid var(--oat)' }}>
                      <td style={{ padding: '8px 12px', fontWeight: 500, color: 'var(--espresso)' }}>{sz}</td>
                      {SIZE_CHART[sz].map((mm, fi) => (
                        <td key={fi} style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--cocoa)' }}>{mm}mm</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setStep(0)} className="btn btn-outline">
                <span>Back</span>
              </button>
              <button
                onClick={handleCalculate}
                className="btn btn-primary"
                disabled={measurements.filter((v) => v !== '').length < 5}
              >
                <span>Find my size</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Result */}
        {step === 2 && result && (
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Your result</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 300, color: 'var(--espresso)', lineHeight: 1 }}>
                {result.overall}
              </span>
              {result.isCustom ? (
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--cocoa)', maxWidth: 280, lineHeight: 1.7 }}>
                  We recommend a custom size for the best fit. Contact us on WhatsApp to place a custom order.
                </p>
              ) : (
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--cocoa)', maxWidth: 280, lineHeight: 1.7 }}>
                  This is your recommended size. If a finger is between sizes, we suggest going one size up for that finger.
                </p>
              )}
            </div>

            {/* Per-finger table */}
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-ui)', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: 'var(--oat)' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 500 }}>Finger</th>
                    <th style={{ padding: '8px 12px', fontWeight: 400, color: 'var(--deep-olive)' }}>Your mm</th>
                    <th style={{ padding: '8px 12px', fontWeight: 400, color: 'var(--deep-olive)' }}>Matched size</th>
                  </tr>
                </thead>
                <tbody>
                  {result.perFinger.map(({ finger, mm, size }) => (
                    <tr key={finger} style={{ borderBottom: '1px solid var(--oat)' }}>
                      <td style={{ padding: '8px 12px', color: 'var(--espresso)' }}>{finger}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', color: 'var(--cocoa)' }}>{mm}mm</td>
                      <td style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 500, color: size === result.overall ? 'var(--espresso)' : 'var(--deep-olive)' }}>{size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/shop" className="btn btn-primary">
                <span>Shop with size {result.overall}</span>
              </Link>
              <a
                href="https://wa.me/message/orranails"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <span>Message us for help</span>
              </a>
              <button onClick={() => { setStep(0); setMeasurements(['', '', '', '', '']); setResult(null); }} className="btn btn-ghost" style={{ color: 'var(--deep-olive)' }}>
                <span>Start over</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
