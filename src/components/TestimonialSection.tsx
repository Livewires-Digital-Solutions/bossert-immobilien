"use client";

import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

interface ApiTestimonial {
  id: string;
  author: string;
  location: string;
  image: string;
  en: { quote: string };
  de: { quote: string };
}

// Placeholder content for client review while the backend is disabled.
const DUMMY_TESTIMONIALS: ApiTestimonial[] = [
  {
    id: 'dummy-1',
    author: 'Alexander Reinhardt',
    location: 'Munich, Germany',
    image: '',
    en: { quote: 'Bosser Immo handled the sale of our family estate with a level of discretion and professionalism we did not think possible. Every step felt effortless.' },
    de: { quote: 'Bosser Immo hat den Verkauf unseres Familienanwesens mit einer Diskretion und Professionalität abgewickelt, die wir nicht für möglich gehalten hätten. Jeder Schritt fühlte sich mühelos an.' },
  },
  {
    id: 'dummy-2',
    author: 'Sophia Lindqvist',
    location: 'Zurich, Switzerland',
    image: '',
    en: { quote: 'From the first consultation to closing, the team anticipated every question. Their network found us a buyer within weeks, entirely off-market.' },
    de: { quote: 'Von der ersten Beratung bis zum Abschluss hat das Team jede Frage vorausgesehen. Ihr Netzwerk fand uns innerhalb weniger Wochen einen Käufer, vollständig abseits des offenen Marktes.' },
  },
  {
    id: 'dummy-3',
    author: 'Julien Moreau',
    location: 'Geneva, Switzerland',
    image: '',
    en: { quote: 'An exceptional experience. They understood exactly what we were looking for and presented only properties that matched our vision.' },
    de: { quote: 'Eine außergewöhnliche Erfahrung. Sie verstanden genau, wonach wir suchten, und präsentierten nur Immobilien, die unserer Vorstellung entsprachen.' },
  },
];

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollReveal(0.2);
  const { t, lang } = useLanguage();
  const [items, setItems] = useState<ApiTestimonial[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/testimonials')
      .then((res) => (res.ok ? res.json() : { testimonials: [] }))
      .then((json) => {
        if (!cancelled) setItems(json.testimonials?.length ? json.testimonials : DUMMY_TESTIMONIALS);
      })
      .catch(() => {
        if (!cancelled) setItems(DUMMY_TESTIMONIALS);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const testimonials = (items ?? []).map((item) => ({
    quote: lang === 'de' ? item.de.quote : item.en.quote,
    author: item.author,
    location: item.location,
    image: item.image,
  }));

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
    if (testimonials.length < 2) return;
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, testimonials.length]);

  // Loading, or nothing to show — don't render the section (empty-state).
  if (items === null || testimonials.length === 0) return null;

  const safeIndex = activeIndex % testimonials.length;
  const current = testimonials[safeIndex];

  return (
    <section className="testimonial-section" ref={sectionRef}>
      <div className={`test-content reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
        <div className="test-quote-icon" aria-hidden="true">&ldquo;</div>

        <h2 className="test-headline">{t.testimonials.title}</h2>
        <div className="test-divider" aria-hidden="true" />

        <div className="test-carousel">
          {testimonials.length > 1 && (
            <button className="test-arrow-plain test-arrow-left" onClick={prev} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <div className={`test-quote-inner ${animating ? 'test-fade-out' : 'test-fade-in'}`}>
            <blockquote className="test-quote-text">
              {current.quote}
            </blockquote>

            <div className="test-attribution">
              &mdash; {current.author}
            </div>
          </div>

          {testimonials.length > 1 && (
            <button className="test-arrow-plain test-arrow-right" onClick={next} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="test-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`test-dot ${i === safeIndex ? 'test-dot-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
