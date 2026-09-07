"use client";

import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function IntroPromo() {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section className="intro-promo-section" ref={ref}>
      {/* Illustrated background — inverted to white lines via CSS */}
      <div className="intro-promo-illustration" aria-hidden="true" />

      <div className={`intro-promo-inner reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
        <div className="intro-promo-tag">
          <span className="dot" />
          Property Experts — Rhine-Main
        </div>

        <h2 className="intro-promo-headline">
          Your Property Expert in the Rhine-Main Region
        </h2>

        <p className="intro-promo-sub">
          Comprehensive Property Solutions — from initial consultation to successful closing
        </p>

        <p className="intro-promo-body">
          Whether you're buying, selling, or seeking a valuation, we support you with tailored strategies,
          personalized guidance, and in-depth market expertise.
        </p>

        <a href="/contact" className="intro-promo-cta">
          Request a free consultation
          <span className="intro-promo-cta-arrow">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
