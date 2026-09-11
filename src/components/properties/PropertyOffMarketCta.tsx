'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Reveal, Magnetic, SplitText } from '@/components/anim/Motion';
import styles from './collection.module.css';

export default function PropertyOffMarketCta() {
  const { t } = useLanguage();
  const p = t.propertiesPage;

  return (
    <section className={styles.cta}>
      <Reveal y={40} className={styles.ctaCard}>
        <span className={styles.eyebrow} style={{ marginBottom: 0 }}>
          Off-Market
        </span>
        <h2 className={styles.ctaTitle}>
          <SplitText text={p.ctaHeadline} />
          <span className={styles.serif}>
            <SplitText text={p.ctaHeadlineSerif} delay={0.12} />
          </span>
        </h2>
        <p className={styles.ctaSub}>{p.ctaSubhead}</p>
        <Magnetic>
          <Link href="/contact" className={`${styles.btn} ${styles.btnDark}`}>
            {p.ctaBtn}
            <span className={styles.btnArrow}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </span>
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
