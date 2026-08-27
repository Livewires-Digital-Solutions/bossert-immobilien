"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/routing';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('Designer');
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we've scrolled past the top
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'fixed' : ''} ${isHidden ? 'hidden' : ''}`}>
        <div className="logo">
          <Link href="/">
            <Image src="/logo.webp" alt="Bossert Immobilien Logo" width={180} height={56} className="logo-img" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="nav-links desktop-nav">
          <Link href="/properties" className="nav-item">{t('nav.properties')}</Link>
          <Link href="/for-owners" className="nav-item">{t('nav.forOwners')}</Link>
          <Link href="/services" className="nav-item">{t('nav.services')}</Link>
          <Link href="/about" className="nav-item">{t('nav.about')}</Link>
          <Link href="/references" className="nav-item">{t('nav.references')}</Link>
          <Link href="/knowledge" className="nav-item">{t('nav.knowledge')}</Link>
          
          <div className="lang-toggle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span 
              className={`lang-btn ${locale === 'en' ? 'active' : ''}`}
              onClick={() => switchLocale('en')}
            >
              EN
            </span>
            <span className="lang-sep">|</span>
            <span 
              className={`lang-btn ${locale === 'de' ? 'active' : ''}`}
              onClick={() => switchLocale('de')}
            >
              DE
            </span>
          </div>

          <Link href="/contact" className="contact-btn">{t('nav.contact')}</Link>
        </div>

        {/* Mobile Right Side: Lang Toggle + Hamburger */}
        <div className="mobile-nav-right">
          <div className="lang-toggle mobile-lang-inline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span 
              className={`lang-btn ${locale === 'en' ? 'active' : ''}`} 
              onClick={() => switchLocale('en')}
              style={{ color: locale === 'en' ? 'var(--white)' : 'rgba(255,255,255,0.5)' }}
            >EN</span>
            <span className="lang-divider" style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <span 
              className={`lang-btn ${locale === 'de' ? 'active' : ''}`} 
              onClick={() => switchLocale('de')}
              style={{ color: locale === 'de' ? 'var(--white)' : 'rgba(255,255,255,0.5)' }}
            >DE</span>
          </div>

          <button
            className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} data-lenis-prevent="true">

        {/* Close button inside drawer */}
        <button
          className="mobile-drawer-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="mobile-nav-links">
          <Link href="/properties" className="mobile-nav-item" onClick={() => setMenuOpen(false)}>{t('nav.properties')}</Link>
          <Link href="/for-owners" className="mobile-nav-item" onClick={() => setMenuOpen(false)}>{t('nav.forOwners')}</Link>
          <Link href="/services" className="mobile-nav-item" onClick={() => setMenuOpen(false)}>{t('nav.services')}</Link>
          <Link href="/about" className="mobile-nav-item" onClick={() => setMenuOpen(false)}>{t('nav.about')}</Link>
          <Link href="/references" className="mobile-nav-item" onClick={() => setMenuOpen(false)}>{t('nav.references')}</Link>
          <Link href="/knowledge" className="mobile-nav-item" onClick={() => setMenuOpen(false)}>{t('nav.knowledge')}</Link>
        </div>
        <div className="mobile-nav-footer">
          <Link href="/contact" className="mobile-contact-btn" onClick={() => setMenuOpen(false)}>{t('nav.contact')}</Link>
        </div>
      </div>
    </>
  );
}
