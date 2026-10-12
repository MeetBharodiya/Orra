import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'The story of ORRA Nails — handmade press-on nails crafted with intention in India.',
};

export default function AtelierPage() {
  return (
    <div style={{ paddingTop: 100, minHeight: '100vh' }}>
      <div style={{ background: 'var(--espresso)', padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div className="leaf-overlay" />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '1rem' }}>The Atelier</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, color: 'var(--parchment)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Our Story
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'rgba(251,247,241,0.7)', lineHeight: 1.55 }}>
            &ldquo;Every set begins with a quiet question: what do you want your hands to say?&rdquo;
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '5rem 1.5rem' }}>
        {[
          {
            title: 'Where it began',
            text: 'ORRA Nails started in a small studio in India, with a simple belief: that the hands are one of the most expressive parts of us. Not just what we do with them, but what we choose to wear on them. Press-on nails had become something effortless and practical — but we wanted them to also be beautiful, considered and made with care.',
          },
          {
            title: 'Made to order',
            text: 'Every set is made fresh, to order. When you place an order, our makers begin. This means your nails are never sitting in a warehouse; they are made for you, by hand, with the same attention we would give to anything we care about. It takes 3 to 5 business days, and we think that is worth waiting for.',
          },
          {
            title: 'Intention-first',
            text: 'We do not ask you what colour you like first. We ask how you want to feel. From there, everything follows: the shape, the finish, the detail. Our five intentions — Grounded, Radiant, Tender, Magnetic and Vowed — are a way of starting from the inside out.',
          },
          {
            title: 'Shipped from India, worn worldwide',
            text: 'We are a small studio in India, and we are proud of it. Our materials are sourced with care, our production is local, and every set that leaves our studio has been touched by human hands. We ship to customers across the world, with tracking on every order.',
          },
        ].map(({ title, text }) => (
          <div key={title} style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: 'var(--espresso)', marginBottom: '1rem' }}>{title}</h2>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--cocoa)', lineHeight: 1.85 }}>{text}</p>
          </div>
        ))}

        <div style={{ height: 1, background: 'rgba(185,138,78,0.25)', margin: '3rem 0' }} />

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/shop" className="btn btn-primary"><span>Shop the collection</span></Link>
          <Link href="/intention-finder" className="btn btn-outline"><span>Find your intention</span></Link>
        </div>
      </div>
    </div>
  );
}
