"use client";

import React from 'react';
import AccordionCard from './AccordionCard';
import { useSectionReveal } from '../hooks/useSectionReveal';
import { useTranslations } from 'next-intl';

export default function ServicesSection() {
  const { ref: sectionRef, isVisible } = useSectionReveal(0.1);
  const t = useTranslations('Designer');
  const cardsData = t.raw('services.cards') as any[];

  const cards = [
    {
      number: "01",
      category: cardsData[0].category,
      title: cardsData[0].title,
      subtitle: cardsData[0].subtitle,
      description: cardsData[0].description,
      linkText: cardsData[0].linkText,
      bgImage: "/card1.jpg"
    },
    {
      number: "02",
      category: cardsData[1].category,
      title: cardsData[1].title,
      subtitle: cardsData[1].subtitle,
      description: cardsData[1].description,
      linkText: cardsData[1].linkText,
      bgImage: "/card2.jpg"
    },
    {
      number: "03",
      category: cardsData[2].category,
      title: cardsData[2].title,
      subtitle: cardsData[2].subtitle,
      description: cardsData[2].description,
      linkText: cardsData[2].linkText,
      bgImage: "/card3.jpg"
    },
    {
      number: "04",
      category: cardsData[3].category,
      title: cardsData[3].title,
      subtitle: cardsData[3].subtitle,
      description: cardsData[3].description,
      linkText: cardsData[3].linkText,
      bgImage: "/card4.jpg"
    }
  ];

  return (
    <section className="services-section" ref={sectionRef}>
      <div className={`services-left reveal-base reveal-scale ${isVisible ? 'is-revealed' : ''}`}>
        <div className="services-subtitle">
          <span className="dot"></span> {t('services.tag')}
        </div>
        <div className="services-headline">
          <div className="headline-top-s">{t('services.headline')}</div>
          <div className="headline-mid-s">{t('services.headlineMid')}</div>
          <div className="headline-bot-s"><span>{t('services.headlineSerif')}</span> {t('services.headlineBot')}</div>
        </div>
        <div className="services-desc">
          {t('services.subhead')}
        </div>
        <div className="services-footer">
          {t('services.footer')}
        </div>
      </div>

      <div className="services-right accordion-container">
        {cards.map((card, idx) => (
          <AccordionCard key={idx} {...card} />
        ))}
      </div>
    </section>
  );
}
