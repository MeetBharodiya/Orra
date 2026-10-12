'use client';
// ─── ORRA NAILS — Checkout ────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Lock, Check, Package, Truck, Star } from 'lucide-react';
import NailArt from '@/components/nail/NailArt';
import { useBagStore, useRegionStore, useUIStore } from '@/store';
import { getPrice, formatPrice, getBagTotal, getFormattedShippingThreshold, getFreeShippingThreshold } from '@/lib/pricing';
import { REGIONS } from '@/data/config';
import type { ShapeId } from '@/data/config';

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = 'bag' | 'shipping' | 'payment' | 'success';

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  saveAddress: boolean;
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepBar({ step }: { step: Step }) {
  const steps: { id: Step; label: string }[] = [
    { id: 'bag', label: 'Your Bag' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' },
  ];
  const idx = steps.findIndex((s) => s.id === step);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: '3rem' }}>
      {steps.map((s, i) => (
        <React.Fragment key={s.id}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: i <= idx ? 'var(--espresso)' : 'var(--oat)',
                border: i === idx ? '2px solid var(--gold)' : '2px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: i <= idx ? 'var(--parchment)' : 'var(--cocoa)',
                transition: 'all 0.4s',
              }}
            >
              {i < idx ? <Check size={14} strokeWidth={2} /> : <span style={{ fontSize: 13, fontFamily: 'var(--font-ui)' }}>{i + 1}</span>}
            </div>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-ui)', letterSpacing: '0.08em', color: i <= idx ? 'var(--espresso)' : 'var(--cocoa)', whiteSpace: 'nowrap' }}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 1, background: i < idx ? 'var(--gold)' : 'var(--oat)', margin: '0 0.75rem', marginBottom: '1.5rem', transition: 'background 0.4s' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Order Summary sidebar ────────────────────────────────────────────────────
