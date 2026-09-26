"use client";

import React from 'react';
import Navbar from './Navbar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function KnowledgeHero() {
  const { ref: heroRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();

  return (
    <div className="properties-editorial-hero" ref={heroRef}>
      <div className="properties-hero-bg" />
      <div className="properties-hero-overlay-cream" />
      <Navbar invertOnLoad={true} />

      <div className="editorial-hero-content">
        <div className="editorial-hero-middle">
          <h1 className={`editorial-headline properties-hero-headline reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
            <span className="properties-title-word">{t.knowledge.hero.title}</span>{' '}
            <br className="properties-mobile-br" />
            <span className="italic-serif properties-title-serif">{t.knowledge.hero.titleSerif}</span>
          </h1>
        </div>

        <div className="editorial-hero-bottom">
          <p className={`editorial-subhead properties-mobile-subhead reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
            {t.knowledge.hero.subhead}
          </p>
        </div>
      </div>
    </div>
  );
}
