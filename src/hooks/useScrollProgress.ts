"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * usePinnedScrollProgress
 * For a "pin and scrub" section: a tall outer track (e.g. 250vh) holding a
 * `position: sticky` inner viewport. Returns 0→1 as the user scrolls through
 * the track while it's pinned on screen, so a reveal can be spread across a
 * genuinely long scroll distance instead of completing within a single wheel
 * tick — measured directly (not by IntersectionObserver timing), and
 * continuous in both directions so scrolling back up retracts it.
 *
 * Verified against this project's Lenis smooth-scroll (SmoothScroll.tsx):
 * Lenis drives real `window.scrollTo`, so native scroll events and
 * getBoundingClientRect stay accurate — no extra wiring needed here.
 *
 * Returns progress=1 under prefers-reduced-motion so callers render the
 * fully-revealed state; pair with a CSS `@media (prefers-reduced-motion)`
 * override that collapses the tall track back to a normal single-viewport
 * section (done in JS state alone, that override would still show a flash
 * of the tall empty track before paint).
 */
export function usePinnedScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    let rafId: number | null = null;

    const measure = () => {
      rafId = null;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(1);
        return;
      }
      const raw = -rect.top / total;
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    const onScroll = () => {
      if (rafId == null) rafId = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return { ref, progress };
}

/** Maps `value` from the [start, end] range onto [0, 1], clamped. */
export function stage(value: number, start: number, end: number) {
  if (end === start) return value >= end ? 1 : 0;
  return Math.max(0, Math.min(1, (value - start) / (end - start)));
}

/** Standard "ease-out-back" curve: overshoots past 1 before settling at
 * exactly 1 when t=1 — used to give a scroll-scrubbed pop-in its spring,
 * without needing a fixed-timer CSS keyframe. */
export function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const x = Math.max(0, Math.min(1, t));
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}
