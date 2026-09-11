"use client";

import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import CtaSection from '@/components/CtaSection';
import KnowledgeFeed from '@/components/KnowledgeFeed';
import KnowledgeHero from '@/components/KnowledgeHero';
import { useLanguage } from '@/context/LanguageContext';
import { localizeArticle, type ApiArticle } from '@/lib/article-client';

export default function KnowledgePage() {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState<ApiArticle[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/articles')
      .then((r) => r.json())
      .then((d) => {
        if (alive) setItems(Array.isArray(d.articles) ? d.articles : []);
      })
      .catch(() => alive && setItems([]));
    return () => {
      alive = false;
    };
  }, []);

  const localized = items ? items.map((a) => localizeArticle(a, lang)) : null;
  const dbFeatured = localized?.find((a) => a.featured) ?? null;

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Hero Section */}
      <KnowledgeHero />

      {/* 2. Feed & Filters */}
      <KnowledgeFeed
        data={t.knowledge}
        dbArticles={localized ?? undefined}
        dbFeatured={dbFeatured}
      />

      {/* 3. CTA */}
      <CtaSection variant="knowledge" invert={true} />

      <Footer />
    </main>
  );
}
