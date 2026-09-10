"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CtaSection from '@/components/CtaSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import ServicesOverviewCards from '@/components/ServicesOverviewCards';
import ApproachHeadline from '@/components/ApproachHeadline';
import ServicesBenefitsGrid from '@/components/ServicesBenefitsGrid';
import TestimonialSection from '@/components/TestimonialSection';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: introRef, isVisible: introVisible } = useScrollReveal(0.2);
  const { t } = useLanguage();
  const servicesPageData = (t as any).servicesPageData;

  if (!servicesPageData) return null;

  // Mock images for staggered philosophy section
  const serviceImages = ['/card1.jpg', '/card2.jpg', '/card3.jpg'];

  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      {/* 1. Full Screen Cinematic Hero */}
      <div ref={heroRef} style={{ 
        position: 'relative', 
        height: '100vh', 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <style>{`
          @keyframes subtleZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.15); }
          }
        `}</style>
        
        {/* Background Image covering 100% */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/images/services_hero_new.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'subtleZoom 30s ease-in-out infinite alternate',
          transformOrigin: 'center center',
          zIndex: 0
        }} />
        
        {/* Gradient Overlay for Text Readability & Blending */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(4,36,51,0.25) 0%, rgba(4,36,51,0.25) 60%, var(--cream) 100%)',
          zIndex: 1
        }} />

        {/* Navbar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 }}>
          <Navbar invertOnLoad={false} />
        </div>
        
        {/* Hero Content */}
        <div style={{ 
          position: 'relative', 
          zIndex: 10, 
          textAlign: 'center', 
          padding: '0 2rem',
          maxWidth: '1000px',
          marginTop: '2rem' 
        }}>
          <h1 className={`reveal-base reveal-up delay-100 ${heroVisible ? 'is-revealed' : ''}`} style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 5rem)', 
            fontWeight: 400,
            lineHeight: 1.1,
            color: 'var(--white)',
            letterSpacing: '-1px'
          }}>
            {servicesPageData.hero.title} <br/>
            <span className="italic-serif" style={{ color: 'var(--bronze)', fontSize: '1.2em' }}>
              {servicesPageData.hero.titleSerif}
            </span>
          </h1>
          
          <p className={`reveal-base reveal-up delay-200 ${heroVisible ? 'is-revealed' : ''}`} style={{ 
            fontSize: '1.15rem', 
            lineHeight: 1.6, 
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '650px',
            margin: '2rem auto 2.5rem auto',
            fontWeight: 300
          }}>
            {servicesPageData.hero.description}
          </p>

          <div className={`reveal-base reveal-up delay-300 ${heroVisible ? 'is-revealed' : ''}`}>
            <Link href="/contact" className="explore-btn explore-btn-dark" style={{ 
              backgroundColor: 'var(--white)', 
              color: 'var(--navy)',
              margin: '0 auto'
            }}>
              {servicesPageData.hero.cta}
              <span className="btn-arrow">↗</span>
            </Link>
          </div>
        </div>
      </div>

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
