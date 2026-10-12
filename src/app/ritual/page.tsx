'use client';
import React from 'react';
import Link from 'next/link';
import NailArt from '@/components/nail/NailArt';

export default function RitualPage() {
  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div style={{ background: 'var(--espresso)', padding: '5rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="leaf-overlay" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '1rem' }}>The Practice of Wearing</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, color: 'var(--parchment)', lineHeight: 1.1 }}>
            The Ritual
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: 'rgba(251,247,241,0.65)', marginTop: '1rem' }}>
            Five minutes. Two weeks of polish.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 1.5rem' }}>
        {[
          {
            n: '01', title: 'Prepare', colour: 'var(--oat)',
            steps: [
              'Wash your hands thoroughly and dry them completely.',
              'Gently push back your cuticles using the included cuticle stick.',
              'Buff the surface of your nails lightly — this helps adhesion.',
              'Wipe each nail with alcohol or acetone to remove any oils.',
            ],
          },
          {
            n: '02', title: 'Place', colour: 'var(--parchment)',
            steps: [
              'Find your size: match each press-on to the corresponding nail.',
              'For lasting wear (up to 2 weeks): apply a small drop of nail glue to the press-on, not your nail. Press firmly from the cuticle downward, holding for 10 seconds.',
              'For temporary wear (1–3 days): use the included adhesive tabs. Press firmly from the cuticle downward.',
              'Avoid water for at least one hour after application.',
            ],
          },
          {
            n: '03', title: 'Wear', colour: 'var(--oat)',
            steps: [
              'Treat them as you would your own nails — with care.',
              'Avoid prolonged soaking (long baths, dishwashing without gloves).',
              'Each set can be reused up to 2–3 times with care.',
              'To remove: soak in warm water or apply cuticle oil to the edges, then ease off gently from the sides. Never force them off.',
            ],
          },
        ].map(({ n, title, colour, steps }) => (
          <div key={n} style={{ background: colour, padding: '3rem', borderRadius: 4, marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 300, color: 'var(--gold)', opacity: 0.4, lineHeight: 1, flexShrink: 0 }}>{n}</span>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: 'var(--espresso)', marginBottom: '1.25rem' }}>{title}</h2>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {steps.map((step, i) => (
                    <li key={i} style={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--cocoa)', lineHeight: 1.75 }}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/shop" className="btn btn-primary">
            <span>Shop all pieces</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
