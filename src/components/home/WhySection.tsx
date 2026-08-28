"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

export default function WhySection() {
  const t = useTranslations('home.why');

  return (
    <section className="why-section">
      <div className="why-container">
        
        {/* Left Column: Sticky Headline */}
        <div className="why-left-col">
          <div className="why-header-sticky">
            <p className="services-subtitle reveal" style={{ marginBottom: '1rem' }}>
              <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {t('tag')}
            </p>
            <h2 className="why-headline reveal stagger-1">
              {t('headline')} <br /><span className="italic-serif">{t('headlineSerif')}</span>
            </h2>
            <p className="why-subhead reveal stagger-2">
              {t('desc1')}
            </p>
            <div className="why-editorial-phrase reveal stagger-3" style={{ marginTop: '1rem' }}>
              {t('desc2')}
            </div>
          </div>
        </div>

        {/* Right Column: Numbers & Philosophy */}
        <div className="why-right-col">
          
          <div className="why-stat-block">
            <div className="why-stat-number reveal reveal-scale stagger-1">€1.2B</div>
            <div className="why-stat-text reveal stagger-2">
              {t('stat1')}
            </div>
          </div>
          
          <div className="why-stat-block">
            <div className="why-stat-number reveal reveal-scale stagger-2">0%</div>
            <div className="why-stat-text reveal stagger-3">
              {t('stat2')}
            </div>
          </div>
          
          <div className="why-stat-block">
            <div className="why-stat-number reveal reveal-scale stagger-3">14</div>
            <div className="why-stat-text reveal stagger-4">
              {t('stat3')}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
