"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ServiceSlide {
  counter: string;
  tag: string;
  image: string;
  category: string;
  title: string;
  titleItalic: string;
  desc: string;
  href: string;
  linkText: string;
}

const slides: ServiceSlide[] = [
  {
    counter: '01 / 03',
    tag: 'PEOPLE\nPROPERTIES\nPOSSIBILITIES.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    category: 'SELLING',
    title: 'Sell your property',
    titleItalic: '— strategically',
    desc: 'With precise market insights and a bespoke sales strategy, we ensure your property reaches the right buyers at the right price.',
    href: '/services',
    linkText: 'LEARN MORE',
  },
  {
    counter: '02 / 03',
    tag: '',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    category: 'MANAGEMENT',
    title: 'Professional',
    titleItalic: 'management',
    desc: 'Maximize the value of your property with our tailored management services and expert oversight.',
    href: '/services',
    linkText: 'LEARN MORE',
  },
  {
    counter: '03 / 03',
    tag: '',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    category: 'BUYING',
    title: 'Find your',
    titleItalic: 'ideal property',
    desc: 'We help you discover extraordinary properties that match your lifestyle and exceed your expectations.',
    href: '/properties',
    linkText: 'LEARN MORE',
  },
];

export default function HeroServicesCarousel() {
  const [active, setActive] = useState(0);
  const total = slides.length;

  // Auto-advance
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearTimeout(timer);
  }, [active, total]);

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  const getSlideIndex = (offset: number) => (active + offset + total) % total;

  const slideAt = (offset: number) => slides[getSlideIndex(offset)];

  return (
    <div className="hsc-root">
      {/* Side Cards */}
      <div className="hsc-side hsc-left" onClick={prev}>
        <div className="hsc-side-img" style={{ backgroundImage: `url(${slideAt(-1).image})` }} />
        <div className="hsc-side-body">
          <span className="hsc-counter">{slideAt(-1).counter}</span>
          <span className="hsc-category">{slideAt(-1).category}</span>
          <h4 className="hsc-side-title">
            {slideAt(-1).title}<br />
            <em>{slideAt(-1).titleItalic}</em>
          </h4>
        </div>
      </div>

      {/* Center / Active Card */}
      <div className="hsc-center">
        <div className="hsc-center-img" style={{ backgroundImage: `url(${slideAt(0).image})` }}>
          <div className="hsc-center-header">
            <span className="hsc-counter">{slideAt(0).counter}</span>
            {slideAt(0).tag && (
              <span className="hsc-tag">{slideAt(0).tag}</span>
            )}
          </div>
        </div>
        <div className="hsc-center-body">
          <span className="hsc-category">{slideAt(0).category}</span>
          <h3 className="hsc-title">
            {slideAt(0).title}<br />
            <em>{slideAt(0).titleItalic}</em>
          </h3>
          <p className="hsc-desc">{slideAt(0).desc}</p>
          <Link href={slideAt(0).href} className="hsc-btn">
            {slideAt(0).linkText} <span className="hsc-arrow">→</span>
          </Link>
        </div>
      </div>

      {/* Side Card Right */}
      <div className="hsc-side hsc-right" onClick={next}>
        <div className="hsc-side-img" style={{ backgroundImage: `url(${slideAt(1).image})` }} />
        <div className="hsc-side-body">
          <span className="hsc-counter">{slideAt(1).counter}</span>
          <span className="hsc-category">{slideAt(1).category}</span>
          <h4 className="hsc-side-title">
            {slideAt(1).title}<br />
            <em>{slideAt(1).titleItalic}</em>
          </h4>
        </div>
      </div>

      {/* Nav arrows */}
      <button className="hsc-nav hsc-nav-prev" onClick={prev} aria-label="Previous">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button className="hsc-nav hsc-nav-next" onClick={next} aria-label="Next">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>
  );
}
