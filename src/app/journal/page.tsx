'use client';
// --- ORRA NAILS -- Journal (Editorial Blog) ---

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import NailArt from '@/components/nail/NailArt';

const ARTICLES = [
  {
    id: 'intention-behind-the-ritual',
    category: 'Ritual',
    title: 'The Intention Behind the Ritual',
    excerpt: 'Why we believe applying your nails is not a task -- it is a small, sacred act of attention. How the 20 minutes you give yourself can change the shape of your day.',
    date: 'October 2026',
    readTime: '5 min',
    featured: true,
    nailArt: { shape: 'almond' as const, finish: 'glossy' as const, art: 'floral' as const, baseColour: '#E9DDCC', accentColour: '#D9B57C', length: 'long' as const },
    accentColor: '#E9DDCC',
  },
  {
    id: 'craft-notes-chrome-finish',
    category: 'Craft Notes',
    title: 'Chrome -- How We Got the Mirror Right',
    excerpt: "Chrome finish nails have been done badly far too often. We spent three months testing formulations to achieve a true mirror chrome that doesn't yellow or peel. Here's what we learned.",
    date: 'September 2026',
    readTime: '7 min',
    featured: false,
    nailArt: { shape: 'stiletto' as const, finish: 'chrome' as const, art: 'none' as const, baseColour: '#C0C0C0', accentColour: '#A0A0A0', length: 'long' as const },
    accentColor: '#C8C8D4',
  },
  {
    id: 'sizing-guide-deep-dive',
    category: 'Fit Guide',
    title: "Why Most Press-Ons Don't Fit -- and How We Fixed It",
    excerpt: "Standard sizing assumes every hand is the same. It isn't. We mapped over 400 hand measurements before designing our five-size system. This is the story of that research.",
    date: 'August 2026',
    readTime: '6 min',
    featured: false,
    nailArt: { shape: 'square' as const, finish: 'matte' as const, art: 'french' as const, baseColour: '#F5F0E8', accentColour: '#FFF', length: 'medium' as const },
    accentColor: '#F0EBE3',
  },
  {
    id: 'golden-hour-design-story',
    category: 'Design Story',
    title: 'Golden Hour -- Designing for That 6pm Light',
    excerpt: 'Our best-selling set was inspired by a single photograph taken in Jaipur at dusk. This is how a moment becomes a material -- how we translated warmth, shimmer, and fading light into a finish.',
    date: 'July 2026',
    readTime: '4 min',
    featured: false,
    nailArt: { shape: 'almond' as const, finish: 'chrome' as const, art: 'foil' as const, baseColour: '#D4A855', accentColour: '#F0C875', length: 'medium' as const },
    accentColor: '#F5E6C4',
  },
  {
    id: 'care-and-longevity',
    category: 'Care Notes',
    title: "Making Your Set Last: 12 Things We've Learned",
    excerpt: 'After thousands of orders and hundreds of conversations with customers, we know what makes press-ons last -- and what quietly kills them. This is our honest care guide.',
    date: 'June 2026',
    readTime: '8 min',
    featured: false,
    nailArt: { shape: 'oval' as const, finish: 'pearl' as const, art: 'line' as const, baseColour: '#F0EBE3', accentColour: '#D9B57C', length: 'short' as const },
    accentColor: '#EDE8DF',
  },
  {
    id: 'bridal-vowed-collection',
    category: 'Collection',
    title: 'Vowed -- Designing for the Most Important Day',
    excerpt: 'Bridal nails carry weight. They appear in every photograph. They are the hands that hold flowers, that sign papers, that reach for someone. We designed the Vowed collection with all of this in mind.',
    date: 'May 2026',
    readTime: '5 min',
    featured: false,
    nailArt: { shape: 'almond' as const, finish: 'pearl' as const, art: 'floral' as const, baseColour: '#FAF7F2', accentColour: '#D9B57C', length: 'long' as const },
    accentColor: '#FAF7F2',
  },
];

const CATEGORIES = ['All', 'Ritual', 'Craft Notes', 'Fit Guide', 'Design Story', 'Care Notes', 'Collection'];

