// ─── ORRA NAILS — Legal Pages (Privacy, Terms, Returns) ──────────────────────
// Static server component — no 'use client' needed

import React from 'react';
import Link from 'next/link';

const LEGAL_CONTENT: Record<string, { title: string; lastUpdated: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'October 2026',
    sections: [
      {
        heading: 'Who We Are',
        body: 'ORRA Nails ("we", "us", "our") is an artisan press-on nail studio. This Privacy Policy describes how we collect, use, and protect your personal information when you visit orranails.com or place an order with us.',
      },
      {
        heading: 'Information We Collect',
        body: 'We collect information you provide directly — such as your name, email address, shipping address, phone number, and payment information when you make a purchase. We also collect device and usage data automatically (browser type, pages visited, referrer URL) via cookies and analytics tools. We do not sell your personal data to third parties.',
      },
      {
        heading: 'How We Use Your Information',
        body: 'We use your information to process and ship orders, communicate about your purchase, send transactional emails, and, with your consent, send occasional marketing communications. We use anonymised analytics data to improve the website and understand which products are most loved.',
      },
      {
        heading: 'Payment Processing',
        body: 'All payments are processed by third-party providers (Razorpay for India, Stripe for international). We never store your full card number on our servers. Your payment data is protected under PCI-DSS standards.',
      },
      {
        heading: 'Cookies',
        body: 'We use essential cookies to keep your bag and region preference intact, and optional analytics cookies to understand site usage. You can disable non-essential cookies at any time via your browser settings. Our cookie banner allows you to manage preferences on your first visit.',
      },
      {
        heading: 'Data Retention',
        body: 'We retain order data for 7 years as required by Indian accounting regulations. Marketing preferences and account data are retained until you ask us to delete them. Send a deletion request to hello@orranails.com and we will respond within 30 days.',
      },
      {
        heading: 'Your Rights',
        body: 'You have the right to access, correct, or delete the personal data we hold about you. If you are in the EU or UK, additional rights apply under GDPR. Email hello@orranails.com to exercise any of these rights.',
      },
      {
        heading: 'Contact',
        body: 'For privacy questions, email hello@orranails.com. We take data privacy seriously and will respond within 5 business days.',
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    lastUpdated: 'October 2026',
    sections: [
      {
        heading: 'Acceptance of Terms',
        body: 'By accessing orranails.com or placing an order, you agree to these Terms of Service. If you do not agree, please do not use our website or services.',
      },
      {
        heading: 'Products',
        body: 'All products are handmade in India. Colours and finishes may vary slightly from product photography due to screen calibration and the handmade nature of each set. We reserve the right to modify or discontinue any product without notice.',
      },
      {
        heading: 'Pricing',
        body: 'All prices are displayed in your selected currency. We reserve the right to change prices at any time. For international orders, currency conversion rates are indicative and final charges are made in the order currency at checkout.',
      },
      {
        heading: 'Order Acceptance',
        body: 'Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel orders at our discretion, including in the case of pricing errors. If your order is cancelled, you will receive a full refund.',
      },
      {
        heading: 'Intellectual Property',
        body: 'All content on orranails.com — including product images, design assets, copy, and the ORRA brand mark — is the intellectual property of ORRA Nails. You may not reproduce, distribute, or use our content without express written permission.',
      },
      {
        heading: 'Limitation of Liability',
        body: 'ORRA Nails is not liable for any indirect, incidental, or consequential damages arising from your use of our products or website. Our maximum liability is limited to the amount you paid for the product in question.',
      },
      {
        heading: 'Governing Law',
        body: 'These terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.',
      },
      {
        heading: 'Changes to Terms',
        body: 'We may update these terms at any time. Continued use of the website after changes constitutes acceptance of the revised terms.',
      },
    ],
  },
  returns: {
    title: 'Returns & Shipping',
    lastUpdated: 'October 2026',
    sections: [
      {
        heading: 'Returns Policy',
        body: 'We accept returns of unworn, unopened sets in their original packaging within 7 days of delivery. Custom Studio orders are non-refundable unless there is a manufacturing defect. To start a return, email hello@orranails.com with your order number.',
      },
      {
        heading: 'Return Shipping',
        body: 'For domestic India returns, we provide a prepaid return label. For international returns, the customer is responsible for return shipping costs. We recommend using a tracked service — we cannot process refunds for items lost in transit.',
      },
      {
        heading: 'Refunds',
        body: 'Once we receive and inspect your return, we will process a refund to your original payment method within 5–7 business days. You will receive an email when your refund is issued.',
      },
      {
        heading: 'Damaged or Incorrect Items',
        body: 'If you receive a damaged or incorrect item, please email us within 48 hours of delivery with photographs. We will send a replacement at no cost to you. We do not require you to return damaged items.',
      },
      {
        heading: 'India Shipping',
        body: 'Standard sets are dispatched within 1–2 business days. Custom Studio orders take 4–6 business days to handcraft before shipping. Delivery is 3–5 business days via our courier partners. Free shipping on orders above ₹2,500.',
      },
      {
        heading: 'International Shipping',
        body: 'We ship worldwide. International delivery takes 7–14 business days depending on destination. Free international shipping on orders above $75 USD. Customs duties and import taxes are the responsibility of the customer.',
      },
      {
        heading: 'Tracking',
        body: 'All orders receive a tracking number via email once dispatched. You can track your order via the courier\'s website. If you have not received tracking information within 3 business days, email hello@orranails.com.',
      },
    ],
  },
};

// ─── Legal Page ────────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return [
    { page: 'privacy' },
    { page: 'terms' },
    { page: 'returns' },
  ];
}

