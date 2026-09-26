"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Article {
  id: string;
  category: string;
  date: string;
  title: string;
  desc: string;
  image: string;
}

interface Featured {
  id?: string;
  tag: string;
  date: string;
  title: string;
  desc: string;
  image: string;
}

interface Props {
  data: {
    categories: string[];
    readMore: string;
    latestArticle: string;
    exploreByCategory: string;
    featured: Featured;
    articles: Article[];
  };
  /** When supplied, the feed renders these DB-backed articles instead of the static ones. */
  dbArticles?: Article[];
  dbFeatured?: Article | null;
}

/** Mobile-only "Explore by category" icon set, matched positionally to the
 * default category order (All, Market Reports, Architecture, Investment,
 * Legal) with a keyword fallback so DB-driven category labels still get a
 * sensible icon instead of nothing. */
function CategoryIcon({ label, index }: { label: string; index: number }) {
  const l = label.toLowerCase();
  let key: 'all' | 'reports' | 'architecture' | 'investment' | 'legal' | 'generic';

  if (index === 0 || l.includes('all') || l === 'alle') key = 'all';
  else if (l.includes('market') || l.includes('report') || l.includes('markt') || l.includes('bericht')) key = 'reports';
  else if (l.includes('architect')) key = 'architecture';
  else if (l.includes('invest')) key = 'investment';
  else if (l.includes('legal') || l.includes('recht')) key = 'legal';
  else key = ['all', 'reports', 'architecture', 'investment', 'legal'][index] as typeof key ?? 'generic';

  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, width: 22, height: 22 };

  switch (key) {
    case 'all':
      return (
        <svg {...common}>
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="12" y1="20" x2="12" y2="9" />
          <line x1="18" y1="20" x2="18" y2="4" />
        </svg>
      );
    case 'reports':
      return (
        <svg {...common}>
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="16" y2="17" />
        </svg>
      );
    case 'architecture':
      return (
        <svg {...common}>
          <polygon points="12 2 21 9 3 9" />
          <line x1="6" y1="18" x2="6" y2="11" />
          <line x1="10" y1="18" x2="10" y2="11" />
          <line x1="14" y1="18" x2="14" y2="11" />
          <line x1="18" y1="18" x2="18" y2="11" />
          <line x1="3" y1="22" x2="21" y2="22" />
        </svg>
      );
    case 'investment':
      return (
        <svg {...common}>
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
      );
    case 'legal':
      return (
        <svg {...common}>
          <path d="M12 3v3" />
          <path d="M4 21h16" />
          <path d="M12 6L5 8M12 6l7 2" />
          <path d="M5 8l-3 6a3.5 3.5 0 0 0 7 0z" />
          <path d="M19 8l3 6a3.5 3.5 0 0 1-7 0z" />
          <path d="M9 21l3-3 3 3" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M20.59 13.41L13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      );
  }
}

