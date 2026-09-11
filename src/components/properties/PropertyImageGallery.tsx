'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '@/components/anim/Motion';
import styles from './detail.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PropertyImageGallery({ images, title }: { images: string[]; title: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [box, setBox] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const item = c as HTMLElement;
      const mid = item.offsetLeft + item.offsetWidth / 2;
      const d = Math.abs(mid - center);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  // Drag-to-scroll (pointer)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let down = false;
    let startX = 0;
    let startScroll = 0;
    const pd = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
    };
    const pm = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const pu = () => {
      down = false;
    };
    el.addEventListener('pointerdown', pd);
    window.addEventListener('pointermove', pm);
    window.addEventListener('pointerup', pu);
    return () => {
      el.removeEventListener('pointerdown', pd);
      window.removeEventListener('pointermove', pm);
      window.removeEventListener('pointerup', pu);
    };
  }, []);

  // Lightbox keyboard
  useEffect(() => {
    if (box === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBox(null);
      if (e.key === 'ArrowRight') setBox((b) => (b === null ? b : (b + 1) % images.length));
      if (e.key === 'ArrowLeft') setBox((b) => (b === null ? b : (b - 1 + images.length) % images.length));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [box, images.length]);

  if (!images.length) return null;

  return (
    <section className={styles.gallery}>
      <div className={styles.galleryHead}>
        <Reveal y={16}>
          <span className={styles.eyebrow}>Galerie</span>
        </Reveal>
        <span className={styles.galleryCounter}>
          {String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </div>

      <div className={styles.galleryTrack} ref={trackRef} onScroll={onScroll}>
        {images.map((src, i) => (
          <motion.div
            key={i}
            className={styles.galleryItem}
            initial={reduce ? undefined : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            whileInView={reduce ? undefined : { opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE, delay: Math.min(i, 3) * 0.06 }}
          >
            <Image
              src={src}
              alt={`${title} — Bild ${i + 1}`}
              fill
              sizes="(max-width: 700px) 90vw, 680px"
              draggable={false}
            />
            <button
              className={styles.galleryItemBtn}
              aria-label={`Bild ${i + 1} vergrößern`}
              onClick={() => setBox(i)}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {box !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setBox(null)}
          >
            <button className={styles.lightboxClose} aria-label="Schließen" onClick={() => setBox(null)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              aria-label="Zurück"
              onClick={(e) => {
                e.stopPropagation();
                setBox((b) => (b === null ? b : (b - 1 + images.length) % images.length));
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <motion.div
              key={box}
              className={styles.lightboxImg}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[box]} alt={`${title} — Bild ${box + 1}`} fill sizes="92vw" />
            </motion.div>
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              aria-label="Weiter"
              onClick={(e) => {
                e.stopPropagation();
                setBox((b) => (b === null ? b : (b + 1) % images.length));
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <span className={styles.lightboxCounter}>
              {box + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
