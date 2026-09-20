"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface GalleryItem {
  id: number | string;
  title: string;
  location: string;
  type: string;
  image: string;
  size: 'large' | 'square' | 'tall';
}

interface Props {
  data: {
    tag: string;
    title: string;
    titleSerif: string;
    items: GalleryItem[];
  };
}

// Editorial Card Component
function EditorialCard({ item, index }: { item: GalleryItem, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Determine layout based on index (create asymmetry)
  const isEven = index % 2 === 0;
  const colClass = isEven ? 'editorial-item-wide' : 'editorial-item-narrow';
  const offsetClass = (!isEven && index !== 1) ? 'editorial-item-offset' : '';
  const height = isEven ? '60vh' : '45vh';

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = windowHeight; // Element top enters bottom of screen
      const end = windowHeight * 0.2; // Element top reaches 20% from top
      const current = rect.top;

      let progress = (start - current) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax Y movement: starts 60px down, moves to 0px
  const translateY = 60 * (1 - scrollProgress);
  const opacity = Math.min(1, scrollProgress * 1.5);

  return (
    <div 
      ref={cardRef}
      className={`${colClass} ${offsetClass}`}
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px)`,
        transition: 'none' // Disable CSS transitions for layout changes to ensure smooth scroll scrubbing
      }}
    >
      <Link href={`/references/${item.id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div 
          className="editorial-card"
          style={{ width: '100%', height, minHeight: '400px' }}
        >
          {/* Grayscale to Color Image */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <Image 
              src={item.image} 
              alt={item.title}
              fill
              className="editorial-img"
              style={{ objectFit: 'cover' }}
            />
          </div>
          
          {/* Hover Overlay Gradient */}
          <div 
            className="editorial-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(4,36,51,0.9) 0%, rgba(4,36,51,0) 50%)',
              opacity: 0.6,
              transition: 'opacity 0.8s ease'
            }}
          />

          {/* Typography */}
          <div 
            className="editorial-content"
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              right: '2rem',
              color: 'var(--white)',
              transform: 'translateY(20px)',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
              opacity: 0.8
            }}
          >
            <p style={{ 
              fontSize: '0.7rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.2em', 
              color: 'var(--bronze)', 
              marginBottom: '0.5rem',
              fontWeight: 600
            }}>
              {item.type}
            </p>
            <h3 style={{ 
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-1px'
            }}>
              {item.title}
            </h3>
          </div>
        </div>
      </Link>

      <style>{`
        .editorial-card:hover .editorial-overlay {
          opacity: 0.9;
        }
        .editorial-card:hover .editorial-content {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default function ReferencesMasonryGallery({ data }: Props) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.2);

  return (
    <section style={{ backgroundColor: 'var(--cream)', paddingBottom: '10rem' }}>
      <div className="global-padding">
        
        {/* Section Header */}
        <div ref={headerRef} style={{ marginBottom: '8rem', maxWidth: '800px' }}>
          <p className={`services-subtitle reveal-base reveal-up ${headerVisible ? 'is-revealed' : ''}`}>
            <span className="dot" style={{ backgroundColor: 'var(--ink)' }}></span> {data.tag}
          </p>
          <h2 className={`explore-headline reveal-base reveal-up delay-200 ${headerVisible ? 'is-revealed' : ''}`} style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginTop: '2rem' }}>
            {data.title} <br/>
            <span className="italic-serif" style={{ color: 'var(--bronze)' }}>{data.titleSerif}</span>
          </h2>
        </div>

        {/* Editorial Grid */}
        <div className="editorial-grid">
          {data.items.map((item, idx) => (
            <EditorialCard key={item.id} item={item} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

