"use client";

import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export interface ExploreProperty {
  id: number;
  slug: string;
  type: string;
  city: string;
  price: string;
  rooms: number;
  bathrooms: number;
  sqm: number;
  image: string;
}

export default function ExploreSection({ properties }: { properties: ExploreProperty[] }) {
  const t = useTranslations('home.explore');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: t('filters.all') },
    { id: 'Villa', label: t('filters.villas') },
    { id: 'Penthouse', label: t('filters.penthouses') },
    { id: 'Apartment', label: t('filters.apartments') },
    { id: 'House', label: 'Houses' },
  ];

  const filteredProperties = activeFilter === 'all' 
    ? properties 
    : properties.filter(p => p.type === activeFilter);

  return (
    <section className="explore-section">
      <div className="explore-container">
        
        {/* Top Header */}
        <div className="explore-header">
          <div className="explore-header-left reveal">
            <div className="explore-subtitle">
              <span className="dot"></span> {t('tag')}
            </div>
            <h2 className="explore-headline">
              {t('headline')} <br /><span className="italic-serif">{t('headlineSerif')}</span>
            </h2>
          </div>
          
          <div className="explore-header-right reveal stagger-1">
            <p className="explore-subhead">
              {t('subhead')}
            </p>
            <Link href="/properties" className="explore-btn explore-btn-dark">
              {t('btn')}
              <div className="explore-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="explore-filters reveal stagger-2">
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
        
        {/* Bottom Functional Grid */}
        <div className="explore-grid reveal stagger-3">
          {filteredProperties.slice(0, 4).map((p, idx) => (
            <PropertyCard 
              key={p.id}
              slug={p.slug}
              imageSrc={p.image}
              type={p.type}
              price={p.price}
              location={p.city}
              specs={`${p.rooms} Beds • ${p.bathrooms} Baths • ${p.sqm} m²`}
              className={`stagger-${idx}`}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}
