"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import ConsultationModal from '@/components/modals/ConsultationModal';
import ProcessList from '@/components/ProcessList';
import CtaSection from '@/components/CtaSection';
import BtnArrow from '@/components/BtnArrow';
import styles from './owners.module.css';

export default function ForOwnersPage() {
  const { t } = useLanguage();
  const data = (t as any).owners;

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: narrativeRef, isVisible: narrativeVisible } = useScrollReveal(0.2);
  const { ref: pillarsRef, isVisible: pillarsVisible } = useScrollReveal(0.1);
  const { ref: valuationRef, isVisible: valuationVisible } = useScrollReveal(0.1);
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollReveal(0.15);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal(0.1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRoute, setModalRoute] = useState<'top_contact' | 'consultation' | 'valuation' | 'buyer' | 'general' | 'profile'>('top_contact');

  const reduceMotionRef = useRef<boolean | null>(null);
  const canTiltRef = useRef<boolean | null>(null);

  if (!data) return null;

  const openModal = (route: typeof modalRoute) => {
    setModalRoute(route);
    setIsModalOpen(true);
  };

  const getPillarIcon = (idx: number) => {
    if (idx === 0) { // Selling
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      );
    } else if (idx === 1) { // Rent out
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      );
    } else { // Valuation
      return (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path>
        </svg>
      );
    }
  };

  const pillarModalRoute = (idx: number): typeof modalRoute => (idx === 2 ? 'valuation' : 'consultation');

  // Subtle magnetic tilt on the pillar cards — pure CSS-var driven, GPU transform
  // only, disabled for touch pointers and prefers-reduced-motion.
  const tiltAllowed = () => {
    if (typeof window === 'undefined') return false;
    if (reduceMotionRef.current === null) {
      reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    if (canTiltRef.current === null) {
      canTiltRef.current = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return !reduceMotionRef.current && canTiltRef.current;
  };

  const handlePillarTilt = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!tiltAllowed()) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--ry', `${px * 6}deg`);
    card.style.setProperty('--rx', `${-py * 6}deg`);
  };

  const resetPillarTilt = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <main style={{ backgroundColor: 'var(--navy)', position: 'relative' }}>
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialRoute={modalRoute}
      />

      {/* 1. Hero Section — same bg image, fade, font, height and centered
          text as the properties hero */}
      <div className="properties-editorial-hero" ref={heroRef}>
        <div className="properties-hero-bg" />
        <div className="properties-hero-overlay-cream" />
        <Navbar invertOnLoad={true} />

        <div className="editorial-hero-content">
          <div className="editorial-hero-middle">
            <h1 className={`editorial-headline reveal-base reveal-up delay-100 ${heroVisible ? 'is-revealed' : ''}`}>
              {data.hero.title} <br /><span className="italic-serif">{data.hero.titleSerif}</span>
            </h1>
          </div>

          <div className="editorial-hero-bottom">
            <p className={`editorial-subhead reveal-base reveal-up delay-200 ${heroVisible ? 'is-revealed' : ''}`}>
              {data.hero.subhead}
            </p>
          </div>

          <div
            className={`reveal-base reveal-up delay-300 ${heroVisible ? 'is-revealed' : ''}`}
            style={{ marginTop: '2.5rem' }}
          >
            <Link href="/list-property" className="explore-btn explore-btn-dark">
              {data.hero.cta || 'Request a no-obligation consultation'}
              <BtnArrow />
            </Link>
          </div>
        </div>
      </div>


      {/* 2. The Narrative (Cream Background) */}
      <section className="global-padding" ref={narrativeRef} style={{ backgroundColor: 'var(--cream)', paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="inner-page-container">
          <div className={`reveal-base reveal-up ${narrativeVisible ? 'is-revealed' : ''}`} style={{ marginBottom: '4rem' }}>
            <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span>
            <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', marginLeft: '0.5rem' }}>
              {data.narrative.tag}
            </span>
          </div>

          <div className={styles.narrativeGrid}>
            <div className={styles.narrativeCol}>
              <span className={styles.narrativeIndex} aria-hidden="true">01</span>
              <h2 className={`explore-headline reveal-base reveal-up delay-100 ${narrativeVisible ? 'is-revealed' : ''}`} style={{ fontSize: '3rem', lineHeight: '1.1', color: 'var(--navy)', position: 'relative' }}>
                {data.narrative.headline}
              </h2>
            </div>
            <div className={styles.narrativeBody}>
              <p className={`why-subhead reveal-base reveal-up delay-200 ${narrativeVisible ? 'is-revealed' : ''}`} style={{ fontSize: '1.25rem', color: 'rgba(4,36,51,0.8)' }}>
                {data.narrative.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars — interactive: each opens the matching consultation flow */}
      <section className="global-padding" ref={pillarsRef} style={{ backgroundColor: 'var(--navy)', paddingTop: '8rem', paddingBottom: '10rem', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(var(--cream) 1px, transparent 1px)', backgroundSize: '40px 40px', zIndex: 0 }}></div>

        <div className="inner-page-container" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.pillarsGrid}>
            {data.pillars.map((pillar: any, idx: number) => {
              const bgImages = [
                '/images/prop_villa_1787771383699.jpg', // Selling (Villa)
                '/images/prop_apartment_new.jpg', // Rent out (Apartment)
                '/images/valuation_blueprint.jpg' // Valuation (Blueprints & Analytics)
              ];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => openModal(pillarModalRoute(idx))}
                  onMouseMove={handlePillarTilt}
                  onMouseLeave={resetPillarTilt}
                  className={`${styles.pillarCard} reveal-base reveal-scale delay-${(idx + 1) * 100} ${pillarsVisible ? 'is-revealed' : ''}`}
                  aria-label={`${pillar.title} — ${pillar.desc}`}
                >
                  <div className={styles.pillarImgWrap}>
                    <div className={styles.pillarImg}>
                      <Image
                        src={bgImages[idx] || '/images/services_hero.jpg'}
                        alt=""
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.pillarOverlay}></div>
                  </div>

                  <div className={styles.pillarContent}>
                    <div className={styles.pillarIconFrame}>
                      {getPillarIcon(idx)}
                    </div>
                    <div>
                      <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                      <p className={styles.pillarDesc}>{pillar.desc}</p>
                    </div>
                    <span className={styles.pillarCue}>
                      Get started
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17 17 7" /><path d="M8 7h9v9" />
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 & 5. Process Integration — Selling uses a premium 3D CoverFlow carousel, Renting uses a highly modern Spotlight Bento Grid. */}
      <ProcessList processData={data.selling} invertBackground={false} variant="3d-carousel" />
      <ProcessList processData={data.renting} invertBackground={true} variant="spotlight-grid" />

      {/* 6. Valuation & Benefits (Sharp-cornered editorial bento grid) */}
      <section className="global-padding" ref={valuationRef} style={{ backgroundColor: 'var(--cream)', paddingTop: '10rem', paddingBottom: '4rem', position: 'relative' }}>
        <div className="inner-page-container">

          <div className={`reveal-base reveal-up ${valuationVisible ? 'is-revealed' : ''}`} style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <p className="services-subtitle" style={{ justifyContent: 'center', color: 'var(--bronze)' }}>
               <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {data.valuation.tag}
            </p>
            <h2 className="explore-headline" style={{ marginTop: '1rem', marginBottom: '2rem', fontSize: 'clamp(2.5rem, 4vw, 4rem)', color: 'var(--navy)' }}>
              {data.valuation.title} <br />
              <span className="italic-serif">{data.valuation.titleSerif}</span>
            </h2>
            <p className="why-subhead" style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(4,36,51,0.8)', fontSize: '1.2rem' }}>
              {data.valuation.subhead}
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Card 0: Precise Valuation (feature, image) */}
            <div className={`${styles.bentoCard} ${styles.bentoCardDark} ${styles.bento0} reveal-base reveal-scale delay-100 ${valuationVisible ? 'is-revealed' : ''}`}>
              <div className={styles.bentoImgWrap}>
                <div className={styles.bentoImg}>
                  <Image src="/images/prop_villa_1787771383699.jpg" alt="" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.bentoOverlayUp}></div>
              </div>
              <div className={`${styles.bentoContent} ${styles.bento0Content}`}>
                <div className={styles.bentoIconFrame}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <h4 className={styles.bentoBigTitle}>{data.valuation.benefits[0].title}</h4>
                <p className={styles.bentoBigDesc}>{data.valuation.benefits[0].desc}</p>
              </div>
            </div>

            {/* Card 1: Value Optimization */}
            <div className={`${styles.bentoCard} ${styles.bento1} reveal-base reveal-scale delay-200 ${valuationVisible ? 'is-revealed' : ''}`}>
              <div className={styles.bentoIconFrame}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <div className={styles.bentoContent}>
                <h4 className={styles.bentoSmallTitle}>{data.valuation.benefits[1].title}</h4>
                <p className={styles.bentoSmallDesc}>{data.valuation.benefits[1].desc}</p>
              </div>
            </div>

            {/* Card 2: Market Analysis */}
            <div className={`${styles.bentoCard} ${styles.bento2} reveal-base reveal-scale delay-300 ${valuationVisible ? 'is-revealed' : ''}`}>
              <div className={styles.bentoIconFrame}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
              </div>
              <div className={styles.bentoContent}>
                <h4 className={styles.bentoSmallTitle}>{data.valuation.benefits[2].title}</h4>
                <p className={styles.bentoSmallDesc}>{data.valuation.benefits[2].desc}</p>
              </div>
            </div>

            {/* Card 3: Strategic Pricing (feature, image) */}
            <div className={`${styles.bentoCard} ${styles.bentoCardDark} ${styles.bento3} reveal-base reveal-scale delay-400 ${valuationVisible ? 'is-revealed' : ''}`}>
              <div className={styles.bentoImgWrap}>
                <div className={styles.bentoImg}>
                  <Image src="/images/valuation_blueprint.jpg" alt="" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.bentoOverlayLeft}></div>
              </div>
              <div className={`${styles.bentoContent} ${styles.bento3Content}`}>
                <h4 className={styles.bentoBigTitle}>{data.valuation.benefits[3].title}</h4>
                <p className={styles.bentoBigDesc}>{data.valuation.benefits[3].desc}</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6b. Valuation Steps — horizontal roadmap */}
      <section className="global-padding" ref={stepsRef} style={{ backgroundColor: 'var(--cream)', paddingBottom: '8rem' }}>
        <div className="inner-page-container">
          <div className={`reveal-base reveal-up ${stepsVisible ? 'is-revealed' : ''}`} style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '4rem' }}>
            <h3 className="explore-headline" style={{ fontSize: '2.5rem', color: 'var(--navy)', marginBottom: '1rem' }}>
              Our Valuation Process
            </h3>
            <p className="why-subhead" style={{ maxWidth: '600px', margin: '0 auto', color: 'rgba(4,36,51,0.7)', fontSize: '1.2rem' }}>
              A structured approach to ensure you receive the most accurate and reliable market value for your property.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            {data.valuation.steps.map((step: any, idx: number) => (
              <div
                key={idx}
                className={`${styles.stepCard} reveal-base reveal-up ${stepsVisible ? 'is-revealed' : ''}`}
                style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
              >
                {idx < data.valuation.steps.length - 1 && <div className={styles.stepConnector} aria-hidden="true" />}
                <div className={styles.stepBadge}>0{idx + 1}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact Section — same as the home page */}
      <CtaSection />

      {/* 8. Final CTA Banner */}
      <section className="global-padding" ref={ctaRef} style={{ backgroundColor: 'var(--cream)', color: 'var(--navy)', paddingTop: '10rem', paddingBottom: '10rem', textAlign: 'center' }}>
        <div className={`inner-page-container reveal-base reveal-up ${ctaVisible ? 'is-revealed' : ''}`} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="explore-headline" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>
            Are you looking to sell, let, or gain clarity on your property's value?
          </h2>
          <p className="why-subhead" style={{ marginBottom: '4rem', fontSize: '1.3rem', opacity: 0.8, color: 'rgba(4,36,51,0.8)', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            We advise you personally and without obligation.
          </p>
          <button
                onClick={() => openModal('top_contact')}
                className={`explore-btn explore-btn-dark ${styles.finalCtaBtn}`}
                style={{ fontSize: '1.2rem', margin: '0 auto' }}
              >
                Request Consultation
                <BtnArrow />
              </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
