"use client";

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * Thin wrapper around the site's existing scroll-reveal convention
 * (`useScrollReveal` + `.reveal-base`/`.reveal-up`/`.is-revealed`). Lets any
 * block on the property detail page fade+rise into view on scroll without
 * repeating the ref/isVisible boilerplate everywhere.
 */
export default function RevealSection({
  children,
  delay,
  threshold = 0.15,
  variant = 'reveal-up',
  className = '',
  style,
}: {
  children: React.ReactNode;
  /** ms, applied via inline transition-delay so any stagger step works (not just the fixed .delay-100…600 classes). */
  delay?: number;
  threshold?: number;
  variant?: 'reveal-up' | 'reveal-scale';
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, isVisible } = useScrollReveal(threshold);

  return (
    <section
      ref={ref}
      className={`reveal-base ${variant} ${isVisible ? 'is-revealed' : ''} ${className}`.trim()}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </section>
  );
}
