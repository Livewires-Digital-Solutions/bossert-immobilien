"use client";

import React from 'react';
import Navbar from './Navbar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import BtnArrow from './BtnArrow';

export default function ReferencesHero() {
  const { ref: heroRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();
  const referencesPageData = (t as any).referencesPageData;

  if (!referencesPageData) return null;

  return (
    <div className="properties-editorial-hero references-editorial-hero" ref={heroRef}>
      <div className="properties-hero-bg" />
      <div className="properties-hero-overlay-cream" />
      <Navbar invertOnLoad={true} />

      <div className="editorial-hero-content">
        {/* Mobile-only eyebrow tag from the client reference — hidden on
            tablet/desktop, shown only <=768px (see globals.css). */}
        {referencesPageData.hero.tag && (
          <div className={`references-hero-eyebrow reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
            <span className="references-hero-eyebrow-line" />
            <span className="references-hero-eyebrow-text">{referencesPageData.hero.tag}</span>
            <span className="references-hero-eyebrow-line" />
          </div>
        )}

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

        {/* Mobile-only CTA from the client reference — hidden on
            tablet/desktop (see globals.css). Jumps down to the gallery
            already rendered further down this same page. */}
        {referencesPageData.hero.cta && (
          <div className={`references-hero-cta-wrap reveal-base reveal-up delay-300 ${isVisible ? 'is-revealed' : ''}`}>
            <a href="#reference-gallery" className="explore-btn explore-btn-dark references-hero-btn">
              {referencesPageData.hero.cta}
              <BtnArrow />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
