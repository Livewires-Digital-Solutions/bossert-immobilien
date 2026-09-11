'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Property } from '@/data/properties';
import styles from './collection.module.css';

const IconArea = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 3 3 21M21 9V3h-6M3 15v6h6" />
  </svg>
);
const IconRoom = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21V7l9-4 9 4v14M3 21h18M9 21v-6h6v6" />
  </svg>
);
const IconBed = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 14h18M3 18v2M21 18v2M7 10V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
  </svg>
);
const IconBath = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 2-2c1 0 1.5.5 2 1M7 19l-1 2M18 19l1 2" />
  </svg>
);
const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const DEAL_LABEL: Record<string, string> = { Buy: 'Zu verkaufen', Rent: 'Zu vermieten' };

export default function PropertyCollectionCard({
  property,
  featured = false,
  priority = false,
}: {
  property: Property;
  featured?: boolean;
  priority?: boolean;
}) {
  const p = property;
  const city = p.location?.split(',').pop()?.trim();
  const imageCount = p.galleryImages?.length ?? 0;
  const priceCaption = p.transactionType === 'Rent' ? 'Kaltmiete / Monat' : 'Kaufpreis';

  const specs: { icon: React.ReactNode; label: string }[] = [];
  if (p.livingArea) specs.push({ icon: <IconArea />, label: p.livingArea });
  if (p.rooms) specs.push({ icon: <IconRoom />, label: `${p.rooms} Zi.` });
  if (p.bedrooms) specs.push({ icon: <IconBed />, label: p.bedrooms });
  if (p.bathrooms) specs.push({ icon: <IconBath />, label: p.bathrooms });
  if (!p.livingArea && p.plotArea) specs.unshift({ icon: <IconArea />, label: `${p.plotArea} Grdst.` });

  return (
    <Link
      href={`/properties/${encodeURIComponent(p.id)}`}
      className={`${styles.card} ${featured ? styles.cardFeatured : ''}`}
    >
      <div className={styles.cardMedia}>
        <Image
          src={p.imageSrc}
          alt={p.title || p.type}
          fill
          className={styles.cardImg}
          sizes={featured ? '(max-width: 1100px) 100vw, 55vw' : '(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw'}
          priority={priority}
        />
        <div className={styles.cardMediaGrad} />
        <div className={styles.cardTags}>
          {p.transactionType ? (
            <span className={styles.cardDeal}>{DEAL_LABEL[p.transactionType] ?? p.transactionType}</span>
          ) : (
            <span />
          )}
          {imageCount > 1 && (
            <span className={styles.cardCount}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              {imageCount}
            </span>
          )}
        </div>
      </div>

      <div className={styles.cardBody}>
        {city && <span className={styles.cardLoc}>{city}</span>}
        <h3 className={styles.cardTitle}>{p.title || p.type}</h3>

        {specs.length > 0 && (
          <div className={styles.cardSpecs}>
            {specs.map((s, i) => (
              <span className={styles.cardSpec} key={i}>
                {s.icon}
                {s.label}
              </span>
            ))}
          </div>
        )}

        <div className={styles.cardFooter}>
          <div>
            <span className={styles.cardPrice}>{p.price}</span>
            <span className={styles.cardPriceCaption}>{priceCaption}</span>
          </div>
          <span className={styles.cardCta}>
            Ansehen <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}
