// ─── ORRA NAILS — Zustand Stores ─────────────────────────────────────────────
'use client';

import { create } from 'zustand';
import type { Product } from '@/data/products';
import type { RegionCode } from '@/data/config';
import type { ShapeId, SizeId, FinishId, ArtId } from '@/data/config';
import { detectRegion, setRegionCookie, regionToCountryCode } from '@/lib/region';
import { getLocalStorage, setLocalStorage } from '@/lib/region';

// ─── Bag ──────────────────────────────────────────────────────────────────────
export interface BagLineItem {
  id: string; // unique line id
  product: Product;
  quantity: number;
  size: SizeId | string;
  shape: ShapeId;
  personalisation?: string;
  isCustomStudio?: boolean;
  studioSummary?: string;
}

interface BagState {
  items: BagLineItem[];
  isOpen: boolean;
  giftNote: string;
  addItem: (item: Omit<BagLineItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  setGiftNote: (note: string) => void;
  openBag: () => void;
  closeBag: () => void;
  clearBag: () => void;
  getTotalCount: () => number;
}

export const useBagStore = create<BagState>((set, get) => ({
  items: (() => {
    try {
      const saved = getLocalStorage('orra_bag');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  })(),
  isOpen: false,
  giftNote: '',

  addItem: (item) => {
    const id = `${item.product.id}-${item.size}-${item.shape}-${Date.now()}`;
    const newItem: BagLineItem = { ...item, id };
    set((state) => {
      const newItems = [...state.items, newItem];
      setLocalStorage('orra_bag', JSON.stringify(newItems));
      return { items: newItems, isOpen: true };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== id);
      setLocalStorage('orra_bag', JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  updateQuantity: (id, qty) => {
    set((state) => {
      const newItems = qty <= 0
        ? state.items.filter((i) => i.id !== id)
        : state.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i));
      setLocalStorage('orra_bag', JSON.stringify(newItems));
      return { items: newItems };
    });
  },

  setGiftNote: (note) => set({ giftNote: note }),
  openBag: () => set({ isOpen: true }),
  closeBag: () => set({ isOpen: false }),
  clearBag: () => {
    setLocalStorage('orra_bag', '[]');
    set({ items: [] });
  },
  getTotalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));

// ─── Region / Currency ────────────────────────────────────────────────────────
interface RegionState {
  region: RegionCode;
  isDetected: boolean; // true if auto-detected (show banner)
  setRegion: (region: RegionCode) => void;
  initRegion: () => void;
}

export const useRegionStore = create<RegionState>((set) => ({
  region: 'DEFAULT',
  isDetected: false,

  setRegion: (region) => {
    setRegionCookie(regionToCountryCode(region));
    setLocalStorage('orra_region', region);
    set({ region, isDetected: false });
  },

  initRegion: () => {
    // Only run client-side
    if (typeof window === 'undefined') return;
    const saved = getLocalStorage('orra_region');
    if (saved) {
      set({ region: saved as RegionCode, isDetected: false });
    } else {
      const detected = detectRegion();
      setLocalStorage('orra_region', detected);
      set({ region: detected, isDetected: detected !== 'DEFAULT' });
    }
  },
}));

// ─── Studio ───────────────────────────────────────────────────────────────────
export interface StudioConfig {
  shape: ShapeId;
  length: 'short' | 'medium' | 'long';
  baseColour: string;
  finish: FinishId;
  art: ArtId;
  accentFingers: number[];
  nameText: string;
  size: SizeId | 'Custom';
  notes: string;
}

const DEFAULT_STUDIO: StudioConfig = {
  shape: 'almond',
  length: 'medium',
  baseColour: '#E9DDCC',
  finish: 'glossy',
  art: 'none',
  accentFingers: [],
  nameText: '',
  size: 'M',
  notes: '',
};

interface StudioState {
  config: StudioConfig;
  step: number;
  setConfig: (partial: Partial<StudioConfig>) => void;
  setStep: (step: number) => void;
  reset: () => void;
  toQueryString: () => string;
  fromQueryString: (qs: string) => void;
}

export const useStudioStore = create<StudioState>((set, get) => ({
  config: DEFAULT_STUDIO,
  step: 0,

  setConfig: (partial) => {
    set((state) => ({ config: { ...state.config, ...partial } }));
  },

  setStep: (step) => set({ step }),

  reset: () => set({ config: DEFAULT_STUDIO, step: 0 }),

  toQueryString: () => {
    try {
      const encoded = btoa(JSON.stringify(get().config));
      return `?design=${encodeURIComponent(encoded)}`;
    } catch {
      return '';
    }
  },

  fromQueryString: (qs: string) => {
    try {
      const params = new URLSearchParams(qs);
      const design = params.get('design');
      if (design) {
        const config = JSON.parse(atob(decodeURIComponent(design)));
        set({ config: { ...DEFAULT_STUDIO, ...config } });
      }
    } catch {
      // ignore malformed query
    }
  },
}));

// ─── UI / Toast ───────────────────────────────────────────────────────────────
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UIState {
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  toasts: [],

  addToast: (message, type = 'success') => {
    const id = Date.now().toString();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
