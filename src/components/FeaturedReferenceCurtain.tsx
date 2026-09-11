"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Props {
  data: {
    id: string;
    tag: string;
    title: string;
    location: string;
    description: string;
    image?: string;
    stats: { label: string; value: string }[];
  };
}

export default function FeaturedReferenceCurtain({ data }: Props) {
  const { ref: headerRef, isVisible } = useScrollReveal(0.2);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll scrubbing for the curtain
  useEffect(() => {
    const handleScroll = () => {
      if (!curtainRef.current) return;
      const rect = curtainRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element has scrolled into the viewport (0 to 1)
      const start = windowHeight; // Element top enters bottom of screen
      const end = windowHeight * 0.3; // Element top reaches 30% from top of screen
      const current = rect.top;

      let progress = (start - current) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic clip-path values based on scroll progress
  // Start: inset(10% 45% 10% 45%) -> End: inset(0% 0% 0% 0%)
  const verticalInset = 10 * (1 - scrollProgress);
  const horizontalInset = 45 * (1 - scrollProgress);
  const scale = 1.05 - (0.05 * scrollProgress);

  return (
    <section style={{ backgroundColor: 'var(--cream)', padding: '8rem 0' }}>
      
      {/* Editorial Split Header */}
      <div className="global-padding" ref={headerRef} style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'end' }}>
          
          <div style={{ gridColumn: 'span 8' }} className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
            <p style={{ 
              fontSize: '0.8rem', 
              letterSpacing: '2px', 
              textTransform: 'uppercase', 
              color: 'var(--bronze)',
              marginBottom: '1rem',
              fontWeight: 500
            }}>
              {data.tag}
            </p>
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              color: 'var(--navy)', 
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              fontWeight: 400
            }}>
              {data.title}
            </h2>
          </div>
          
          <div style={{ gridColumn: 'span 4' }} className={`reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: 1.6, 
              color: 'rgba(4, 36, 51, 0.7)',
              fontWeight: 300,
              maxWidth: '350px'
            }}>
              {data.description}
            </p>
          </div>

        </div>
      </div>

      {/* The Curtain Image Reveal (Scroll-bound) */}
      <div className="global-padding" ref={curtainRef}>
        <Link href={`/references/${data.id}`} style={{ display: 'block', textDecoration: 'none' }}>
          <div 
            style={{ position: 'relative', width: '100%', height: '80vh', cursor: 'none' }} 
            className="curtain-container"
          >
            {/* Image with dynamic inline clip-path based on scroll */}
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                overflow: 'hidden',
                clipPath: `inset(${verticalInset}% ${horizontalInset}% ${verticalInset}% ${horizontalInset}%)`,
                transform: `scale(${scale})`,
                transition: 'none' // Disable CSS transition since we are binding to scroll directly
              }}
            >
              <Image
                src={data.image || '/test_bg_penthouse.jpg'}
                alt={data.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              {/* Overlay gradient */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(4,36,51,0.6) 0%, transparent 40%)'
              }} />
            </div>

            {/* Floating Magnetic Button (centered) */}
            <div 
              className="magnetic-btn curtain-hover-btn"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 0,
                zIndex: 10,
                pointerEvents: 'none'
              }}
            >
              View<br/>Project
            </div>

            {/* Stats Overlay */}
            <div 
              style={{
                position: 'absolute',
                bottom: 0, 
                left: 0, 
                right: 0,
                padding: '3rem',
                display: 'flex',
                gap: '4rem',
                zIndex: 2,
                opacity: scrollProgress, // Fades in purely based on scroll progress!
                transform: `translateY(${20 * (1 - scrollProgress)}px)` // Slides up on scroll!
              }}
            >
              {data.stats.map((stat, idx) => (
                <div key={idx} style={{ color: 'var(--white)' }}>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.8, marginBottom: '0.5rem' }}>
                    {stat.label}
                  </p>
                  <p className="italic-serif" style={{ fontSize: '2.5rem', fontWeight: 400 }}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </Link>
      </div>

      <style>{`
        .curtain-container:hover .curtain-hover-btn {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

