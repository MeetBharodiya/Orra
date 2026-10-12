// ─── ORRA NAILS — Pricing Library ────────────────────────────────────────────
// Backend integration point:
// - Replace getPrice() with a call to /api/price for server-side computation
// - At checkout, ALWAYS recompute totals server-side; never trust client prices
// - For live exchange rates, hit /api/rates before rendering price displays
// - Store region/currency on the order record, choose Razorpay vs Stripe server-side

import type { Product } from '@/data/products';
import {
  CURRENCIES,
  REGIONS,
  STUDIO_PRICING_USD,
  STUDIO_PRICING_INR,
  type CurrencyCode,
  type RegionCode,
  type FinishId,
  type ArtId,
} from '@/data/config';

// ─── Format a price with Intl.NumberFormat ────────────────────────────────────
export function formatPrice(amount: number, currency: CurrencyCode): string {
  const { locale } = CURRENCIES[currency];
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'INR' ? 0 : 2,
    maximumFractionDigits: currency === 'INR' ? 0 : 2,
  }).format(amount);
}

// ─── Get price for a product in the given region ──────────────────────────────
export function getPrice(product: Product, regionCode: RegionCode): number {
  if (regionCode === 'IN') {
    return product.priceINR;
  }
  const region = REGIONS[regionCode] ?? REGIONS.DEFAULT;
  const rate = CURRENCIES[region.currency].rate;
  // Convert USD → target currency, round to clean number
  const raw = product.priceUSD * rate;
  // Round to nearest clean denomination
  if (rate >= 3) return Math.round(raw / 5) * 5;   // AED
  return Math.round(raw * 2) / 2;                   // GBP, CAD, AUD, USD
}

// ─── Get formatted price ──────────────────────────────────────────────────────
export function getFormattedPrice(product: Product, regionCode: RegionCode): string {
  const region = REGIONS[regionCode] ?? REGIONS.DEFAULT;
  const amount = getPrice(product, regionCode);
  return formatPrice(amount, region.currency);
}

// ─── Studio pricing ───────────────────────────────────────────────────────────
export interface StudioOptions {
  length: 'short' | 'medium' | 'long';
  finish: FinishId;
  art: ArtId;
  hasName: boolean;
  isCustomSize: boolean;
  decoratedNailCount: number; // how many nails have art
}

export function getStudioPrice(options: StudioOptions, regionCode: RegionCode): number {
  const isIndia = regionCode === 'IN';
  const P = isIndia ? STUDIO_PRICING_INR : STUDIO_PRICING_USD;

  let total = P.base;
  total += P.lengthAdd[options.length];
  total += P.finishAdd[options.finish] ?? 0;

  if (options.art !== 'none') {
    const artRate = P.artAdd[options.art] ?? 0;
    total += artRate * options.decoratedNailCount;
  }

  if (options.hasName) total += P.nameAdd;
  if (options.isCustomSize) total += P.customSizeAdd;

  return total;
}

export function getFormattedStudioPrice(options: StudioOptions, regionCode: RegionCode): string {
  const region = REGIONS[regionCode] ?? REGIONS.DEFAULT;
  const amount = getStudioPrice(options, regionCode);
  return formatPrice(amount, region.currency);
}

// ─── Free shipping threshold check ───────────────────────────────────────────
export function getFreeShippingThreshold(regionCode: RegionCode): number {
  const region = REGIONS[regionCode] ?? REGIONS.DEFAULT;
  return region.freeShippingThreshold;
}

export function getFormattedShippingThreshold(regionCode: RegionCode): string {
  const region = REGIONS[regionCode] ?? REGIONS.DEFAULT;
  return formatPrice(region.freeShippingThreshold, region.currency);
}

// ─── Bag total ────────────────────────────────────────────────────────────────
export interface BagItem {
  product: Product;
  quantity: number;
  size: string;
  shape: string;
}

export function getBagTotal(items: BagItem[], regionCode: RegionCode): number {
  return items.reduce((sum, item) => sum + getPrice(item.product, regionCode) * item.quantity, 0);
}