function OrderSummary({ collapsed }: { collapsed?: boolean }) {
  const { items, giftNote } = useBagStore();
  const { region } = useRegionStore();
  const regionData = REGIONS[region] ?? REGIONS.DEFAULT;
  const subtotal = getBagTotal(items, region);
  const threshold = getFreeShippingThreshold(region);
  const shipping = subtotal >= threshold ? 0 : (region === 'IN' ? 99 : 8.99);
  const total = subtotal + shipping;

  if (items.length === 0) return null;

  return (
    <div
      style={{
        background: 'var(--linen)',
        border: '1px solid rgba(185,138,78,0.2)',
        borderRadius: 4,
        padding: '1.75rem',
        position: collapsed ? 'static' : 'sticky',
        top: 120,
      }}
    >
      <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>Order Summary</p>

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div
              style={{
                width: 48,
                height: 60,
                borderRadius: 4,
                background: 'var(--oat)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <NailArt
                shape={(item.shape as ShapeId) || 'almond'}
                finish={item.product.nailArt?.finish || 'glossy'}
                art={item.product.nailArt?.art || 'none'}
                baseColour={item.product.nailArt?.baseColour || '#E9DDCC'}
                accentColour={item.product.nailArt?.accentColour || '#D9B57C'}
                length={item.product.nailArt?.length || 'medium'}
                size="sm"
                single
                singleIndex={2}
              />
              {item.quantity > 1 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: 'var(--espresso)',
                    color: 'var(--parchment)',
                    fontSize: 9,
                    fontFamily: 'var(--font-ui)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.quantity}
                </span>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--espresso)', marginBottom: 2 }}>{item.product.name}</p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)' }}>
                Size: {item.size} · {item.shape}
              </p>
            </div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--espresso)', flexShrink: 0 }}>
              {formatPrice(getPrice(item.product, region) * item.quantity, regionData.currency)}
            </p>
          </div>
        ))}
      </div>

      {giftNote && (
        <div style={{ background: 'var(--oat)', borderRadius: 3, padding: '0.75rem', marginBottom: '1rem', fontSize: 12, fontFamily: 'var(--font-ui)', color: 'var(--cocoa)', fontStyle: 'italic' }}>
          Gift note: "{giftNote}"
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(185,138,78,0.2)', margin: '1rem 0' }} />

      {/* Totals */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--cocoa)' }}>Subtotal</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--espresso)' }}>{formatPrice(subtotal, regionData.currency)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--cocoa)' }}>Shipping</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: shipping === 0 ? 'var(--deep-olive)' : 'var(--espresso)' }}>
            {shipping === 0 ? 'Free ✦' : formatPrice(shipping, regionData.currency)}
          </span>
        </div>
        {shipping > 0 && (
          <p style={{ fontSize: 11, fontFamily: 'var(--font-ui)', color: 'var(--deep-olive)', fontStyle: 'italic' }}>
            Free shipping on orders over {getFormattedShippingThreshold(region)}
          </p>
        )}
      </div>

      <div style={{ height: 1, background: 'rgba(185,138,78,0.2)', margin: '1rem 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--espresso)' }}>Total</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--espresso)' }}>{formatPrice(total, regionData.currency)}</span>
      </div>

      {/* Trust signals */}
      <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {[
          { icon: Lock, text: 'Secured with 256-bit SSL' },
          { icon: Package, text: 'Ships in a luxury travel case' },
          { icon: Truck, text: `Free returns within 7 days` },
        ].map(({ icon: Icon, text }) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon size={12} strokeWidth={1.5} color="var(--deep-olive)" />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)' }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bag Step ─────────────────────────────────────────────────────────────────
function BagStep({ onNext }: { onNext: () => void }) {
  const { items, removeItem, updateQuantity } = useBagStore();
  const { region } = useRegionStore();

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--espresso)', marginBottom: '1rem' }}>Your bag is empty</p>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--cocoa)', marginBottom: '2rem' }}>Add something beautiful before checking out.</p>
        <Link href="/shop" className="btn btn-primary"><span>Explore the Atelier</span></Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="h2" style={{ fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: '0.5rem' }}>Your Bag</h1>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--deep-olive)', marginBottom: '2rem' }}>{items.length} piece{items.length !== 1 ? 's' : ''}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {items.map((item) => {
          const regionData = REGIONS[region] ?? REGIONS.DEFAULT;
          const lineTotal = formatPrice(getPrice(item.product, region) * item.quantity, regionData.currency);
          return (
            <div
              key={item.id}
              className="card"
              style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: '1.25rem', alignItems: 'center' }}
            >
              <div style={{ width: 72, height: 90, background: 'var(--oat)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <NailArt
                  shape={(item.shape as ShapeId) || 'almond'}
                  finish={item.product.nailArt?.finish || 'glossy'}
                  art={item.product.nailArt?.art || 'none'}
                  baseColour={item.product.nailArt?.baseColour || '#E9DDCC'}
                  accentColour={item.product.nailArt?.accentColour || '#D9B57C'}
                  length={item.product.nailArt?.length || 'medium'}
                  size="sm"
                  single
                  singleIndex={2}
                />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--espresso)', marginBottom: 4 }}>{item.product.name}</p>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--deep-olive)', marginBottom: '0.75rem' }}>
                  Size {item.size} · {item.shape}
                  {item.personalisation && ` · "${item.personalisation}"`}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid var(--oat)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'var(--espresso)' }}
                    aria-label="Decrease quantity"
                  >−</button>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid var(--oat)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'var(--espresso)' }}
                    aria-label="Increase quantity"
                  >+</button>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ marginLeft: 8, fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--espresso)' }}>{lineTotal}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/shop" style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--deep-olive)', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
          <ChevronLeft size={14} /> Continue shopping
        </Link>
        <button onClick={onNext} className="btn btn-primary">
          <span>Proceed to Shipping</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Shipping Step ────────────────────────────────────────────────────────────
