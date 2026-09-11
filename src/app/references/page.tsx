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

// Temporary placeholder references so the page has something to show
// while real listings are added via the admin panel.
const DUMMY_REFERENCES: ApiReference[] = [
  {
    id: 'dummy-1',
    location: 'Kronberg im Taunus',
    type: 'Villa',
    heroImage: '/images/prop_villa_1787771383699.jpg',
    size: '420 m²',
    featured: true,
    stats: [
      { label: 'Sale price', value: '€3.2M' },
      { label: 'Days on market', value: '18' },
      { label: 'Over asking', value: '+6%' },
    ],
    en: { title: 'A Modernist Villa Above the Taunus' },
    de: { title: 'Eine moderne Villa über dem Taunus' },
  },
  {
    id: 'dummy-2',
    location: 'Frankfurt — Westend',
    type: 'Penthouse',
    heroImage: '/images/prop_penthouse_1787771396787.jpg',
    size: '260 m²',
    featured: false,
    stats: [
      { label: 'Sale price', value: '€2.1M' },
      { label: 'Days on market', value: '24' },
    ],
    en: { title: 'Skyline Penthouse, Westend' },
    de: { title: 'Skyline-Penthouse, Westend' },
  },
  {
    id: 'dummy-3',
    location: 'Bad Homburg',
    type: 'Estate',
    heroImage: '/images/prop_estate_1787771411381.jpg',
    size: '680 m²',
    featured: false,
    stats: [
      { label: 'Sale price', value: '€4.6M' },
      { label: 'Days on market', value: '31' },
    ],
    en: { title: 'A Private Estate in Bad Homburg' },
    de: { title: 'Ein privates Anwesen in Bad Homburg' },
  },
  {
    id: 'dummy-4',
    location: 'Frankfurt — Sachsenhausen',
    type: 'Apartment',
    heroImage: '/images/prop_apartment_new.jpg',
    size: '145 m²',
    featured: false,
    stats: [
      { label: 'Sale price', value: '€980K' },
      { label: 'Days on market', value: '12' },
    ],
    en: { title: 'Riverside Apartment, Sachsenhausen' },
    de: { title: 'Wohnung am Fluss, Sachsenhausen' },
  },
];

export default function ReferencesPage() {
  const { t, lang } = useLanguage();
  const referencesPageData = (t as any).referencesPageData;
  const [references, setReferences] = useState<ApiReference[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/references')
      .then((res) => (res.ok ? res.json() : { references: [] }))
      .then((json) => {
        if (!cancelled) setReferences(json.references?.length ? json.references : DUMMY_REFERENCES);
      })
      .catch(() => {
        if (!cancelled) setReferences(DUMMY_REFERENCES);
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
