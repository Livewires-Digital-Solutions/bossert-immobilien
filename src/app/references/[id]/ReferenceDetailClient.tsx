"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyGallery from '@/components/property/PropertyGallery';
import { useLanguage } from '@/context/LanguageContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ApiReference {
  id: string;
  location: string;
  heroImage: string;
  images: string[];
  stats: { label: string; value: string }[];
  en: { title: string; fullDescription: string; features: string[] };
  de: { title: string; fullDescription: string; features: string[] };
}

import { isBackendEnabledClient } from '@/lib/backend-config';

export default function ReferenceDetailClient({ id }: { id: string }) {
  const { lang } = useLanguage();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal(0.1);
  const [data, setData] = useState<ApiReference | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    if (!isBackendEnabledClient()) {
      setData(null);
      return;
    }

    fetch(`/api/references/${id}`)
      .then((res) => (res.ok ? res.json() : { reference: null }))
      .then((json) => {
        if (!cancelled) setData(json.reference ?? null);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (data === undefined) return null;

  if (data === null) {
    return (
      <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar invertOnLoad={true} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 className="editorial-headline" style={{ color: 'var(--navy)' }}>Reference Not Found</h1>
        </div>
        <Footer />
      </main>
    );
  }

  const content = lang === 'de' ? data.de : data.en;
  const heroImage = data.heroImage;
  const galleryImages = data.images && data.images.length > 0 ? data.images : [heroImage];

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', paddingTop: '160px' }}>
      <Navbar invertOnLoad={true} />

      <div className="inner-page-container">

        {/* Mosaic Hero (Matching Property Details Page) */}
        <PropertyGallery
          images={galleryImages}
          fallbackImage={heroImage}
        />

        {/* Content Section */}
        <div ref={contentRef} style={{ marginTop: '4rem', marginBottom: '6rem' }}>
          <div className="reference-detail-grid">

            {/* Left Column: Title & Description */}
            <div className={`reveal-base reveal-up ${contentVisible ? 'is-revealed' : ''}`}>
              <p style={{
                fontSize: '0.8rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--bronze)',
                marginBottom: '1rem',
                fontWeight: 500
              }}>
                {data.location}
              </p>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: 'var(--navy)',
                lineHeight: 1.1,
                letterSpacing: '-1.5px',
                fontWeight: 400,
                marginBottom: '2rem'
              }}>
                {content.title}
              </h1>

              <h3 className="italic-serif" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--navy)' }}>
                Overview
              </h3>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(4,36,51,0.8)', fontWeight: 300 }}>
                {content.fullDescription}
              </p>
            </div>

            {/* Right Column: Stats & Features */}
            <div className={`reveal-base reveal-up delay-200 ${contentVisible ? 'is-revealed' : ''}`}>
              {data.stats.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(4,36,51,0.1)' }}>
                  {data.stats.map((stat, idx) => (
                    <div key={idx}>
                      <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.6, marginBottom: '0.5rem', color: 'var(--navy)' }}>
                        {stat.label}
                      </p>
                      <p className="italic-serif" style={{ fontSize: '1.75rem', fontWeight: 400, color: 'var(--navy)' }}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <h3 className="italic-serif" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--navy)' }}>
                Key Features
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {content.features.map((feature, idx) => (
                  <li key={idx} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(4,36,51,0.1)', color: 'rgba(4,36,51,0.8)', fontWeight: 300 }}>
                    <span style={{ display: 'inline-block', width: '2rem', color: 'var(--bronze)' }}>—</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .reference-detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
        }
        @media (min-width: 900px) {
          .reference-detail-grid {
            grid-template-columns: 1.2fr 1fr;
            gap: 6rem;
          }
        }
      `}</style>
    </main>
  );
}
