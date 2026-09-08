"use client";

import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { Property, mockProperties } from '../data/properties';

export default function ExploreSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1);
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  // ── Fetch from onOffice API (with mock fallback) ───────────────────────────
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/properties')
      .then((res) => res.ok ? res.json() as Promise<Property[]> : Promise.resolve([]))
      .then((data) => {
        if (!cancelled) {
          if (Array.isArray(data) && data.length > 0) {
            setProperties(data);
          } else {
            setProperties(mockProperties);
          }
        }
      })
      .catch(() => { if (!cancelled) setProperties(mockProperties); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  const filters = [
    { id: 'all',         label: t.explore.filters.all },
    { id: 'villas',      label: t.explore.filters.villas },
    { id: 'penthouses',  label: t.explore.filters.penthouses },
    { id: 'historic',    label: t.explore.filters.historic },
    { id: 'apartments',  label: t.explore.filters.apartments },
    { id: 'waterfront',  label: t.explore.filters.waterfront },
    { id: 'offMarket',   label: t.explore.filters.offMarket },
  ];

  const filteredProperties = properties.filter(prop => {
    if (activeFilter === 'all')        return true;
    if (activeFilter === 'villas')     return prop.type.toLowerCase().includes('villa');
    if (activeFilter === 'penthouses') return prop.type.toLowerCase().includes('penthouse');
    if (activeFilter === 'historic')   return prop.type.toLowerCase().includes('historic') || prop.type.toLowerCase().includes('wilhelmin');
    if (activeFilter === 'apartments') return prop.type.toLowerCase().includes('apartment') || prop.type.toLowerCase().includes('wohn');
    if (activeFilter === 'waterfront') return prop.type.toLowerCase().includes('waterfront') || prop.type.toLowerCase().includes('see');
    if (activeFilter === 'offMarket')  return prop.type.toLowerCase().includes('mansion') || prop.type.toLowerCase().includes('estate') || prop.type.toLowerCase().includes('mehrfamilien');
    return true;
  }).slice(0, 4);

  return (
    <section className="explore-section" ref={sectionRef}>
      <div className="explore-container">

        {/* Top Header */}
        <div className="explore-header">
          <div className={`explore-header-left reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
            <div className="explore-subtitle">
              <span className="dot"></span> {t.explore.tag}
            </div>
            <h2 className="explore-headline">
              {t.explore.headline} <br /><span className="italic-serif">{t.explore.headlineSerif}</span>
            </h2>
          </div>

          <div className={`explore-header-right reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
            <p className="explore-subhead">
              {t.explore.subhead}
            </p>
            <a href="/properties" className="explore-btn explore-btn-dark">
              {t.explore.btn}
              <div className="explore-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="explore-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-pill ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="explore-grid">
          {loading ? (
            [1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="property-card"
                style={{
                  minHeight: 280,
                  background: 'var(--cream-dark, #e8e0d5)',
                  borderRadius: 12,
                  opacity: 0.4,
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            ))
          ) : filteredProperties.length === 0 ? (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.5, padding: '2rem' }}>
              Keine Immobilien in dieser Kategorie gefunden.
            </p>
          ) : (
            filteredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                id={prop.id}
                imageSrc={prop.imageSrc}
                type={prop.type}
                price={prop.price}
                location={prop.location}
                specs={prop.specs}
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
}
