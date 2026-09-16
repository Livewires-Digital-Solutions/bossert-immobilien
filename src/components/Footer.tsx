"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import styles from './Footer.module.css';

const NAVY = '#042433';

export default function Footer() {
  const { t } = useLanguage();
  const settings = useSiteSettings();

  return (
    <footer className={styles.footer} style={{ backgroundColor: NAVY }}>

      {/* ── Top section with rule ── */}
      <div className={styles.topSection}>
        <div className={styles.topRule} />
      </div>

      {/* ── Hero image band ── */}
      <div className={styles.imageBand} />

      {/* ── Wordmark block ── */}
      <div className={styles.wordmarkBlock}>
        <div className={styles.wordmark}>
          <span className={styles.wordmarkLine}>{t.footer.brandLine1 || 'BOSSERT'}</span>
          <span className={styles.wordmarkLine}>{t.footer.brandLine2 || 'IMMOBILIEN'}</span>
        </div>
      </div>

      {/* ── Middle section with rule ── */}
      <div className={styles.middleSection}>
        <div className={styles.middleRule} />
      </div>

      {/* ── Nav links ── */}
      <nav className={styles.navRow} aria-label="Footer navigation">
        <Link href="/properties" className={styles.navLink}>{t.footer.linkProperties || 'Immobilienangebote'}</Link>
        <Link href="/services" className={styles.navLink}>{t.footer.linkServices || 'Dienstleistungen'}</Link>
        <Link href="#" className={styles.navLink}>{t.footer.linkCancelContract || 'Vertrag widerrufen'}</Link>
        <Link href="/about" className={styles.navLink}>{t.footer.linkCompany || 'Unternehmen'}</Link>
        <Link href="/contact" className={styles.navLink}>{t.footer.linkContact || 'Kontakt'}</Link>
      </nav>

      {/* ── Social icons ── */}
      <div className={styles.socialsRow}>
        <a href={settings?.socialInstagram || "#"} aria-label="Instagram" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a href={settings?.socialFacebook || "#"} aria-label="Facebook" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.39-4h-4.2V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
      </div>

      {/* ── Bottom area ── */}
      <div className={styles.bottomArea}>
        <div className={styles.cookieRow}>
          <button className={styles.cookieBtn} aria-label="Cookie settings">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
              <path d="M8.5 8.5v.01"/>
              <path d="M16 15.5v.01"/>
              <path d="M12 12v.01"/>
              <path d="M11 17v.01"/>
              <path d="M7 14v.01"/>
            </svg>
          </button>
          <div className={styles.bottomRule} />
        </div>
        
        <div className={styles.bottomTextRow}>
          <span className={styles.copyText}>Copywrite</span>
          <div className={styles.bottomRight}>
            <span className={styles.sep}>|</span>
            <Link href="#" className={styles.imprintLink}>Impressum</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
