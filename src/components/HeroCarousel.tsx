"use client";

import React, { useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

export default function HeroCarousel() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      category: t.services.cards[0].category,
      title: t.services.cards[0].title,
      subtitle: t.services.cards[0].subtitle,
      description: t.services.cards[0].description,
      linkText: 'learn more', // Using explicit "learn more" to match image
      image: "/card1.jpg",
      href: "/properties"
    },
    {
      category: t.services.cards[1].category,
      title: t.services.cards[1].title,
      subtitle: t.services.cards[1].subtitle,
      description: t.services.cards[1].description,
      linkText: 'learn more',
      image: "/card2.jpg",
      href: "/owners"
    },
    {
      category: t.services.cards[2].category,
      title: t.services.cards[2].title,
      subtitle: t.services.cards[2].subtitle,
      description: t.services.cards[2].description,
      linkText: 'learn more',
      image: "/card3.jpg",
      href: "/services"
    }
  ];

  const n = cards.length;
  const prevIdx = (currentIndex - 1 + n) % n;
  const nextIdx = (currentIndex + 1) % n;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % n);
  }, [n]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + n) % n);
  }, [n]);

  const renderCardContent = (card: typeof cards[0]) => (
    <>
      <div className="hc-image-wrap">
        <div className="hc-image" style={{ backgroundImage: `url(${card.image})` }} />
      </div>
      <div className="hc-body">
        <h3 className="hc-title">{card.title}</h3>
        <p className="hc-desc">{card.description}</p>
        <Link href={card.href} className="hc-btn" onClick={(e) => e.stopPropagation()}>
          <span className="hc-btn-text">{card.linkText}</span>
          <span className="hc-btn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        </Link>
      </div>
    </>
  );

  return (
    <div className="hc-root">

      {/* Left side card */}
      <div className="hc-side-card hc-side-left" onClick={handlePrev}>
        {renderCardContent(cards[prevIdx])}
        <div className="hc-dim-overlay" />
      </div>

      {/* Prev arrow */}
      <button className="hc-nav hc-nav-prev" onClick={handlePrev} aria-label="Previous">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Center active card */}
      <div className="hc-center-card">
        {renderCardContent(cards[currentIndex])}
      </div>

      {/* Next arrow */}
      <button className="hc-nav hc-nav-next" onClick={handleNext} aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Right side card */}
      <div className="hc-side-card hc-side-right" onClick={handleNext}>
        {renderCardContent(cards[nextIdx])}
        <div className="hc-dim-overlay" />
      </div>

      {/* Dots */}
      <div className="hc-dots">
        {cards.map((_, idx) => (
          <button
            key={idx}
            className={`hc-dot ${idx === currentIndex ? 'hc-dot-active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
