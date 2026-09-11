"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import PropertyCard from './PropertyCard';
import RevealCard from './RevealCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { Property, mockProperties } from '../data/properties';

export default function PropertiesGrid() {
  const { ref: gridRef, isVisible } = useScrollReveal(0);
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // ── Fetch from onOffice API (with fallback) ────────────────────────────────
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [loading, setLoading]       = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setFetchError(null);

    fetch('/api/properties')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Property[]>;
      })
      .then((data) => {
        if (!cancelled) {
          if (Array.isArray(data) && data.length > 0) {
            setProperties(data);
          } else {
            setProperties(mockProperties);
          }
        }
      })
      .catch((_err: Error) => {
        if (!cancelled) {
          setProperties(mockProperties);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const searchParams   = useSearchParams();
  const router         = useRouter();
  const pathname       = usePathname();
  const dealParam      = searchParams.get('deal') || 'all'; // 'all' | 'Buy' | 'Rent'

  const setDealFilter = (deal: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (deal === 'all') params.delete('deal');
    else params.set('deal', deal);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const locationParam  = searchParams.get('location')?.toLowerCase() || '';
  const typeParam      = searchParams.get('type') || '';
  const bedsParam      = searchParams.get('beds') || '';
  const minPriceParam  = parseInt(searchParams.get('minPrice') || '0', 10);
  const maxPriceParam  = parseInt(searchParams.get('maxPrice') || '0', 10);
  const minSqmParam    = parseInt(searchParams.get('minSqm') || '0', 10);
  const maxSqmParam    = parseInt(searchParams.get('maxSqm') || '0', 10);

  // Filter properties
  const filteredProperties = properties.filter(prop => {
    if (dealParam !== 'all' && prop.transactionType && prop.transactionType !== dealParam) return false;
    if (locationParam && !prop.location.toLowerCase().includes(locationParam)) return false;
    if (typeParam && typeParam !== 'Any') {
      if (!prop.type.toLowerCase().includes(typeParam.toLowerCase())) return false;
    }
    if (bedsParam && bedsParam !== 'Any') {
      const bedsMatch = prop.specs.match(/(\d+)\s*(Beds?|Zimmer)/i);
      if (bedsMatch) {
        const beds    = parseInt(bedsMatch[1], 10);
        const reqBeds = parseInt(bedsParam.replace('+', ''), 10);
        if (beds < reqBeds) return false;
      }
    }
    if (minPriceParam > 0 || maxPriceParam > 0) {
      const priceNum = parseInt(prop.price.replace(/[^\d]/g, ''), 10);
      if (minPriceParam > 0 && priceNum < minPriceParam) return false;
      if (maxPriceParam > 0 && priceNum > maxPriceParam) return false;
    }
    if (minSqmParam > 0 || maxSqmParam > 0) {
      const sqmMatch = prop.specs.match(/(\d+(?:,\d+)?)\s*m²/i);
      if (sqmMatch) {
        const sqm = parseInt(sqmMatch[1].replace(',', ''), 10);
        if (minSqmParam > 0 && sqm < minSqmParam) return false;
        if (maxSqmParam > 0 && sqm > maxSqmParam) return false;
      }
    }
    return true;
  });

  // Reset to page 1 if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  const totalPages        = Math.ceil(filteredProperties.length / itemsPerPage) || 1;
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridRef.current) {
      window.scrollTo({
        top: (gridRef.current as HTMLElement).offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  // ── Loading skeleton ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="properties-grid-section" ref={gridRef}>
        <div className="explore-container">
          <div className="explore-grid properties-main-grid">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="property-card"
                style={{
                  minHeight: 340,
                  background: 'var(--cream-dark, #e8e0d5)',
                  borderRadius: 12,
                  opacity: 0.5,
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <section className="properties-grid-section" ref={gridRef}>
        <div className="explore-container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <p style={{ color: 'var(--charcoal)', opacity: 0.6 }}>
            Die Immobilien konnten leider nicht geladen werden. Bitte versuchen Sie es sp&auml;ter erneut.
          </p>
          <small style={{ opacity: 0.4 }}>{fetchError}</small>
        </div>
      </section>
    );
  }

  return (
    <section className="properties-grid-section" ref={gridRef}>
      <div className="explore-container">

        {/* Quick deal filter */}
        <div className={`deal-filter-row reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
          {[
            { key: 'all', label: t.propertiesPage.filterAll },
            { key: 'Buy', label: t.propertiesPage.filterBuy },
            { key: 'Rent', label: t.propertiesPage.filterRent },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`deal-filter-tab ${dealParam === tab.key ? 'active' : ''}`}
              onClick={() => setDealFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className={`properties-results-header reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
          <div className="results-count">
            {filteredProperties.length === 0 ? '0 Results' : t.propertiesPage.resultsCount
              .replace('{start}', ((currentPage - 1) * itemsPerPage + 1).toString())
              .replace('{end}', Math.min(currentPage * itemsPerPage, filteredProperties.length).toString())
              .replace('{total}', filteredProperties.length.toString())}
          </div>

          <div className="results-controls">
            {totalPages > 1 && (
              <div className="top-pagination">
                <button
                  className="top-page-arrow"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <span className="top-page-indicator">{currentPage} / {totalPages}</span>
                <button
                  className="top-page-arrow"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            )}

            <div className="results-sort">
              <span className="sort-label">{t.propertiesPage.sortBy}:</span>
              <select className="sort-select">
                <option>{t.propertiesPage.sortNewest}</option>
                <option>{t.propertiesPage.sortPriceHigh}</option>
                <option>{t.propertiesPage.sortPriceLow}</option>
              </select>
            </div>

            <div className="results-view-toggles">
              <button
                className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`explore-grid properties-main-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
          {currentProperties.map((prop, index) => (
            <RevealCard key={prop.id} delay={Math.min(index, 7) * 90}>
              <PropertyCard
                id={prop.id}
                imageSrc={prop.imageSrc}
                type={prop.type}
                title={prop.title}
                summary={prop.summary}
                status={prop.status}
                transactionType={prop.transactionType}
                price={prop.price}
                location={prop.location}
                specs={prop.specs}
                detailedSpecs={prop.detailedSpecs}
                galleryImages={prop.galleryImages}
              />
            </RevealCard>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-container reveal-base reveal-up delay-300 is-revealed">
            <div className="pagination-pill">
              <button
                className="page-arrow"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                <span>Previous</span>
              </button>

              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    className={`page-number ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                className="page-arrow"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <span>Next</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
