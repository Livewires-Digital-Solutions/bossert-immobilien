"use client";

import React from 'react';
import Footer from '@/components/Footer';
import FeaturedReferenceCurtain from '@/components/FeaturedReferenceCurtain';
import ReferencesSwiperGallery from '@/components/ReferencesSwiperGallery';
import CtaSection from '@/components/CtaSection';
import ReferencesHero from '@/components/ReferencesHero';
import { useLanguage } from '@/context/LanguageContext';

export default function ReferencesPage() {
  const { t } = useLanguage();
  const referencesPageData = (t as any).referencesPageData;

  if (!referencesPageData) return null;

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh' }}>

      {/* 1. Hero Section */}
      <ReferencesHero />

      <div className="inner-page-container">
        {/* 2. Featured Cinematic Reveal */}
        <FeaturedReferenceCurtain data={referencesPageData.featured} />

        {/* 3. Swiper 3D Coverflow Gallery */}
        <ReferencesSwiperGallery data={referencesPageData.gallery} />
      </div>
      
      {/* 4. CTA Section */}
      <CtaSection />
      
      <Footer />
    </main>
  );
}
