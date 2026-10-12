// ─── ORRA NAILS — Configuration ──────────────────────────────────────────────
// Backend integration points:
// - Replace static rates with /api/rates endpoint for live exchange rates
// - Move all pricing to /api/price for server-side computation
// - Never trust client-side prices at checkout; re-compute on server

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', locale: 'en-IN', rate: 1, label: 'India (₹ INR)' },
  USD: { code: 'USD', symbol: '$', locale: 'en-US', rate: 1, label: 'United States ($ USD)' },
  GBP: { code: 'GBP', symbol: '£', locale: 'en-GB', rate: 0.78, label: 'United Kingdom (£ GBP)' },
  AED: { code: 'AED', symbol: 'AED', locale: 'ar-AE', rate: 3.67, label: 'UAE (AED)' },
  CAD: { code: 'CAD', symbol: 'CA$', locale: 'en-CA', rate: 1.37, label: 'Canada (CA$ CAD)' },
  AUD: { code: 'AUD', symbol: 'A$', locale: 'en-AU', rate: 1.50, label: 'Australia (A$ AUD)' },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export const REGIONS = {
  IN: { currency: 'INR' as CurrencyCode, country: 'India', freeShippingThreshold: 2500, useCOD: true },
  GB: { currency: 'GBP' as CurrencyCode, country: 'United Kingdom', freeShippingThreshold: 75, useCOD: false },
  AE: { currency: 'AED' as CurrencyCode, country: 'UAE', freeShippingThreshold: 275, useCOD: false },
  CA: { currency: 'CAD' as CurrencyCode, country: 'Canada', freeShippingThreshold: 103, useCOD: false },
  AU: { currency: 'AUD' as CurrencyCode, country: 'Australia', freeShippingThreshold: 113, useCOD: false },
  DEFAULT: { currency: 'USD' as CurrencyCode, country: 'International', freeShippingThreshold: 75, useCOD: false },
} as const;

export type RegionCode = keyof typeof REGIONS;

// ─── Studio Pricing (USD base) ────────────────────────────────────────────────
export const STUDIO_PRICING_USD = {
  base: 42,
  lengthAdd: { short: 0, medium: 4, long: 8 },
  finishAdd: { glossy: 0, matte: 0, chrome: 6, 'cat-eye': 5, glitter: 4, pearl: 4 },
  artAdd: { none: 0, french: 0, floral: 3, foil: 3, line: 3, pearls: 4, ombre: 3 },
  nameAdd: 5,
  customSizeAdd: 4,
} as const;

// ─── Studio Pricing (INR) ─────────────────────────────────────────────────────
export const STUDIO_PRICING_INR = {
  base: 2199,
  lengthAdd: { short: 0, medium: 199, long: 399 },
  finishAdd: { glossy: 0, matte: 0, chrome: 299, 'cat-eye': 249, glitter: 199, pearl: 199 },
  artAdd: { none: 0, french: 0, floral: 149, foil: 149, line: 149, pearls: 199, ombre: 149 },
  nameAdd: 249,
  customSizeAdd: 199,
} as const;

// ─── Shape Options ────────────────────────────────────────────────────────────
export const SHAPES = [
  { id: 'square', label: 'Square' },
  { id: 'oval', label: 'Oval' },
  { id: 'soft-square', label: 'Soft Square' },
  { id: 'almond', label: 'Almond' },
  { id: 'coffin', label: 'Coffin/Ballerina' },
  { id: 'stiletto', label: 'Stiletto' },
] as const;

export type ShapeId = typeof SHAPES[number]['id'];

// ─── Size Chart (mm: thumb/index/middle/ring/pinky) ───────────────────────────
export const SIZE_CHART = {
  XS: [14, 10, 11, 10, 8],
  S:  [15, 11, 12, 11, 9],
  M:  [16, 12, 13, 12, 10],
  L:  [17, 13, 14, 13, 11],
  XL: [18, 14, 15, 14, 12],
} as const;

export type SizeId = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Custom';

