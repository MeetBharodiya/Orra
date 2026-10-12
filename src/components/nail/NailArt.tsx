'use client';
// ─── ORRA NAILS — NailArt SVG Component ──────────────────────────────────────
// Draws a hand of five nails (or single nail) in six shapes.
// Props: shape, finish, art (motif), accent fingers, size, base colour/gradient.
// All SVGs include title/desc for accessibility.

import React from 'react';
import type { ShapeId, FinishId, ArtId } from '@/data/config';

// ─── Types ────────────────────────────────────────────────────────────────────
interface NailProps {
  shape: ShapeId;
  finish: FinishId;
  art: ArtId;
  baseColour?: string;
  baseGradient?: [string, string];
  accentColour?: string;
  isAccent?: boolean;
  length?: 'short' | 'medium' | 'long';
  width?: number;
  index?: number; // finger index 0-4
}

interface NailArtProps {
  shape?: ShapeId;
  finish?: FinishId;
  art?: ArtId;
  baseColour?: string;
  baseGradient?: [string, string];
  accentColour?: string;
  accentFingers?: number[];
  length?: 'short' | 'medium' | 'long';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  single?: boolean; // render single nail only
  singleIndex?: number; // which finger for single
  animate?: boolean;
  className?: string;
  title?: string;
  id?: string;
}

// ─── Shape path generators ────────────────────────────────────────────────────
// Coordinate space: nail canvas is 60 wide × 90 tall
// The nail starts at the bottom with a cuticle arch at the top

function getShapePath(shape: ShapeId, w: number, h: number, length: 'short' | 'medium' | 'long'): string {
  const lengthMult = length === 'short' ? 0.72 : length === 'long' ? 1.18 : 1;
  const nh = h * lengthMult;

  switch (shape) {
    case 'square':
      return `
        M ${w * 0.08},${h - nh}
        Q ${w * 0.08},${h - nh - w * 0.15} ${w * 0.5},${h - nh - w * 0.2}
        Q ${w * 0.92},${h - nh - w * 0.15} ${w * 0.92},${h - nh}
        L ${w * 0.92},${h}
        L ${w * 0.08},${h}
        Z
      `;
    case 'oval':
      return `
        M ${w * 0.08},${h - nh * 0.6}
        Q ${w * 0.08},${h - nh - w * 0.25} ${w * 0.5},${h - nh - w * 0.22}
        Q ${w * 0.92},${h - nh - w * 0.25} ${w * 0.92},${h - nh * 0.6}
        Q ${w * 0.92},${h} ${w * 0.5},${h}
        Q ${w * 0.08},${h} ${w * 0.08},${h - nh * 0.6}
        Z
      `;
    case 'soft-square':
      return `
        M ${w * 0.08},${h - nh}
        Q ${w * 0.08},${h - nh - w * 0.18} ${w * 0.5},${h - nh - w * 0.22}
        Q ${w * 0.92},${h - nh - w * 0.18} ${w * 0.92},${h - nh}
        Q ${w * 0.92},${h} ${w * 0.77},${h}
        L ${w * 0.23},${h}
        Q ${w * 0.08},${h} ${w * 0.08},${h - nh}
        Z
      `;
    case 'almond':
      return `
        M ${w * 0.12},${h - nh * 0.7}
        Q ${w * 0.1},${h - nh - w * 0.2} ${w * 0.5},${h - nh - w * 0.28}
        Q ${w * 0.9},${h - nh - w * 0.2} ${w * 0.88},${h - nh * 0.7}
        Q ${w * 0.88},${h} ${w * 0.5},${h}
        Q ${w * 0.12},${h} ${w * 0.12},${h - nh * 0.7}
        Z
      `;
    case 'coffin':
      return `
        M ${w * 0.08},${h - nh}
        Q ${w * 0.08},${h - nh - w * 0.18} ${w * 0.5},${h - nh - w * 0.22}
        Q ${w * 0.92},${h - nh - w * 0.18} ${w * 0.92},${h - nh}
        L ${w * 0.7},${h}
        L ${w * 0.3},${h}
        Z
      `;
    case 'stiletto':
      return `
        M ${w * 0.1},${h - nh * 0.8}
        Q ${w * 0.08},${h - nh - w * 0.2} ${w * 0.5},${h - nh - w * 0.3}
        Q ${w * 0.92},${h - nh - w * 0.2} ${w * 0.9},${h - nh * 0.8}
        L ${w * 0.5},${h}
        Z
      `;
    default:
      return `M ${w * 0.08},${h - nh} Q ${w * 0.5},${h - nh - 20} ${w * 0.92},${h - nh} L ${w * 0.92},${h} L ${w * 0.08},${h} Z`;
  }
}

