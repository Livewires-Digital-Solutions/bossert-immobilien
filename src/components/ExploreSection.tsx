"use client";

import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import { useSectionReveal } from '../hooks/useSectionReveal';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function ExploreSection({ properties }: { properties: any[] }) {
  const { ref: sectionRef, isVisible } = useSectionReveal(0.1);
  const t = useTranslations('Designer');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: t('explore.filters.all') },
    { id: 'villas', label: t('explore.filters.villas') },
    { id: 'penthouses', label: t('explore.filters.penthouses') },
    { id: 'historic', label: t('explore.filters.historic') },
    { id: 'apartments', label: t('explore.filters.apartments') },
    { id: 'waterfront', label: t('explore.filters.waterfront') },
    { id: 'offMarket', label: t('explore.filters.offMarket') },
  ];

  return (
    <section className="explore-section" ref={sectionRef}>
      <div className="explore-container">
        
        {/* Top Header */}
        <div className="explore-header">
          <div className={`explore-header-left reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
            <div className="explore-subtitle">
              <span className="dot"></span> {t('explore.tag')}
            </div>
            <h2 className="explore-headline">
              {t('explore.headline')} <br /><span className="italic-serif">{t('explore.headlineSerif')}</span>
            </h2>
          </div>
          
          <div className={`explore-header-right reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
            <p className="explore-subhead">
              {t('explore.subhead')}
            </p>
            <Link href="/properties" className="explore-btn explore-btn-dark">
              {t('explore.btn')}
              <div className="explore-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </Link>
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
        
        {/* Bottom Functional Grid */}
        <div className="explore-grid">
          {properties.map((prop) => {
             const imageSrc = prop.images && prop.images.length > 0 ? prop.images[0].url : "/images/prop_apartment_new.jpg";
             return (
               <PropertyCard 
                 key={prop.id}
                 slug={prop.slug}
                 imageSrc={imageSrc}
                 type={prop.type}
                 price={prop.price}
                 location={prop.city}
                 specs={`${prop.rooms} Beds • ${prop.bathrooms} Baths • ${prop.sqm} m²`}
               />
             )
          })}
        </div>
        
      </div>
    </section>
  );
}
