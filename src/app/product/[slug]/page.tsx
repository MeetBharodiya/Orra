import React from 'react';
import { PRODUCTS } from '@/data/products';
import ProductClient from './ProductClient';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  return <ProductClient slug={slug} />;
}
