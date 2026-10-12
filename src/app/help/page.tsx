'use client';
// ─── ORRA NAILS — Help / FAQ ──────────────────────────────────────────────────

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Mail, MessageCircle } from 'lucide-react';

// ─── FAQ data ──────────────────────────────────────────────────────────────────
const FAQ_SECTIONS = [
  {
    title: 'About the Nails',
    items: [
      {
        q: 'Are ORRA nails reusable?',
        a: 'Yes — with proper care, each set can be worn 10–20 times. After removal, clean gently with nail polish remover and store in the travel case provided.',
      },
      {
        q: 'What adhesive do you recommend?',
        a: 'We include adhesive tabs with every set. For longer wear (5–7 days), our nail glue gives a more secure hold. Never use super glue — it makes removal difficult and can damage your nail bed.',
      },
      {
        q: 'How long do they last with adhesive tabs vs glue?',
        a: 'Adhesive tabs last 1–3 days and are easy to remove. Nail glue lasts 5–10 days. For special occasions, glue is ideal. For daily use, tabs are gentler on your natural nail.',
      },
      {
        q: 'Are ORRA nails safe for natural nails?',
        a: 'Our nails are made from high-quality ABS resin that is free from harmful chemicals. The adhesive tabs are completely nail-safe. If using glue, follow the removal guide to avoid any stress on your natural nail.',
      },
      {
        q: 'Can I file or reshape the nails?',
        a: 'Yes. All our nail shapes can be gently filed to adjust the length or taper. We recommend a fine-grit file and always file in one direction.',
      },
    ],
  },
  {
    title: 'Sizing & Fit',
    items: [
      {
        q: 'How do I find my size?',
        a: 'Use our Fit Atelier — a step-by-step measuring guide that uses a tape measure or ruler to map your nail widths to one of our standard sizes (XS through XL). You can also order a Custom Set with your exact measurements.',
      },
      {
        q: 'What do the sizes XS, S, M, L, XL mean?',
        a: 'Each size represents a complete set of 10 nail sizes (thumb through pinky for both hands). Our size chart maps typical nail width ranges at each size. You can find the exact measurements on our Fit Atelier page.',
      },
      {
        q: 'What if my nails are between sizes?',
        a: 'We recommend sizing up. Alternatively, our Custom Studio lets you submit your exact finger-by-finger measurements for a set made precisely for you.',
      },
      {
        q: 'Do you offer half-sizes or individual nail replacements?',
        a: 'Custom sets are entirely bespoke. If you lose a nail from a standard set, email us at hello@orranails.com with your order number and we will do our best to send a replacement.',
      },
    ],
  },
  {
    title: 'Orders & Shipping',
    items: [
      {
        q: 'How long does production take?',
        a: 'Standard sets ship within 1–2 business days. Custom Studio orders (bespoke sizing or personalisation) take 4–6 business days to handcraft.',
      },
      {
        q: 'Where do you ship?',
        a: 'We ship worldwide. Domestic India delivery takes 3–5 days. International orders take 7–14 business days depending on destination.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes — free shipping on all India orders above ₹2,500 and international orders above $75 USD. Shipping rates are shown at checkout.',
      },
      {
        q: 'Can I change or cancel my order?',
        a: 'Orders can be modified or cancelled within 2 hours of placing them. After that, production may have begun. Email hello@orranails.com immediately and we will do everything we can.',
      },
      {
        q: 'Do you offer Cash on Delivery?',
        a: 'Yes — COD is available for all India orders. A ₹49 handling fee applies. Select COD at checkout.',
      },
    ],
  },
  {
    title: 'Returns & Exchanges',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 7 days of delivery for unworn, unopened sets in their original packaging. Custom orders are non-refundable unless there is a manufacturing defect.',
      },
      {
        q: 'How do I start a return?',
        a: 'Email hello@orranails.com with your order number and reason. We will send a prepaid return label for domestic India orders. International returns are at the customer\'s cost.',
      },
      {
        q: 'What if my order arrives damaged?',
        a: 'We\'re so sorry. Please photograph the damage and email us within 48 hours of delivery. We will send a replacement set at no charge.',
      },
    ],
  },
  {
    title: 'Custom Studio',
    items: [
      {
        q: 'How does Custom Studio work?',
        a: 'Visit the Studio page and use our live builder to select your shape, length, base colour, finish, and art details. You can also enter your nail measurements for a bespoke fit. Once confirmed, our artisans hand-craft your set within 4–6 business days.',
      },
      {
        q: 'Can I add personalisation (my name, initials)?',
        a: 'Yes — the Studio builder has a personalisation field. Names and initials are painted by hand on your chosen accent nails.',
      },
      {
        q: 'Can I gift a Custom Set?',
        a: 'Absolutely. Add a gift note at checkout. We also offer gift cards if you\'d like the recipient to design their own set.',
      },
    ],
  },
];

// ─── Accordion item ────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
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
          padding: '1.1rem 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '1rem',
        }}
        aria-expanded={open}
      >
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--espresso)', fontWeight: 400, lineHeight: 1.5 }}>{q}</span>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          color="var(--deep-olive)"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? 400 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <p style={{ paddingBottom: '1.25rem', fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--cocoa)', lineHeight: 1.8 }}>{a}</p>
      </div>
    </div>
  );
}