// ─── Intentions ───────────────────────────────────────────────────────────────
export const INTENTIONS = {
  grounded: {
    id: 'grounded',
    label: 'Grounded',
    tagline: 'Quiet, polished, everyday',
    description: 'Calm neutrals and clean lines for the days when you want to be entirely yourself.',
    tint: '#E4E1D2',
    accent: '#4F5B3F',
    emoji: '🌿',
  },
  radiant: {
    id: 'radiant',
    label: 'Radiant',
    tagline: 'Light on your fingertips',
    description: 'Chrome, shimmer and gold for when you want your hands to catch the room.',
    tint: '#F1E3C8',
    accent: '#B98A4E',
    emoji: '✨',
  },
  tender: {
    id: 'tender',
    label: 'Tender',
    tagline: 'Soft florals and gentle colour',
    description: 'Hand-painted botanicals and blush tones for when softness is the statement.',
    tint: '#F0DDD3',
    accent: '#B5705C',
    emoji: '🌸',
  },
  magnetic: {
    id: 'magnetic',
    label: 'Magnetic',
    tagline: 'Bold, sculpted, unmissable',
    description: 'Statement shapes, 3D accents and deep tones that command attention.',
    tint: '#D8CBBE',
    accent: '#1A100B',
    emoji: '🖤',
  },
  vowed: {
    id: 'vowed',
    label: 'Vowed',
    tagline: 'For brides, and the people who love them',
    description: 'Pearl, lace and ivory — made for the most intentional day of your life.',
    tint: '#F4EEE6',
    accent: '#D9B57C',
    emoji: '🤍',
  },
} as const;

export type IntentionId = keyof typeof INTENTIONS;

// ─── Finishes ─────────────────────────────────────────────────────────────────
export const FINISHES = [
  { id: 'glossy', label: 'Glossy' },
  { id: 'matte', label: 'Matte' },
  { id: 'chrome', label: 'Chrome' },
  { id: 'cat-eye', label: 'Cat-Eye' },
  { id: 'glitter', label: 'Glitter' },
  { id: 'pearl', label: 'Pearl Shimmer' },
] as const;

export type FinishId = typeof FINISHES[number]['id'];

// ─── Art Options ──────────────────────────────────────────────────────────────
export const ART_OPTIONS = [
  { id: 'none', label: 'None' },
  { id: 'french', label: 'French Tip' },
  { id: 'floral', label: 'Floral Sprig' },
  { id: 'foil', label: 'Gold Foil' },
  { id: 'line', label: 'Minimal Line' },
  { id: 'pearls', label: '3D Pearls' },
  { id: 'ombre', label: 'Ombré' },
] as const;

export type ArtId = typeof ART_OPTIONS[number]['id'];

// ─── Base Colour Swatches ─────────────────────────────────────────────────────
export const BASE_COLOURS = [
  { id: 'oat', label: 'Oat', hex: '#E9DDCC' },
  { id: 'ivory', label: 'Ivory', hex: '#F5F0E8' },
  { id: 'latte', label: 'Latte', hex: '#D4B896' },
  { id: 'mocha', label: 'Mocha', hex: '#9E7B5A' },
  { id: 'espresso', label: 'Espresso', hex: '#2B1B13' },
  { id: 'sage', label: 'Sage', hex: '#8A9A7B' },
  { id: 'olive', label: 'Olive', hex: '#6B7A55' },
  { id: 'moss', label: 'Moss', hex: '#4F5B3F' },
  { id: 'blush', label: 'Blush', hex: '#E8CFC3' },
  { id: 'clay', label: 'Clay Rose', hex: '#B5705C' },
  { id: 'rosewood', label: 'Rosewood', hex: '#9E5A4A' },
  { id: 'gold', label: 'Gold', hex: '#B98A4E' },
  { id: 'champagne', label: 'Champagne', hex: '#D9B57C' },
  { id: 'pearl', label: 'Pearl', hex: '#F0EBE3' },
  { id: 'ink', label: 'Ink', hex: '#1A100B' },
  { id: 'plum', label: 'Plum', hex: '#5C3A5A' },
] as const;

export type BaseColourId = typeof BASE_COLOURS[number]['id'];

// ─── Announcement Bar Messages ────────────────────────────────────────────────
export const ANNOUNCEMENTS = [
  'Handmade in India. Shipped worldwide.',
  'Made fresh in 3 to 5 business days.',
  'Not sure of your size? Try the Fit Atelier.',
];

// ─── In The Box ───────────────────────────────────────────────────────────────
export const IN_THE_BOX = [
  '10 hand-painted press-on nails',
  'Nail glue',
  'Adhesive tabs',
  'Mini nail file',
  'Cuticle stick',
  'Clear travel and storage case',
];