function ShippingStep({ onNext, onBack, form, setForm }: {
  onNext: () => void;
  onBack: () => void;
  form: ShippingForm;
  setForm: React.Dispatch<React.SetStateAction<ShippingForm>>;
}) {
  const { region } = useRegionStore();
  const isIndia = region === 'IN';

  const field = (
    id: keyof ShippingForm,
    label: string,
    type = 'text',
    placeholder = '',
    halfWidth = false,
  ) => (
    <div style={{ gridColumn: halfWidth ? 'span 1' : 'span 2' }}>
      <label htmlFor={`checkout-${id}`} style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: 6 }}>
        {label}
      </label>
      <input
        id={`checkout-${id}`}
        type={type}
        value={form[id] as string}
        onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
        placeholder={placeholder}
        required={id !== 'address2'}
        style={{
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
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--oat)')}
      />
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button type="button" onClick={onBack} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--deep-olive)', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-ui)', fontSize: 13 }}>
          <ChevronLeft size={14} /> Back
        </button>
        <div style={{ height: 1, flex: 1, background: 'rgba(185,138,78,0.2)' }} />
      </div>

      <h2 className="h2" style={{ fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: '2rem' }}>Shipping Details</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        {field('firstName', 'First Name', 'text', 'Anya', true)}
        {field('lastName', 'Last Name', 'text', 'Kapoor', true)}
        {field('email', 'Email Address', 'email', 'anya@email.com')}
        {field('phone', 'Phone', 'tel', isIndia ? '+91 98765 43210' : '+1 555 000 1234')}
        {field('address1', 'Address Line 1', 'text', 'House / flat / apartment')}
        {field('address2', 'Address Line 2 (optional)', 'text', 'Area, landmark')}
        {field('city', 'City', 'text', 'Mumbai', true)}
        {field('state', isIndia ? 'State' : 'State / Province', 'text', '', true)}
        {field('pincode', isIndia ? 'PIN Code' : 'Postcode / ZIP', 'text', '', true)}
        {field('country', 'Country', 'text', isIndia ? 'India' : '', true)}
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={form.saveAddress}
          onChange={(e) => setForm((f) => ({ ...f, saveAddress: e.target.checked }))}
          style={{ accentColor: 'var(--espresso)', width: 16, height: 16 }}
        />
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--cocoa)' }}>Save this address for future orders</span>
      </label>

      <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
        <span>Continue to Payment</span>
        <ChevronRight size={14} />
      </button>
    </form>
  );
}

