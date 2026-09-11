"use client";

import React from 'react';
import Footer from '@/components/Footer';
import CtaSection from '@/components/CtaSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import ServicesHero from '@/components/ServicesHero';
import ServicesOverviewCards from '@/components/ServicesOverviewCards';
import ApproachHeadline from '@/components/ApproachHeadline';
import ServicesBenefitsGrid from '@/components/ServicesBenefitsGrid';
import TestimonialSection from '@/components/TestimonialSection';

export default function ServicesPage() {
  const { ref: introRef, isVisible: introVisible } = useScrollReveal(0.2);
  const { t } = useLanguage();
  const servicesPageData = (t as any).servicesPageData;

  if (!servicesPageData) return null;

  // Mock images for staggered philosophy section
  const serviceImages = ['/card1.jpg', '/card2.jpg', '/card3.jpg'];

  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      {/* 1. Hero Section */}
      <ServicesHero />

      {/* 2. Intro / Problem Framing */}
      <section className="global-padding" ref={introRef} style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="inner-page-container">
          <ApproachHeadline 
            tag={servicesPageData.intro.tag}
            l1={servicesPageData.intro.l1}
            s1={servicesPageData.intro.s1}
            l2={servicesPageData.intro.l2}
            l3={servicesPageData.intro.l3}
            s2={servicesPageData.intro.s2}
            l4={servicesPageData.intro.l4}
          />
          
          <div className={`reveal-base reveal-up delay-200 ${introVisible ? 'is-revealed' : ''}`} style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', marginTop: '4rem' }}>
            <div style={{ flex: '1 1 300px' }}>
              <p className="why-subhead" style={{ fontSize: '1.25rem' }}>{servicesPageData.intro.textLeft}</p>
            </div>
            <div style={{ flex: '1 1 300px' }}>
              <p className="why-subhead" style={{ fontSize: '1.25rem' }}>{servicesPageData.intro.textRight}</p>
            </div>
          </div>

          {/* Framed highlight cards — signature bronze-corner treatment */}
          {servicesPageData.intro.highlights && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '3rem',
                marginTop: '6rem',
              }}
            >
              {servicesPageData.intro.highlights.map((h: { number: string; label: string }, idx: number) => (
                <div
                  key={idx}
                  className={`framed-card reveal-base reveal-up delay-${(idx + 3) * 100} ${introVisible ? 'is-revealed' : ''}`}
                  style={{ textAlign: 'center' }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontWeight: 300,
                      fontSize: '3rem',
                      color: 'var(--bronze)',
                      lineHeight: 1,
                      letterSpacing: '-1px',
                      marginBottom: '1rem',
                    }}
                  >
                    {h.number}
                  </div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--navy)',
                      opacity: 0.75,
                      fontWeight: 500,
                    }}
                  >
                    {h.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Benefits Grid (6 Cards) */}
      <ServicesBenefitsGrid data={servicesPageData.benefits} />

      {/* 3 & 5. Section Intro + Services Overview (3 blocks) */}
      <ServicesOverviewCards 
        data={servicesPageData.overview}
        images={serviceImages}
      />

      {/* 6. Testimonials */}
      <TestimonialSection />
      
      {/* 7. Contact Form Section */}
      <CtaSection variant="services" />

      <Footer />
    </main>
  );
}
