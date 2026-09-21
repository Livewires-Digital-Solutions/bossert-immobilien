"use client";

import { Fragment, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { usePinnedScrollProgress, stage, easeOutBack } from '../hooks/useScrollProgress';
import styles from './IntroPromo.module.css';

// Pin-and-scrub sequence where the illustration and the copy reveal
// together instead of one after another: the artwork splits into a left
// and a right half that slide in from the outer edges toward the center,
// and the headline/subhead/body/CTA cascade in over that *same* scroll
// span — both ranges start at progress 0, so they read as one unified
// reveal rather than "picture, then text". The outer track is taller than
// one viewport (see .promoSection / .stickyViewport in the CSS) so this
// plays out across a real scroll distance instead of finishing in one
// wheel tick.
// progress now starts accruing while the section is still rising into view
// (see usePinnedScrollProgress) — the budget is the section's own track
// height (.promoSection, 170vh), and with the hero at exactly 100vh, the
// pre-pin approach eats ~59% of that (progress 0-0.59). The section's own
// centered content doesn't physically reach the middle of the screen until
// roughly halfway through that rise, either. Starting the ranges at
// progress 0 made the reveal complete before the content was even visible
// on screen — no motion to see, just a fully-formed block sliding up. So
// these start partway through the rise instead: it stays blank while the
// section is still mostly below the fold (the expected "blank page rising"
// beat), then visibly animates in as it finishes rising and locks into the
// pin, landing shortly (~230px) after. The remaining budget past ~0.74 is
// hold time to read the copy — kept short (~400px, about 3 scroll ticks)
// rather than a long dead pause before it unpins into the next section.
const PICTURE_RANGE: [number, number] = [0.26, 0.62];
const CONTENT_RANGE: [number, number] = [0.32, 0.74];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

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
  const pictureEase = easeOutCubic(pictureStage);
  const contentStage = stage(progress, CONTENT_RANGE[0], CONTENT_RANGE[1]);

  // Gentle whole-block settle once the cascade lands, layered on top of the
  // per-element reveals below rather than replacing them.
  const contentScale = 0.97 + 0.03 * easeOutBack(contentStage);

  const words = t.introPromo.headline.split(' ');
  const wordStep = 0.07;
  const wordDur = 0.35;

  const tagStage = stage(contentStage, 0, 0.3);
  const subheadStage = stage(contentStage, 0.28, 0.55);
  const bodyStage = stage(contentStage, 0.45, 0.72);
  const ctaStage = stage(contentStage, 0.62, 0.92);

  return (
    <section className={styles.promoSection} ref={trackRef}>
      <div className={styles.stickyViewport} onMouseMove={handleMouseMove} onMouseLeave={resetParallax}>
        {/* Architectural line illustration, recolored navy via mask.
            Same technique as the navy logo (see globals.css .logo-img-navy):
            the source art is a white silhouette on transparent, so we use it
            as a mask over a solid navy fill instead of shipping a second,
            recolored asset. Revealed with a top-down clip-path wipe (bottom
            inset shrinks from 100% to 0) so it appears to scroll into view
            from the top rather than sliding in from the sides. */}
        <div className={styles.illustrationStage} ref={illustrationRef} aria-hidden="true">
          <div
            className={styles.illustrationImage}
            style={{
              opacity: Math.min(1, pictureStage * 1.6),
              clipPath: `inset(0 0 ${(1 - pictureEase) * 100}% 0)`,
              WebkitClipPath: `inset(0 0 ${(1 - pictureEase) * 100}% 0)`,
              transform: `translateY(${(1 - pictureEase) * -30}px)`,
            }}
          />
        </div>

        <div
          className={styles.content}
          style={{ transform: `scale(${contentScale})` }}
        >
          <p
            className={styles.tag}
            style={{
              opacity: tagStage,
              transform: `translateY(${(1 - tagStage) * 14}px)`,
            }}
          >
            <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {t.introPromo.tag}
          </p>

          <h2 className={styles.headline}>
            {words.map((word, i) => {
              const wordStage = stage(contentStage, i * wordStep, i * wordStep + wordDur);
              const wordEase = easeOutCubic(wordStage);
              return (
                <Fragment key={i}>
                  <span className={styles.wordMask}>
                    <span
                      className={styles.word}
                      style={{
                        transform: `translateY(${(1 - wordEase) * 100}%)`,
                        opacity: wordStage,
                      }}
                    >
                      {word}
                    </span>
                  </span>
                  {i < words.length - 1 ? ' ' : ''}
                </Fragment>
              );
            })}
          </h2>

          <p
            className={styles.subhead}
            style={{
              opacity: subheadStage,
              transform: `translateY(${(1 - subheadStage) * 16}px)`,
            }}
          >
            {t.introPromo.headlineSub}
          </p>

          <p
            className={styles.bodyText}
            style={{
              opacity: bodyStage,
              transform: `translateY(${(1 - bodyStage) * 16}px)`,
            }}
          >
            {t.introPromo.body}
          </p>

          <div
            className={styles.ctaWrap}
            style={{
              opacity: ctaStage,
              transform: `translateY(${(1 - ctaStage) * 14}px)`,
            }}
          >
            <Link href="/contact" className={styles.ctaButton}>
              {t.introPromo.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
