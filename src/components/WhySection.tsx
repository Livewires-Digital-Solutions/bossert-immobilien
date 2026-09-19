"use client";

import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function WhySection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.3);
  const { t } = useLanguage();

  return (
    <section className="why-section" ref={sectionRef}>
      <div className="why-container">

        {/* Left Column: Sticky Headline */}
        <div className="why-left-col">
          <div className="why-header-sticky">
            <p className={`services-subtitle reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`} style={{ marginBottom: '1rem' }}>
              <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {t.why.tag}
            </p>
            <h2 className={`why-headline reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
              {t.why.headline} <br /><span className="italic-serif">{t.why.headlineSerif}</span>
            </h2>
            <p className={`why-subhead reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
              {t.why.desc1}
            </p>
            <div className={`why-editorial-phrase reveal-base reveal-up delay-300 ${isVisible ? 'is-revealed' : ''}`} style={{ marginTop: '1rem' }}>
              {t.why.desc2}
            </div>
          </div>
        </div>

        {/* Right Column: Features */}
        <div className="why-right-col">
          {t.why.features.map((feature: any, index: number) => {
            const delay = 100 + index * 100;
            return (
              <div className="why-feature-block" key={index}>
                <div className={`why-feature-header reveal-base reveal-scale delay-${delay} ${isVisible ? 'is-revealed' : ''}`}>
                  {index === 0 && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="why-feature-icon">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/>
                      <path d="M9 18h6"/>
                      <path d="M10 22h4"/>
                    </svg>
                  )}
                  {index === 1 && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="why-feature-icon">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="6"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                  )}
                  {index === 2 && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="why-feature-icon">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <path d="M10.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                      <line x1="12.5" y1="14.5" x2="15" y2="17"/>
                    </svg>
                  )}
                  <h3 className="why-feature-title">{feature.title}</h3>
                </div>
                <div className={`why-feature-desc reveal-base reveal-up delay-${delay + 100} ${isVisible ? 'is-revealed' : ''}`}>
                  {feature.desc}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
