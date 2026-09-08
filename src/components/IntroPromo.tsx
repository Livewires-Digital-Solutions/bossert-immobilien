"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './IntroPromo.module.css';

export default function IntroPromo() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

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

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ── Phase 1: Vector Background Animation (0.0 to 0.40) ──
  // The vector drawing fades in to high off-white radiance (0 -> 0.65) and settles from scale 1.08 -> 1.0
  const vectorProgress = Math.max(0, Math.min(1, progress / 0.4));
  const vectorOpacity = vectorProgress * 0.68;
  const vectorScale = 1.08 - 0.08 * vectorProgress;

  // ── Phase 2: Content & Button Expansion (0.40 to 0.85) ──
  // Expands outward from 0 width & 0 height to full dimensions
  const rawContentProgress = Math.max(0, Math.min(1, (progress - 0.4) / 0.45));
  // Smooth cubic ease-out
  const easedContent = 1 - Math.pow(1 - rawContentProgress, 3);

  // Staggered child reveals based on content expansion progress
  const tagOpacity = Math.max(0, Math.min(1, (rawContentProgress - 0.1) / 0.3));
  const headlineOpacity = Math.max(0, Math.min(1, (rawContentProgress - 0.25) / 0.3));
  const subheadOpacity = Math.max(0, Math.min(1, (rawContentProgress - 0.4) / 0.3));
  const bodyOpacity = Math.max(0, Math.min(1, (rawContentProgress - 0.55) / 0.3));
  const buttonOpacity = Math.max(0, Math.min(1, (rawContentProgress - 0.7) / 0.3));

  // Child transform offsets
  const getTransform = (op: number) => `translateY(${(1 - op) * 16}px)`;

  // Interactive once mostly expanded
  const isInteractive = rawContentProgress > 0.85;

  return (
    <div className={styles.scrollTrack} ref={trackRef}>
      <div className={styles.stickyStage}>
        {/* ── Architectural Vector Background Illustration ── */}
        <div
          className={styles.vectorIllustration}
          style={{
            opacity: vectorOpacity,
            transform: `scale(${vectorScale})`,
          }}
          aria-hidden="true"
        />

        {/* ── Vignette gradient for seamless edge blending ── */}
        <div className={styles.vectorVignette} aria-hidden="true" />

        {/* ── Expanding Content Container (from 0 width and height) ── */}
        <div
          className={styles.contentExpansionContainer}
          style={{
            width: `${Math.max(0, easedContent * 100)}%`,
            maxWidth: '860px',
            opacity: Math.min(1, easedContent * 1.6),
            transform: `scale(${0.15 + 0.85 * easedContent})`,
            clipPath: `inset(${(1 - easedContent) * 46}% ${(1 - easedContent) * 46}% round 4px)`,
            pointerEvents: isInteractive ? 'auto' : 'none',
          }}
        >
          <div className={styles.contentCard}>
            {/* Tag */}
            <div
              className={styles.tag}
              style={{
                opacity: tagOpacity,
                transform: getTransform(tagOpacity),
                transition: 'transform 0.15s ease-out',
              }}
            >
              <span className={styles.tagDot} />
              Property Experts — Rhine-Main
            </div>

            {/* Main Headline */}
            <h2
              className={styles.headline}
              style={{
                opacity: headlineOpacity,
                transform: getTransform(headlineOpacity),
                transition: 'transform 0.15s ease-out',
              }}
            >
              Your Property Expert in the Rhine-Main Region
            </h2>

            {/* Subheading */}
            <p
              className={styles.subhead}
              style={{
                opacity: subheadOpacity,
                transform: getTransform(subheadOpacity),
                transition: 'transform 0.15s ease-out',
              }}
            >
              Comprehensive Property Solutions — from initial consultation to successful closing
            </p>

            {/* Body Description */}
            <p
              className={styles.bodyText}
              style={{
                opacity: bodyOpacity,
                transform: getTransform(bodyOpacity),
                transition: 'transform 0.15s ease-out',
              }}
            >
              Whether you're buying, selling, or seeking a valuation, we support you with tailored strategies,
              personalized guidance, and in-depth market expertise.
            </p>

            {/* Action Button */}
            <div
              style={{
                opacity: buttonOpacity,
                transform: getTransform(buttonOpacity),
                transition: 'transform 0.15s ease-out',
                marginTop: '0.5rem',
              }}
            >
              <Link href="/contact" className={styles.ctaButton}>
                Request a free consultation
                <span className={styles.ctaArrow}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Subtle Scroll Progress Indicator ── */}
        <div
          className={styles.scrollIndicator}
          style={{
            opacity: progress < 0.95 ? 0.85 : 0,
          }}
        >
          <div className={styles.scrollTrackLine}>
            <div
              className={styles.scrollProgressFill}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className={styles.scrollHintText}>
            {progress < 0.4
              ? 'Scroll to reveal illustration'
              : progress < 0.85
              ? 'Expanding details'
              : 'Explore our services below'}
          </span>
        </div>
      </div>
    </div>
  );
}
