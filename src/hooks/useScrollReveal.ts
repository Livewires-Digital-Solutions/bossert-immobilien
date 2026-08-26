"use client";
import { useEffect } from "react";
import { usePathname } from "@/i18n/routing";

/**
 * Attaches an IntersectionObserver to every element with a
 * `.reveal`, `.reveal-left`, `.reveal-right`, or `.reveal-scale`
 * class inside the given container ref (defaults to document).
 * When an element enters the viewport, `in-view` is added so the
 * CSS transition plays.
 *
 * Re-runs on every route change so that client-side navigation
 * (Next.js keeps the layout mounted) works without a hard refresh.
 */
export function useScrollReveal(containerRef?: React.RefObject<HTMLElement | null>) {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to let the new page's DOM render before querying
    const timer = setTimeout(() => {
      const root = containerRef?.current ?? document;

      // Remove stale `in-view` from any elements left over from the previous page
      root.querySelectorAll<HTMLElement>(".reveal.in-view, .reveal-left.in-view, .reveal-right.in-view, .reveal-scale.in-view")
        .forEach((el) => el.classList.remove("in-view"));

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
    }, 50); // 50ms is enough for Next.js to paint the new page

    return () => clearTimeout(timer);
  }, [pathname, containerRef]);
}

