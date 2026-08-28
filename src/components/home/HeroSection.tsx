"use client";

import React from 'react';
import StatsCard from './StatsCard';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <div className="hero-section">
      <div className="hero-bg-image">
        <Image 
          src="/HERO BG.png" 
          alt="Hero Background" 
          fill
          priority
          className="hero-bg-animation object-cover"
        />
      </div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        {/* Main Content */}
        <div className="main-grid">
          <div className="left-content">
            <div className="since-text reveal">{t('since')}</div>
            <div className="headline-top reveal stagger-1">{t('headlineTop')}</div>
            <div className="headline-middle reveal stagger-2">{t('headlineMiddle')}</div>
            <div className="headline-bottom reveal stagger-3">
              <span>{t('headlineBottom')}</span> {t('headlineBottom2')}
            </div>
          </div>
          
          <div className="right-content">
            <div className="experience-text reveal stagger-3">
              {t('experience')}
            </div>
            
            <div className="reveal-scale stagger-4">
              <StatsCard />
            </div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="bottom-area">
          <div className="bottom-left">
            <div className="partner-text reveal stagger-5">
              {t('partner').split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
            <div className="scroll-indicator reveal stagger-6">
              {t('scroll')}
              <div className="scroll-icon"></div>
            </div>
          </div>
          
          <div className="bottom-right reveal stagger-5">
            <Link href="/properties" className="explore-btn">
              EXPLORE PROPERTIES
              <div className="explore-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
