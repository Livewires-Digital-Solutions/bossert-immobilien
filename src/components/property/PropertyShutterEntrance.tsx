"use client";

import React, { useState, useEffect } from 'react';
import styles from './PropertyShutterEntrance.module.css';

interface Props {
  propertyType?: string;
  propertyLocation?: string;
}

export default function PropertyShutterEntrance({ propertyType, propertyLocation }: Props) {
  const [active, setActive] = useState(true);
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    // Start smooth upward slide shortly after mount
    const liftTimer = setTimeout(() => {
      setLifting(true);
    }, 140);

    // Completely unmount after transition finishes (0.85s total)
    const doneTimer = setTimeout(() => {
      setActive(false);
    }, 850);

    return () => {
      clearTimeout(liftTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className={`${styles.shutter} ${lifting ? styles.shutterLift : ''}`}
      onClick={() => setActive(false)}
      aria-hidden="true"
    >
      <div className={styles.shutterContent}>
        <span className={styles.shutterBrand}>Bossert Immobilien</span>
        <div className={styles.goldLine} />
        <h2 className={styles.shutterTitle}>
          {propertyType || 'Exposé'}
        </h2>
        {propertyLocation && (
          <span className={styles.shutterLocation}>{propertyLocation}</span>
        )}
      </div>
      <div className={styles.trailingGoldBar} />
    </div>
  );
}
