"use client";

import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './IntroSequence.module.css';

const PLAYED_KEY = 'bossertIntroPlayed';

// useLayoutEffect on the client, no-op on the server (avoids the SSR warning).
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function IntroSequence() {
  const [stage, setStage] = useState<'loading' | 'opening' | 'done'>('loading');

  // Before first paint: if the intro already played this session, skip it entirely.
  useIsomorphicLayoutEffect(() => {
    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(PLAYED_KEY) === '1';
    } catch {
      /* storage blocked — just play it */
    }
    if (alreadyPlayed) setStage('done');
  }, []);

  useEffect(() => {
    if (stage === 'done') return;

    try {
      if (sessionStorage.getItem(PLAYED_KEY) === '1') {
        setStage('done');
        return;
      }
      sessionStorage.setItem(PLAYED_KEY, '1');
    } catch {
      /* ignore */
    }

    // Lock scrolling while the immersive intro plays.
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    const preventKeyScroll = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });

    const unlock = () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
    };

    // Open the doors shortly after mount.
    const openTimer = setTimeout(() => setStage('opening'), 320);
    // Door swing is 1.8s — unmount just after it finishes.
    const doneTimer = setTimeout(() => {
      setStage('done');
      unlock();
    }, 2400);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
      unlock();
    };
  }, [stage]);

  if (stage === 'done') return null;

  return (
    <div className={styles.introWrapper} aria-hidden="true">
      <div className={`${styles.door} ${styles.leftDoor} ${stage === 'opening' ? styles.doorOpenLeft : ''}`}>
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        </div>
      </div>
      <div className={`${styles.door} ${styles.rightDoor} ${stage === 'opening' ? styles.doorOpenRight : ''}`}>
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="Logo" className={styles.logoImage} />
        </div>
      </div>
    </div>
  );
}
