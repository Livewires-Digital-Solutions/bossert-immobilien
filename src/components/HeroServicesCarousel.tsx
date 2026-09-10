"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface ServiceSlide {
  counter: string;
  tag: string;
  image: string;
  category: string;
  titleLine1: string;
  titleLine2: string;
  desc: string;
  href: string;
}

const slides: ServiceSlide[] = [
  {
    counter: '01 / 03',
    tag: 'PEOPLE\nPROPERTIES\nPOSSIBILITIES.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    category: 'SELLING',
    titleLine1: 'Sell your property',
    titleLine2: '— strategically',
    desc: 'With precise market insights and a bespoke sales strategy, we ensure your property reaches the right buyers.',
    href: '/services',
  },
  {
    counter: '02 / 03',
    tag: '',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    category: 'MANAGEMENT',
    titleLine1: 'Professional',
    titleLine2: 'management',
    desc: 'Maximize the value of your property with our tailored management services and expert oversight.',
    href: '/services',
  },
  {
    counter: '03 / 03',
    tag: '',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    category: 'BUYING',
    titleLine1: 'Find your',
    titleLine2: 'ideal property',
    desc: 'We help you discover extraordinary properties that match your lifestyle and exceed your expectations.',
    href: '/properties',
  },
];

function ServiceCard({ slide }: { slide: ServiceSlide }) {
  return (
    <div className="hsc2-card">
      <div className="hsc2-img" style={{ backgroundImage: `url(${slide.image})` }}>
        <div className="hsc2-img-header">
          <span className="hsc2-counter">{slide.counter}</span>
          {slide.tag && <span className="hsc2-tag">{slide.tag}</span>}
        </div>
      </div>
      <div className="hsc2-body">
        <span className="hsc2-category">
          {slide.category}
          <span className="hsc2-cat-line" />
        </span>
        <h3 className="hsc2-title">
          {slide.titleLine1}
          <br />
          <em>{slide.titleLine2}</em>
        </h3>
        <p className="hsc2-desc">{slide.desc}</p>
        <Link href={slide.href} className="hsc2-btn">
          LEARN MORE <span className="hsc2-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

type Phase = 'idle' | 'exit' | 'enter';

export default function HeroServicesCarousel() {
  const [active, setActive] = useState(0);
  const [phase, setPhase]   = useState<Phase>('idle');
  const total = slides.length;

  const navigate = useCallback((dir: 'next' | 'prev') => {
    if (phase !== 'idle') return;

    // Phase 1 — exit: scale down + blur out
    setPhase('exit');

    setTimeout(() => {
      // Swap content
      setActive(a => dir === 'next' ? (a + 1) % total : (a - 1 + total) % total);
      // Phase 2 — enter: bloom in
      setPhase('enter');

      setTimeout(() => {
        setPhase('idle');
      }, 480);
    }, 280);
  }, [phase, total]);

  const next = useCallback(() => navigate('next'), [navigate]);
  const prev = useCallback(() => navigate('prev'), [navigate]);

  useEffect(() => {
    const t = setTimeout(next, 5500);
    return () => clearTimeout(t);
  }, [active, next]);

  const idx = (offset: number) => (active + offset + total) % total;

  return (
    <div className="hsc2-wrapper">
      {/* Card stack */}
      <div className="hsc2-root">
        {/* Left behind */}
        <div className={`hsc2-behind hsc2-behind-left${phase !== 'idle' ? ' hsc2-behind-dim' : ''}`} onClick={prev}>
          <ServiceCard slide={slides[idx(-1)]} />
        </div>

        {/* Right behind */}
        <div className={`hsc2-behind hsc2-behind-right${phase !== 'idle' ? ' hsc2-behind-dim' : ''}`} onClick={next}>
          <ServiceCard slide={slides[idx(1)]} />
        </div>

        {/* Front card */}
        <div className={`hsc2-front${phase === 'exit' ? ' hsc2-front-exit' : ''}${phase === 'enter' ? ' hsc2-front-enter' : ''}`}>
          <ServiceCard slide={slides[idx(0)]} />
        </div>
      </div>

      {/* Bottom controls */}
      <div className="hsc2-controls">
        <button className="hsc2-ctrl-btn" onClick={prev} aria-label="Previous">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="hsc2-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hsc2-dot${i === active ? ' hsc2-dot-active' : ''}`}
              onClick={() => {
                if (i === active || phase !== 'idle') return;
                navigate(i > active ? 'next' : 'prev');
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button className="hsc2-ctrl-btn" onClick={next} aria-label="Next">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