interface LegalPageProps {
  params: Promise<{ page: string }>;
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { page } = await params;
  const content = LEGAL_CONTENT[page];

  if (!content) {
    return (
      <main style={{ minHeight: '100vh', paddingTop: 'calc(36px + 64px + 4rem)', background: 'var(--parchment)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Not Found</p>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--espresso)', marginBottom: '1.5rem' }}>This page doesn't exist.</p>
          <Link href="/" className="btn btn-primary"><span>Go Home</span></Link>
        </div>
      </main>
    );
  }

  const SIBLING_PAGES = [
    { slug: 'privacy', label: 'Privacy Policy' },
    { slug: 'terms', label: 'Terms of Service' },
    { slug: 'returns', label: 'Returns & Shipping' },
  ];

  return (
    <>
      <title>{content.title} — ORRA Nails</title>
      <main style={{ background: 'var(--parchment)', minHeight: '100vh', paddingTop: 'calc(36px + 64px)' }}>

        {/* Header */}
        <section style={{ background: 'var(--espresso)', padding: '4rem 1.5rem 3rem' }}>
          <div className="leaf-overlay" />
          <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
            <p className="eyebrow" style={{ color: 'var(--soft-gold)', marginBottom: '0.75rem' }}>Legal</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--parchment)' }}>
              {content.title}
            </h1>
            <p style={{ marginTop: '0.75rem', fontFamily: 'var(--font-ui)', fontSize: 12, color: 'rgba(251,247,241,0.4)' }}>
              Last updated: {content.lastUpdated}
            </p>
          </div>
        </section>

        {/* Sibling nav */}
        <nav style={{ background: 'var(--linen)', borderBottom: '1px solid var(--oat)', padding: '1rem 1.5rem' }} aria-label="Legal pages">
          <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {SIBLING_PAGES.map((p) => (
              <Link
                key={p.slug}
                href={`/legal/${p.slug}`}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: p.slug === page ? 'var(--espresso)' : 'var(--cocoa)',
                  textDecoration: p.slug === page ? 'underline' : 'none',
                  fontWeight: p.slug === page ? 500 : 300,
                  textUnderlineOffset: 3,
                }}
              >
                {p.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Content */}
        <section style={{ padding: '4rem 1.5rem 6rem' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {content.sections.map((section) => (
              <div key={section.heading} style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.75rem', letterSpacing: '0.02em' }}>
                  {section.heading}
                </h2>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--cocoa)', lineHeight: 1.85 }}>
                  {section.body}
                </p>
              </div>
            ))}

            {/* Contact */}
            <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--linen)', border: '1px solid rgba(185,138,78,0.2)', borderRadius: 4 }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--espresso)', marginBottom: 6 }}>Questions about this policy?</p>
              <a href="mailto:hello@orranails.com" style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--gold)', textDecoration: 'none' }}>
                hello@orranails.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
