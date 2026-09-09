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

      {/* 3D Coverflow Swiper */}
      <div className={`reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          initialSlide={2}
          coverflowEffect={{
            rotate: 20, // Rotate angle of side slides
            stretch: 0, // Space between slides
            depth: 250, // Depth offset (Z-axis)
            modifier: 1, // Effect multiplier
            slideShadows: true, // Enable shadows
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="references-3d-swiper"
          style={{ width: '100%', paddingTop: '2rem', paddingBottom: '4rem' }}
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
      </div>

      <style>{`
        /* Swiper Customizations */
        .references-3d-swiper .swiper-slide {
          transition: filter 0.4s ease;
        }
        .references-3d-swiper .swiper-slide:not(.swiper-slide-active) {
          filter: grayscale(80%) brightness(0.6);
        }
        .references-3d-swiper .swiper-pagination-bullet {
          background: var(--navy);
        }
        .references-3d-swiper .swiper-button-next,
        .references-3d-swiper .swiper-button-prev {
          color: var(--navy);
          background: var(--white);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .references-3d-swiper .swiper-button-next:after,
        .references-3d-swiper .swiper-button-prev:after {
          font-size: 1.2rem;
          font-weight: bold;
        }
        
        @media (min-width: 768px) {
          .references-3d-swiper .swiper-slide {
            width: 500px !important;
            height: 650px !important;
          }
        }
      `}</style>
    </section>
  );
}