// ─── Payment Step ─────────────────────────────────────────────────────────────
function PaymentStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { region } = useRegionStore();
  const { items } = useBagStore();
  const isIndia = region === 'IN';
  const regionData = REGIONS[region] ?? REGIONS.DEFAULT;
  const subtotal = getBagTotal(items, region);
  const threshold = getFreeShippingThreshold(region);
  const shipping = subtotal >= threshold ? 0 : (isIndia ? 99 : 8.99);
  const total = subtotal + shipping;

  const [payMethod, setPayMethod] = useState<'card' | 'upi' | 'cod'>(isIndia ? 'upi' : 'card');
  const [processing, setProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onNext();
    }, 2200);
  };

  const methodBtn = (id: 'card' | 'upi' | 'cod', label: string, sub: string) => (
    <button
      type="button"
      onClick={() => setPayMethod(id)}
      style={{
        padding: '1rem 1.25rem',
        border: payMethod === id ? '2px solid var(--espresso)' : '1px solid var(--oat)',
        borderRadius: 4,
        background: payMethod === id ? 'var(--linen)' : 'var(--parchment)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s',
      }}
    >
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 500, color: 'var(--espresso)', marginBottom: 2 }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)' }}>{sub}</p>
    </button>
  );

  return (
    <form onSubmit={handlePay}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button type="button" onClick={onBack} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--deep-olive)', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-ui)', fontSize: 13 }}>
          <ChevronLeft size={14} /> Back
        </button>
        <div style={{ height: 1, flex: 1, background: 'rgba(185,138,78,0.2)' }} />
      </div>

      <h2 className="h2" style={{ fontFamily: 'var(--font-display)', fontWeight: 300, marginBottom: '2rem' }}>Payment</h2>

      {/* Method selector */}
      <div style={{ display: 'grid', gridTemplateColumns: isIndia ? 'repeat(3, 1fr)' : '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
        {methodBtn('card', 'Card', 'Visa · Mastercard · Amex')}
        {isIndia && methodBtn('upi', 'UPI', 'GPay · PhonePe · Paytm')}
        {isIndia && methodBtn('cod', 'Cash on Delivery', 'Pay when it arrives')}
      </div>

      {payMethod === 'card' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { id: 'card-number', label: 'Card Number', placeholder: '4242 4242 4242 4242' },
            { id: 'card-name', label: 'Name on Card', placeholder: 'Anya Kapoor' },
          ].map(({ id, label, placeholder }) => (
            <div key={id}>
              <label htmlFor={id} style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: 6 }}>{label}</label>
              <input id={id} placeholder={placeholder} style={{ width: '100%', padding: '10px 14px', background: 'var(--linen)', border: '1px solid var(--oat)', borderRadius: 3, fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--espresso)', outline: 'none', boxSizing: 'border-box' }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--oat)')}
              />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { id: 'card-expiry', label: 'Expiry', placeholder: 'MM / YY' },
              { id: 'card-cvv', label: 'CVV', placeholder: '•••' },
            ].map(({ id, label, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: 6 }}>{label}</label>
                <input id={id} placeholder={placeholder} style={{ width: '100%', padding: '10px 14px', background: 'var(--linen)', border: '1px solid var(--oat)', borderRadius: 3, fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--espresso)', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--oat)')}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {payMethod === 'upi' && (
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="upi-id" style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--deep-olive)', marginBottom: 6 }}>UPI ID</label>
          <input id="upi-id" placeholder="yourname@upi" style={{ width: '100%', padding: '10px 14px', background: 'var(--linen)', border: '1px solid var(--oat)', borderRadius: 3, fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--espresso)', outline: 'none', boxSizing: 'border-box' }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--oat)')}
          />
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)', marginTop: 6 }}>You will be redirected to your UPI app to confirm payment.</p>
        </div>
      )}

      {payMethod === 'cod' && (
        <div style={{ background: 'var(--linen)', border: '1px solid rgba(185,138,78,0.2)', borderRadius: 4, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--espresso)', lineHeight: 1.65 }}>
            Pay in cash when your order arrives. A ₹49 COD handling fee applies. Our delivery partner will carry change up to ₹500.
          </p>
        </div>
      )}

      {/* Total recap */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '1rem', background: 'var(--oat)', borderRadius: 4 }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--espresso)' }}>
          Total {payMethod === 'cod' ? '(+ ₹49 COD fee)' : ''}
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--espresso)' }}>
          {formatPrice(total + (payMethod === 'cod' ? 49 : 0), regionData.currency)}
        </span>
      </div>

      <button type="submit" disabled={processing} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: processing ? 0.7 : 1 }}>
        <Lock size={13} strokeWidth={1.5} />
        <span>{processing ? 'Processing…' : `Place Order · ${formatPrice(total + (payMethod === 'cod' ? 49 : 0), regionData.currency)}`}</span>
      </button>

      <p style={{ textAlign: 'center', marginTop: '1rem', fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--deep-olive)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <Lock size={11} /> Secured by 256-bit SSL
      </p>
    </form>
  );
}

