"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedReferenceCurtain from '@/components/FeaturedReferenceCurtain';
import ReferencesSwiperGallery from '@/components/ReferencesSwiperGallery';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

export default function ReferencesPage() {
  const { ref: heroRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();
  const referencesPageData = (t as any).referencesPageData;

  if (!referencesPageData) return null;

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh' }}>
      
      {/* 1. Light Editorial Hero (Matching Properties Page style) */}
      <div className="properties-editorial-hero" ref={heroRef} style={{ paddingBottom: '4rem' }}>
        <Navbar invertOnLoad={true} />
        
        <div className="editorial-hero-content">
          <div className="editorial-hero-middle">
            <h1 className={`editorial-headline reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
              {referencesPageData.hero.title} <br/>
              <span className="italic-serif" style={{ color: 'var(--bronze)' }}>{referencesPageData.hero.titleSerif}</span>
            </h1>
          </div>
          
          <div className="editorial-hero-bottom" style={{ marginTop: '2rem' }}>
             <p className={`editorial-subhead reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`} style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.6, color: 'rgba(4,36,51,0.8)' }}>
                {referencesPageData.hero.description}
             </p>
          </div>
        </div>
      </div>

      <div className="inner-page-container">
        {/* 2. Featured Cinematic Reveal */}
        <FeaturedReferenceCurtain data={referencesPageData.featured} />

        {/* 3. Swiper 3D Coverflow Gallery */}
        <ReferencesSwiperGallery data={referencesPageData.gallery} />
      </div>
      
      <Footer />
    </main>
  );
}
