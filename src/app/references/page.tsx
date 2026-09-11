"use client";

import React, { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import FeaturedReferenceCurtain from '@/components/FeaturedReferenceCurtain';
import ReferencesSwiperGallery from '@/components/ReferencesSwiperGallery';
import CtaSection from '@/components/CtaSection';
import ReferencesHero from '@/components/ReferencesHero';
import { useLanguage } from '@/context/LanguageContext';

interface ApiReference {
  id: string;
  location: string;
  type: string;
  heroImage: string;
  size: string;
  featured: boolean;
  stats: { label: string; value: string }[];
  en: { title: string };
  de: { title: string };
}

export default function ReferencesPage() {
  const { t, lang } = useLanguage();
  const referencesPageData = (t as any).referencesPageData;
  const [references, setReferences] = useState<ApiReference[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/references')
      .then((res) => (res.ok ? res.json() : { references: [] }))
      .then((json) => {
        if (!cancelled) setReferences(json.references ?? []);
      })
      .catch(() => {
        if (!cancelled) setReferences([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!referencesPageData) return null;

  const featured = references?.find((r) => r.featured) ?? null;
  const galleryItems = (references ?? []).filter((r) => r.id !== featured?.id);

  const featuredData = featured
    ? {
        id: featured.id,
        tag: referencesPageData.featured.tag,
        title: lang === 'de' ? featured.de.title : featured.en.title,
        location: featured.location,
        description: referencesPageData.featured.description,
        image: featured.heroImage,
        stats: featured.stats,
      }
    : null;

  const galleryData = {
    tag: referencesPageData.gallery.tag,
    title: referencesPageData.gallery.title,
    titleSerif: referencesPageData.gallery.titleSerif,
    items: galleryItems.map((r) => ({
      id: r.id,
      title: lang === 'de' ? r.de.title : r.en.title,
      location: r.location,
      type: r.type,
      image: r.heroImage,
    })),
  };

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh' }}>

      {/* 1. Hero Section */}
      <ReferencesHero />

      <div className="inner-page-container">
        {/* 2. Featured Cinematic Reveal */}
        {featuredData && <FeaturedReferenceCurtain data={featuredData} />}

        {/* 3. Swiper 3D Coverflow Gallery */}
        {galleryData.items.length > 0 && <ReferencesSwiperGallery data={galleryData} />}
      </div>

      {/* 4. CTA Section */}
      <CtaSection />

      <Footer />
    </main>
  );
}
