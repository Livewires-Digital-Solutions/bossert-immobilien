"use client";

import React, { useEffect, useState } from 'react';
import styles from './IntroSequence.module.css';

export default function IntroSequence() {
  const [stage, setStage] = useState<'loading' | 'opening' | 'done'>('loading');

  useEffect(() => {
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
    // Door swing is 1.8s — finish just after it completes.
    const doneTimer = setTimeout(() => {
      setStage('done');
      unlock();
    }, 2400);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
      unlock();
    };
  }, []);

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
