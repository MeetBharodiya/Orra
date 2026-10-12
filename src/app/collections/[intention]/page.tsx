import React from 'react';
import { notFound } from 'next/navigation';
import { INTENTIONS, type IntentionId } from '@/data/config';
import CollectionClient from './CollectionClient';

export function generateStaticParams() {
  return Object.keys(INTENTIONS).map((intention) => ({ intention }));
}

interface CollectionPageProps {
  params: Promise<{ intention: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { intention: intentionSlug } = await params;
  const intentionData = INTENTIONS[intentionSlug as IntentionId];
  if (!intentionData) notFound();

  return <CollectionClient intention={intentionSlug as IntentionId} intentionData={intentionData} />;
}
