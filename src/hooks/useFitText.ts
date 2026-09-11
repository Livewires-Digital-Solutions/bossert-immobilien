"use client";

import { useLayoutEffect, useRef } from 'react';

/**
 * Keeps a headline on a single line, on every viewport, in every
 * language — without hardcoding font-size breakpoints per string.
 *
 * The CSS-defined font-size (typically a fluid clamp()) is treated as
 * the *ceiling*: on measure, we reset to it, check whether the text's
 * natural width fits the parent's box, and only shrink further when it
 * doesn't. Short strings (e.g. English) render at full design size;
 * longer ones (e.g. German) shrink just enough to still fit on one
 * line, instead of wrapping.
 *
 * Usage: attach the returned ref to the element carrying the text
 * (nested markup is fine — its combined textContent is measured), and
 * keep `white-space: nowrap` on that element in CSS.
 */
export function useFitText<T extends HTMLElement = HTMLElement>(
  deps: React.DependencyList = []
) {
  const ref = useRef<T | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      if (!parent) return;

      // Clear any previous shrink so we measure against the CSS
      // clamp()'s true value for the current viewport, not a stale one.
      el.style.fontSize = '';

      const cs = getComputedStyle(el);
      const baseFontSize = parseFloat(cs.fontSize);
      const available = parent.clientWidth;
      if (!available || !baseFontSize) return;

      if (!canvasRef.current) canvasRef.current = document.createElement('canvas');
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${baseFontSize}px ${cs.fontFamily}`;
      const text = (el.textContent ?? '').trim();
      if (!text) return;

      const letterSpacing = parseFloat(cs.letterSpacing) || 0;
      const naturalWidth =
        ctx.measureText(text).width + letterSpacing * Math.max(0, text.length - 1);
      if (naturalWidth <= 0) return;

      // Small safety margin so we never land pixel-exact on the wrap point.
      const ratio = Math.min(1, (available / naturalWidth) * 0.985);
      if (ratio < 1) {
        el.style.fontSize = `${baseFontSize * ratio}px`;
      }
    };

    fit();

    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement as Element);
    window.addEventListener('resize', fit);
    document.fonts?.ready?.then(fit).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
