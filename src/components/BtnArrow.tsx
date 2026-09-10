import React from 'react';

/**
 * Small diagonal "go" arrow used inside CTA buttons (replaces the old ↗ glyph).
 * Keeps the original span class so existing hover transforms still apply.
 */
export default function BtnArrow({ className = 'btn-arrow' }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </svg>
    </span>
  );
}
