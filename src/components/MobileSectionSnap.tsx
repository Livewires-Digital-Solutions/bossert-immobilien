"use client";

import { useEffect, useRef } from 'react';
import { useLenis } from '@/context/LenisContext';

const MOBILE_QUERY = '(max-width: 768px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const SNAP_EPSILON = 6;
const SETTLE_DELAY = 150;
const SNAP_DURATION = 0.8;
// Services/Explore are long, content-heavy sections (accordion cards, the
// property grid) — a scroll settling deep inside one of them must stay put
// so it can be read/browsed. Only a settle within this fraction of the
// viewport from a section edge gets nudged into alignment.
const EDGE_THRESHOLD_RATIO = 0.22;

/**
 * Mobile-only section snapping for the home page's opening stretch.
 *
 * Hero is short (~1 viewport) and has no scrollable content of its own, so
 * any settle inside it commits fully to whichever edge (top / IntroPromo)
 * is closer. IntroPromo itself (the scroll-scrubbed reveal in between) is
 * excluded entirely — it's a gap between the Hero and Services/Explore
 * ranges below, so scrolling through it is always free, whatever its
 * height, and its animation is never cut short. Services and Explore are
 * long, so only settles near their shared edges (Services top / Explore
 * top / Explore bottom) get nudged into place; the interior stays free so
 * their content can be browsed normally. Past Explore (into Why and
 * beyond) nothing here applies.
 */
export default function MobileSectionSnap() {
  const lenis = useLenis();
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!lenis) return;

    let heroBottom = 0;
    let servicesTop = 0;
    let exploreTop = 0;
    let exploreBottom = 0;

    const measure = () => {
      const hero = document.querySelector<HTMLElement>('.hero-section');
      const services = document.querySelector<HTMLElement>('.services-section');
      const explore = document.querySelector<HTMLElement>('.explore-section');
      if (!hero || !services || !explore) return;
      heroBottom = hero.offsetTop + hero.offsetHeight;
      servicesTop = services.offsetTop;
      exploreTop = explore.offsetTop;
      exploreBottom = explore.offsetTop + explore.offsetHeight;
    };

    measure();
    const remeasureTimer = setTimeout(measure, 500);
    const onLoad = () => measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', onLoad);

    const evaluate = () => {
      if (!window.matchMedia(MOBILE_QUERY).matches) return;
      if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

      const y = window.scrollY;

      // Hero: unconditional commit to whichever edge is nearer.
      if (y >= -SNAP_EPSILON && y <= heroBottom + SNAP_EPSILON) {
        const target = y < heroBottom / 2 ? 0 : heroBottom;
        if (Math.abs(y - target) > SNAP_EPSILON) {
          lenis.scrollTo(target, { duration: SNAP_DURATION });
        }
        return;
      }

      // Services/Explore: only nudge when close to a shared edge.
      if (y >= servicesTop - SNAP_EPSILON && y <= exploreBottom + SNAP_EPSILON) {
        const points = [servicesTop, exploreTop, exploreBottom];
        let nearest = points[0];
        let dist = Math.abs(y - nearest);
        for (const p of points) {
          const d = Math.abs(y - p);
          if (d < dist) {
            dist = d;
            nearest = p;
          }
        }
        const threshold = window.innerHeight * EDGE_THRESHOLD_RATIO;
        if (dist > SNAP_EPSILON && dist <= threshold) {
          lenis.scrollTo(nearest, { duration: SNAP_DURATION });
        }
      }
    };

    const onScroll = () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(evaluate, SETTLE_DELAY);
    };

    lenis.on('scroll', onScroll);

    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', onLoad);
      clearTimeout(remeasureTimer);
      if (settleTimer.current) clearTimeout(settleTimer.current);
      lenis.off('scroll', onScroll);
    };
  }, [lenis]);

  return null;
}
