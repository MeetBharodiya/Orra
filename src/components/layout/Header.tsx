'use client';
// ─── ORRA NAILS — Header ──────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react';
import OrraNailsLogo from '@/components/brand/OrraNailsLogo';
import { useBagStore, useRegionStore } from '@/store';
import { ANNOUNCEMENTS, INTENTIONS, CURRENCIES, REGIONS, type CurrencyCode, type RegionCode } from '@/data/config';

// ─── Announcement Bar ─────────────────────────────────────────────────────────
function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ANNOUNCEMENTS.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="announcement-bar"
      style={{
        background: 'var(--espresso)',
        color: 'var(--soft-gold)',
        textAlign: 'center',
        padding: '8px 16px',
        fontSize: '11px',
        letterSpacing: '0.14em',
        fontFamily: 'var(--font-ui)',
        fontWeight: 400,
        minHeight: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <span
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.4s, transform 0.4s',
          display: 'block',
        }}
      >
        {ANNOUNCEMENTS[index]}
      </span>
    </div>
  );
}

// ─── Currency Selector ────────────────────────────────────────────────────────
function CurrencySelector() {
  const { region, setRegion } = useRegionStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentRegion = REGIONS[region] ?? REGIONS.DEFAULT;
  const currentCurrency = CURRENCIES[currentRegion.currency];

  const options: Array<{ region: RegionCode; label: string; currency: CurrencyCode }> = [
    { region: 'IN', label: 'India (₹ INR)', currency: 'INR' },
    { region: 'DEFAULT', label: 'International ($ USD)', currency: 'USD' },
    { region: 'GB', label: 'UK (£ GBP)', currency: 'GBP' },
    { region: 'AE', label: 'UAE (AED)', currency: 'AED' },
    { region: 'CA', label: 'Canada (CA$)', currency: 'CAD' },
    { region: 'AU', label: 'Australia (A$)', currency: 'AUD' },
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: 12,
          fontFamily: 'var(--font-ui)',
          color: 'inherit',
          padding: '4px 6px',
        }}
        aria-label="Select currency"
        aria-expanded={open}
      >
        {currentCurrency.symbol}
        <ChevronDown size={12} strokeWidth={1.25} />
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            background: 'var(--parchment)',
            border: '1px solid var(--oat)',
            borderRadius: 4,
            minWidth: 200,
            boxShadow: '0 8px 32px rgba(43,27,19,0.12)',
            zIndex: 200,
            overflow: 'hidden',
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.region}
              onClick={() => { setRegion(opt.region); setOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px 16px',
                background: region === opt.region ? 'var(--oat)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: 'var(--font-ui)',
                color: 'var(--espresso)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = 'var(--oat)'; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = region === opt.region ? 'var(--oat)' : 'transparent'; }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Mega Menu ────────────────────────────────────────────────────────────────
function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: 'var(--parchment)',
        borderTop: '1px solid rgba(185,138,78,0.3)',
        borderBottom: '1px solid rgba(185,138,78,0.3)',
        boxShadow: '0 16px 48px rgba(43,27,19,0.1)',
        zIndex: 100,
        padding: '2.5rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem' }}>
        {/* By Intention */}
        <div>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>By Intention</p>
          {Object.values(INTENTIONS).map((intention) => (
            <Link
              key={intention.id}
              href={`/collections/${intention.id}`}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '6px 0',
                textDecoration: 'none',
                color: 'var(--espresso)',
                fontSize: 14,
                fontFamily: 'var(--font-ui)',
                fontWeight: 300,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--espresso)')}
            >
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: intention.tint, border: `1px solid ${intention.accent}`, flexShrink: 0 }} />
              {intention.label}
              <span style={{ fontSize: 11, color: 'var(--deep-olive)', marginLeft: 'auto' }}>
                {intention.tagline}
              </span>
            </Link>
          ))}
        </div>

        {/* By Shape */}
        <div>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>By Shape</p>
          {['Square', 'Oval', 'Soft Square', 'Almond', 'Coffin/Ballerina', 'Stiletto'].map((shape) => (
            <Link
              key={shape}
              href={`/shop?shape=${shape.toLowerCase().replace('/', '-').replace(' ', '-')}`}
              onClick={onClose}
              className="nav-link"
              style={{ display: 'block', padding: '5px 0', fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 300 }}
            >
              {shape}
            </Link>
          ))}
        </div>

        {/* Featured */}
        <div>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Featured</p>
          <Link href="/shop?filter=new" onClick={onClose} className="nav-link" style={{ display: 'block', padding: '5px 0', fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 300 }}>
            New Pieces
          </Link>
          <Link href="/shop?filter=bestsellers" onClick={onClose} className="nav-link" style={{ display: 'block', padding: '5px 0', fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 300 }}>
            Best Sellers
          </Link>
          <Link href="/studio" onClick={onClose} className="nav-link" style={{ display: 'block', padding: '5px 0', fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 300 }}>
            Custom Studio
          </Link>
          <Link href="/collections/vowed" onClick={onClose} className="nav-link" style={{ display: 'block', padding: '5px 0', fontSize: 14, fontFamily: 'var(--font-ui)', fontWeight: 300 }}>
            Bridal
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="mobile-menu"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--espresso)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem',
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <OrraNailsLogo variant="light" size="sm" />
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--parchment)', padding: 8 }}
        >
          <X size={24} strokeWidth={1.25} />
        </button>
      </div>

      <nav style={{ flex: 1 }}>
        {[
          { href: '/shop', label: 'Shop All' },
          { href: '/intention-finder', label: 'Find Your Intention' },
          { href: '/studio', label: 'Custom Studio' },
          { href: '/fit', label: 'Fit Atelier' },
          { href: '/ritual', label: 'The Ritual' },
          { href: '/atelier', label: 'Our Story' },
          { href: '/journal', label: 'Journal' },
          { href: '/help', label: 'Help' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            style={{
              display: 'block',
              color: 'var(--parchment)',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: 28,
              fontWeight: 300,
              padding: '0.75rem 0',
              borderBottom: '1px solid rgba(217,181,124,0.15)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--soft-gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--parchment)')}
          >
            {label}
          </Link>
        ))}

        {/* Intentions */}
        <div style={{ marginTop: '2rem' }}>
          <p className="eyebrow" style={{ color: 'var(--soft-gold)', marginBottom: '1rem' }}>Shop by Intention</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {Object.values(INTENTIONS).map((i) => (
              <Link
                key={i.id}
                href={`/collections/${i.id}`}
                onClick={onClose}
                style={{
                  padding: '6px 14px',
                  border: '1px solid rgba(217,181,124,0.4)',
                  borderRadius: 2,
                  color: 'var(--soft-gold)',
                  textDecoration: 'none',
                  fontSize: 12,
                  fontFamily: 'var(--font-ui)',
                  letterSpacing: '0.1em',
                }}
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(217,181,124,0.2)' }}>
        <CurrencySelector />
      </div>
    </div>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalCount = useBagStore((s) => s.getTotalCount());
  const openBag = useBagStore((s) => s.openBag);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mega menu on outside click
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 36, // below announcement bar
    left: 0,
    right: 0,
    zIndex: 100,
    background: scrolled ? 'var(--linen)' : 'transparent',
    borderBottom: scrolled ? '1px solid rgba(185,138,78,0.25)' : 'none',
    transition: 'background 0.4s, border-color 0.4s',
  };

  const navLinkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-ui)',
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: '0.04em',
    color: scrolled ? 'var(--espresso)' : 'var(--espresso)',
    textDecoration: 'none',
    padding: '6px 2px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  };

  return (
    <>
      {/* Announcement Bar (fixed at very top) */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 101 }}>
        <AnnouncementBar />
      </div>

      <header ref={headerRef} style={headerStyle}>
        <div
          style={{
            maxWidth: 'var(--max-w)',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Left Nav */}
          <nav
            className="hide-mobile"
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}
            aria-label="Main navigation"
          >
            <button
              style={navLinkStyle}
              onClick={() => setMegaOpen((o) => !o)}
              aria-expanded={megaOpen}
              aria-haspopup="true"
              id="shop-nav-btn"
            >
              Shop <ChevronDown size={13} strokeWidth={1.25} style={{ transform: megaOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
            </button>
            <Link href="/studio" style={navLinkStyle} className="nav-link">Studio</Link>
            <Link href="/fit" style={navLinkStyle} className="nav-link">Fit Atelier</Link>
          </nav>

          {/* Mobile: Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--espresso)' }}
          >
            <Menu size={22} strokeWidth={1.25} />
          </button>

          {/* Centre: Logo */}
          <Link href="/" aria-label="ORRA Nails — Home" style={{ display: 'flex', alignItems: 'center' }}>
            <OrraNailsLogo variant="dark" size="md" />
          </Link>

          {/* Right Nav */}
          <nav
            className="hide-mobile"
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1, justifyContent: 'flex-end' }}
          >
            <Link href="/ritual" style={navLinkStyle} className="nav-link">Ritual</Link>
            <Link href="/atelier" style={navLinkStyle} className="nav-link">Our Story</Link>
            <Link href="/shop" style={{ ...navLinkStyle, padding: 8 }} aria-label="Search">
              <Search size={16} strokeWidth={1.25} />
            </Link>
            <CurrencySelector />
            <button
              onClick={openBag}
              aria-label={`Open bag, ${totalCount} item${totalCount !== 1 ? 's' : ''}`}
              style={{ ...navLinkStyle, padding: '6px 8px', position: 'relative' }}
            >
              <ShoppingBag size={18} strokeWidth={1.25} />
              {totalCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    color: 'white',
                    fontSize: 9,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  {totalCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile: Bag */}
          <button
            className="show-mobile"
            onClick={openBag}
            aria-label={`Bag (${totalCount})`}
            style={{ ...navLinkStyle, position: 'relative' }}
          >
            <ShoppingBag size={20} strokeWidth={1.25} />
            {totalCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -2,
                  right: -2,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  color: 'white',
                  fontSize: 9,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {totalCount}
              </span>
            )}
          </button>
        </div>

        {/* Mega Menu */}
        {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
}
