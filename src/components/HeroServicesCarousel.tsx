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
      {/* Image — top 58% */}
      <div className="hsc2-img" style={{ backgroundImage: `url(${slide.image})` }}>
        <div className="hsc2-img-header">
          <span className="hsc2-counter">{slide.counter}</span>
          {slide.tag && <span className="hsc2-tag">{slide.tag}</span>}
        </div>
      </div>

      {/* Content — bottom 42% */}
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

export default function HeroServicesCarousel() {
  const [active, setActive] = useState(0);
  const total = slides.length;

  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);

  useEffect(() => {
    const t = setTimeout(next, 5000);
    return () => clearTimeout(t);
  }, [active, next]);

  const idx = (offset: number) => (active + offset + total) % total;

  return (
    <div className="hsc2-root">
      {/* Left behind card — sits at left edge, partially hidden behind center */}
      <div className="hsc2-behind hsc2-behind-left" onClick={prev}>
        <ServiceCard slide={slides[idx(-1)]} />
      </div>

      {/* Right behind card — sits at right edge, partially hidden behind center */}
      <div className="hsc2-behind hsc2-behind-right" onClick={next}>
        <ServiceCard slide={slides[idx(1)]} />
      </div>

      {/* Front / active card — centered, highest z-index */}
      <div className="hsc2-front">
        <ServiceCard slide={slides[idx(0)]} />
      </div>

      {/* Nav arrows — outside the card stack */}
      <button className="hsc2-nav hsc2-nav-left" onClick={prev} aria-label="Previous">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button className="hsc2-nav hsc2-nav-right" onClick={next} aria-label="Next">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
