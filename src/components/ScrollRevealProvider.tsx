"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Drop this anywhere in the tree (we put it in layout) and it
 * bootstraps IntersectionObserver for the whole document.
 */
export default function ScrollRevealProvider() {
  useScrollReveal(); // no container ref → watches the entire document
  return null;
}
