"use client";

import React from 'react';
import Navbar from './Navbar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import HeroServicesCarousel from './HeroServicesCarousel';

export default function HeroSection() {
  const { ref: heroRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();

  return (
    <div className="hero-section" ref={heroRef}>
      <div className="hero-bg-image"></div>
      <div className="hero-overlay"></div>
      
      <Navbar />
      <div className="hero-content">

        {/* Main Content */}
        <div className="main-grid">
          <div className="left-content">
            <div className="hero-top-group">
              <div className={`since-text reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
                {t.hero.since}
              </div>
              <h1 className={`hero-headline reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
                <span className="hero-headline-top">{t.hero.headlineTop}</span>
                <span className="hero-headline-mid">{t.hero.headlineMid}</span>
                <span className="hero-headline-bot">
                  <span>{t.hero.headlineBotPre}</span> {t.hero.headlineBotBold}
                </span>
              </h1>
            </div>
            <div className={`hero-subhead reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
              {t.hero.subhead}
            </div>
            <div className={`hero-desc reveal-base reveal-up delay-300 ${isVisible ? 'is-revealed' : ''}`}>
              {t.hero.desc}
            </div>
            {/* Explore button — left-aligned below the text */}
            <div className={`reveal-base reveal-up delay-400 ${isVisible ? 'is-revealed' : ''}`}>
              <a href="/properties" className="explore-btn">
                EXPLORE PROPERTIES
                <span className="btn-arrow">↗</span>
              </a>
            </div>
          </div>
          
          <div className="right-content">
            <HeroServicesCarousel />
          </div>
        </div>

        {/* Footer Area */}
        <div className="bottom-area">
          <div className="bottom-left"></div>
          <div className={`bottom-right reveal-base reveal-up delay-600 ${isVisible ? 'is-revealed' : ''}`}>
            <div className="scroll-indicator">
              {t.hero.scroll}
              <div className="scroll-icon"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