// --- Article card ---
function ArticleCard({ article, large }: { article: typeof ARTICLES[number]; large?: boolean }) {
  return (
    <Link
      href={`/journal/${article.id}`}
      className="card reveal"
      style={{
        display: 'block',
        textDecoration: 'none',
        overflow: 'hidden',
        gridColumn: large ? 'span 2' : 'span 1',
      }}
    >
      {/* Visual block */}
      <div
        style={{
          background: article.accentColor,
          height: large ? 320 : 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.5s ease',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1)')}
      >
        <NailArt
          {...article.nailArt}
          size={large ? 'md' : 'sm'}
          single
          singleIndex={2}
        />
        <span
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '4px 10px',
            background: 'rgba(43,27,19,0.7)',
            borderRadius: 2,
            fontFamily: 'var(--font-ui)',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--soft-gold)',
          }}
        >
          {article.category}
        </span>
      </div>

      {/* Text */}
      <div style={{ padding: '1.5rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: large ? 22 : 17,
            color: 'var(--espresso)',
            marginBottom: '0.5rem',
            lineHeight: 1.3,
          }}
        >
          {article.title}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 13,
            color: 'var(--cocoa)',
            lineHeight: 1.7,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: large ? 3 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.excerpt}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)' }}>
            {article.date} &middot; {article.readTime} read
          </span>
          <ArrowRight size={14} strokeWidth={1.5} color="var(--gold)" />
        </div>
      </div>
    </Link>
  );
}

// --- Journal Page ---
export default function JournalPage() {
  const [filter, setFilter] = useState('All');

  const visible = filter === 'All' ? ARTICLES : ARTICLES.filter((a) => a.category === filter);
  const featured = visible.find((a) => a.featured);
  const rest = visible.filter((a) => !a.featured);

  return (
    <>
      <title>Journal -- ORRA Nails</title>
      <main style={{ background: 'var(--parchment)', minHeight: '100vh', paddingTop: 'calc(36px + 64px)' }}>

        {/* Hero */}
        <section style={{ background: 'var(--espresso)', padding: '5rem 1.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
          <div className="leaf-overlay" />
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <p className="eyebrow" style={{ color: 'var(--soft-gold)', marginBottom: '0.75rem' }}>Journal</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: 'var(--parchment)', marginBottom: '1rem' }}>
              Notes from the Atelier
            </h1>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'rgba(251,247,241,0.6)', maxWidth: 440, margin: '0 auto', lineHeight: 1.75 }}>
              On craft, care, colour, and the small rituals that make life more intentional.
            </p>
          </div>
        </section>

        {/* Category filter */}
        <section style={{ background: 'var(--linen)', padding: '1.5rem', borderBottom: '1px solid var(--oat)' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 20,
                  border: '1px solid rgba(185,138,78,0.3)',
                  background: filter === cat ? 'var(--espresso)' : 'transparent',
                  color: filter === cat ? 'var(--parchment)' : 'var(--espresso)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 12,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section style={{ padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            {visible.length === 0 ? (
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, color: 'var(--cocoa)', textAlign: 'center', padding: '3rem' }}>
                No articles in this category yet.
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {featured && <ArticleCard article={featured} large />}
                {rest.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section style={{ background: 'var(--espresso)', padding: '4rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
          <div className="leaf-overlay" />
          <div style={{ textAlign: 'center', position: 'relative', maxWidth: 480, margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--soft-gold)', marginBottom: '0.75rem' }}>Stay in the loop</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 26, color: 'var(--parchment)', marginBottom: '0.75rem' }}>
              New pieces, rituals and the occasional note.
            </h2>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'rgba(251,247,241,0.6)', marginBottom: '2rem' }}>
              No noise. Just what is made with care.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'flex', maxWidth: 360, margin: '0 auto', border: '1px solid rgba(217,181,124,0.4)', borderRadius: 3, overflow: 'hidden' }}
            >
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address for newsletter"
                style={{ flex: 1, padding: '11px 16px', background: 'rgba(251,247,241,0.07)', border: 'none', fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--parchment)', outline: 'none' }}
              />
              <button type="submit" style={{ padding: '11px 18px', background: 'var(--gold)', border: 'none', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--espresso)', cursor: 'pointer' }}>
                Join
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
