'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';
import { Reveal, SplitText, Magnetic, CountUp } from '@/components/anim/Motion';
import styles from './collection.module.css';

const Arrow = () => (
  <span className={styles.btnArrow}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  </span>
);

export default function PropertyBillboard({
  image,
  count,
}: {
  image: string;
  count: number;
}) {
  const { t } = useLanguage();
  const p = t.propertiesPage;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.16]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <header className={styles.hero} ref={ref}>
      <Navbar invertOnLoad />

      <motion.div
        className={styles.heroBgWrap}
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
      >
        <Image
          src={image}
          alt=""
          fill
          priority
          className={styles.heroBg}
          sizes="100vw"
        />
      </motion.div>
      <div className={styles.heroOverlay} />

      <motion.div className={styles.heroInner} style={reduce ? undefined : { opacity: fade }}>
        <Reveal y={16} blur={4} duration={0.7}>
          <span className={styles.eyebrow}>{p.heroTag}</span>
        </Reveal>

        <h1 className={styles.heroTitle}>
          <SplitText text={p.heroHeadline} />
          <span className={styles.serif}>
            <SplitText text={p.heroHeadlineSerif} delay={0.15} />
          </span>
        </h1>

        <div className={styles.heroBottomRow}>
          <Reveal y={20} delay={0.35}>
            <p className={styles.heroSubhead}>{p.heroSubhead}</p>
          </Reveal>

          <Reveal y={20} delay={0.45} className={styles.heroMeta}>
            <span className={styles.heroMetaNum}>
              <CountUp value={count} duration={1.4} />
            </span>
            <span className={styles.heroMetaLabel}>
              {count === 1 ? 'Residenz' : 'Residenzen'}
            </span>
          </Reveal>
        </div>

        <Reveal y={20} delay={0.55} style={{ marginTop: '2rem' }}>
          <Magnetic>
            <Link href="/search-profile" className={styles.btn}>
              {p.heroCta}
              <Arrow />
            </Link>
          </Magnetic>
        </Reveal>
      </motion.div>

      <motion.div
        className={styles.scrollCue}
        style={reduce ? undefined : { opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <span className={styles.scrollCueLabel}>Scrollen</span>
        <span className={styles.scrollCueLine} />
      </motion.div>
    </header>
  );
}
