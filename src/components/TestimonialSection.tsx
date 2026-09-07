"use client";

import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollReveal(0.2);
  const { t } = useLanguage();
  const testimonials = t.testimonials.list;

  const goTo = (index: number) => {
    if (animating || index === activeIndex) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(index);
      setAnimating(false);
    }, 350);
  };

  const next = () => goTo((activeIndex + 1) % testimonials.length);
  const prev = () => goTo((activeIndex - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, testimonials.length]);

  const current = testimonials[activeIndex];

  return (
    <section className="testimonial-section" ref={sectionRef}>

      {/* Large decorative SVG quote mark in background */}
      <div className="test-bg-quote" aria-hidden="true">
        <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text
            x="0" y="160"
            fontFamily="Georgia, serif"
            fontSize="220"
            fill="currentColor"
            opacity="1"
          >&ldquo;</text>
        </svg>
      </div>

      {/* ─── Left column: Tag + Headline + Nav ─── */}
      <div className={`test-left reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
        <div className="test-tag">
          <span className="dot" />
          {t.testimonials.tag}
        </div>

        <h2 className="test-headline">
          {t.testimonials.headline}
          <span className="italic-serif"> {t.testimonials.headlineSerif}</span>
        </h2>

        {/* Navigation */}
        <div className={`test-nav reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
          <button className="test-arrow-plain" onClick={prev} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>

          <div className="test-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`test-dot ${i === activeIndex ? 'test-dot-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button className="test-arrow-plain" onClick={next} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Vertical golden divider */}
      <div className="test-vertical-rule" aria-hidden="true" />

      {/* ─── Right column: Quote + Attribution ─── */}
      <div className={`test-right reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
        <div className={`test-quote-inner ${animating ? 'test-fade-out' : 'test-fade-in'}`}>
          <blockquote className="test-quote-text">
            {current.quote}
          </blockquote>

          <div className="test-attribution">
            <div className="test-attribution-line" />
            <span className="test-author-name">{current.author}</span>
            <span className="test-attribution-divider">—</span>
            <span className="test-author-location">{current.location}</span>
          </div>
        </div>
      </div>

      {/* Bottom golden divider to next section */}
      <div className="test-bottom-divider" aria-hidden="true" />

    </section>
  );
}
