"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CtaSection from '@/components/CtaSection';
import KnowledgeFeed from '@/components/KnowledgeFeed';
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
      <Navbar invertOnLoad={true} />

      {/* 1. Hero Section */}
      <section className="global-padding" style={{ paddingTop: '15rem', paddingBottom: '4rem' }}>
        <div className="inner-page-container reveal-base reveal-up is-revealed">
          <p className="services-subtitle" style={{ marginBottom: '1.5rem' }}>
            <span className="dot"></span> {t.knowledge.hero.tag}
          </p>
          <h1 className="editorial-headline" style={{ marginBottom: '2rem' }}>
            {t.knowledge.hero.title} <br />
            <span className="italic-serif">{t.knowledge.hero.titleSerif}</span>
          </h1>
          <p style={{ fontSize: '1.5rem', color: 'rgba(4,36,51,0.7)', maxWidth: '800px', lineHeight: 1.6 }}>
            {t.knowledge.hero.subhead}
          </p>
        </div>
      </section>

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
