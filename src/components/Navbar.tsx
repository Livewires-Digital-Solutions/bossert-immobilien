"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useLanguage } from '../context/LanguageContext';
import { useLenis } from '../context/LenisContext';

interface NavbarProps {
  invertOnLoad?: boolean;
  /** Navy (not CSS-inverted-black) logo — Properties pages only, per P-02. */
  navyLogo?: boolean;
}

export default function Navbar({ invertOnLoad = false, navyLogo = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const { data: session } = useSession();
  const lenis = useLenis();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const userInitial =
    (session?.user?.name ?? session?.user?.email)?.trim()?.charAt(0)?.toUpperCase() ?? null;
  const isAdmin =
    Boolean(session?.user?.isAdmin) ||
    session?.user?.role === 'ADMIN' ||
    session?.user?.role === 'SUPERADMIN';

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const isScrollingDown = y > lastY.current;
      setIsScrolled(y > 40);

      if (hideTimer.current) clearTimeout(hideTimer.current);

      if (isScrollingDown && y > 280) {
        setIsHidden(true); // scrolling down past 280px -> hide immediately
      } else if (!isScrollingDown) {
        setIsHidden(false); // scrolling up -> show immediately
        if (y > 280) {
          hideTimer.current = setTimeout(() => setIsHidden(true), 2000); // auto-hide after 2s idle
        }
      }

      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // Lock body scroll + pause Lenis smooth-scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenis?.start();
    };
  }, [menuOpen, lenis]);

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const invertClass = invertOnLoad && !isScrolled && !menuOpen ? 'navbar-invert' : '';
  const propertiesClass = navyLogo ? 'navbar-properties' : '';

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'fixed' : ''} ${isHidden ? 'hidden' : ''} ${invertClass} ${propertiesClass}`}>
        {/* Mobile Hamburger (hidden on desktop) */}
        <button
          className={`hamburger-btn mobile-only-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Logo (hidden on desktop) */}
        <Link href="/" className="logo mobile-only-logo">
          {navyLogo ? (
            <span className="logo-img logo-img-navy" role="img" aria-label="Bossert Immobilien Logo" />
          ) : (
            <img src="/logo.png" alt="Bossert Immobilien Logo" className="logo-img" />
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav">

          <div className="nav-left-section">
            <div className="lang-toggle">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lang-globe-icon" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </span>
              <span className="lang-sep">|</span>
              <span
                className={`lang-btn ${lang === 'de' ? 'active' : ''}`}
                onClick={() => setLang('de')}
              >
                DE
              </span>
            </div>

            <div className="nav-links-inner">
              <Link href="/properties" className={`nav-item ${pathname === '/properties' ? 'active' : ''}`}>{t.nav.properties.toUpperCase()}</Link>
              <Link href="/owners" className={`nav-item ${pathname === '/owners' ? 'active' : ''}`}>{t.nav.forOwners.toUpperCase()}</Link>
              <Link href="/services" className={`nav-item ${pathname === '/services' ? 'active' : ''}`}>{t.nav.services.toUpperCase()}</Link>
            </div>
          </div>

          <div className="nav-center-section">
            <Link href="/" className="logo">
              {navyLogo ? (
                <span className="logo-img logo-img-navy" role="img" aria-label="Bossert Immobilien Logo" />
              ) : (
                <img src="/logo.png" alt="Bossert Immobilien Logo" className="logo-img" />
              )}
            </Link>
          </div>

          <div className="nav-right-section">
            <div className="nav-links-inner">
              <Link href="/about" className={`nav-item ${pathname === '/about' ? 'active' : ''}`}>{t.nav.about.toUpperCase()}</Link>
              <Link href="/references" className={`nav-item ${pathname === '/references' ? 'active' : ''}`}>{t.nav.references.toUpperCase()}</Link>
              <Link href="/knowledge" className={`nav-item ${pathname === '/knowledge' ? 'active' : ''}`}>{t.nav.knowledge.toUpperCase()}</Link>
            </div>

            <div className="nav-actions">
              {isAdmin && (
                <Link href="/admin" className={`nav-item ${pathname.startsWith('/admin') ? 'active' : ''}`}>{t.nav.admin}</Link>
              )}
              <Link href="/contact" className="contact-btn">{t.nav.contact.toUpperCase()}</Link>
              {session ? (
                <Link
                  href="/profile"
                  className={`login-icon-btn ${pathname.startsWith('/profile') ? 'active' : ''}`}
                  aria-label={t.nav.profile}
                  title={t.nav.profile}
                >
                  <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontWeight: 400 }}>{userInitial}</span>
                </Link>
              ) : (
                <Link href="/login" className="login-icon-btn" aria-label="Login">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </Link>
              )}
            </div>
          </div>

        </div>

        {/* Mobile Right Side: Lang Toggle */}
        <div className="mobile-nav-right">
          <div className="lang-toggle mobile-lang-inline">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mobile-lang-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >EN</span>
            <span className="lang-divider">|</span>
            <span
              className={`lang-btn ${lang === 'de' ? 'active' : ''}`}
              onClick={() => setLang('de')}
            >DE</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} data-lenis-prevent>

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
          <Link href="/properties" className={`mobile-nav-item ${pathname === '/properties' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{t.nav.properties}</Link>
          <Link href="/owners" className={`mobile-nav-item ${pathname === '/owners' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{t.nav.forOwners}</Link>
          <Link href="/services" className={`mobile-nav-item ${pathname === '/services' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{t.nav.services}</Link>
          <Link href="/about" className={`mobile-nav-item ${pathname === '/about' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{t.nav.about}</Link>
          <Link href="/references" className={`mobile-nav-item ${pathname === '/references' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{t.nav.references}</Link>
          <Link href="/knowledge" className={`mobile-nav-item ${pathname === '/knowledge' ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>{t.nav.knowledge}</Link>
        </div>
        <div className="mobile-nav-footer">
          {session && (
            <Link href="/profile" className="mobile-nav-item" onClick={() => setMenuOpen(false)}>{t.nav.profile}</Link>
          )}
          {isAdmin && (
            <Link href="/admin" className="mobile-nav-item" onClick={() => setMenuOpen(false)}>{t.nav.admin}</Link>
          )}
          {session && (
            <button
              type="button"
              className="mobile-nav-item"
              onClick={() => { setMenuOpen(false); signOut({ callbackUrl: '/' }); }}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'inherit', font: 'inherit', color: 'inherit' }}
            >
              {t.nav.logout}
            </button>
          )}
          <Link href="/contact" className="mobile-contact-btn" onClick={() => setMenuOpen(false)}>{t.nav.contact}</Link>
          {!session && (
            <Link href="/login" className="login-icon-btn" aria-label="Login" onClick={() => setMenuOpen(false)} style={{ margin: '0 auto', marginTop: '1rem', border: '1px solid var(--bronze)', color: 'var(--bronze)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
