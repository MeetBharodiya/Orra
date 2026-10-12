// ─── ORRA NAILS — Product Data ───────────────────────────────────────────────
// Backend integration point: replace this with /api/products endpoint
// NailArt config drives all SVG renders — images[] field for real photos later

import type { ShapeId, FinishId, ArtId, IntentionId, SizeId } from './config';

export interface NailArtConfig {
  shape: ShapeId;
  length: 'short' | 'medium' | 'long';
  baseColour: string;         // hex or colour name
  baseGradient?: [string, string]; // [from, to]
  finish: FinishId;
  art: ArtId;
  accentFingers?: number[];   // 0=thumb … 4=pinky
  accentColour?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  intention: IntentionId;
  nailArt: NailArtConfig;
  size: SizeId;
  priceUSD: number;
  priceINR: number;
  tagline: string; // one-line italic maker's note
  description: string;
  shape: ShapeId;
  images?: string[]; // real photo paths for later
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const PRODUCTS: Product[] = [
  // ── GROUNDED ────────────────────────────────────────────────────────────────
  {
    id: 'oat-milk',
    slug: 'oat-milk',
    name: 'Oat Milk',
    intention: 'grounded',
    shape: 'almond',
    size: 'M',
    priceUSD: 22,
    priceINR: 1199,
    tagline: 'For the days you want to look put together without trying.',
    description: 'A sheer milky beige in a flattering almond shape, with a single delicate gold line on the ring finger.',
    rating: 4.9,
    reviewCount: 47,
    isNew: false,
    isBestSeller: true,
    nailArt: {
      shape: 'almond',
      length: 'medium',
      baseColour: '#E9DDCC',
      finish: 'glossy',
      art: 'line',
      accentFingers: [3],
      accentColour: '#B98A4E',
    },
  },
  {
    id: 'sage-morning',
    slug: 'sage-morning',
    name: 'Sage Morning',
    intention: 'grounded',
    shape: 'soft-square',
    size: 'S',
    priceUSD: 24,
    priceINR: 1299,
    tagline: 'The quiet colour of early mornings and good decisions.',
    description: 'Glossy sage in a soft square shape, with a tiny hand-painted gold sprig on the ring finger.',
    rating: 4.8,
    reviewCount: 31,
    isNew: true,
    isBestSeller: false,
    nailArt: {
      shape: 'soft-square',
      length: 'short',
      baseColour: '#8A9A7B',
      finish: 'glossy',
      art: 'floral',
      accentFingers: [3],
      accentColour: '#B98A4E',
    },
  },
  {
    id: 'mocha-french',
    slug: 'mocha-french',
    name: 'Mocha French',
    intention: 'grounded',
    shape: 'square',
    size: 'M',
    priceUSD: 26,
    priceINR: 1399,
    tagline: 'A modern French that goes with everything you own.',
    description: 'A warm nude base with a clean espresso french tip — classic, elevated, effortlessly polished.',
    rating: 4.7,
    reviewCount: 28,
    isNew: false,
    isBestSeller: true,
    nailArt: {
      shape: 'square',
      length: 'medium',
      baseColour: '#D4B896',
      finish: 'glossy',
      art: 'french',
      accentColour: '#2B1B13',
    },
  },
  // ── RADIANT ─────────────────────────────────────────────────────────────────
  {
    id: 'golden-hour',
    slug: 'golden-hour',
    name: 'Golden Hour',
    intention: 'radiant',
    shape: 'almond',
    size: 'M',
    priceUSD: 34,
    priceINR: 1799,
    tagline: 'The light just before evening, held between your fingers.',
    description: 'Champagne chrome with hand-scattered gold foil flecks — shimmers differently in every light.',
    rating: 4.9,
    reviewCount: 62,
    isNew: false,
    isBestSeller: true,
    nailArt: {
      shape: 'almond',
      length: 'medium',
      baseColour: '#D9B57C',
      finish: 'chrome',
      art: 'foil',
      accentColour: '#B98A4E',
    },
  },
  {
    id: 'honey-cat-eye',
    slug: 'honey-cat-eye',
    name: 'Honey Cat-Eye',
    intention: 'radiant',
    shape: 'coffin',
    size: 'M',
    priceUSD: 32,
    priceINR: 1699,
    tagline: 'Magnetic. Warm. Impossible to ignore.',
    description: 'A rich amber cat-eye finish in a flattering coffin shape, shifting from gold to honey in the light.',
    rating: 4.8,
    reviewCount: 39,
    isNew: true,
    isBestSeller: false,
    nailArt: {
      shape: 'coffin',
      length: 'medium',
      baseColour: '#C9854A',
      finish: 'cat-eye',
      art: 'none',
    },
  },
  // ── TENDER ──────────────────────────────────────────────────────────────────
  {
    id: 'wild-blush',
    slug: 'wild-blush',
    name: 'Wild Blush',
    intention: 'tender',
    shape: 'almond',
    size: 'M',
    priceUSD: 30,
    priceINR: 1599,
    tagline: 'As if someone scattered flowers across your hands while you slept.',
    description: 'Glossy blush with hand-painted gypsophila — tiny, precise, perfectly imperfect.',
    rating: 4.9,
    reviewCount: 54,
    isNew: false,
    isBestSeller: true,
    nailArt: {
      shape: 'almond',
      length: 'medium',
      baseColour: '#E8CFC3',
      finish: 'glossy',
      art: 'floral',
      accentColour: '#FFFFFF',
    },
  },
  {
    id: 'rosewater',
    slug: 'rosewater',
    name: 'Rosewater',
    intention: 'tender',
    shape: 'soft-square',
    size: 'S',
    priceUSD: 26,
    priceINR: 1399,
    tagline: 'Soft as a memory. Gentle as a beginning.',
    description: 'Clay rose fading to blush, with tiny pearl accents — tender and unhurried.',
    rating: 4.7,
    reviewCount: 22,
    isNew: true,
    isBestSeller: false,
    nailArt: {
      shape: 'soft-square',
      length: 'short',
      baseColour: '#B5705C',
      baseGradient: ['#B5705C', '#E8CFC3'],
      finish: 'glossy',
      art: 'pearls',
      accentFingers: [1, 3],
    },
  },
  {
    id: 'dried-bloom',
    slug: 'dried-bloom',
    name: 'Dried Bloom',
    intention: 'tender',
    shape: 'oval',
    size: 'M',
    priceUSD: 32,
    priceINR: 1699,
    tagline: 'For hands that carry beauty quietly.',
    description: 'Matte oat with a hand-painted dried botanical sprig — considered, unhurried, singular.',
    rating: 4.8,
    reviewCount: 35,
    isNew: false,
    isBestSeller: false,
    nailArt: {
      shape: 'oval',
      length: 'medium',
      baseColour: '#E9DDCC',
      finish: 'matte',
      art: 'floral',
      accentColour: '#8A9A7B',
    },
  },
  // ── MAGNETIC ────────────────────────────────────────────────────────────────
  {
    id: 'midnight-velvet',
    slug: 'midnight-velvet',
    name: 'Midnight Velvet',
    intention: 'magnetic',
    shape: 'stiletto',
    size: 'L',
    priceUSD: 52,
    priceINR: 2799,
    tagline: 'For when you want to walk into a room and own it entirely.',
    description: 'Matte ink stilettos with plum depth, finished with sculptural 3D gold accents on two nails.',
    rating: 4.9,
    reviewCount: 48,
    isNew: false,
    isBestSeller: true,
    nailArt: {
      shape: 'stiletto',
      length: 'long',
      baseColour: '#1A100B',
      finish: 'matte',
      art: 'foil',
      accentFingers: [1, 3],
      accentColour: '#B98A4E',
    },
  },
  {
    id: 'gilded-sprig',
    slug: 'gilded-sprig',
    name: 'Gilded Sprig',
    intention: 'magnetic',
    shape: 'coffin',
    size: 'L',
    priceUSD: 58,
    priceINR: 2999,
    tagline: 'Every finger, a conversation.',
    description: 'Glossy espresso coffin nails with a 3D gold leaf sprig painted on every nail — maximalist, refined.',
    rating: 4.9,
    reviewCount: 29,
    isNew: true,
    isBestSeller: false,
    nailArt: {
      shape: 'coffin',
      length: 'long',
      baseColour: '#2B1B13',
      finish: 'glossy',
      art: 'floral',
      accentColour: '#B98A4E',
    },
  },
  // ── VOWED ───────────────────────────────────────────────────────────────────
  {
    id: 'veil',
    slug: 'veil',
    name: 'Veil',
    intention: 'vowed',
    shape: 'almond',
    size: 'M',
    priceUSD: 48,
    priceINR: 2599,
    tagline: 'Made for the most intentional day of your life.',
    description: 'Sheer pearl with champagne shimmer and fine lace-like gold linework — delicate, enduring, yours.',
    rating: 5.0,
    reviewCount: 41,
    isNew: false,
    isBestSeller: true,
    nailArt: {
      shape: 'almond',
      length: 'medium',
      baseColour: '#F0EBE3',
      finish: 'pearl',
      art: 'line',
      accentColour: '#D9B57C',
    },
  },
  {
    id: 'ivory-vow',
    slug: 'ivory-vow',
    name: 'Ivory Vow',
    intention: 'vowed',
    shape: 'soft-square',
    size: 'M',
    priceUSD: 44,
    priceINR: 2399,
    tagline: 'Simply beautiful. Quietly unforgettable.',
    description: 'Glossy ivory with a delicate gold hairline and pearl accents — classical, considered, forever.',
    rating: 4.8,
    reviewCount: 33,
    isNew: false,
    isBestSeller: false,
    nailArt: {
      shape: 'soft-square',
      length: 'medium',
      baseColour: '#F5F0E8',
      finish: 'glossy',
      art: 'pearls',
      accentFingers: [1, 3],
      accentColour: '#D9B57C',
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByIntention(intention: IntentionId): Product[] {
  return PRODUCTS.filter((p) => p.intention === intention);
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getNewProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isNew);
}

export function getBestSellers(): Product[] {
  return PRODUCTS.filter((p) => p.isBestSeller);
}
