"use client";

import React from 'react';
import Navbar from './Navbar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function ReferencesHero() {
  const { ref: heroRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();
  const referencesPageData = (t as any).referencesPageData;

  if (!referencesPageData) return null;

  return (
    <div className="properties-editorial-hero" ref={heroRef} style={{ paddingBottom: '10rem' }}>
      <div className="properties-hero-bg" />
      <div className="properties-hero-overlay-cream" />
      <Navbar invertOnLoad={true} />

      <div className="editorial-hero-content">
        <div className="editorial-hero-middle">
          <h1 className={`editorial-headline reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
            {referencesPageData.hero.title} <span className="italic-serif">{referencesPageData.hero.titleSerif}</span>
          </h1>
        </div>

        <div className="editorial-hero-bottom">
          <p className={`editorial-subhead reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
            {referencesPageData.hero.description}
          </p>
        </div>
      </div>
    </div>
  );
}