// ─── Finish overlay components ────────────────────────────────────────────────
function FinishOverlay({ finish, id, w, h }: { finish: FinishId; id: string; w: number; h: number }) {
  switch (finish) {
    case 'glossy':
      return (
        <ellipse
          cx={w * 0.38}
          cy={h * 0.28}
          rx={w * 0.12}
          ry={h * 0.06}
          fill="white"
          opacity={0.35}
          transform="rotate(-20, 23, 25)"
        />
      );
    case 'matte':
      return null; // no sheen
    case 'chrome':
      return (
        <>
          <defs>
            <linearGradient id={`chrome-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
              <stop offset="30%" stopColor="#D9B57C" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#fff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#B98A4E" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <rect x={0} y={0} width={w} height={h} fill={`url(#chrome-${id})`} />
        </>
      );
    case 'cat-eye':
      return (
        <ellipse
          cx={w * 0.5}
          cy={h * 0.45}
          rx={w * 0.05}
          ry={h * 0.35}
          fill="white"
          opacity={0.4}
          transform={`rotate(-10, ${w * 0.5}, ${h * 0.45})`}
        />
      );
    case 'glitter':
      return (
        <>
          {Array.from({ length: 18 }, (_, i) => (
            <circle
              key={i}
              cx={w * (0.15 + (i % 5) * 0.17)}
              cy={h * (0.2 + Math.floor(i / 5) * 0.18)}
              r={1.2}
              fill={i % 3 === 0 ? '#D9B57C' : i % 3 === 1 ? '#fff' : '#B98A4E'}
              opacity={0.6 + (i % 4) * 0.1}
            />
          ))}
        </>
      );
    case 'pearl':
      return (
        <>
          <defs>
            <radialGradient id={`pearl-${id}`} cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#F0EBE3" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#D9B57C" stopOpacity="0.15" />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={w} height={h} fill={`url(#pearl-${id})`} />
        </>
      );
    default:
      return null;
  }
}

// ─── Art / Motif components ───────────────────────────────────────────────────
function ArtMotif({
  art,
  accentColour,
  w,
  h,
}: {
  art: ArtId;
  accentColour: string;
  w: number;
  h: number;
}) {
  const gold = accentColour || '#B98A4E';

  switch (art) {
    case 'french':
      return (
        <path
          d={`M ${w * 0.06},${h * 0.12} Q ${w * 0.5},${h * 0.04} ${w * 0.94},${h * 0.12}`}
          stroke={accentColour || '#2B1B13'}
          strokeWidth={h * 0.08}
          fill="none"
          strokeLinecap="round"
        />
      );
    case 'floral':
      return (
        <g transform={`translate(${w * 0.5}, ${h * 0.3})`}>
          {/* Central petal burst */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <ellipse
              key={i}
              cx={0}
              cy={-5}
              rx={1.8}
              ry={4.5}
              fill={gold}
              opacity={0.75}
              transform={`rotate(${angle})`}
            />
          ))}
          <circle cx={0} cy={0} r={2} fill={gold} />
          {/* Tiny leaves */}
          <path d={`M -8,4 Q -6,0 -4,4`} stroke={gold} strokeWidth={1} fill="none" opacity={0.6} />
          <path d={`M 8,4 Q 6,0 4,4`} stroke={gold} strokeWidth={1} fill="none" opacity={0.6} />
        </g>
      );
    case 'foil':
      return (
        <>
          {Array.from({ length: 8 }, (_, i) => (
            <polygon
              key={i}
              points={`${w * (0.2 + (i % 4) * 0.19)},${h * (0.18 + Math.floor(i / 4) * 0.22)} ${w * (0.2 + (i % 4) * 0.19 + 0.05)},${h * (0.18 + Math.floor(i / 4) * 0.22 + 0.04)} ${w * (0.2 + (i % 4) * 0.19 - 0.02)},${h * (0.18 + Math.floor(i / 4) * 0.22 + 0.05)}`}
              fill={gold}
              opacity={0.55 + i * 0.04}
            />
          ))}
        </>
      );
    case 'line':
      return (
        <line
          x1={w * 0.5}
          y1={h * 0.08}
          x2={w * 0.5}
          y2={h * 0.78}
          stroke={gold}
          strokeWidth={0.8}
          opacity={0.75}
        />
      );
    case 'pearls':
      return (
        <>
          {[h * 0.22, h * 0.38, h * 0.54].map((y, i) => (
            <circle key={i} cx={w * 0.5} cy={y} r={2.5} fill="white" opacity={0.9}>
              <animate attributeName="opacity" values="0.9;0.7;0.9" dur="3s" repeatCount="indefinite" />
            </circle>
          ))}
          {[h * 0.22, h * 0.38, h * 0.54].map((y, i) => (
            <circle key={`g${i}`} cx={w * 0.5} cy={y} r={2.5} fill="url(#pearl-sheen)" opacity={0.5} />
          ))}
        </>
      );
    case 'ombre':
      return null; // handled in base gradient
    default:
      return null;
  }
}

