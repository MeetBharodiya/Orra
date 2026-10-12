import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BagDrawer from '@/components/bag/BagDrawer';
import ToastContainer from '@/components/ui/ToastContainer';
import RegionProvider from '@/components/providers/RegionProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-ui',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://orranails.com'),
  title: {
    default: 'ORRA Nails — Crafted with Intention',
    template: '%s | ORRA Nails',
  },
  description:
    'Handmade, hand-painted press-on nails made in India and shipped worldwide. Choose by intention: Grounded, Radiant, Tender, Magnetic, or Vowed.',
  keywords: ['press on nails', 'handmade nails', 'nail art India', 'custom nails', 'press on nails India'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://orranails.com',
    siteName: 'ORRA Nails',
    title: 'ORRA Nails — Crafted with Intention',
    description:
      'Handmade, hand-painted press-on nails. Made in India, shipped worldwide. Choose by how you want to feel.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ORRA Nails' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ORRA Nails — Crafted with Intention',
    description: 'Handmade press-on nails. Made in India, shipped worldwide.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'ORRA Nails',
              url: 'https://orranails.com',
              logo: 'https://orranails.com/logo.png',
              description:
                'Handmade, hand-painted press-on nails crafted with intention. Made in India, shipped worldwide.',
              sameAs: [
                'https://instagram.com/orranails',
                'https://pinterest.com/orranails',
                'https://etsy.com/shop/orranails',
              ],
            }),
          }}
        />
      </head>
      <body className="grain">
        <RegionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <BagDrawer />
          <ToastContainer />
        </RegionProvider>
      </body>
    </html>
  );
}
