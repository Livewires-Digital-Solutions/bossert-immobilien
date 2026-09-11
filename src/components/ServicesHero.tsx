"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import BtnArrow from './BtnArrow';

export default function ServicesHero() {
  const { ref: heroRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();
  const servicesPageData = (t as any).servicesPageData;

  if (!servicesPageData) return null;

  return (
    <div className="properties-editorial-hero" ref={heroRef} style={{ paddingBottom: '10rem' }}>
      <div className="properties-hero-bg" />
      <div className="properties-hero-overlay-cream" />
      <Navbar invertOnLoad={true} />

      <div className="editorial-hero-content">
        <div className="editorial-hero-middle">
          <h1 className={`editorial-headline reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
            {servicesPageData.hero.title} <br />
            <span className="italic-serif">{servicesPageData.hero.titleSerif}</span>
          </h1>
        </div>
        
        <div className="editorial-hero-bottom">
          <p className={`editorial-subhead reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
            {servicesPageData.hero.description}
          </p>
        </div>

        <div
          className={`reveal-base reveal-up delay-300 ${isVisible ? 'is-revealed' : ''}`}
          style={{ marginTop: '2.5rem' }}
        >
          <Link href="/contact" className="explore-btn explore-btn-dark">
            {servicesPageData.hero.cta}
            <BtnArrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
