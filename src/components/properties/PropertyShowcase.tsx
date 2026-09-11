'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Property } from '@/data/properties';
import type { PublicPropertyView } from '@/lib/property-view';
import { Reveal, Stagger, StaggerItem, SplitText, Magnetic, CountUp } from '@/components/anim/Motion';
import PropertyImageGallery from './PropertyImageGallery';
import PropertyCollectionCard from './PropertyCollectionCard';
import styles from './detail.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;

const ArrowUpRight = () => (
  <span className={styles.btnArrow}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  </span>
);

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12l5 5L20 6" />
  </svg>
);

interface KeyFact {
  key: string;
  label: string;
  value: string;
  numeric?: number;
  suffix?: string;
}

function buildKeyFacts(property: Property): KeyFact[] {
  const facts: KeyFact[] = [];
  const ds = property.detailedSpecs;
  if (ds?.livingArea) {
    facts.push({ key: 'living', label: 'Wohnfläche', value: `${ds.livingArea} m²`, numeric: ds.livingArea, suffix: ' m²' });
  }
  if (ds?.plotArea) {
    facts.push({ key: 'plot', label: 'Grundstück', value: `${ds.plotArea} m²`, numeric: ds.plotArea, suffix: ' m²' });
  }
  if (ds?.rooms) {
    facts.push({ key: 'rooms', label: 'Zimmer', value: String(ds.rooms), numeric: ds.rooms });
  }
  if (ds?.bathrooms) {
    facts.push({ key: 'baths', label: 'Badezimmer', value: String(ds.bathrooms), numeric: ds.bathrooms });
  }
  if (property.buildYear && /^\d{4}$/.test(property.buildYear)) {
    facts.push({ key: 'year', label: 'Baujahr', value: property.buildYear, numeric: Number(property.buildYear) });
  }
  return facts;
}

const SECTION_DE: Record<string, string> = {
  Overview: 'Überblick',
  Price: 'Preis & Kosten',
  Areas: 'Flächen',
  Rooms: 'Räume',
  Building: 'Gebäude',
  Energy: 'Energie & Heizung',
  Location: 'Lage',
  Description: 'Beschreibung',
  Other: 'Weitere Angaben',
};
function sectionTitleDe(name: string): string {
  return SECTION_DE[name] ?? name;
}

