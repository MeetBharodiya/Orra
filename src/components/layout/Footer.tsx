'use client';
// ─── ORRA NAILS — Footer ──────────────────────────────────────────────────────

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import OrraNailsLogo from '@/components/brand/OrraNailsLogo';
import { INTENTIONS } from '@/data/config';

const FOOTER_LINKS = {
  Shop: [
    { label: 'All Pieces', href: '/shop' },
    { label: 'Grounded', href: '/collections/grounded' },
    { label: 'Radiant', href: '/collections/radiant' },
    { label: 'Tender', href: '/collections/tender' },
    { label: 'Magnetic', href: '/collections/magnetic' },
    { label: 'Bridal — Vowed', href: '/collections/vowed' },
    { label: 'Custom Studio', href: '/studio' },
  ],
  Help: [
    { label: 'Frequently Asked', href: '/help' },
    { label: 'Fit Atelier', href: '/fit' },
    { label: 'Shipping & Returns', href: '/help#shipping' },
    { label: 'Care & Removal', href: '/help#care' },
    { label: 'Contact Us', href: 'mailto:hello@orranails.com' },
  ],
  Atelier: [
    { label: 'Our Story', href: '/atelier' },
    { label: 'The Ritual', href: '/ritual' },
    { label: 'Journal', href: '/journal' },
    { label: 'Intention Finder', href: '/intention-finder' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
  ],
};

const SOCIAL = [
  { label: 'Instagram', href: 'https://instagram.com/orranails', icon: '✦' },
  { label: 'Pinterest', href: 'https://pinterest.com/orranails', icon: '✦' },
  { label: 'Etsy', href: 'https://etsy.com/shop/orranails', icon: '✦' },
  { label: 'WhatsApp', href: 'https://wa.me/message/orranails', icon: '✦' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  const linkStyle: React.CSSProperties = {
    color: 'rgba(251,247,241,0.65)',
    textDecoration: 'none',
    fontSize: 13,
    fontFamily: 'var(--font-ui)',
    fontWeight: 300,
    lineHeight: 2,
    display: 'block',
    transition: 'color 0.2s',
  };

  return (
    <footer
      style={{
        background: 'var(--espresso)',
        color: 'var(--parchment)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grain on espresso */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px',
          opacity: 0.035,
          pointerEvents: 'none',
        }}
      />

      {/* Leaf overlay on footer */}
      <div className="leaf-overlay" />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '5rem 1.5rem 3rem', position: 'relative' }}>

        {/* Large italic tagline */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--soft-gold)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            Crafted with Intention
          </p>
        </div>

        {/* Hairline */}
        <div style={{ height: 1, background: 'rgba(217,181,124,0.2)', marginBottom: '3.5rem' }} />

        {/* Newsletter */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 13,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--soft-gold)',
              marginBottom: '0.5rem',
            }}
          >
            Join the Atelier
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 18,
              color: 'rgba(251,247,241,0.7)',
              marginBottom: '1.5rem',
            }}
          >
            New pieces, rituals and the occasional note.
          </p>

          {submitted ? (
            <p style={{ color: 'var(--soft-gold)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16 }}>
              Thank you. We&apos;ll be in touch.
            </p>
          ) : (
            <form
              onSubmit={handleNewsletter}
              style={{
                display: 'flex',
                maxWidth: 400,
                margin: '0 auto',
                gap: 0,
                border: '1px solid rgba(217,181,124,0.4)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                aria-label="Email address for newsletter"
                style={{
                  flex: 1,
                  background: 'rgba(251,247,241,0.06)',
                  border: 'none',
                  padding: '12px 16px',
                  color: 'var(--parchment)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--gold)',
                  border: 'none',
                  padding: '12px 20px',
                  color: 'var(--espresso)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = 'var(--soft-gold)')}
                onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = 'var(--gold)')}
              >
                Join
              </button>
            </form>
          )}
        </div>

        {/* Hairline */}
        <div style={{ height: 1, background: 'rgba(217,181,124,0.15)', marginBottom: '3rem' }} />

        {/* Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Logo column */}
          <div>
            <OrraNailsLogo variant="light" size="sm" />
            <p
              style={{
                marginTop: '1.25rem',
                fontSize: 12,
                color: 'rgba(251,247,241,0.5)',
                fontFamily: 'var(--font-ui)',
                lineHeight: 1.7,
                maxWidth: 180,
              }}
            >
              Handmade press-on nails, crafted in India and shipped worldwide.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="eyebrow" style={{ color: 'var(--soft-gold)', marginBottom: '1rem' }}>{title}</p>
              {links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--parchment)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(251,247,241,0.65)')}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}

          {/* Social */}
          <div>
            <p className="eyebrow" style={{ color: 'var(--soft-gold)', marginBottom: '1rem' }}>Follow</p>
            {SOCIAL.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--parchment)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(251,247,241,0.65)')}
              >
                @orranails — {label}
              </a>
            ))}
          </div>
        </div>

        {/* Hairline */}
        <div style={{ height: 1, background: 'rgba(217,181,124,0.12)', marginBottom: '1.5rem' }} />

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: 11, color: 'rgba(251,247,241,0.4)', fontFamily: 'var(--font-ui)' }}>
            © 2026 ORRA Nails. All rights reserved.
          </p>
          <p
            style={{
              fontSize: 11,
              color: 'rgba(251,247,241,0.4)',
              fontFamily: 'var(--font-ui)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            Made with <Heart size={10} fill="currentColor" style={{ color: 'var(--gold)' }} /> in India
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['Privacy', 'Terms', 'Cookies'].map((label) => (
              <Link
                key={label}
                href={`/legal/${label.toLowerCase()}`}
                style={{ fontSize: 11, color: 'rgba(251,247,241,0.4)', fontFamily: 'var(--font-ui)', textDecoration: 'none' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
