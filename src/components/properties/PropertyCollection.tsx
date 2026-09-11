'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Property } from '@/data/properties';
import PropertyCollectionCard from './PropertyCollectionCard';
import styles from './collection.module.css';

type Filter = 'all' | 'Buy' | 'Rent';

const TABS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Alle' },
  { key: 'Buy', label: 'Kauf' },
  { key: 'Rent', label: 'Miete' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function GridCell({
  property,
  index,
  featured,
}: {
  property: Property;
  index: number;
  featured: boolean;
}) {
  const reduce = useReducedMotion();
  const card = (
    <PropertyCollectionCard property={property} featured={featured} priority={index === 0} />
  );

  if (reduce) {
    return <div className={featured ? styles.featuredCell : undefined}>{card}</div>;
  }

  return (
    <motion.div
      className={featured ? styles.featuredCell : undefined}
      initial={{ opacity: 0, y: 34, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE, delay: Math.min(index, 4) * 0.07 }}
    >
      {card}
    </motion.div>
  );
}

export default function PropertyCollection({ properties }: { properties: Property[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    if (filter === 'all') return properties;
    return properties.filter((p) => p.transactionType === filter);
  }, [properties, filter]);

  const hasBuy = properties.some((p) => p.transactionType === 'Buy');
  const hasRent = properties.some((p) => p.transactionType === 'Rent');
  const tabs = TABS.filter(
    (tab) => tab.key === 'all' || (tab.key === 'Buy' && hasBuy) || (tab.key === 'Rent' && hasRent),
  );

  return (
    <section className={styles.collection} id="collection">
      <div className={styles.filterBar}>
        {tabs.length > 1 ? (
          <div className={styles.filterTabs}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`${styles.filterTab} ${filter === tab.key ? styles.filterTabActive : ''}`}
                onClick={() => setFilter(tab.key)}
              >
                {tab.label}
                {filter === tab.key &&
                  (reduce ? (
                    <span className={styles.filterInk} />
                  ) : (
                    <motion.span
                      layoutId="filter-ink"
                      className={styles.filterInk}
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  ))}
              </button>
            ))}
          </div>
        ) : (
          <span className={styles.resultCount}>Die Kollektion</span>
        )}

        <span className={styles.resultCount}>
          {filtered.length} {filtered.length === 1 ? 'Objekt' : 'Objekte'}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>Derzeit keine Objekte in dieser Kategorie.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((p, i) => (
            <GridCell
              key={p.id}
              property={p}
              index={i}
              featured={filter === 'all' && i === 0 && filtered.length > 2}
            />
          ))}
        </div>
      )}
    </section>
  );
}
