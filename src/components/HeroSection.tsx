"use client";

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

// Render a headline line with its final word emphasized in white italic
// (e.g. "for residential" → for <em>residential</em>)
function HighlightLastWord({ text }: { text: string }) {
  const parts = text.trim().split(/\s+/);
  const last = parts.pop();
  return (
    <>
      {parts.length > 0 && <>{parts.join(' ')} </>}
      <span className="hero-headline-accent">{last}</span>
    </>
  );
}

export default function HeroSection() {
  const { ref: heroRef, isVisible: scrollVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();
  const [gateReady, setGateReady] = useState(false);

  useEffect(() => {
    // If the intro gate is active, hold the text until the doors have opened and
    // the background's forward push has mostly settled — then let it animate in.
    const hasGate = typeof document !== 'undefined' && !!document.querySelector('[class*="introWrapper"]');
    const delay = hasGate ? 1500 : 80;
    const timer = setTimeout(() => {
      setGateReady(true);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  const isVisible = scrollVisible && gateReady;

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
                <span className="hero-headline-mid"><HighlightLastWord text={t.hero.headlineMid} /></span>
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
        </div>

        {/* Footer Area — centered scroll indicator */}
        <div className="bottom-area">
          <div className={`scroll-center reveal-base reveal-up delay-600 ${isVisible ? 'is-revealed' : ''}`}>
            <span className="scroll-label">{t.hero.scroll}</span>
            <div className="scroll-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

