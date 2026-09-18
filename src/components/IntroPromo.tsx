"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { usePinnedScrollProgress, stage, easeOutBack } from '../hooks/useScrollProgress';
import styles from './IntroPromo.module.css';

// Pin-and-scrub sequence, in two clearly separated beats instead of one
// overlapping cascade: first the illustration wipes in as the section is
// pinned on screen (PICTURE_RANGE), then — only once that's finished — the
// message pops up at the center (CONTENT_RANGE), scaling in with an
// ease-out-back overshoot that's driven live by scroll position rather
// than a fixed-timer keyframe. The outer track is taller than one
// viewport (see .promoSection / .stickyViewport in the CSS) so this plays
// out across a real scroll distance instead of finishing in one wheel tick.
// Both ranges stay close to the 0–1 edges (no long pause up front, no long
// hold at the end) so the pinned section doesn't linger as a blank screen
// once the sequence finishes.
const PICTURE_RANGE: [number, number] = [0, 0.4];
const CONTENT_RANGE: [number, number] = [0.48, 0.97];

export default function IntroPromo() {
  const { ref: trackRef, progress } = usePinnedScrollProgress<HTMLElement>();
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

  const pictureStage = stage(progress, PICTURE_RANGE[0], PICTURE_RANGE[1]);
  const contentStage = stage(progress, CONTENT_RANGE[0], CONTENT_RANGE[1]);
  const contentScale = 0.85 + 0.15 * easeOutBack(contentStage);
  const contentOpacity = Math.min(1, contentStage * 1.6);
  const contentLift = (1 - contentStage) * 28;

  return (
    <section className={styles.promoSection} ref={trackRef}>
      <div className={styles.stickyViewport} onMouseMove={handleMouseMove} onMouseLeave={resetParallax}>
        {/* Architectural line illustration, recolored navy via mask.
            Same technique as the navy logo (see globals.css .logo-img-navy):
            the source art is a white silhouette on transparent, so we use it
            as a mask over a solid navy fill instead of shipping a second,
            recolored asset. */}
        <div className={styles.illustrationStage} ref={illustrationRef} aria-hidden="true">
          <div
            className={styles.vectorIllustration}
            style={{
              opacity: pictureStage * 0.9,
              clipPath: `inset(0 0 ${(1 - pictureStage) * 100}% 0)`,
              transform: `scale(${1 + (1 - pictureStage) * 0.06})`,
            }}
          />
        </div>

        <div
          className={styles.content}
          style={{
            opacity: contentOpacity,
            transform: `translateY(${contentLift}px) scale(${contentScale})`,
          }}
        >
          <p className={styles.tag}>
            <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {t.introPromo.tag}
          </p>

          <h2 className={styles.headline}>{t.introPromo.headline}</h2>

          <p className={styles.subhead}>{t.introPromo.headlineSub}</p>

          <p className={styles.bodyText}>{t.introPromo.body}</p>

          <div className={styles.ctaWrap}>
            <Link href="/contact" className={styles.ctaButton}>
              {t.introPromo.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
