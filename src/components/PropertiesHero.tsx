"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import BtnArrow from './BtnArrow';

export default function PropertiesHero() {
  const { ref: heroRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();

  return (
    <div className="properties-editorial-hero" ref={heroRef}>
      <div className="properties-hero-bg" />
      <div className="properties-hero-overlay-cream" />
      <Navbar invertOnLoad={true} navyLogo={true} />

      <div className="editorial-hero-content">
        <div className="editorial-hero-middle">
          <h1 className={`editorial-headline properties-hero-headline reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
            <span className="properties-title-word">{t.propertiesPage.heroHeadline}</span>
            <br className="properties-mobile-br" />
            <span className="italic-serif properties-title-serif">{t.propertiesPage.heroHeadlineSerif}</span>
          </h1>
        </div>
        
        <div className="editorial-hero-bottom">
           <p className={`editorial-subhead properties-mobile-subhead reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
              {t.propertiesPage.heroSubhead}
           </p>
        </div>

        <div
          className={`reveal-base reveal-up delay-300 ${isVisible ? 'is-revealed' : ''}`}
          style={{ marginTop: '2.5rem' }}
        >
          <Link href="/search-profile" className="explore-btn explore-btn-dark properties-hero-btn">
            {t.propertiesPage.heroCta}
            <BtnArrow />
          </Link>
        </div>
      </div>

      {/* Mobile-only editorial photo — client reference showed a full-bleed,
          arch-topped property photo under the headline/CTA on phones.
          Deliberately kept OUTSIDE .editorial-hero-content (which carries
          the gutter padding for the text block above) and as a direct child
          of .properties-editorial-hero instead, so it can span edge-to-edge
          the way the reference does instead of sitting inset inside the
          text column. Reuses the home page's own hero image so it stays
          consistent with the site's existing photography instead of a new
          asset. Hidden entirely on tablet/desktop
          (.properties-hero-mobile-image in globals.css), where the abstract
          .properties-hero-bg illustration still carries the hero. */}
      <div className={`properties-hero-mobile-image reveal-base reveal-scale delay-400 ${isVisible ? 'is-revealed' : ''}`}>
        <div className="properties-hero-mobile-image-arch" />
      </div>
    </div>
  );
}
