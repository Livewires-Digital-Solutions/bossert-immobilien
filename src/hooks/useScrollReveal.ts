"use client";

import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal
 * @param threshold - Number between 0 and 1 indicating how much of the element must be visible before triggering
 * @param triggerOnce - If true, the animation only runs once when first scrolled into view
 * @returns [ref, isVisible] - Attach the ref to the element, and apply classes based on isVisible
 */
export function useScrollReveal(threshold = 0, triggerOnce = true) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    let rafId: number;

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0,
        // Triggers right when the section reaches the center viewport reading zone (~38% from bottom)
        rootMargin: '0px 0px -38% 0px',
      }
    );

    // ref.current may not exist yet on the frame this effect first runs —
    // e.g. a component that renders null until an async fetch resolves,
    // then attaches this ref on a later render. A one-shot "observe at
    // mount" would silently observe nothing and never run again (this
    // effect's deps don't change), leaving isVisible stuck false forever.
    // Poll a few frames until the node shows up, then attach once.
    const tryAttach = () => {
      if (cancelled) return;
      if (ref.current) {
        observer.observe(ref.current);
      } else {
        rafId = requestAnimationFrame(tryAttach);
      }
    };
    tryAttach();

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [threshold, triggerOnce]);

  return { ref, isVisible };
}
