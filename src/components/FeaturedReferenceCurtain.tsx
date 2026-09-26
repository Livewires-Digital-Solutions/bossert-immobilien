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

// Mobile stat icons — hand-drawn inline SVGs matching the site's existing
// icon convention (24x24 viewbox, rounded caps/joins, no icon library used
// anywhere in this codebase). Matched by label keyword since stat data can
// come from the API rather than a fixed shape.
function CalendarStatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

function ExpandStatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.3 15.3l-5.3 5.3a2 2 0 0 1-2.8 0L2.8 10.2a2 2 0 0 1 0-2.8l5.3-5.3a2 2 0 0 1 2.8 0l10.4 10.4a2 2 0 0 1 0 2.8z"></path>
      <path d="M14.5 5.5l4 4"></path>
      <path d="M12 8l4 4"></path>
      <path d="M9.5 10.5l4 4"></path>
    </svg>
  );
}

function getStatIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('time') || l.includes('market') || l.includes('days')) return <CalendarStatIcon />;
  if (l.includes('living') || l.includes('space') || l.includes('area')) return <ExpandStatIcon />;
  return null;
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
    <section className="curtain-section" style={{ backgroundColor: 'var(--cream)' }}>

      {/* Desktop / laptop layout — cinematic scroll-bound curtain reveal */}
      <div className="curtain-desktop-layout">

      {/* Editorial Split Header */}
      <div className="global-padding curtain-header" ref={headerRef} style={{ marginBottom: '4rem' }}>
        <div className="curtain-header-grid">

          <div className={`curtain-title-col reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
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
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: 'var(--navy)',
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              fontWeight: 400
            }}>
              {data.title}
            </h2>
          </div>

          <div className={`curtain-desc-col reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'rgba(4, 36, 51, 0.7)',
              fontWeight: 300
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
              className="curtain-stats-row"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 2,
                opacity: scrollProgress, // Fades in purely based on scroll progress!
                transform: `translateY(${20 * (1 - scrollProgress)}px)` // Slides up on scroll!
              }}
            >
              {data.stats.map((stat, idx) => (
                <div key={idx} className="curtain-stat" style={{ color: 'var(--white)' }}>
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

      </div>
      {/* End desktop / laptop layout */}

      {/* Mobile-only layout — static stacked card matching the client's
          mobile reference screenshot. Hidden on tablet/desktop, where the
          cinematic curtain reveal above is used instead. */}
      <div className="curtain-mobile-layout">
        <div className="global-padding">
          <div className="cm-tag-row">
            <span className="cm-tag">{data.tag}</span>
            <span className="cm-tag-line" />
          </div>
          <h2 className="cm-title italic-serif">{data.title}</h2>
          <p className="cm-desc">{data.description}</p>
        </div>

        <div className="global-padding">
          <Link href={`/references/${data.id}`} style={{ display: 'block', textDecoration: 'none' }}>
            <div className="cm-image-card">
              <Image
                src={data.image || '/test_bg_penthouse.jpg'}
                alt={data.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="cm-image-overlay" />
              <div className="cm-stats-col">
                {data.stats.map((stat, idx) => (
                  <div key={idx} className="cm-stat-row">
                    <p className="cm-stat-label">{stat.label}</p>
                    <div className="cm-stat-value-row">
                      {getStatIcon(stat.label)}
                      <p className="cm-stat-value italic-serif">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        .curtain-section {
          padding: 8rem 0;
        }
        .curtain-mobile-layout {
          display: none;
        }
        .curtain-container:hover .curtain-hover-btn {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        .curtain-header-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 2rem;
          align-items: end;
        }
        .curtain-title-col { grid-column: span 8; }
        .curtain-desc-col { grid-column: span 4; }
        .curtain-desc-col p { max-width: 350px; }
        .curtain-stats-row {
          padding: 3rem;
          display: flex;
          flex-wrap: wrap;
          gap: 4rem;
        }
        @media (max-width: 768px) {
          .curtain-header-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .curtain-title-col, .curtain-desc-col { grid-column: span 1; }
          .curtain-desc-col p { max-width: none; }
        }
        @media (max-width: 640px) {
          .curtain-stats-row {
            padding: 1.5rem;
            gap: 1.5rem 2rem;
          }
          .curtain-stat p.italic-serif { font-size: 1.5rem; }
        }

        /* ── Mobile-only static card (<=768px) ──────────────────────────
           Deliberate exception to the site's sharp-corner rule for the
           image card, same precedent as the search-card and
           discreet-network mobile treatments (globals.css). Desktop/laptop
           are untouched — they keep the scroll-bound curtain reveal above. */
        @media (max-width: 768px) {
          .curtain-section {
            padding: 3.5rem 0 3rem;
          }
          .curtain-desktop-layout {
            display: none;
          }
          .curtain-mobile-layout {
            display: block;
          }
          .cm-tag-row {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            margin-bottom: 1rem;
          }
          .cm-tag {
            font-family: var(--font-inter), sans-serif;
            font-size: 0.75rem;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--bronze);
            font-weight: 500;
            white-space: nowrap;
          }
          .cm-tag-line {
            display: block;
            width: 2rem;
            height: 1px;
            background: var(--bronze);
            opacity: 0.6;
          }
          .cm-title {
            font-size: clamp(2rem, 8vw, 2.75rem);
            color: var(--navy);
            line-height: 1.1;
            letter-spacing: -0.5px;
            margin-bottom: 1.25rem;
          }
          .cm-desc {
            font-size: 1rem;
            line-height: 1.6;
            color: rgba(4, 36, 51, 0.7);
            font-weight: 300;
            margin-bottom: 2rem;
          }
          .cm-image-card {
            position: relative;
            width: 100%;
            aspect-ratio: 4 / 5;
            border-radius: 24px;
            overflow: hidden;
          }
          .cm-image-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(4,36,51,0.85) 0%, rgba(4,36,51,0.35) 42%, transparent 65%);
          }
          .cm-stats-col {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
          }
          .cm-stat-row {
            padding: 0.85rem 0;
          }
          .cm-stat-row + .cm-stat-row {
            border-top: 1px solid rgba(255, 255, 255, 0.25);
          }
          .cm-stat-row:first-child {
            padding-top: 0;
          }
          .cm-stat-row:last-child {
            padding-bottom: 0;
          }
          .cm-stat-label {
            font-family: var(--font-inter), sans-serif;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: rgba(255, 255, 255, 0.85);
            margin-bottom: 0.4rem;
          }
          .cm-stat-value-row {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .cm-stat-value {
            font-size: 1.5rem;
            font-weight: 400;
            color: var(--white);
            line-height: 1;
          }
        }
      `}</style>
    </section>
  );
}

