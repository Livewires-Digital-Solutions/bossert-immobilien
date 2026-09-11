"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import styles from './Footer.module.css';

const NAVY = '#042433';

function FooterNewsletter() {
  const { t } = useLanguage();
  const nl = t.newsletterFooter;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setErrorMsg(nl.invalidEmail);
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMsg(nl.error);
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.newsletterRow}>
        <p className={styles.newsletterMsg}>{nl.success}</p>
      </div>
    );
  }

  return (
    <div className={styles.newsletterRow}>
      <h3 className={styles.newsletterHeadline}>{nl.headline}</h3>
      <p className={styles.newsletterSubhead}>{nl.subhead}</p>
      <form className={styles.newsletterForm} onSubmit={onSubmit} noValidate>
        <div className={styles.newsletterInputWrap}>
          <input
            type="email"
            className={styles.newsletterInput}
            placeholder={nl.placeholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            required
          />
        </div>
        <button type="submit" className={styles.newsletterSubmit} disabled={status === 'submitting'}>
          {status === 'submitting' ? nl.submitting : nl.submit}
        </button>
      </form>
      {status === 'error' && <p className={`${styles.newsletterMsg} ${styles.newsletterMsgError}`}>{errorMsg}</p>}
    </div>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const settings = useSiteSettings();

  return (
    <footer className={styles.footer} style={{ backgroundColor: NAVY }}>

      {/* ── Hero image band ── */}
      <div className={styles.imageBand} />

      {/* ── Wordmark block ── */}
      <div className={styles.wordmarkBlock} style={{ backgroundColor: NAVY }}>
        <div className={styles.wordmark}>
          {/* Logo image */}
          <Image
            src="/logo.png"
            alt="Bossert Immobilien"
            width={160}
            height={160}
            className={styles.logoImg}
            priority
          />
        </div>
      </div>

      {/* ── Newsletter signup ── */}
      <FooterNewsletter />

      {/* ── Horizontal rule ── */}
      <div className={styles.rule} style={{ backgroundColor: NAVY }} />

      {/* ── Nav links ── */}
      <nav className={styles.navRow} style={{ backgroundColor: NAVY }} aria-label="Footer navigation">
        <Link href="/properties" className={styles.navLink}>Property Listings</Link>
        <Link href="/services" className={styles.navLink}>{t.nav.services}</Link>
        <Link href="#" className={styles.navLink}>{t.nav.cancelContract}</Link>
        <Link href="/about" className={styles.navLink}>Company</Link>
        <Link href="/contact" className={styles.navLink}>{t.nav.contact}</Link>
      </nav>

      {/* ── Social icons ── */}
      <div className={styles.socialsRow} style={{ backgroundColor: NAVY }}>
        {settings.socialInstagram && (
          <a href={settings.socialInstagram} aria-label="Instagram" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        )}
        {settings.socialFacebook && (
          <a href={settings.socialFacebook} aria-label="Facebook" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.81l.39-4h-4.2V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        )}
      </div>

      {/* ── Bottom bar ── */}
      <div className={styles.bottomBar} style={{ backgroundColor: NAVY }}>
        <span className={styles.copyText}>Copywrite</span>
        <div className={styles.bottomRight}>
          <span className={styles.sep}>|</span>
          <Link href="#" className={styles.imprintLink}>Imprint</Link>
        </div>
      </div>

    </footer>
  );
}
