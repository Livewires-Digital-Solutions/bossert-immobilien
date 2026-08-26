"use client";
import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to every element with a
 * `.reveal`, `.reveal-left`, `.reveal-right`, or `.reveal-scale`
 * class inside the given container ref (defaults to document).
 * When an element enters the viewport, `in-view` is added so the
 * CSS transition plays.
 */
export function useScrollReveal(containerRef?: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = containerRef?.current ?? document;
    const targets = root.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef]);
}