// ─── Single Nail ──────────────────────────────────────────────────────────────
function SingleNail({
  shape,
  finish,
  art,
  baseColour = '#E9DDCC',
  baseGradient,
  accentColour = '#B98A4E',
  isAccent = false,
  length = 'medium',
  width: w = 48,
  index = 0,
}: NailProps) {
  const h = Math.round(w * 1.6);
  const uid = `nail-${shape}-${finish}-${index}-${Math.random().toString(36).slice(2, 6)}`;

  const path = getShapePath(shape, w, h, length);
  const gradId = `grad-${uid}`;
  const clipId = `clip-${uid}`;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${shape} nail`}
      role="img"
    >
      <title>{`${shape} press-on nail`}</title>
      <desc>Hand-painted press-on nail in {shape} shape</desc>
      <defs>
        {baseGradient ? (
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={baseGradient[0]} />
            <stop offset="100%" stopColor={baseGradient[1]} />
          </linearGradient>
        ) : art === 'ombre' ? (
          <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={baseColour} stopOpacity="0.5" />
            <stop offset="100%" stopColor={baseColour} />
          </linearGradient>
        ) : null}
        <clipPath id={clipId}>
          <path d={path} />
        </clipPath>
        <radialGradient id="pearl-sheen" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D9B57C" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Base nail shape */}
      <path
        d={path}
        fill={baseGradient || art === 'ombre' ? `url(#${gradId})` : baseColour}
        stroke={isAccent ? accentColour : 'rgba(43,27,19,0.15)'}
        strokeWidth={0.8}
      />

      {/* Finish overlay (clipped to nail shape) */}
      <g clipPath={`url(#${clipId})`}>
        <FinishOverlay finish={finish} id={uid} w={w} h={h} />
      </g>

      {/* Art motif (clipped) */}
      {(isAccent || art !== 'none') && (
        <g clipPath={`url(#${clipId})`}>
          <ArtMotif art={isAccent ? art : art} accentColour={accentColour} w={w} h={h} />
        </g>
      )}

      {/* Cuticle accent line */}
      <path
        d={`M ${w * 0.18},${h * 0.95} Q ${w * 0.5},${h * 0.92} ${w * 0.82},${h * 0.95}`}
        stroke="rgba(43,27,19,0.1)"
        strokeWidth={0.5}
        fill="none"
      />
    </svg>
  );
}

// ─── Hand of Five Nails ───────────────────────────────────────────────────────
const FINGER_WIDTHS = [0.88, 0.78, 0.85, 0.78, 0.68]; // thumb-to-pinky relative
const FINGER_OFFSETS_Y = [6, 0, -3, 0, 4]; // vertical stagger in px
const FINGER_GAPS = [4, 3, 3, 3]; // gaps between fingers in px

