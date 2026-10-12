'use client';
// ─── Toast Container ──────────────────────────────────────────────────────────

import React from 'react';
import { X } from 'lucide-react';
import { useUIStore } from '@/store';

export default function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: 360,
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast"
          role="alert"
          style={{
            background: toast.type === 'error' ? 'var(--clay-rose)' : 'var(--espresso)',
            color: 'var(--parchment)',
            padding: '14px 16px',
            borderRadius: 4,
            fontSize: 13,
            fontFamily: 'var(--font-ui)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 8px 32px rgba(43,27,19,0.2)',
            border: '1px solid rgba(185,138,78,0.3)',
          }}
        >
          <span style={{ flex: 1, lineHeight: 1.5 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(251,247,241,0.6)',
              padding: 2,
              flexShrink: 0,
            }}
          >
            <X size={14} strokeWidth={1.25} />
          </button>
        </div>
      ))}
    </div>
  );
}
