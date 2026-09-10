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
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    category: 'Selling',
    titleLine1: 'Sell your property',
    titleLine2: 'strategically',
    desc: 'Precise market insight and a bespoke sales strategy, so your property reaches exactly the right buyers.',
    href: '/services',
  },
  {
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    category: 'Management',
    titleLine1: 'Professional',
    titleLine2: 'management',
    desc: 'Protect and grow the value of your property with tailored management and attentive oversight.',
    href: '/services',
  },
  {
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    category: 'Buying',
    titleLine1: 'Find your',
    titleLine2: 'ideal home',
    desc: 'We uncover extraordinary properties that match your life and quietly exceed your expectations.',
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

type Phase = 'idle' | 'exit' | 'enter';

export default function HeroServicesCarousel() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const total = slides.length;
  useLanguage(); // re-render on language change (copy is EN-only for now)

  const navigate = useCallback(
    (dir: 'next' | 'prev') => {
      if (phase !== 'idle') return;
      setPhase('exit');
      setTimeout(() => {
        setActive((a) => (dir === 'next' ? (a + 1) % total : (a - 1 + total) % total));
        setPhase('enter');
        setTimeout(() => setPhase('idle'), 480);
      }, 280);
    },
    [phase, total],
  );

  const next = useCallback(() => navigate('next'), [navigate]);
  const prev = useCallback(() => navigate('prev'), [navigate]);

  useEffect(() => {
    const t = setTimeout(next, 5500);
    return () => clearTimeout(t);
  }, [active, next]);

  const idx = (offset: number) => (active + offset + total) % total;

  return (
    <div className="hsc2-wrapper">
      <div className="hsc2-root">
        <button className="hsc2-nav hsc2-nav-prev" onClick={prev} aria-label="Previous service">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div
          className={`hsc2-behind hsc2-behind-left${phase !== 'idle' ? ' hsc2-behind-dim' : ''}`}
          onClick={prev}
        >
          <ServiceCard slide={slides[idx(-1)]} index={idx(-1)} />
        </div>

        <div
          className={`hsc2-behind hsc2-behind-right${phase !== 'idle' ? ' hsc2-behind-dim' : ''}`}
          onClick={next}
        >
          <ServiceCard slide={slides[idx(1)]} index={idx(1)} />
        </div>

        <div
          className={`hsc2-front${phase === 'exit' ? ' hsc2-front-exit' : ''}${
            phase === 'enter' ? ' hsc2-front-enter' : ''
          }`}
        >
          <ServiceCard slide={slides[idx(0)]} index={idx(0)} />
        </div>

        <button className="hsc2-nav hsc2-nav-next" onClick={next} aria-label="Next service">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
              if (i === active || phase !== 'idle') return;
              navigate(i > active ? 'next' : 'prev');
            }}
            aria-label={`Go to service ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
