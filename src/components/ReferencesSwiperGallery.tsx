"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

export default function ReferencesSwiperGallery({ data }: Props) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} style={{ paddingBottom: '10rem', overflow: 'hidden' }}>
      
      {/* Gallery Header */}
      <div style={{ marginBottom: '4rem', textAlign: 'center' }} className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
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
          fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
          color: 'var(--navy)', 
          lineHeight: 1.1,
          letterSpacing: '-1px',
          fontWeight: 400
        }}>
          {data.title} <br/>
          <span className="italic-serif" style={{ color: 'var(--bronze)' }}>{data.titleSerif}</span>
        </h2>
      </div>

      {/* 3D Coverflow Slider - Exactly 3 Cards */}
      <div className={`reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`} style={{ position: 'relative', maxWidth: '1150px', margin: '0 auto', padding: '0 4rem' }}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          initialSlide={2}
          speed={800} // smoother transition speed
          watchSlidesProgress={true}
          onProgress={(swiper) => {
            swiper.slides.forEach((slide) => {
              const slideProgress = (slide as any).progress;
              if (slideProgress === undefined) return;
              const absProgress = Math.abs(slideProgress);
              
              // Keep opacity 1 for active and direct neighbors. 
              // Smoothly fade out slides that are pushed beyond the neighbors.
              let opacity = 1;
              if (absProgress > 1) {
                // Fade from 1 to 0 as progress goes from 1 to 2
                opacity = 1 - (absProgress - 1);
              }
              // Clamp
              if (opacity < 0) opacity = 0;
              if (opacity > 1) opacity = 1;
              
              slide.style.opacity = opacity.toString();
            });
          }}
          onSetTransition={(swiper, transition) => {
            swiper.slides.forEach((slide) => {
              slide.style.transitionDuration = `${transition}ms`;
            });
          }}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{
            nextEl: '.swiper-btn-next-custom',
            prevEl: '.swiper-btn-prev-custom',
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="references-slider"
          style={{ 
            width: '100%', 
            paddingTop: '2rem', 
            paddingBottom: '4rem'
          }}
        >
          {data.items.map((item) => (
            <SwiperSlide key={item.id} style={{ width: '350px', height: '500px' }}>
              <Link href={`/references/${item.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <div 
                  className="swiper-card"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(4,36,51,0.15)'
                  }}
                >
                  <Image 
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Gradient Overlay for Text */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(4,36,51,0.9) 0%, rgba(4,36,51,0) 60%)'
                  }} />
                  
                  {/* Content */}
                  <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '2rem',
                    right: '2rem',
                    color: 'var(--white)',
                    textAlign: 'left'
                  }}>
                    <p style={{ 
                      fontSize: '0.75rem', 
                      letterSpacing: '2px', 
                      textTransform: 'uppercase', 
                      color: 'var(--bronze)',
                      marginBottom: '0.5rem',
                      fontWeight: 600
                    }}>
                      {item.type}
                    </p>
                    <h3 style={{ 
                      fontSize: '1.75rem', 
                      fontWeight: 400,
                      lineHeight: 1.1,
                      letterSpacing: '-0.5px',
                      marginBottom: '0.25rem'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8, fontWeight: 300 }}>
                      {item.location}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom Navigation Buttons */}
        <div className="swiper-btn-prev-custom" style={{
          position: 'absolute',
          left: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          cursor: 'pointer',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'var(--white)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--navy)'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </div>
        <div className="swiper-btn-next-custom" style={{
          position: 'absolute',
          right: '0',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          cursor: 'pointer',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'var(--white)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--navy)'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </div>

      <style>{`
        /* Swiper Customizations */
        .references-slider .swiper-slide {
          transition: filter 0.4s ease;
        }
        
        .references-slider .swiper-slide:not(.swiper-slide-active) {
          filter: grayscale(60%) brightness(0.6);
        }

        .references-slider .swiper-pagination-bullet {
          background: var(--navy);
        }
        .swiper-btn-prev-custom:hover,
        .swiper-btn-next-custom:hover {
          background-color: var(--navy) !important;
          color: var(--white) !important;
        }
        .swiper-btn-prev-custom.swiper-button-disabled,
        .swiper-btn-next-custom.swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
