import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Clock, Calendar, ArrowRight, Share2 } from 'lucide-react';
import NailArt from '@/components/nail/NailArt';

interface ArticleData {
  id: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  excerpt: string;
  nailArt: {
    shape: 'almond' | 'stiletto' | 'square' | 'oval';
    finish: 'glossy' | 'chrome' | 'matte' | 'pearl';
    art: 'none' | 'floral' | 'french' | 'foil' | 'line';
    baseColour: string;
    accentColour: string;
    length: 'short' | 'medium' | 'long';
  };
  accentColor: string;
  content: {
    heading?: string;
    paragraphs: string[];
  }[];
  relatedSlug?: string;
}

const ARTICLES_DATA: Record<string, ArticleData> = {
  'intention-behind-the-ritual': {
    id: 'intention-behind-the-ritual',
    category: 'Ritual',
    title: 'The Intention Behind the Ritual',
    date: 'October 2026',
    readTime: '5 min',
    author: 'Anya Sen',
    authorRole: 'Founder & Creative Director',
    excerpt: 'Why we believe applying your nails is not a chore — it is a small, grounding act of attention that shifts your entire day.',
    nailArt: { shape: 'almond', finish: 'glossy', art: 'floral', baseColour: '#E9DDCC', accentColour: '#D9B57C', length: 'long' },
    accentColor: '#E9DDCC',
    content: [
      {
        heading: 'Twenty Minutes of Undivided Attention',
        paragraphs: [
          'In a world designed to fragment our attention into milliseconds, the physical act of caring for your hands demands presence. You cannot rush the bond of a press-on nail while scrolling a feed. You have to breathe, align the arch, press firmly for twenty seconds, and feel the weight of your own hands.',
          'When we founded ORRA, we did not set out to simply manufacture nail tips. We set out to reclaim the ceremony of touch. Every set arrives with its own ritual card, custom emery file, and botanical cuticle wood stick — because the tools matter as much as the result.',
        ],
      },
      {
        heading: 'Hands As Instruments of Self-Expression',
        paragraphs: [
          'Your hands are the first things you extend into the world when you greet someone. They hold teacups, write letters, embrace loved ones, and gesture during intense debates. When your fingertips feel intentional, you carry yourself differently.',
          'We often hear from customers who wear our Grounded sets during important presentations or high-stakes negotiations. They tell us that looking down at an earthy cocoa or deep terracotta gives them a momentary anchor. Beauty is not superficial when it serves as an emotional compass.',
        ],
      },
      {
        heading: 'The Sacred Pause of Removal',
        paragraphs: [
          'Equally sacred is the moment you take them off. We caution against tearing or rushing. Soaking your fingers in warm water with a drop of almond or jojoba oil allows the adhesive tabs to soften naturally. It turns an end into an evening spa moment.',
          'Store your nails in their bespoke velvet-lined acrylic case. They are crafted from reusable ABS resin engineered to endure ten to twenty wears. Treat them like delicate heirlooms, and they will accompany you across seasons.',
        ],
      },
    ],
  },
  'craft-notes-chrome-finish': {
    id: 'craft-notes-chrome-finish',
    category: 'Craft Notes',
    title: 'Chrome — How We Got the Mirror Right',
    date: 'September 2026',
    readTime: '7 min',
    author: 'Rhea Patel',
    authorRole: 'Head of Atelier & Formulations',
    excerpt: "Chrome finish nails have been done poorly far too often. We spent three months testing formulations to achieve a true liquid mirror that doesn't yellow or peel.",
    nailArt: { shape: 'stiletto', finish: 'chrome', art: 'none', baseColour: '#C0C0C0', accentColour: '#A0A0A0', length: 'long' },
    accentColor: '#C8C8D4',
    content: [
      {
        heading: 'The Problem with Mass-Market Chrome',
        paragraphs: [
          'If you have ever bought chrome press-ons that looked metallic in the box but turned cloudy grey after two days, you know our frustration. Standard commercial chrome is applied using cheap aluminium leaf or spray paints that oxidize when exposed to air and everyday moisture.',
          'True mirror chrome requires microscopic silica-glass platelets suspended in a clear polymer matrix, buffed over a tack-free black or ivory base at exactly 40 degrees Celsius.',
        ],
      },
      {
        heading: '38 Formulations, One Winner',
        paragraphs: [
          'We tested 38 distinct coating formulations across twelve weeks in our Mumbai studio. We subjected sample sets to hot tea immersions, alcohol sanitizers, and rigorous scratch tests.',
          'The winning formula seals our micronized metallic pigments beneath an automotive-grade, flexible UV gel shield. It moves with the natural flex of the nail plate without micro-cracking.',
        ],
      },
    ],
  },
  'sizing-guide-deep-dive': {
    id: 'sizing-guide-deep-dive',
    category: 'Fit Guide',
    title: "Why Most Press-Ons Don't Fit — and How We Fixed It",
    date: 'August 2026',
    readTime: '6 min',
    author: 'Kavita Menon',
    authorRole: 'Ergonomics & Sizing Specialist',
    excerpt: 'Standard sizing assumes every hand is the same. It isn’t. We mapped over 400 hand measurements before designing our five-size curve.',
    nailArt: { shape: 'square', finish: 'matte', art: 'french', baseColour: '#F5F0E8', accentColour: '#FFF', length: 'medium' },
    accentColor: '#F0EBE3',
    content: [
      {
        heading: 'The Flaw in One-Size-Fits-All',
        paragraphs: [
          'Most press-on brands sell packs of 24 to 30 generic plastic nails in the hope that five of them will happen to fit your fingers. The leftover 20 pieces end up discarded in a drawer or landfill. Even worse, the curvature (the C-curve arch) rarely matches real nail beds, causing premature popping and painful pinching.',
          'At ORRA, we rejected the disposable bulk pack. Instead, we offer bespoke 10-piece sets mapped precisely to your hand measurements.',
        ],
      },
      {
        heading: 'The 400-Hand Study',
        paragraphs: [
          'Before finalizing our XS through XL sizes, we took caliper measurements across 400 diverse hand profiles in India, the UK, and North America. We discovered consistent ratios between thumb and middle finger widths that allowed us to formulate cohesive proportion families.',
          'If your dimensions fall outside standard matrices, our Custom Studio allows you to input individual millimeter measurements for zero extra complication.',
        ],
      },
    ],
  },
  'golden-hour-design-story': {
    id: 'golden-hour-design-story',
    category: 'Design Story',
    title: 'Golden Hour — Designing for That 6pm Light',
    date: 'July 2026',
    readTime: '4 min',
    author: 'Anya Sen',
    authorRole: 'Founder & Creative Director',
    excerpt: 'Our best-selling set was inspired by a single photograph taken in Jaipur at dusk. This is how a warm glimmer becomes wearable art.',
    nailArt: { shape: 'almond', finish: 'chrome', art: 'foil', baseColour: '#D4A855', accentColour: '#F0C875', length: 'medium' },
    accentColor: '#F5E6C4',
    content: [
      {
        heading: 'A Memory in Sandstone',
        paragraphs: [
          'The sun dipping behind the Nahargarh hills casts a liquid amber radiance over the terracotta ramparts. There is a ten-minute window when everything looks warm, gilded, and peaceful. That exact chromatic gradient became the blueprint for Golden Hour.',
          'We hand-gilded 24k gold leaf foil over a warm honey-amber base, dusting the edges with translucent mica for a soft aura effect.',
        ],
      },
    ],
  },
  'care-and-longevity': {
    id: 'care-and-longevity',
    category: 'Care Notes',
    title: "Making Your Set Last: 12 Things We've Learned",
    date: 'June 2026',
    readTime: '8 min',
    author: 'Rhea Patel',
    authorRole: 'Head of Atelier',
    excerpt: 'After thousands of orders and hundreds of conversations with customers, here is our definitive guide to 2+ week wear.',
    nailArt: { shape: 'oval', finish: 'pearl', art: 'line', baseColour: '#F0EBE3', accentColour: '#D9B57C', length: 'short' },
    accentColor: '#EDE8DF',
    content: [
      {
        heading: 'Prep Is 90% of the Bond',
        paragraphs: [
          'The number one reason press-on nails pop off early is natural oils on the nail plate. Always wipe each nail with the included alcohol wipe, and gently dehydrate the surface before applying glue.',
          'Wait 2 hours before exposing your hands to hot water or steam after application to allow the cyanoacrylate bonds to fully cure.',
        ],
      },
    ],
  },
  'bridal-vowed-collection': {
    id: 'bridal-vowed-collection',
    category: 'Collection',
    title: 'Vowed — Designing for the Most Important Day',
    date: 'May 2026',
    readTime: '5 min',
    author: 'Anya Sen',
    authorRole: 'Founder & Creative Director',
    excerpt: 'Bridal nails carry sentimental weight. They appear in every ring shot, hold every varmala, and clasp every glass of champagne.',
    nailArt: { shape: 'almond', finish: 'pearl', art: 'floral', baseColour: '#FAF7F2', accentColour: '#D9B57C', length: 'long' },
    accentColor: '#FAF7F2',
    content: [
      {
        heading: 'Heirloom Elegance',
        paragraphs: [
          'When designing the Vowed bridal collection, we wanted designs that would feel just as exquisite in a wedding album fifty years from now as they do on the wedding day.',
          'Soft ivory pearl, delicate hand-painted micro-florals, and subtle champagne gold accents create a harmonious balance with bridal lehengas, sarees, and white gowns alike.',
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(ARTICLES_DATA).map((id) => ({ id }));
}

export default async function JournalArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = ARTICLES_DATA[id];

  if (!article) {
    notFound();
  }

  return (
    <>
      <title>{article.title} — ORRA Journal</title>
      <main style={{ background: 'var(--parchment)', minHeight: '100vh', paddingTop: 'calc(36px + 64px)' }}>
        
        {/* Breadcrumb / Top Bar */}
        <section style={{ background: 'var(--linen)', borderBottom: '1px solid var(--oat)', padding: '1rem 1.5rem' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link
              href="/journal"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 13,
                color: 'var(--deep-olive)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                textDecoration: 'none',
              }}
            >
              <ChevronLeft size={14} /> Back to Journal
            </Link>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--espresso)',
                background: 'var(--parchment)',
                padding: '4px 10px',
                borderRadius: 2,
                border: '1px solid var(--oat)',
              }}
            >
              {article.category}
            </span>
          </div>
        </section>

        {/* Hero Section */}
        <section style={{ padding: '3.5rem 1.5rem 2.5rem' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <p className="eyebrow" style={{ marginBottom: '1rem', color: 'var(--gold)' }}>
              {article.category} &middot; Notes from the Atelier
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 300,
                color: 'var(--espresso)',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              {article.title}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 16,
                color: 'var(--cocoa)',
                lineHeight: 1.7,
                marginBottom: '2rem',
                fontStyle: 'italic',
              }}
            >
              {article.excerpt}
            </p>

            {/* Author & Meta */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 0',
                borderTop: '1px solid var(--oat)',
                borderBottom: '1px solid var(--oat)',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 500, color: 'var(--espresso)' }}>
                  By {article.author}
                </p>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)' }}>
                  {article.authorRole}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--deep-olive)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Calendar size={13} strokeWidth={1.5} /> {article.date}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={13} strokeWidth={1.5} /> {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Visual */}
        <section style={{ padding: '0 1.5rem 3.5rem' }}>
          <div
            style={{
              maxWidth: 860,
              margin: '0 auto',
              background: article.accentColor,
              borderRadius: 6,
              height: 340,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(43,27,19,0.06)',
            }}
          >
            <NailArt
              {...article.nailArt}
              size="lg"
              single
              singleIndex={2}
              animate
            />
          </div>
        </section>

        {/* Article Body */}
        <section style={{ padding: '0 1.5rem 5rem' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {article.content.map((sec, idx) => (
              <div key={idx} style={{ marginBottom: '3rem' }}>
                {sec.heading && (
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 3vw, 1.85rem)',
                      fontWeight: 300,
                      color: 'var(--espresso)',
                      marginBottom: '1rem',
                    }}
                  >
                    {sec.heading}
                  </h2>
                )}
                {sec.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 15,
                      color: 'var(--cocoa)',
                      lineHeight: 1.85,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}

            {/* Bottom CTA & Share */}
            <div
              style={{
                marginTop: '4rem',
                padding: '2.5rem',
                background: 'var(--linen)',
                borderRadius: 4,
                border: '1px solid rgba(185,138,78,0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <p className="eyebrow" style={{ color: 'var(--gold)' }}>The Atelier Collection</p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontSize: 24,
                  fontWeight: 300,
                  color: 'var(--espresso)',
                }}
              >
                Experience the craft in person.
              </h3>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--cocoa)', maxWidth: 440 }}>
                Every set is hand-poured, shaped, and polished in our studio. Find your match or design your own bespoke set.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link href="/shop" className="btn btn-primary">
                  <span>Explore the Shop</span>
                </Link>
                <Link href="/fit" className="btn btn-outline">
                  <span>Find Your Size</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