// ─── Success Step — "The Opening" ─────────────────────────────────────────────
function SuccessStep() {
  const { clearBag } = useBagStore();
  const [animStep, setAnimStep] = useState(0);

  const [orderNum, setOrderNum] = useState('ORR-884219');

  useEffect(() => {
    clearBag();
    setOrderNum(`ORR-${Date.now().toString().slice(-6)}`);
    const t1 = setTimeout(() => setAnimStep(1), 400);
    const t2 = setTimeout(() => setAnimStep(2), 1000);
    const t3 = setTimeout(() => setAnimStep(3), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      {/* Animated "The Opening" reveal */}
      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2.5rem' }}>
        {/* Outer ring */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: `2px solid ${animStep >= 1 ? 'var(--gold)' : 'transparent'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.8s ease',
            margin: '0 auto',
          }}
        >
          {/* Inner check */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: animStep >= 2 ? 'var(--espresso)' : 'var(--oat)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.6s ease',
            }}
          >
            <Check
              size={32}
              strokeWidth={1.5}
              color={animStep >= 2 ? 'var(--soft-gold)' : 'transparent'}
              style={{ transition: 'color 0.4s ease 0.3s' }}
            />
          </div>
        </div>

        {/* Scattered stars */}
        {animStep >= 3 && [
          { top: -8, left: 20 },
          { top: 10, left: -16 },
          { top: -12, right: 12 },
          { bottom: 0, right: -12 },
          { bottom: -8, left: -4 },
        ].map((pos, i) => (
          <Star
            key={i}
            size={10}
            fill="var(--gold)"
            strokeWidth={0}
            color="var(--gold)"
            style={{
              position: 'absolute',
              ...pos,
              opacity: animStep >= 3 ? 1 : 0,
              transition: `opacity 0.3s ease ${i * 0.08}s`,
            }}
          />
        ))}
      </div>

      <p
        className="eyebrow"
        style={{
          marginBottom: '0.75rem',
          opacity: animStep >= 3 ? 1 : 0,
          transform: animStep >= 3 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.6s, transform 0.6s',
        }}
      >
        Order Placed
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          color: 'var(--espresso)',
          marginBottom: '1rem',
          opacity: animStep >= 3 ? 1 : 0,
          transform: animStep >= 3 ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s 0.1s, transform 0.6s 0.1s',
        }}
      >
        Your nails are on their way.
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 14,
          color: 'var(--cocoa)',
          lineHeight: 1.75,
          maxWidth: 440,
          margin: '0 auto 2rem',
          opacity: animStep >= 3 ? 1 : 0,
          transition: 'opacity 0.6s 0.2s',
        }}
      >
        Confirmation sent to your email. Your order number is <strong style={{ color: 'var(--espresso)' }}>{orderNum}</strong>. 
        We'll notify you when your set ships.
      </p>

      {/* Timeline */}
      <div
        style={{
          display: 'inline-flex',
          gap: '2rem',
          background: 'var(--linen)',
          borderRadius: 4,
          padding: '1.5rem 2rem',
          marginBottom: '2.5rem',
          border: '1px solid rgba(185,138,78,0.2)',
          opacity: animStep >= 3 ? 1 : 0,
          transition: 'opacity 0.6s 0.3s',
        }}
      >
        {[
          { icon: Check, label: 'Confirmed', done: true },
          { icon: Package, label: 'Crafting (1–2 days)', done: false },
          { icon: Truck, label: 'Shipped (3–5 days)', done: false },
        ].map(({ icon: Icon, label, done }, i) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: done ? 'var(--espresso)' : 'var(--oat)', border: '1px solid rgba(185,138,78,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={14} strokeWidth={1.5} color={done ? 'var(--soft-gold)' : 'var(--cocoa)'} />
            </div>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: done ? 'var(--espresso)' : 'var(--cocoa)', textAlign: 'center' }}>{label}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          opacity: animStep >= 3 ? 1 : 0,
          transition: 'opacity 0.6s 0.4s',
        }}
      >
        <Link href="/shop" className="btn btn-primary"><span>Continue Shopping</span></Link>
        <Link href="/ritual" className="btn btn-outline"><span>Prepare your ritual</span></Link>
      </div>
    </div>
  );
}

// ─── Checkout Page ─────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('bag');
  const [form, setForm] = useState<ShippingForm>({
    firstName: '', lastName: '', email: '', phone: '',
    address1: '', address2: '', city: '', state: '', pincode: '', country: '',
    saveAddress: false,
  });

  const isSuccess = step === 'success';

  return (
    <>
      <title>Checkout — ORRA Nails</title>
      <main
        style={{
          minHeight: '100vh',
          paddingTop: 'calc(36px + 64px + 2rem)',
          paddingBottom: '4rem',
          background: 'var(--parchment)',
        }}
      >
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 1.5rem' }}>

          {isSuccess ? (
            <SuccessStep />
          ) : (
            <>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Checkout</p>
              </div>

              <StepBar step={step} />

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: '3.5rem', alignItems: 'start' }}>
                {/* Left: step content */}
                <div>
                  {step === 'bag' && <BagStep onNext={() => setStep('shipping')} />}
                  {step === 'shipping' && <ShippingStep onNext={() => setStep('payment')} onBack={() => setStep('bag')} form={form} setForm={setForm} />}
                  {step === 'payment' && <PaymentStep onNext={() => setStep('success')} onBack={() => setStep('shipping')} />}
                </div>

                {/* Right: order summary */}
                <OrderSummary />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
