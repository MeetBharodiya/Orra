'use client';
// ─── ORRA NAILS — Intention Finder Quiz ──────────────────────────────────────
// Full-screen quiz, one question per screen, gold progress line
// Scoring: Grounded / Radiant / Tender / Magnetic / Vowed

import React, { useState } from 'react';
import Link from 'next/link';
import NailArt from '@/components/nail/NailArt';
import ProductCard from '@/components/product/ProductCard';
import { getProductsByIntention } from '@/data/products';
import { INTENTIONS, type IntentionId } from '@/data/config';
import { useRegionStore } from '@/store';

type ScoreMap = Record<IntentionId, number>;

const QUESTIONS = [
  {
    id: 'q1',
    question: 'Where are your hands going this week?',
    answers: [
      { label: 'Work or everyday life', scores: { grounded: 2 } },
      { label: 'Dinner or a party', scores: { magnetic: 2, radiant: 1 } },
      { label: 'A wedding', scores: { vowed: 3 } },
      { label: 'Somewhere sunny and warm', scores: { radiant: 2, tender: 1 } },
      { label: 'Nowhere in particular', scores: { grounded: 1, tender: 1 } },
    ],
  },
  {
    id: 'q2',
    question: 'Pick a kind of light.',
    answers: [
      { label: 'Soft morning light through linen curtains', scores: { tender: 2 } },
      { label: 'Golden hour — warm and lingering', scores: { radiant: 2 } },
      { label: 'Overcast and calm, the sky like bone', scores: { grounded: 2 } },
      { label: 'Candlelight — intimate and low', scores: { magnetic: 2 } },
      { label: 'White winter light, crisp and clear', scores: { vowed: 2 } },
    ],
  },
  {
    id: 'q3',
    question: 'How long do you like your nails?',
    answers: [
      { label: 'Short — practical and clean', scores: { grounded: 1 } },
      { label: 'Medium — just past the fingertip', scores: { tender: 1, radiant: 1 } },
      { label: 'Long — a statement in themselves', scores: { magnetic: 2 } },
    ],
    isLength: true,
  },
  {
    id: 'q4',
    question: 'What finish speaks to you right now?',
    answers: [
      { label: 'Glossy and clean — timeless', scores: { grounded: 1 } },
      { label: 'Chrome or shimmer — reflective', scores: { radiant: 2 } },
      { label: 'Soft florals — hand-painted detail', scores: { tender: 2 } },
      { label: 'Sculptural or 3D — unmissable', scores: { magnetic: 2 } },
      { label: 'Pearl and lace — delicate and bridal', scores: { vowed: 2 } },
    ],
  },
  {
    id: 'q5',
    question: 'How much do you like to be noticed?',
    answers: [
      { label: 'A whisper. I prefer quiet presence.', scores: { grounded: 2 } },
      { label: 'A hint. Something to catch the light.', scores: { tender: 1, radiant: 1 } },
      { label: 'A statement. Unmistakably me.', scores: { magnetic: 2 } },
    ],
  },
];

export default function IntentionFinderPage() {
  const { region } = useRegionStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<ScoreMap>({ grounded: 0, radiant: 0, tender: 0, magnetic: 0, vowed: 0 });
  const [lengthFilter, setLengthFilter] = useState<string | null>(null);
  const [result, setResult] = useState<IntentionId | null>(null);

  const question = QUESTIONS[currentQ];
  const progress = (currentQ / QUESTIONS.length) * 100;

  const handleAnswer = (answer: typeof QUESTIONS[0]['answers'][0]) => {
    const newScores = { ...scores };
    Object.entries(answer.scores ?? {}).forEach(([key, val]) => {
      newScores[key as IntentionId] = (newScores[key as IntentionId] || 0) + val;
    });
    setScores(newScores);

    // Capture length filter from Q3
    if ((question as any).isLength) {
      setLengthFilter(answer.label.split('—')[0].trim().toLowerCase());
    }

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      // Calculate winner; tie-break by Q2 (radiant vs others)
      const maxScore = Math.max(...Object.values(newScores));
      const winners = (Object.entries(newScores) as [IntentionId, number][])
        .filter(([, s]) => s === maxScore)
        .map(([k]) => k);
      setResult(winners[0]);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setScores({ grounded: 0, radiant: 0, tender: 0, magnetic: 0, vowed: 0 });
    setLengthFilter(null);
    setResult(null);
  };

  // Result screen
  if (result) {
    const intention = INTENTIONS[result];
    const products = getProductsByIntention(result).slice(0, 6);

    return (
      <div style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--linen)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '5rem 1.5rem', textAlign: 'center' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>Your Intention is</p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 300,
              color: 'var(--espresso)',
              marginBottom: '1rem',
            }}
          >
            {intention.label}
          </h1>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 16, color: 'var(--cocoa)', maxWidth: 480, margin: '0 auto 3rem', lineHeight: 1.75 }}>
            {intention.description}
          </p>

          {/* NailArt preview */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
            <div className="arch" style={{ background: intention.tint, padding: '3rem 4rem' }}>
              <NailArt
                shape="almond"
                finish={['grounded', 'vowed'].includes(result) ? 'glossy' : result === 'radiant' ? 'chrome' : result === 'magnetic' ? 'matte' : 'glossy'}
                art="floral"
                baseColour={intention.tint}
                accentColour={intention.accent}
                length="medium"
                size="lg"
                animate
              />
            </div>
          </div>

          {/* Curated products */}
          {products.length > 0 && (
            <>
              <p className="eyebrow" style={{ marginBottom: '2rem' }}>Made for your intention</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem', textAlign: 'left', marginBottom: '3rem' }}>
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} region={region} index={i} />
                ))}
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/collections/${result}`} className="btn btn-primary">
              <span>Shop {intention.label}</span>
            </Link>
            <button onClick={reset} className="btn btn-outline">
              <span>Retake</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--espresso)',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 100,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="leaf-overlay" />

      {/* Gold progress line */}
      <div style={{ height: 1, background: 'rgba(217,181,124,0.2)', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${progress}%`,
            background: 'var(--gold)',
            transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 640, width: '100%' }}>
          {/* Question counter */}
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(217,181,124,0.6)',
              marginBottom: '1.5rem',
            }}
          >
            {currentQ + 1} of {QUESTIONS.length}
          </p>

          {/* Question */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 4vw, 2.75rem)',
              fontWeight: 300,
              color: 'var(--parchment)',
              marginBottom: '3rem',
              lineHeight: 1.25,
            }}
          >
            {question.question}
          </h2>

          {/* Answer tiles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {question.answers.map((answer, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(answer)}
                style={{
                  padding: '1.25rem 1.5rem',
                  background: 'rgba(251,247,241,0.06)',
                  border: '1px solid rgba(185,138,78,0.25)',
                  borderRadius: 4,
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  fontWeight: 300,
                  color: 'var(--parchment)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.3s, border-color 0.3s, transform 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(185,138,78,0.15)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(185,138,78,0.6)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateX(6px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(251,247,241,0.06)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(185,138,78,0.25)';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'none';
                }}
              >
                {answer.label}
              </button>
            ))}
          </div>

          {/* Skip / Back */}
          {currentQ > 0 && (
            <button
              onClick={() => setCurrentQ((q) => q - 1)}
              style={{
                marginTop: '2rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                color: 'rgba(251,247,241,0.4)',
                letterSpacing: '0.08em',
                padding: '8px 0',
              }}
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
