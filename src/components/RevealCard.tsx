"use client";

import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * Per-item scroll reveal for grid cards, using the site's existing
 * useScrollReveal + .reveal-base/.reveal-up convention. Each card gets its own
 * IntersectionObserver so cards further down the grid animate in as they
 * individually enter the viewport, staggered by `delay`.
 */
export default function RevealCard({
  children,
  delay = 0,
  threshold = 0.1,
}: {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
}) {
  const { ref, isVisible } = useScrollReveal(threshold);

  return (
    <div
      ref={ref}
      className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
