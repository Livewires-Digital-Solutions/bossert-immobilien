"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Pillar {
  title: string;
  description: string;
}

interface Props {
  tag: string;
  title: string;
  titleSerif: string;
  description: string;
  pillars: Pillar[];
  images?: string[];
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

// Below this width the pinned horizontal scroll-jack is disabled in favor
// of a normal stacked scroll — same cutoff and rationale as the sticky-pin
// disable in ServicesOverviewCards.tsx (a pinned, viewport-height section
// can clip stacked mobile content before the user ever scrolls past it).
const MOBILE_BREAKPOINT = 1024;

export default function HorizontalScrollPhilosophy({ tag, title, titleSerif, description, pillars, images }: Props) {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScroll = containerRef.current.offsetHeight - windowH;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const totalCards = pillars.length;
  // Each card takes up an equal share of the horizontal width minus viewport
  const trackWidth = `${100 * totalCards}vw`;
  const translateX = `${-scrollProgress * (totalCards - 1) * 100}vw`;

  if (isMobile) {
    // Stacked, normal-scroll layout — no sticky pin, no horizontal track,
    // no scroll-jack math. Each pillar's text and image stack vertically
    // instead of the desktop's fixed side-by-side flex-basis split.
    return (
      <div style={{ backgroundColor: 'var(--navy)', padding: '5rem 6vw 4rem' }}>
        <div ref={sectionRef} style={{ marginBottom: '3rem' }}>
          <p
            className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}
            style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--bronze)', marginBottom: '1.5rem', fontWeight: 600 }}
          >
            {tag}
          </p>
          <h2
            className={`reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}
            style={{ fontSize: 'clamp(2.2rem, 8vw, 3rem)', fontWeight: 400, color: 'var(--white)', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '1.5rem' }}
          >
            {title}{' '}
            <span className="italic-serif" style={{ color: 'var(--bronze)' }}>
              {titleSerif}
            </span>
          </h2>
          <p
            className={`reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}
            style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', fontWeight: 300 }}
          >
            {description}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {pillars.map((pillar, idx) => {
            const img = images && images[idx % images.length];
            return (
              <div key={idx}>
                <p style={{ fontSize: 'clamp(3.5rem, 16vw, 5rem)', fontWeight: 300, color: 'rgba(255,255,255,0.08)', lineHeight: 1, marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
                  {ROMAN[idx]}
                </p>
                <h3 style={{ fontSize: 'clamp(1.75rem, 6vw, 2.25rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.5px', marginBottom: '1.25rem', lineHeight: 1.1 }}>
                  {pillar.title}
                </h3>
                <div style={{ width: '3rem', height: '2px', backgroundColor: 'var(--bronze)', marginBottom: '1.25rem' }} />
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', fontWeight: 300, marginBottom: img ? '1.5rem' : 0 }}>
                  {pillar.description}
                </p>
                {img && (
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', borderRadius: '8px', overflow: 'hidden' }}>
                    <Image src={img} alt={pillar.title} fill sizes="100vw" style={{ objectFit: 'cover', filter: 'brightness(0.8)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,36,51,0.6) 0%, transparent 60%)' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        height: `${(totalCards + 1) * 100}vh`,
        position: 'relative',
      }}
    >
      {/* Sticky Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: 'var(--navy)',
        }}
      >
        {/* Section Header — fades out as user scrolls in */}
        <div
          ref={sectionRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            padding: '5rem 8vw 3rem',
            pointerEvents: 'none',
            opacity: scrollProgress < 0.05 ? 1 : Math.max(0, 1 - (scrollProgress - 0.05) * 25),
            transition: 'opacity 0.1s linear',
          }}
        >
          <p
            className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}
            style={{
              fontSize: '0.8rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--bronze)',
              marginBottom: '1.5rem',
              fontWeight: 600,
            }}
          >
            {tag}
          </p>
          <h2
            className={`reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
              fontWeight: 400,
              color: 'var(--white)',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              marginBottom: '1.5rem',
            }}
          >
            {title}{' '}
            <span className="italic-serif" style={{ color: 'var(--bronze)' }}>
              {titleSerif}
            </span>
          </h2>
          <p
            className={`reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '560px',
              fontWeight: 300,
            }}
          >
            {description}
          </p>
        </div>

        {/* Scroll progress indicator */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '8vw', zIndex: 20, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {pillars.map((_, i) => {
            const cardProgress = scrollProgress * (totalCards - 1);
            const active = Math.round(cardProgress) === i;
            return (
              <div
                key={i}
                style={{
                  width: active ? '2rem' : '0.5rem',
                  height: '3px',
                  borderRadius: '999px',
                  backgroundColor: active ? 'var(--bronze)' : 'rgba(255,255,255,0.3)',
                  transition: 'width 0.4s ease, background-color 0.4s ease',
                }}
              />
            );
          })}
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginLeft: '1rem', letterSpacing: '1px' }}>
            SCROLL TO EXPLORE
          </span>
        </div>

        {/* Horizontal Track */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            width: trackWidth,
            height: '100%',
            transform: `translateX(${translateX})`,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        >
          {pillars.map((pillar, idx) => {
            const img = images && images[idx % images.length];
            return (
              <div
                key={idx}
                style={{
                  width: '100vw',
                  height: '100%',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8rem 8vw 6rem',
                  gap: '6vw',
                  boxSizing: 'border-box',
                }}
              >
                {/* Left — card content */}
                <div style={{ flex: '1 1 25rem', maxWidth: '35rem' }}>
                  <p style={{ fontSize: 'clamp(5rem, 12vw, 10rem)', fontWeight: 300, color: 'rgba(255,255,255,0.08)', lineHeight: 1, marginBottom: '2rem', fontFamily: 'var(--font-serif)' }}>
                    {ROMAN[idx]}
                  </p>
                  <h3 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.5px', marginBottom: '2rem', lineHeight: 1.1 }}>
                    {pillar.title}
                  </h3>
                  <div style={{ width: '3rem', height: '2px', backgroundColor: 'var(--bronze)', marginBottom: '2rem' }} />
                  <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', fontWeight: 300, maxWidth: '30rem' }}>
                    {pillar.description}
                  </p>
                </div>

                {/* Right — image */}
                {img && (
                  <div style={{ flex: '1 1 21.875rem', maxWidth: '32.5rem', aspectRatio: '4/5', position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                    <Image
                      src={img}
                      alt={pillar.title}
                      fill
                      style={{ objectFit: 'cover', filter: 'brightness(0.8)' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,36,51,0.6) 0%, transparent 60%)' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
