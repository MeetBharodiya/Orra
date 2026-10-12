// ─── ORRA NAILS — Region Detection ───────────────────────────────────────────
// Backend integration point:
// - In Next.js middleware, read x-vercel-ip-country or cf-ipcountry header
// - Pass to client via a cookie or HTTP header; client reads it here
// - For server components, pass region via searchParams or cookie in layout

import type { RegionCode } from '@/data/config';

const TIMEZONE_TO_REGION: Record<string, RegionCode> = {
  'Asia/Kolkata': 'IN',
  'Asia/Calcutta': 'IN',
  'Europe/London': 'GB',
  'Asia/Dubai': 'AE',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Edmonton': 'CA',
  'America/Winnipeg': 'CA',
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Brisbane': 'AU',
  'Australia/Perth': 'AU',
};

const COUNTRY_CODE_TO_REGION: Record<string, RegionCode> = {
  IN: 'IN',
  GB: 'GB',
  AE: 'AE',
  CA: 'CA',
  AU: 'AU',
};

// ─── Safe localStorage wrapper ────────────────────────────────────────────────
export function getLocalStorage(key: string): string | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}

export function setLocalStorage(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // ignore
  }
}

// ─── Safe cookie wrapper ──────────────────────────────────────────────────────
export function getCookie(name: string): string | null {
  try {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  } catch {
    return null;
  }
}

export function setCookie(name: string, value: string, days = 365): void {
  try {
    if (typeof document === 'undefined') return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {
    // ignore
  }
}

// ─── Detect region from browser signals ──────────────────────────────────────
export function detectRegion(): RegionCode {
  // 1. Check saved cookie
  const saved = getCookie('orra_country');
  if (saved && saved in COUNTRY_CODE_TO_REGION) {
    return COUNTRY_CODE_TO_REGION[saved as keyof typeof COUNTRY_CODE_TO_REGION];
  }
  if (saved === 'US') return 'DEFAULT';

  // 2. Timezone detection
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz in TIMEZONE_TO_REGION) {
      return TIMEZONE_TO_REGION[tz];
    }
  } catch {
    // ignore
  }

  // 3. Language hints
  try {
    const lang = navigator.language || '';
    if (lang.startsWith('en-IN') || lang.startsWith('hi')) return 'IN';
    if (lang.startsWith('en-GB')) return 'GB';
    if (lang.startsWith('en-AU')) return 'AU';
    if (lang.startsWith('en-CA')) return 'CA';
    if (lang.startsWith('ar-AE')) return 'AE';
  } catch {
    // ignore
  }

  return 'DEFAULT';
}

// ─── Set region from manual override ─────────────────────────────────────────
export function setRegionCookie(countryCode: string): void {
  setCookie('orra_country', countryCode);
}

// ─── Map RegionCode to country code for cookie ────────────────────────────────
export function regionToCountryCode(region: RegionCode): string {
  const map: Record<RegionCode, string> = {
    IN: 'IN', GB: 'GB', AE: 'AE', CA: 'CA', AU: 'AU', DEFAULT: 'US',
  };
  return map[region] ?? 'US';
}