// ─── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', orderNum: '', message: '', topic: 'order' });

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    background: 'var(--linen)',
    border: '1px solid var(--oat)',
    borderRadius: 3,
    fontFamily: 'var(--font-ui)',
    fontSize: 14,
    color: 'var(--espresso)',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--espresso)', marginBottom: '0.75rem' }}>
          Message received.
        </p>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--cocoa)' }}>
          We typically respond within 24 hours. Check your inbox — including spam.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label htmlFor="help-name" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: 6 }}>Name</label>
          <input id="help-name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')} onBlur={(e) => (e.target.style.borderColor = 'var(--oat)')} />
        </div>
        <div>
          <label htmlFor="help-email" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: 6 }}>Email</label>
          <input id="help-email" type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')} onBlur={(e) => (e.target.style.borderColor = 'var(--oat)')} />
        </div>
      </div>
      <div>
        <label htmlFor="help-topic" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: 6 }}>Topic</label>
        <select
          id="help-topic"
          value={form.topic}
          onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          {['Order status', 'Return / exchange', 'Sizing help', 'Custom Studio', 'Damaged item', 'Other'].map((t) => (
            <option key={t} value={t.toLowerCase().replace(/\s/g, '-')}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="help-order" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: 6 }}>Order Number (if applicable)</label>
        <input id="help-order" value={form.orderNum} onChange={(e) => setForm((f) => ({ ...f, orderNum: e.target.value }))} placeholder="ORR-XXXXXX" style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')} onBlur={(e) => (e.target.style.borderColor = 'var(--oat)')} />
      </div>
      <div>
        <label htmlFor="help-message" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: 6 }}>Message</label>
        <textarea
          id="help-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
          onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--oat)')}
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
        <span>Send Message</span>
      </button>
    </form>
  );
}

// ─── Help Page ─────────────────────────────────────────────────────────────────
export default function HelpPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <>
      <title>Help & FAQ — ORRA Nails</title>
      <main style={{ background: 'var(--parchment)', minHeight: '100vh', paddingTop: 'calc(36px + 64px)' }}>

        {/* Hero */}
        <section style={{ background: 'var(--espresso)', padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
          <div className="leaf-overlay" />
          <p className="eyebrow" style={{ color: 'var(--soft-gold)', marginBottom: '0.75rem', position: 'relative' }}>Help Centre</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--parchment)', position: 'relative' }}>
            How can we help?
          </h1>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'rgba(251,247,241,0.65)', marginTop: '1rem', maxWidth: 480, margin: '1rem auto 0', lineHeight: 1.75, position: 'relative' }}>
            Find answers to the most common questions below, or send us a message and we'll reply within 24 hours.
          </p>
        </section>

        {/* Quick links */}
        <section style={{ background: 'var(--linen)', padding: '2rem 1.5rem', borderBottom: '1px solid var(--oat)' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {FAQ_SECTIONS.map((s) => (
              <button
                key={s.title}
                onClick={() => {
                  setActiveSection(s.title);
                  document.getElementById(`faq-${s.title}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  padding: '8px 18px',
                  borderRadius: 20,
                  border: '1px solid rgba(185,138,78,0.3)',
                  background: activeSection === s.title ? 'var(--espresso)' : 'transparent',
                  color: activeSection === s.title ? 'var(--parchment)' : 'var(--espresso)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 12,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
              >
                {s.title}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Sections */}
        <section style={{ padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {FAQ_SECTIONS.map((section) => (
              <div key={section.title} id={`faq-${section.title}`}>
                <p className="eyebrow" style={{ marginBottom: '1rem' }}>{section.title}</p>
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Quick links strip */}
        <section style={{ background: 'var(--linen)', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { href: '/fit', label: 'Fit Atelier', desc: 'Find your perfect size with our tape measure guide' },
              { href: '/ritual', label: 'The Ritual', desc: 'Application and removal instructions' },
              { href: '/studio', label: 'Custom Studio', desc: 'Design a set made exactly for you' },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="card reveal"
                style={{ padding: '1.5rem', textDecoration: 'none', display: 'block' }}
              >
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 500, color: 'var(--espresso)', marginBottom: 6 }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--deep-olive)', lineHeight: 1.65 }}>{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section style={{ padding: '5rem 1.5rem', background: 'var(--parchment)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Get in Touch</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 28, color: 'var(--espresso)', marginBottom: '1.25rem' }}>
                  Still have a question?
                </h2>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--cocoa)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  We're a small, maker-led team and we read every message. We typically reply within 24 hours on business days.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href="mailto:hello@orranails.com" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--espresso)', textDecoration: 'none' }}>
                    <Mail size={15} strokeWidth={1.5} color="var(--gold)" />
                    hello@orranails.com
                  </a>
                  <a href="https://wa.me/message/orranails" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--espresso)', textDecoration: 'none' }}>
                    <MessageCircle size={15} strokeWidth={1.5} color="var(--gold)" />
                    WhatsApp (India only)
                  </a>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
