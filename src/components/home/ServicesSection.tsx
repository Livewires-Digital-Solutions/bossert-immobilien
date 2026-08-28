"use client";

import React from 'react';
import AccordionCard from './AccordionCard';
import { useTranslations } from 'next-intl';

export default function ServicesSection() {
  const t = useTranslations('home.services');
  
  // The translations structure for cards array is array of objects in JSON
  // next-intl supports getting them via t.raw('cards')
  const cards = t.raw('cards') as Array<{
    category: string;
    title: string;
    subtitle: string;
    description: string;
    linkText: string;
  }>;

  const bgImages = ["/card1.jpg", "/card2.jpg", "/card3.jpg", "/card4.jpg"];

  return (
    <section className="services-section">
      <div className="services-left reveal-scale">
        <div className="services-subtitle">
          <span className="dot"></span> {t('tag')}
        </div>
        <div className="services-headline">
          <div className="headline-top-s">{t('headline')}</div>
          <div className="headline-mid-s">{t('headlineMid')}</div>
          <div className="headline-bot-s"><span>{t('headlineSerif')}</span> {t('headlineBot')}</div>
        </div>
        <div className="services-desc">
          {t('subhead')}
        </div>
        <div className="services-footer">
          {t('footer')}
        </div>
      </div>

      <div className="services-right accordion-container">
        {cards.map((card, idx) => (
          <AccordionCard 
            key={idx} 
            number={`0${idx + 1}`} 
            {...card} 
            bgImage={bgImages[idx] || "/card1.jpg"} 
          />
        ))}
      </div>
    </section>
  );
}