export default function PropertyShowcase({
  property,
  sections,
  related,
}: {
  property: Property;
  sections: PublicPropertyView['sections'];
  related: Property[];
}) {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [showBar, setShowBar] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setShowBar(v > 0.85));

  const heroImage = property.galleryImages?.[0] ?? property.imageSrc;
  const galleryImages = property.galleryImages ?? [];
  const keyFacts = buildKeyFacts(property);
  const longStory = (property.description?.length ?? 0) > 900;
  const inquiryHref = `/property-inquiry?property=${encodeURIComponent(property.id)}&title=${encodeURIComponent(
    property.title || property.type,
  )}`;

  return (
    <main className={styles.page}>
      {/* ── Sticky bar ── */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            className={styles.stickyBar}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className={styles.stickyInner}>
              <span className={styles.stickyTitle}>{property.title || property.type}</span>
              <div className={styles.stickyRight}>
                <span className={styles.stickyPrice}>{property.price}</span>
                <Link href={inquiryHref} className={`${styles.btn} ${styles.btnSm} ${styles.btnSolid}`}>
                  Anfragen
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ── */}
      <header className={styles.hero} ref={heroRef}>
        <Navbar invertOnLoad />
        <Link href="/properties" className={styles.heroBack}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Alle Immobilien
        </Link>

        <motion.div className={styles.heroBgWrap} style={reduce ? undefined : { y: bgY, scale: bgScale }}>
          <Image src={heroImage} alt={property.title || property.type} fill priority className={styles.heroBg} sizes="100vw" />
        </motion.div>
        <div className={styles.heroOverlay} />

        <motion.div className={styles.heroInner} style={reduce ? undefined : { opacity: fade }}>
          <Reveal y={14} blur={4}>
            <span className={styles.eyebrow} style={{ color: 'var(--bronze)' }}>
              {[property.transactionType === 'Rent' ? 'Zu vermieten' : property.transactionType === 'Buy' ? 'Zu verkaufen' : null, property.location?.split(',').pop()?.trim()]
                .filter(Boolean)
                .join(' · ') || 'Immobilie'}
            </span>
          </Reveal>
          <h1 className={styles.heroTitle}>
            <SplitText text={property.title || property.type} />
          </h1>
          <div className={styles.heroFacts}>
            <span className={styles.heroPrice}>{property.price}</span>
            {property.livingArea && (
              <span className={styles.heroPill}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M21 3 3 21M21 9V3h-6M3 15v6h6" /></svg>
                {property.livingArea}
              </span>
            )}
            {property.rooms && (
              <span className={styles.heroPill}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 21V7l9-4 9 4v14M3 21h18" /></svg>
                {property.rooms} Zimmer
              </span>
            )}
          </div>
          <div className={styles.heroCtaRow}>
            <Magnetic>
              <Link href={inquiryHref} className={`${styles.btn} ${styles.btnOnDark}`}>
                Anfrage senden
                <ArrowUpRight />
              </Link>
            </Magnetic>
          </div>
        </motion.div>

        <motion.span
          className={styles.scrollCue}
          style={reduce ? undefined : { opacity: fade }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
      </header>

      {/* ── Key facts ── */}
      {keyFacts.length > 0 && (
        <section className={`${styles.section} ${styles.sectionNavy}`}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <Reveal y={16}>
                <span className={styles.eyebrow}>Auf einen Blick</span>
              </Reveal>
            </div>
            <Stagger className={styles.facts}>
              {keyFacts.map((f) => (
                <StaggerItem key={f.key} className={styles.factCell}>
                  <div className={styles.factNum}>
                    {f.numeric !== undefined ? <CountUp value={f.numeric} suffix={f.suffix ?? ''} /> : f.value}
                  </div>
                  <div className={styles.factLabel}>{f.label}</div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── Gallery ── */}
      {galleryImages.length > 0 && (
        <PropertyImageGallery images={galleryImages} title={property.title || property.type} />
      )}

      {/* ── Story ── */}
      {property.description && (
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.story}>
              <div className={styles.storyAside}>
                <Reveal y={16}>
                  <span className={styles.eyebrow}>Die Immobilie</span>
                  <h2 className={styles.sectionTitle} style={{ marginTop: '1rem' }}>
                    <SplitText text="Über dieses" />
                    <br />
                    <SplitText text="Objekt." delay={0.1} />
                  </h2>
                </Reveal>
              </div>
              <div>
                <Reveal y={24}>
                  <div className={longStory && !expanded ? `${styles.storyText} ${styles.storyClamp}` : styles.storyText}>
                    {property.description}
                  </div>
                  {longStory && (
                    <button className={styles.moreBtn} onClick={() => setExpanded((v) => !v)}>
                      {expanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}
                    </button>
                  )}
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Detail sections (curated) ── */}
      {sections.length > 0 && (
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <Reveal y={16}>
                <span className={styles.eyebrow}>Details</span>
                <h2 className={styles.sectionTitle} style={{ marginTop: '1rem' }}>
                  Alle Angaben
                </h2>
              </Reveal>
            </div>
            <div className={styles.detailBlocks}>
              {sections.map((section) => {
                const shortFields = section.fields.filter((f) => f.value.length <= 60);
                const longFields = section.fields.filter((f) => f.value.length > 60);
                return (
                  <Reveal y={24} key={section.name} className={styles.detailBlock}>
                    <h3 className={styles.detailBlockTitle}>{sectionTitleDe(section.name)}</h3>
                    {shortFields.length > 0 && (
                      <div className={styles.detailGrid}>
                        {shortFields.map((f) => (
                          <div className={styles.detailItem} key={f.key}>
                            <div className={styles.detailItemLabel}>{f.label}</div>
                            <div className={styles.detailItemValue}>{f.value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {longFields.map((f) => (
                      <div key={f.key} style={{ marginTop: shortFields.length ? '1.5rem' : 0 }}>
                        <div className={styles.detailItemLabel} style={{ marginBottom: '0.4rem' }}>
                          {f.label}
                        </div>
                        <p className={styles.detailProse}>{f.value}</p>
                      </div>
                    ))}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Amenities ── */}
      {property.amenities && property.amenities.length > 0 && (
        <section className={styles.section} style={{ background: '#f4f0e8' }}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <Reveal y={16}>
                <span className={styles.eyebrow}>Ausstattung</span>
                <h2 className={styles.sectionTitle} style={{ marginTop: '1rem' }}>
                  <SplitText text="Was dieses Zuhause" />
                  <br />
                  <SplitText text="auszeichnet." delay={0.1} />
                </h2>
              </Reveal>
            </div>
            <Stagger className={styles.amenities}>
              {property.amenities.map((a, i) => (
                <StaggerItem key={i} className={styles.amenity}>
                  <Check />
                  {a}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── Energy ── */}
      {property.energy && (
        <section className={`${styles.section} ${styles.sectionNavy}`}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <Reveal y={16}>
                <span className={styles.eyebrow}>Energie</span>
                <h2 className={styles.sectionTitle} style={{ marginTop: '1rem' }}>
                  Energieausweis
                </h2>
              </Reveal>
            </div>
            <Reveal y={24}>
              <div className={styles.energyGrid}>
                {property.energy.energyPassType && (
                  <div className={styles.energyCell}>
                    <div className={styles.energyLabel}>Ausweistyp</div>
                    <div className={styles.energyValue}>{property.energy.energyPassType}</div>
                  </div>
                )}
                {property.energy.energyConsumption && (
                  <div className={styles.energyCell}>
                    <div className={styles.energyLabel}>Verbrauch</div>
                    <div className={styles.energyValue}>{property.energy.energyConsumption}</div>
                  </div>
                )}
                {property.energy.energyEfficiencyClass && (
                  <div className={styles.energyCell}>
                    <div className={styles.energyLabel}>Effizienzklasse</div>
                    <span className={styles.energyClass}>{property.energy.energyEfficiencyClass}</span>
                  </div>
                )}
                {property.energy.heatingType && (
                  <div className={styles.energyCell}>
                    <div className={styles.energyLabel}>Heizung</div>
                    <div className={styles.energyValue}>{property.energy.heatingType}</div>
                  </div>
                )}
                {property.energy.firing && (
                  <div className={styles.energyCell}>
                    <div className={styles.energyLabel}>Energieträger</div>
                    <div className={styles.energyValue}>{property.energy.firing}</div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Location ── */}
      {(property.locationData?.coordinates || property.location) && (
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <Reveal y={16}>
                <span className={styles.eyebrow}>Standort</span>
                <h2 className={styles.sectionTitle} style={{ marginTop: '1rem' }}>
                  {property.location?.split(',').pop()?.trim() ?? 'Lage'}
                </h2>
                {property.location && (
                  <p className={styles.detailProse} style={{ marginTop: '0.5rem' }}>{property.location}</p>
                )}
              </Reveal>
            </div>
            <Reveal y={24}>
              <div className={styles.mapWrap}>
                {property.locationData?.coordinates ? (
                  <iframe
                    title="Karte"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${property.locationData.coordinates[0]},${property.locationData.coordinates[1]}&z=14&output=embed`}
                  />
                ) : (
                  <div className={styles.mapPlaceholder}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Genaue Lage auf Anfrage</span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Enquiry CTA (links to the /property-inquiry modal) ── */}
      <section className={styles.section} id="enquiry" style={{ scrollMarginTop: '90px' }}>
        <div className={styles.wrap}>
          <Reveal y={36} className={styles.enquiryCard}>
            <div>
              <span className={styles.eyebrow}>Kontakt</span>
              <h2 className={styles.sectionTitle} style={{ marginTop: '0.9rem' }}>
                Diese Immobilie anfragen.
              </h2>
              <p className={styles.enquiryLead}>
                Wir melden uns diskret innerhalb von 24&nbsp;Stunden mit Details, Unterlagen und
                Terminvorschlägen für eine Besichtigung.
              </p>
              <div className={styles.enquiryRef}>
                <strong>Objekt:</strong> {property.title || property.type}
                <br />
                <strong>Referenz:</strong> {property.id}
              </div>
            </div>
            <Magnetic>
              <Link href={inquiryHref} className={`${styles.btn} ${styles.btnSolid}`}>
                Anfrage senden
                <ArrowUpRight />
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ── More residences ── */}
      {related.length > 0 && (
        <section className={styles.section} style={{ background: '#f4f0e8' }}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <Reveal y={16}>
                <span className={styles.eyebrow}>Weiter stöbern</span>
                <h2 className={styles.sectionTitle} style={{ marginTop: '1rem' }}>
                  Weitere Residenzen
                </h2>
              </Reveal>
            </div>
            <div className={styles.rail}>
              {related.map((r, i) => (
                <Reveal y={24} delay={Math.min(i, 4) * 0.06} key={r.id} className={styles.railItem}>
                  <PropertyCollectionCard property={r} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