export default function KnowledgeFeed({ data, dbArticles, dbFeatured }: Props) {
  const usingDb = Array.isArray(dbArticles);
  const allLabel = data.categories[0]; // 'All' / 'Alle'

  const articles = usingDb ? dbArticles! : data.articles;
  const featured = usingDb ? dbFeatured ?? articles[0] ?? data.featured : data.featured;

  const categories = usingDb
    ? [allLabel, ...Array.from(new Set(articles.map((a) => a.category)))]
    : data.categories;

  const listArticles = usingDb ? articles.filter((a) => a.id !== featured?.id) : articles;
  const featuredTag =
    (featured as Featured | undefined)?.tag ?? (featured as Article | undefined)?.category ?? '';

  const [activeCategory, setActiveCategory] = useState(allLabel);
  const { ref, isVisible } = useScrollReveal();

  const isAll = activeCategory === allLabel;
  const filteredArticles = isAll
    ? listArticles
    : listArticles.filter((a) => a.category === activeCategory);

  // Mobile-only "Latest Article" carousel — the featured article plus up to
  // two more recent ones, so the swipe strip has real content instead of
  // decorative-only dots.
  type FeedSlide = { id?: string; image: string; title: string; desc: string; date: string; tag: string };
  const mobileSlides: FeedSlide[] = featured
    ? [
        { id: (featured as Article).id, image: featured.image, title: featured.title, desc: featured.desc, date: featured.date, tag: featuredTag },
        ...listArticles.slice(0, 2).map((a) => ({ id: a.id, image: a.image, title: a.title, desc: a.desc, date: a.date, tag: a.category })),
      ]
    : [];

  const mfTrackRef = useRef<HTMLDivElement>(null);
  const [mfActive, setMfActive] = useState(0);
  const handleMfScroll = () => {
    const el = mfTrackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setMfActive(Math.max(0, Math.min(mobileSlides.length - 1, idx)));
  };
  const goToMfSlide = (idx: number) => {
    const el = mfTrackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <section className="global-padding" ref={ref} style={{ paddingBottom: '6rem', backgroundColor: 'var(--cream)' }}>
      <div className="inner-page-container">

        {/* Mobile-only: Latest Article carousel + Explore by category grid.
            Replaces the cinematic featured card and pill filters below on
            phones (those are hidden at this breakpoint via .desktop-feed-only). */}
        {mobileSlides.length > 0 && (
          <div className="mobile-feed-section">
            <div className="mf-eyebrow">
              <span className="mf-eyebrow-dash" aria-hidden="true" />
              {data.latestArticle}
            </div>
            <h1 className="mf-latest-title italic-serif">{mobileSlides[mfActive]?.title}</h1>

            <div className="mf-carousel-wrap">
              <div className="mf-carousel" ref={mfTrackRef} onScroll={handleMfScroll}>
                {mobileSlides.map((slide, i) => (
                  <Link
                    key={slide.id || i}
                    href={`/knowledge/${slide.id || 'featured'}`}
                    className="mf-slide"
                  >
                    <div className="mf-slide-card">
                      <img src={slide.image} alt={slide.title} className="mf-slide-img" />
                      <div className="mf-slide-overlay" />
                      <div className="mf-slide-top">
                        <span className="mf-slide-tag">{slide.tag}</span>
                        <span className="mf-slide-date">{slide.date}</span>
                      </div>
                      <div className="mf-slide-bottom">
                        <h3 className="mf-slide-title italic-serif">{slide.title}</h3>
                        <p className="mf-slide-desc">{slide.desc}</p>
                        <div className="mf-slide-cta">
                          <span>{data.readMore}</span>
                          <span className="mf-cta-circle">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {mobileSlides.length > 1 && (
                <div className="mf-dots">
                  {mobileSlides.map((_, i) => (
                    <button
                      key={i}
                      className={`mf-dot ${i === mfActive ? 'mf-dot-active' : ''}`}
                      onClick={() => goToMfSlide(i)}
                      aria-label={`${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <h2 className="mf-cat-heading italic-serif">{data.exploreByCategory}</h2>
            <div className="mf-cat-grid">
              {categories.map((cat, idx) => {
                const isActive = activeCategory === cat;
                const isFull = categories.length % 2 === 1 && idx === categories.length - 1;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`mf-cat-card ${isActive ? 'mf-cat-active' : ''} ${isFull ? 'mf-cat-full' : ''}`}
                  >
                    <span className="mf-cat-icon"><CategoryIcon label={cat} index={idx} /></span>
                    <span className="mf-cat-content">
                      <span className="mf-cat-label">{cat}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" className="mf-cat-arrow">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 1. Cinematic Featured Article */}
        {featured && (
        <div className={`reveal-base reveal-up desktop-feed-only ${isVisible ? 'is-revealed' : ''}`} style={{ marginBottom: '8rem' }}>
          <Link href={`/knowledge/${featured.id || 'featured'}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none' }} className="featured-card">
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', backgroundColor: 'var(--navy)', color: 'var(--white)', minHeight: '40.625rem', display: 'flex', alignItems: 'flex-end', padding: '4rem' }}>
              <div className="image-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="scale-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                />
              </div>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(4,36,51,0.95) 0%, rgba(4,36,51,0.1) 80%)', zIndex: 1 }}></div>

              <div style={{ position: 'relative', zIndex: 2, maxWidth: '56.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span className="services-subtitle" style={{ color: 'var(--bronze)', margin: 0, letterSpacing: '2px' }}>
                    <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {featuredTag}
                  </span>
                  <span style={{ color: 'rgba(254,252,246,0.5)', fontSize: '0.8rem', letterSpacing: '1px' }}>{featured.date}</span>
                </div>
                <h2 className="italic-serif" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.05, marginBottom: '2rem', color: 'var(--white)' }}>
                  {featured.title}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
                  <p style={{ fontSize: '1.25rem', color: 'rgba(254,252,246,0.8)', lineHeight: 1.6, maxWidth: '40.625rem' }}>
                    {featured.desc}
                  </p>
                  <div className="explore-btn animated-arrow-btn" style={{ padding: '0.8rem 1rem 0.8rem 2rem', border: 'none', cursor: 'pointer' }}>
                    <span>{data.readMore}</span>
                    <div className="explore-icon-wrapper arrow-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        )}

        {/* 2. Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '6rem', justifyContent: 'center' }} className={`reveal-base reveal-up delay-200 desktop-feed-only ${isVisible ? 'is-revealed' : ''}`}>
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            return (
              <button 
                key={idx}
                onClick={() => setActiveCategory(cat)}
                style={{ 
                  padding: '1rem 2.5rem', 
                  borderRadius: '100px', 
                  border: `1px solid ${isActive ? 'var(--navy)' : 'rgba(4,36,51,0.1)'}`, 
                  backgroundColor: isActive ? 'var(--navy)' : 'transparent', 
                  color: isActive ? 'var(--white)' : 'var(--navy)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-inter)',
                  letterSpacing: '0.5px'
                }}
                className="hover-fill-btn"
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3. Alternating Editorial List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {filteredArticles.map((article, idx) => {
            const isImageLeft = idx % 2 === 0;
            return (
              <div key={article.id} className="reveal-base reveal-up is-revealed" style={{ animationDelay: `${idx * 150}ms` }}>
                <Link href={`/knowledge/${article.id}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none' }} className="editorial-row">
                  <div className="editorial-row-inner" style={{ 
                    display: 'flex', 
                    flexDirection: isImageLeft ? 'row' : 'row-reverse',
                    gap: '5rem',
                    alignItems: 'center',
                    padding: '5rem 0',
                    borderTop: '1px solid rgba(4,36,51,0.1)'
                  }}>
                    
                    {/* Image Side */}
                    <div style={{ flex: '1 1 45%', minWidth: '18.75rem' }}>
                      <div style={{ width: '100%', aspectRatio: '4/3', position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(4,36,51,0.05)' }}>
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' }} 
                          className="row-image" 
                        />
                      </div>
                    </div>

                    {/* Content Side */}
                    <div style={{ flex: '1 1 55%', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '18.75rem' }} className="row-content">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span className="services-subtitle" style={{ color: 'var(--navy)', margin: 0 }}>
                          <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {article.category}
                        </span>
                        <span style={{ color: 'rgba(4,36,51,0.4)', fontSize: '0.85rem', letterSpacing: '1px' }}>{article.date}</span>
                      </div>

                      <h3 className="italic-serif row-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.1, color: 'var(--navy)', transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
                        {article.title}
                      </h3>
                      
                      <p style={{ color: 'rgba(4,36,51,0.6)', lineHeight: 1.6, fontSize: '1.1rem', maxWidth: '90%' }}>
                        {article.desc}
                      </p>

                      <div className="animated-arrow-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--bronze)', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '1rem' }}>
                        {data.readMore}
                        <div className="arrow-wrapper" style={{ transition: 'transform 0.3s ease' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        /* Featured Card Animations */
        .featured-card:hover .scale-image {
          transform: scale(1.05);
        }
        
        /* Editorial Row Animations */
        .editorial-row:hover .row-image {
          transform: scale(1.05);
        }
        .editorial-row:hover .row-title {
          transform: translateX(10px);
        }
        
        /* Arrow Button Animations */
        .animated-arrow-btn:hover .arrow-wrapper {
          transform: translateX(5px);
        }

        /* Filter Pill Hover */
        .hover-fill-btn:hover {
          background-color: var(--navy) !important;
          color: var(--white) !important;
        }

        /* Mobile-only "Latest Article" + "Explore by category" block —
           hidden on tablet/desktop, where the cinematic featured card and
           pill filters above (.desktop-feed-only) carry this instead. */
        .mobile-feed-section {
          display: none;
        }

        .mf-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: var(--bronze);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }
        .mf-eyebrow-dash {
          display: inline-block;
          width: 14px;
          height: 1.5px;
          background-color: var(--bronze);
          flex-shrink: 0;
        }
        .mf-latest-title {
          font-size: clamp(1.7rem, 7vw, 2.1rem);
          line-height: 1.15;
          color: var(--navy);
          margin-bottom: 1.5rem;
        }

        .mf-carousel-wrap {
          margin-bottom: 2.5rem;
        }
        .mf-carousel {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          border-radius: 24px;
        }
        .mf-carousel::-webkit-scrollbar {
          display: none;
        }
        .mf-slide {
          flex: 0 0 100%;
          scroll-snap-align: start;
          display: block;
          color: inherit;
          text-decoration: none;
        }
        .mf-slide-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background-color: var(--navy);
          min-height: clamp(24rem, 92vw, 30rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.75rem;
        }
        .mf-slide-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.75;
        }
        .mf-slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(4,36,51,0.95) 0%, rgba(4,36,51,0.15) 55%, rgba(4,36,51,0.35) 100%);
        }
        .mf-slide-top {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .mf-slide-tag {
          color: var(--bronze);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .mf-slide-date {
          color: rgba(254,252,246,0.6);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
        }
        .mf-slide-bottom {
          position: relative;
          z-index: 2;
        }
        .mf-slide-title {
          font-size: clamp(1.5rem, 6vw, 1.9rem);
          line-height: 1.15;
          color: var(--white);
          margin-bottom: 1rem;
        }
        .mf-slide-desc {
          color: rgba(254,252,246,0.75);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .mf-slide-cta {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          color: var(--white);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .mf-cta-circle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1.5px solid rgba(254,252,246,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mf-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.25rem;
        }
        .mf-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1.5px solid var(--navy);
          background: transparent;
          padding: 0;
          cursor: pointer;
        }
        .mf-dot-active {
          background-color: var(--navy);
        }

        .mf-cat-heading {
          font-size: clamp(1.7rem, 7vw, 2.1rem);
          color: var(--navy);
          margin-bottom: 1.25rem;
        }
        .mf-cat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .mf-cat-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.75rem;
          text-align: left;
          background-color: var(--cream);
          border: 1px solid rgba(4,36,51,0.12);
          border-radius: 20px;
          padding: 1.5rem;
          cursor: pointer;
          color: var(--bronze);
          transition: all 0.3s ease;
          font-family: var(--font-inter), sans-serif;
        }
        .mf-cat-card.mf-cat-full {
          grid-column: 1 / -1;
          flex-direction: row;
          align-items: center;
          gap: 1.25rem;
        }
        .mf-cat-card.mf-cat-full .mf-cat-content {
          flex: 1;
        }
        .mf-cat-active {
          background-color: var(--navy);
          border-color: var(--navy);
          color: var(--white);
        }
        .mf-cat-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }
        .mf-cat-label {
          font-size: 0.95rem;
          color: var(--navy);
        }
        .mf-cat-active .mf-cat-label {
          color: var(--white);
        }
        .mf-cat-arrow {
          color: var(--bronze);
          flex-shrink: 0;
        }
        .mf-cat-active .mf-cat-arrow {
          color: var(--white);
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .desktop-feed-only {
            display: none !important;
          }
          .mobile-feed-section {
            display: block;
            margin-bottom: 4rem;
          }
          .editorial-row-inner {
            flex-direction: column !important;
            gap: 2rem !important;
            padding: 3rem 0 !important;
          }
          .editorial-row:hover .row-title {
            transform: translateX(0); /* Disable on mobile */
          }
        }
      `}} />
    </section>
  );
}
