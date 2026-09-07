"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer-wrapper">

      {/* ── Hero image band ── */}
      <div className="footer-image-band" />

      {/* ── Wordmark block ── */}
      <div className="footer-wordmark-block">
        <div className="footer-wordmark">
          {/* Logo image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Bossert Immobilien"
            className="footer-logo-img"
          />
          <span className="footer-wordmark-top">BOSSERT</span>
          <span className="footer-wordmark-bottom">IMMOBILIEN</span>
        </div>
      </div>

      {/* ── Horizontal rule ── */}
      <div className="footer-rule" />

      {/* ── Nav links ── */}
      <nav className="footer-nav-row" aria-label="Footer navigation">
        <Link href="/properties">Property Listings</Link>
        <Link href="/services">{t.nav.services}</Link>
        <Link href="#">{t.nav.cancelContract}</Link>
        <Link href="/about">Company</Link>
        <Link href="/contact">{t.nav.contact}</Link>
      </nav>

      {/* ── Social icons ── */}
      <div className="footer-socials-row">
        <a href="#" aria-label="Instagram" className="footer-social-link">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a href="#" aria-label="Facebook" className="footer-social-link">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.39-4h-4.2V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom-bar">
        <span className="footer-bottom-copy">Copywrite</span>
        <div className="footer-bottom-right">
          <span className="footer-bottom-sep">|</span>
          <Link href="#" className="footer-bottom-link">Imprint</Link>
        </div>
      </div>

    </footer>
  );
}