export default function NailArt({
  shape = 'almond',
  finish = 'glossy',
  art = 'none',
  baseColour = '#E9DDCC',
  baseGradient,
  accentColour = '#B98A4E',
  accentFingers = [],
  length = 'medium',
  size = 'md',
  single = false,
  singleIndex = 2,
  animate = false,
  className = '',
  title,
  id,
}: NailArtProps) {
  const sizeMap = { sm: 28, md: 42, lg: 56, xl: 72 };
  const baseW = sizeMap[size];

  if (single) {
    return (
      <div className={className} id={id}>
        <SingleNail
          shape={shape}
          finish={finish}
          art={art}
          baseColour={baseColour}
          baseGradient={baseGradient}
          accentColour={accentColour}
          isAccent={accentFingers.includes(singleIndex)}
          length={length}
          width={baseW}
          index={singleIndex}
        />
      </div>
    );
  }

  // Compute total width of the hand
  const nailWidths = FINGER_WIDTHS.map((r) => Math.round(baseW * r));
  const totalW =
    nailWidths.reduce((s, w) => s + w, 0) +
    FINGER_GAPS.reduce((s, g) => s + g, 0);
  const maxH = Math.round(nailWidths[2] * 1.6) + 12; // middle finger tallest

  return (
    <div
      className={`relative inline-block ${animate ? 'transition-transform duration-500' : ''} ${className}`}
      id={id}
      aria-label={title || 'Hand of press-on nails'}
      role="img"
    >
      <svg
        width={totalW}
        height={maxH + 8}
        viewBox={`0 0 ${totalW} ${maxH + 8}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <title>{title || 'ORRA Nails hand'}</title>
        <desc>A set of five hand-painted press-on nails in {shape} shape with {finish} finish</desc>

        {[0, 1, 2, 3, 4].reduce<{ x: number; elements: React.ReactNode[] }>(
          (acc, fingerIndex) => {
            const w = nailWidths[fingerIndex];
            const h = Math.round(w * 1.6);
            const yOffset = FINGER_OFFSETS_Y[fingerIndex] + (maxH - h);
            const isAcc = accentFingers.includes(fingerIndex);

            const uid = `hf-${fingerIndex}-${shape}-${finish}`;
            const gradId = `grad-${uid}`;
            const clipId = `clip-${uid}`;
            const shapePath = getShapePath(shape, w, h, length);

            const element = (
              <g key={fingerIndex} transform={`translate(${acc.x}, ${yOffset})`}>
                <defs>
                  {baseGradient ? (
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={baseGradient[0]} />
                      <stop offset="100%" stopColor={baseGradient[1]} />
                    </linearGradient>
                  ) : art === 'ombre' ? (
                    <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={baseColour} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={baseColour} />
                    </linearGradient>
                  ) : null}
                  <clipPath id={clipId}>
                    <path d={shapePath} />
                  </clipPath>
                  <radialGradient id={`ps-${uid}`} cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D9B57C" stopOpacity="0.2" />
                  </radialGradient>
                </defs>

                {/* Base */}
                <path
                  d={shapePath}
                  fill={baseGradient || art === 'ombre' ? `url(#${gradId})` : baseColour}
                  stroke="rgba(43,27,19,0.15)"
                  strokeWidth={0.8}
                />

                {/* Finish */}
                <g clipPath={`url(#${clipId})`}>
                  <FinishOverlay finish={finish} id={uid} w={w} h={h} />
                </g>

                {/* Art motif */}
                {(isAcc || art !== 'none') && (
                  <g clipPath={`url(#${clipId})`}>
                    <ArtMotif art={art} accentColour={accentColour} w={w} h={h} />
                  </g>
                )}

                {/* Cuticle line */}
                <path
                  d={`M ${w * 0.18},${h * 0.95} Q ${w * 0.5},${h * 0.92} ${w * 0.82},${h * 0.95}`}
                  stroke="rgba(43,27,19,0.1)"
                  strokeWidth={0.5}
                  fill="none"
                />
              </g>
            );

            return {
              x: acc.x + w + (fingerIndex < 4 ? FINGER_GAPS[fingerIndex] : 0),
              elements: [...acc.elements, element],
            };
          },
          { x: 0, elements: [] }
        ).elements}
      </svg>
    </div>
  );
}

// Named export for single nail usage
export { SingleNail };
