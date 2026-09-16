"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import styles from './IntroPromo.module.css';

export default function IntroPromo() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const maxScroll = trackRef.current.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / maxScroll));
      setProgress(p);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ── Phase 1 (0 → 0.5): the illustration wipes in top-down, starting the
  // instant the section enters view — never a blank beat before it moves. ──
  const illustrationProgress = Math.max(0, Math.min(1, progress / 0.5));
  const illustrationReveal = `inset(0 0 ${(1 - illustrationProgress) * 100}% 0)`;

  // ── Phase 2 (0.4 → 1): the text reveals after, staggered line by line ──
  const contentProgress = Math.max(0, Math.min(1, (progress - 0.4) / 0.6));
  const tagOpacity = Math.max(0, Math.min(1, contentProgress / 0.3));
  const headlineOpacity = Math.max(0, Math.min(1, (contentProgress - 0.15) / 0.3));
  const subheadOpacity = Math.max(0, Math.min(1, (contentProgress - 0.3) / 0.3));
  const bodyOpacity = Math.max(0, Math.min(1, (contentProgress - 0.45) / 0.3));
  const buttonOpacity = Math.max(0, Math.min(1, (contentProgress - 0.6) / 0.3));

  const getTransform = (op: number) => `translateY(${(1 - op) * 16}px)`;

  return (
    <div className={styles.scrollTrack} ref={trackRef}>
      <div className={styles.stickyStage}>
        {/* ── Architectural line illustration, recolored navy via mask ── */}
        <div
          className={styles.vectorIllustration}
          style={{ clipPath: illustrationReveal, WebkitClipPath: illustrationReveal }}
          aria-hidden="true"
        />

        <div className={styles.content}>
          <p className={styles.tag} style={{ opacity: tagOpacity, transform: getTransform(tagOpacity), transition: 'transform 0.15s ease-out' }}>
            <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {t.introPromo.tag}
          </p>

          <h2 className={styles.headline} style={{ opacity: headlineOpacity, transform: getTransform(headlineOpacity), transition: 'transform 0.15s ease-out' }}>
            {t.introPromo.headline}
          </h2>
          <p className={styles.subhead} style={{ opacity: subheadOpacity, transform: getTransform(subheadOpacity), transition: 'transform 0.15s ease-out' }}>
            {t.introPromo.headlineSub}
          </p>

          <p className={styles.bodyText} style={{ opacity: bodyOpacity, transform: getTransform(bodyOpacity), transition: 'transform 0.15s ease-out' }}>
            {t.introPromo.body}
          </p>

          <div style={{ opacity: buttonOpacity, transform: getTransform(buttonOpacity), transition: 'transform 0.15s ease-out', marginTop: '0.5rem' }}>
            <Link href="/contact" className={styles.ctaButton}>
              {t.introPromo.cta}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
