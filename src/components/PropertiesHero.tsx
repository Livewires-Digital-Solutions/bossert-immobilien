"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import BtnArrow from './BtnArrow';

export default function PropertiesHero() {
  const { ref: heroRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();

  return (
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
        backgroundImage: 'url(/images/luxury_estate_hero.jpg)',
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
        background: 'linear-gradient(to bottom, rgba(4,36,51,0.4) 0%, rgba(4,36,51,0.4) 60%, var(--cream) 100%)',
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
        <h1 className={`reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`} style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 5rem)', 
          fontWeight: 400,
          lineHeight: 1.1,
          color: 'var(--white)',
          letterSpacing: '-1px'
        }}>
          {t.propertiesPage.heroHeadline} <br/>
          <span className="italic-serif" style={{ color: 'var(--bronze)', fontSize: '1.2em' }}>
            {t.propertiesPage.heroHeadlineSerif}
          </span>
        </h1>
        
        <p className={`reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`} style={{ 
          fontSize: '1.15rem', 
          lineHeight: 1.6, 
          color: 'rgba(255,255,255,0.95)',
          maxWidth: '650px',
          margin: '2rem auto 0 auto',
          fontWeight: 300
        }}>
          {t.propertiesPage.heroSubhead}
        </p>

        <div
          className={`reveal-base reveal-up delay-300 ${isVisible ? 'is-revealed' : ''}`}
          style={{ marginTop: '2.5rem' }}
        >
          <Link href="/search-profile" className="explore-btn explore-btn-light" style={{ background: 'var(--cream)', color: 'var(--navy)' }}>
            {t.propertiesPage.heroCta}
            <BtnArrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
