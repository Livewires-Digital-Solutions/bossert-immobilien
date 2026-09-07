"use client";

import React from 'react';
import Navbar from './Navbar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

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
                {t.hero.headline}
              </h1>
            </div>
            <div className={`hero-subhead reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
              {t.hero.subhead}
            </div>
            <div className={`hero-desc reveal-base reveal-up delay-300 ${isVisible ? 'is-revealed' : ''}`}>
              {t.hero.desc}
            </div>
          </div>
          
          <div className="right-content">
            {/* Carousel removed as requested */}
          </div>
        </div>

        {/* Footer Area */}
        <div className="bottom-area">
          <div className="bottom-left">
            <div className={`scroll-indicator reveal-base reveal-up delay-600 ${isVisible ? 'is-revealed' : ''}`}>
              {t.hero.scroll}
              <div className="scroll-icon"></div>
            </div>
          </div>
          
          <div className={`bottom-right reveal-base reveal-up delay-500 ${isVisible ? 'is-revealed' : ''}`}>
            <a href="#" className="explore-btn">
              EXPLORE PROPERTIES
              <div className="explore-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

