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
    <div className="properties-editorial-hero services-editorial-hero" ref={heroRef}>
      <div className="properties-hero-bg" />
      <div className="properties-hero-overlay-cream" />
      {/* Mobile-only decorative corner arcs — matches the client reference
          image's faint circle traces. Hidden by default (see globals.css
          base rule); shown only under the 768px mobile breakpoint. */}
      <span className="services-hero-arc services-hero-arc-left" aria-hidden="true" />
      <span className="services-hero-arc services-hero-arc-right" aria-hidden="true" />
      <Navbar invertOnLoad={true} />

      <div className="editorial-hero-content">
        {/* Mobile-only eyebrow tag ("OUR BROKERAGE") from the client
            reference — hidden on tablet/desktop, shown only <=768px. */}
        {servicesPageData.hero.tag && (
          <div className={`services-hero-eyebrow reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
            <span className="services-hero-eyebrow-line" />
            <span className="services-hero-eyebrow-text">{servicesPageData.hero.tag}</span>
            <span className="services-hero-eyebrow-line" />
          </div>
        )}

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
          <Link href="/contact" className="explore-btn explore-btn-dark services-hero-btn">
            {servicesPageData.hero.cta}
            <BtnArrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
