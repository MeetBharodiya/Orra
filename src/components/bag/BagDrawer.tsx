'use client';
// ─── ORRA NAILS — Bag Drawer ──────────────────────────────────────────────────

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useBagStore, useRegionStore } from '@/store';
import { getFormattedPrice, getBagTotal, formatPrice, getFormattedShippingThreshold } from '@/lib/pricing';
import { REGIONS, CURRENCIES } from '@/data/config';
import NailArt from '@/components/nail/NailArt';

export default function BagDrawer() {
  const { items, isOpen, closeBag, removeItem, updateQuantity, giftNote, setGiftNote } = useBagStore();
  const { region } = useRegionStore();

  const currentRegion = REGIONS[region] ?? REGIONS.DEFAULT;
  const currency = CURRENCIES[currentRegion.currency];
  const total = getBagTotal(
    items.map((i) => ({ product: i.product, quantity: i.quantity, size: i.size, shape: i.shape })),
    region,
  );
  const threshold = currentRegion.freeShippingThreshold;
  const remaining = Math.max(0, threshold - total);
  const progress = Math.min(100, (total / threshold) * 100);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="backdrop"
        onClick={closeBag}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--oat)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontWeight: 300,
              color: 'var(--espresso)',
            }}
          >
            Your Bag
            {items.length > 0 && (
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 12,
                  fontWeight: 400,
                  color: 'var(--deep-olive)',
                  marginLeft: '0.75rem',
                }}
              >
                {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
              </span>
            )}
          </h2>
          <button
            onClick={closeBag}
            aria-label="Close bag"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--espresso)',
              padding: 6,
            }}
          >
            <X size={20} strokeWidth={1.25} />
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div style={{ padding: '0.875rem 1.5rem', borderBottom: '1px solid var(--oat)', background: 'var(--linen)' }}>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--cocoa)', marginBottom: '0.5rem' }}>
              {remaining > 0
                ? `${formatPrice(remaining, currency.code)} away from free shipping`
                : 'You have free shipping'}
            </p>
            <div style={{ height: 2, background: 'var(--oat)', borderRadius: 1, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'var(--gold)',
                  borderRadius: 1,
                  transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
                }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: 'var(--cocoa)', marginBottom: '1.5rem' }}>
                Your bag is empty.
              </p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--deep-olive)', marginBottom: '2rem' }}>
                Choose by how you want to feel.
              </p>
              <Link href="/shop" onClick={closeBag} className="btn btn-primary">
                <span>Shop All Pieces</span>
              </Link>
            </div>
          ) : (
            <ul style={{ listStyle: 'none' }}>
              {items.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '64px 1fr auto',
                    gap: '1rem',
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--oat)',
                    alignItems: 'start',
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    className="arch"
                    style={{
                      width: 64,
                      height: 80,
                      background: 'var(--oat)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <NailArt
                      {...item.product.nailArt}
                      size="sm"
                      single
                      singleIndex={2}
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 400, color: 'var(--espresso)', marginBottom: 2 }}>
                      {item.product.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--deep-olive)', marginBottom: 6 }}>
                      {item.shape} · Size {item.size}
                      {item.personalisation && ` · "${item.personalisation}"`}
                    </p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--espresso)', fontWeight: 400 }}>
                      {getFormattedPrice(item.product, region)}
                    </p>

                    {/* Quantity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        style={{
                          width: 28,
                          height: 28,
                          border: '1px solid var(--oat)',
                          borderRadius: 2,
                          background: 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--espresso)',
                        }}
                      >
                        <Minus size={12} strokeWidth={1.5} />
                      </button>
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, minWidth: 20, textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        style={{
                          width: 28,
                          height: 28,
                          border: '1px solid var(--oat)',
                          borderRadius: 2,
                          background: 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--espresso)',
                        }}
                      >
                        <Plus size={12} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.product.name}`}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--deep-olive)',
                      padding: 4,
                      marginTop: 2,
                    }}
                  >
                    <Trash2 size={14} strokeWidth={1.25} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Gift note */}
          {items.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <label
                htmlFor="gift-note"
                style={{ fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--deep-olive)', display: 'block', marginBottom: '0.5rem' }}
              >
                Gift Note (optional)
              </label>
              <textarea
                id="gift-note"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value.slice(0, 150))}
                maxLength={150}
                placeholder="Write a note for the recipient..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--oat)',
                  borderRadius: 2,
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: 'var(--espresso)',
                  background: 'var(--linen)',
                  resize: 'none',
                  outline: 'none',
                }}
              />
              <p style={{ fontSize: 11, color: 'var(--deep-olive)', fontFamily: 'var(--font-ui)', textAlign: 'right' }}>
                {giftNote.length}/150
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ borderTop: '1px solid var(--oat)', padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--espresso)' }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: 'var(--espresso)' }}>
                {formatPrice(total, currency.code)}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Shipping calculated at checkout.
              {region !== 'IN' && ' Import duties and taxes may apply in your country.'}
            </p>
            <Link
              href="/checkout"
              onClick={closeBag}
              className="btn btn-primary"
              style={{ width: '100%', textAlign: 'center', marginBottom: '0.75rem' }}
            >
              <span>Proceed to Checkout</span>
            </Link>
            <Link
              href="/bag"
              onClick={closeBag}
              className="btn btn-outline"
              style={{ width: '100%', textAlign: 'center' }}
            >
              <span>View Bag</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
