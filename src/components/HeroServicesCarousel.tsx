"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

interface ServiceSlide {
  image: string;
  category: string;
  titleLine1: string;
  titleLine2: string;
  desc: string;
  href: string;
}

const slides: ServiceSlide[] = [
  {
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
    category: 'Valuation',
    titleLine1: 'Get your property',
    titleLine2: 'valuation',
    desc: 'Receive an accurate and professional property valuation from our experienced experts.',
    href: '/owners',
  },
  {
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    category: 'Selling',
    titleLine1: 'Sell your property',
    titleLine2: 'strategically',
    desc: 'With precise market insights and a bespoke sales strategy, we ensure your property reaches the right buyers at the right price.',
    href: '/services',
  },
  {
    image:
      'https://images.unsplash.com/photo-1741156386380-0236c72eb6f9?auto=format&fit=crop&q=80&w=800',
    category: 'Buying',
    titleLine1: 'Acquire your next',
    titleLine2: 'property',
    desc: 'Your new property is waiting for you. We guide you through every step of identifying, evaluating, and acquiring the right asset — whether for personal use or as an investment.',
    href: '/properties',
  },
];

function ArrowBadge() {
  return (
    <span className="hsc2-btn-badge" aria-hidden="true">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

function ServiceCard({ slide, index }: { slide: ServiceSlide; index: number }) {
  return (
    <div className="hsc2-card">
      <div className="hsc2-img" style={{ backgroundImage: `url(${slide.image})` }}>
        <span className="hsc2-counter">
          {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
      <div className="hsc2-body">
        <span className="hsc2-category">
          <span className="hsc2-cat-line" />
          {slide.category}
        </span>
        <h3 className="hsc2-title">
          {slide.titleLine1}
          <br />
          <em>{slide.titleLine2}</em>
        </h3>
        <p className="hsc2-desc">{slide.desc}</p>
        <Link href={slide.href} className="hsc2-btn">
          <span>Learn more</span>
          <ArrowBadge />
        </Link>
      </div>
    </div>
  );
}

export default function HeroServicesCarousel() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [noTrans, setNoTrans] = useState<number | null>(null);
  const total = slides.length;
  useLanguage(); // re-render on language change (copy is EN-only for now)

  // Signed offset of slide `i` from the active slide, wrapped to [-half, +half].
  const relOf = useCallback(
    (i: number) => {
      let r = i - active;
      if (r > total / 2) r -= total;
      if (r < -total / 2) r += total;
      return r;
    },
    [active, total],
  );

  const navigate = useCallback(
    (dir: 'next' | 'prev') => {
      if (animating) return;
      setAnimating(true);

      const nextActive =
        dir === 'next' ? (active + 1) % total : (active - 1 + total) % total;

      // The card that would sweep straight through the centre — send it across
      // with no transition so the other two do the visible sliding.
      const wrapIdx =
        dir === 'next' ? (active - 1 + total) % total : (active + 1) % total;

      setNoTrans(wrapIdx);
      setActive(nextActive);

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setNoTrans(null);
          setTimeout(() => setAnimating(false), 600);
        }),
      );
    },
    [active, animating, total],
  );

  const next = useCallback(() => navigate('next'), [navigate]);
  const prev = useCallback(() => navigate('prev'), [navigate]);

  useEffect(() => {
    const t = setTimeout(next, 5500);
    return () => clearTimeout(t);
  }, [active, next]);

  return (
    <div className="hsc2-wrapper">
      <div className="hsc2-stage">
        <button className="hsc2-nav hsc2-nav-prev" onClick={prev} aria-label="Previous service">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="hsc2-root">
          {slides.map((slide, i) => {
            const r = relOf(i);
            return (
              <div
                key={i}
                className="hsc2-slide"
                data-rel={r}
                data-hidden={Math.abs(r) > 1}
                data-notrans={noTrans === i}
                onClick={() => {
                  if (r === -1) prev();
                  else if (r === 1) next();
                }}
              >
                <ServiceCard slide={slide} index={i} />
              </div>
            );
          })}
        </div>

        <button className="hsc2-nav hsc2-nav-next" onClick={next} aria-label="Next service">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="hsc2-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hsc2-dot${i === active ? ' hsc2-dot-active' : ''}`}
            onClick={() => {
              if (i === active || animating) return;
              const forward = (i - active + total) % total;
              const backward = (active - i + total) % total;
              navigate(forward <= backward ? 'next' : 'prev');
            }}
            aria-label={`Go to service ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
