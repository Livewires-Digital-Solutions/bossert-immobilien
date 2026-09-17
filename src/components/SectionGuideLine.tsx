"use client";

import styles from './SectionGuideLine.module.css';

// A plain straight bronze line at the start of a section, drawn in top to
// bottom the moment that section scrolls into view. Driven by the host
// section's own scroll-reveal flag so it fires in the same beat as the
// rest of that section's entrance.
interface SectionGuideLineProps {
  isVisible: boolean;
  className?: string;
}

export default function SectionGuideLine({ isVisible, className = '' }: SectionGuideLineProps) {
  return (
    <div
      className={`${styles.guideLine} ${isVisible ? styles.revealed : ''} ${className}`}
      aria-hidden="true"
    />
  );
}
