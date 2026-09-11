"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedReferenceCurtain from '@/components/FeaturedReferenceCurtain';
import ReferencesSwiperGallery from '@/components/ReferencesSwiperGallery';
import CtaSection from '@/components/CtaSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';
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
  const { ref: heroRef, isVisible } = useScrollReveal(0.1);
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

      {/* 1. Full Screen Cinematic Hero */}
      <div ref={heroRef} style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <style>{`
          @keyframes subtleZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.15); }
          }
        `}</style>

        {/* Background Image covering 100% */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/luxury_estate_hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'subtleZoom 30s ease-in-out infinite alternate',
          transformOrigin: 'center center',
          zIndex: 0
        }} />

        {/* Gradient Overlay for Text Readability & Blending */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(4,36,51,0.25) 0%, rgba(4,36,51,0.25) 60%, var(--cream) 100%)',
          zIndex: 1
        }} />

        {/* Navbar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 }}>
          <Navbar invertOnLoad={false} />
        </div>

        {/* Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 2rem',
          maxWidth: '1000px',
          marginTop: '2rem'
        }}>
          <h1 className={`reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`} style={{
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: 'var(--white)',
            letterSpacing: '-1px'
          }}>
            {referencesPageData.hero.title} <br/>
            <span className="italic-serif" style={{ color: 'var(--bronze)', fontSize: '1.2em' }}>
              {referencesPageData.hero.titleSerif}
            </span>
          </h1>

          <p className={`reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`} style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '650px',
            margin: '2rem auto 0 auto',
            fontWeight: 300
          }}>
            {referencesPageData.hero.description}
          </p>
        </div>
      </div>

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
