"use client";

import { useEffect, useRef } from 'react';
import { useLenis } from '@/context/LenisContext';

const MOBILE_QUERY = '(max-width: 768px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const SNAP_EPSILON = 6;
const SETTLE_DELAY = 150;
const SNAP_DURATION = 0.8;
// Lenis runs with the default syncTouch:false, so on touch devices scrolling
// is native browser momentum — Lenis only mirrors it, it doesn't drive it.
// "No scroll event for SETTLE_DELAY" is not the same as "momentum has
// stopped": the deceleration tail can space native scroll events further
// apart than SETTLE_DELAY while still moving the page. Committing a
// lenis.scrollTo() snap at that point starts an 800ms programmatic scroll
// animation on top of scrolling that's still live, and the two fight over
// the real scroll position — the reported "jumps up or down at random"
// glitch. Polling velocity until it's actually ~0 before snapping avoids
// ever starting a scrollTo while native momentum is still carrying the page.
const VELOCITY_EPSILON = 0.05;
const VELOCITY_POLL_INTERVAL = 100;
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

      // Hero: evaluate snapping points (top, carousel, and bottom)
      if (y >= -SNAP_EPSILON && y <= heroBottom + SNAP_EPSILON) {
        const carousel = document.querySelector<HTMLElement>('.hero-right');
        const carouselTop = carousel ? carousel.offsetTop : heroBottom;
        
        const points = [0, carouselTop, heroBottom];
        let nearest = points[0];
        let dist = Math.abs(y - nearest);
        
        for (const p of points) {
          const d = Math.abs(y - p);
          if (d < dist) {
            dist = d;
            nearest = p;
          }
        }
        
        // Unconditional commit to the nearest edge in Hero
        if (dist > SNAP_EPSILON) {
          lenis.scrollTo(nearest, { duration: SNAP_DURATION });
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

    // Waits until Lenis reports the scroll has actually stopped moving
    // (velocity ~0), not just "no scroll event recently" — see
    // VELOCITY_EPSILON above. Re-polls at a short interval instead of
    // re-arming the full SETTLE_DELAY so a still-decelerating page doesn't
    // keep pushing the check back indefinitely.
    const waitForStop = () => {
      if (Math.abs(lenis.velocity) > VELOCITY_EPSILON) {
        settleTimer.current = setTimeout(waitForStop, VELOCITY_POLL_INTERVAL);
        return;
      }
      evaluate();
    };

    const onScroll = () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(waitForStop, SETTLE_DELAY);
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
