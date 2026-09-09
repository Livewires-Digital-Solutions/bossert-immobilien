"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface GalleryItem {
  id: number | string;
  title: string;
  location: string;
  type: string;
  image: string;
}

interface Props {
  data: {
    tag: string;
    title: string;
    titleSerif: string;
    items: GalleryItem[];
  };
}

export default function ReferencesInteractiveGallery({ data }: Props) {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.2);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if we are on a touch device / mobile width
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window));
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate cursor position relative to the container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={sectionRef} 
      style={{ backgroundColor: 'var(--cream)', paddingBottom: '10rem', position: 'relative' }}
    >
      <div className="global-padding">
        
        {/* Section Header */}
        <div style={{ marginBottom: '6rem', maxWidth: '800px' }}>
          <p className={`services-subtitle reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
            <span className="dot" style={{ backgroundColor: 'var(--ink)' }}></span> {data.tag}
          </p>
          <h2 className={`explore-headline reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`} style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginTop: '2rem' }}>
            {data.title} <br/>
            <span className="italic-serif" style={{ color: 'var(--bronze)' }}>{data.titleSerif}</span>
          </h2>
        </div>

        {/* Interactive List Container */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ position: 'relative', width: '100%', borderTop: '1px solid rgba(4,36,51,0.1)' }}
        >
          
          {/* The List Items */}
          {data.items.map((item, idx) => (
            <Link href={`/references/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
              <div 
                className="interactive-list-item"
                onMouseEnter={() => setHoveredIndex(idx)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '3rem 0',
                  borderBottom: '1px solid rgba(4,36,51,0.1)',
                  color: 'var(--ink)',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 2,
                  mixBlendMode: isMobile ? 'normal' : 'difference'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h3 className="interactive-title" style={{ 
                    fontSize: 'clamp(2rem, 4vw, 4rem)', 
                    fontWeight: 400,
                    letterSpacing: '-1.5px',
                    margin: 0,
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    letterSpacing: '2px', 
                    textTransform: 'uppercase', 
                    color: hoveredIndex === idx && !isMobile ? 'var(--white)' : 'var(--bronze)',
                    transition: 'color 0.4s ease',
                    fontWeight: 500
                  }}>
                    {item.type}
                  </p>
                </div>

                <div style={{ textAlign: 'right', opacity: hoveredIndex === idx ? 1 : 0.4, transition: 'opacity 0.4s ease' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 300, color: hoveredIndex === idx && !isMobile ? 'var(--white)' : 'var(--ink)' }}>
                    {item.location}
                  </p>
                </div>

                {/* Mobile Fallback Image (Shows only on mobile) */}
                {isMobile && (
                  <div style={{ marginTop: '2rem', position: 'relative', width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden' }}>
                    <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </Link>
          ))}

          {/* Floating Images Container (Hidden on mobile) */}
          {!isMobile && (
            <div 
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                pointerEvents: 'none',
                zIndex: 1,
                overflow: 'hidden' // Keeps floating images inside the list area
              }}
            >
              {data.items.map((item, idx) => {
                const isActive = hoveredIndex === idx;
                return (
                  <div 
                    key={`img-${item.id}`}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '400px',
                      height: '500px',
                      // Smoothly follow the mouse, centered on the cursor
                      transform: `translate(${mousePos.x - 200}px, ${mousePos.y - 250}px) scale(${isActive ? 1 : 0.8}) rotate(${isActive ? (mousePos.x % 10 - 5) : 0}deg)`,
                      opacity: isActive ? 1 : 0,
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      willChange: 'transform, opacity'
                    }}
                  >
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="400px"
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,36,51,0.2)' }} />
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
      
      <style>{`
        .interactive-list-item:hover .interactive-title {
          transform: translateX(30px);
          color: var(--white);
        }
        @media (max-width: 768px) {
          .interactive-list-item {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1rem;
          }
          .interactive-list-item:hover .interactive-title {
            transform: none;
            color: var(--ink);
          }
        }
      `}</style>
    </section>
  );
}
