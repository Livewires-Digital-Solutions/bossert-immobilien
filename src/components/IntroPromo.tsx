"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './IntroPromo.module.css';

// Timing for the choreographed entrance (ms). The illustration and the tag
// fire together the instant the section enters view, then the headline
// pops in word-by-word, and the rest cascades right behind it — one quick,
// deliberate sequence instead of something smeared across a scroll range.
const HEADLINE_BASE_DELAY = 120;
const HEADLINE_WORD_STEP = 90;
const SUBHEAD_GAP = 60;
const BODY_GAP = 110;
const BUTTON_GAP = 130;

export default function IntroPromo() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.25);
  const { t } = useLanguage();

  const illustrationRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const canParallaxRef = useRef<boolean | null>(null);

  // Subtle cursor-parallax on the illustration — CSS-var driven, no re-render.
  // Disabled for touch pointers and prefers-reduced-motion.
  const canParallax = () => {
    if (typeof window === 'undefined') return false;
    if (canParallaxRef.current === null) {
      canParallaxRef.current =
        window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return canParallaxRef.current;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canParallax()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      illustrationRef.current?.style.setProperty('--px', `${px * -16}px`);
      illustrationRef.current?.style.setProperty('--py', `${py * -16}px`);
    });
  };

  const resetParallax = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    illustrationRef.current?.style.setProperty('--px', '0px');
    illustrationRef.current?.style.setProperty('--py', '0px');
  };

  const headlineWords = t.introPromo.headline.trim().split(/\s+/);
  const afterHeadline = HEADLINE_BASE_DELAY + headlineWords.length * HEADLINE_WORD_STEP;
  const subheadDelay = afterHeadline + SUBHEAD_GAP;
  const bodyDelay = subheadDelay + BODY_GAP;
  const buttonDelay = bodyDelay + BUTTON_GAP;

  return (
    <section
      className={styles.promoSection}
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetParallax}
    >
      {/* Architectural line illustration, recolored navy via mask.
          Same technique as the navy logo (see globals.css .logo-img-navy):
          the source art is a white silhouette on transparent, so we use it
          as a mask over a solid navy fill instead of shipping a second,
          recolored asset. */}
      <div className={styles.illustrationStage} ref={illustrationRef} aria-hidden="true">
        <div className={`${styles.vectorIllustration} ${isVisible ? styles.revealed : ''}`} />
        <div className={`${styles.wipeScan} ${isVisible ? styles.revealed : ''}`} />
      </div>

      <div className={styles.content}>
        <p className={`${styles.tag} ${styles.fadeUp} ${isVisible ? styles.revealed : ''}`} style={{ transitionDelay: '0ms' }}>
          <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {t.introPromo.tag}
        </p>

        <h2 className={styles.headline}>
          {headlineWords.map((word, i) => (
            <React.Fragment key={i}>
              <span className={styles.wordMask}>
                <span
                  className={`${styles.word} ${isVisible ? styles.revealed : ''}`}
                  style={{ transitionDelay: `${HEADLINE_BASE_DELAY + i * HEADLINE_WORD_STEP}ms` }}
                >
                  {word}
                </span>
              </span>
              {i < headlineWords.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </h2>

        <p className={`${styles.subhead} ${styles.fadeUp} ${isVisible ? styles.revealed : ''}`} style={{ transitionDelay: `${subheadDelay}ms` }}>
          {t.introPromo.headlineSub}
        </p>

        <p className={`${styles.bodyText} ${styles.fadeUp} ${isVisible ? styles.revealed : ''}`} style={{ transitionDelay: `${bodyDelay}ms` }}>
          {t.introPromo.body}
        </p>

        <div className={`${styles.ctaWrap} ${isVisible ? styles.revealed : ''}`} style={{ transitionDelay: `${buttonDelay}ms` }}>
          <Link href="/contact" className={styles.ctaButton}>
            {t.introPromo.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
