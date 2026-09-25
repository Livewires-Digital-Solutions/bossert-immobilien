"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

function IconHouse({ className = 'filter-icon' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconKey({ className = 'filter-icon' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="15" r="4" />
      <line x1="10.5" y1="12.5" x2="21" y2="2" />
      <line x1="16" y1="7" x2="19" y2="4" />
      <line x1="18.5" y1="9.5" x2="21.5" y2="6.5" />
    </svg>
  );
}

function IconChart({ className = 'filter-icon' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="18" y1="20" x2="18" y2="10" />
    </svg>
  );
}

function IconPin({ className = 'filter-icon' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconBed({ className = 'filter-icon' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
    </svg>
  );
}

function IconCalendar({ className = 'filter-icon' }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconCrosshair({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function IconSliders({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function IconChevron({ up, className = 'search-chevron' }: { up?: boolean; className?: string }) {
  return (
    <svg className={`${className} ${up ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function SearchSection({ hideHeader = false, isDarkBg = false, hideResultsCount = false, embedded = false }: { hideHeader?: boolean, isDarkBg?: boolean, hideResultsCount?: boolean, embedded?: boolean }) {
  const { t } = useLanguage();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [transactionType, setTransactionType] = useState('purchase');
  
  const [propertyType, setPropertyType] = useState('Any');
  const [bedrooms, setBedrooms] = useState('Any');
  const [yearBuilt, setYearBuilt] = useState('Any');
  const [advBathrooms, setAdvBathrooms] = useState('Any');
  const [energyRating, setEnergyRating] = useState('Any');
  const [availability, setAvailability] = useState('Any');
  
  // New States for inputs
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minSqm, setMinSqm] = useState('');
  const [maxSqm, setMaxSqm] = useState('');
  const [minLandArea, setMinLandArea] = useState('');
  const [maxLandArea, setMaxLandArea] = useState('');
  const [features, setFeatures] = useState<string[]>([]);

  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Use the new reusable hook
  const { ref: searchBarRef, isVisible } = useScrollReveal(0.2);

  // The mobile advanced-search overlay is portaled to document.body (see
  // below) so its position:fixed backdrop isn't scoped to .search-container,
  // which gets a CSS transform from the reveal-on-scroll animation classes —
  // an element with a transform becomes the containing block for its fixed-
  // position descendants, which would otherwise clip the backdrop to the
  // search section instead of the full viewport. Portals need a mounted
  // check to avoid an SSR/client markup mismatch (document isn't available
  // during server render).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Close dropdowns if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest('.search-filter') && !target.closest('.adv-filter-box') && !target.closest('.mobile-adv-block') && !target.closest('.search-field-box')) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // On mobile, the advanced-search panel renders as a full-screen overlay
  // (see .mobile-adv-overlay below) instead of the inline desktop panel, so
  // lock body scroll + support Escape-to-close only while that overlay is
  // actually the thing on screen (narrow viewport).
  useEffect(() => {
    const isMobileViewport = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    if (!isAdvancedOpen || !isMobileViewport) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsAdvancedOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isAdvancedOpen]);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleSelect = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setActiveDropdown(null);
  };

  const handleReset = () => {
    setPropertyType('Any');
    setBedrooms('Any');
    setYearBuilt('Any');
    setAdvBathrooms('Any');
    setEnergyRating('Any');
    setAvailability('Any');
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setMinSqm('');
    setMaxSqm('');
    setMinLandArea('');
    setMaxLandArea('');
    setFeatures([]);
  };

  const handleFeatureToggle = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (transactionType !== 'purchase') params.set('transaction', transactionType);
    if (location) params.set('location', location);
    if (propertyType !== 'Any') params.set('type', propertyType);
    if (bedrooms !== 'Any') params.set('beds', bedrooms);
    if (yearBuilt !== 'Any') params.set('year', yearBuilt);
    
    if (isAdvancedOpen) {
      if (minPrice) params.set('minPrice', minPrice);
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (minSqm) params.set('minSqm', minSqm);
      if (maxSqm) params.set('maxSqm', maxSqm);
      if (minLandArea) params.set('minLandArea', minLandArea);
      if (maxLandArea) params.set('maxLandArea', maxLandArea);
      if (advBathrooms !== 'Any') params.set('baths', advBathrooms);
      if (energyRating !== 'Any') params.set('energy', energyRating);
      if (availability !== 'Any') params.set('availability', availability);
      if (features.length > 0) params.set('features', features.join(','));
    }

    router.push('/properties?' + params.toString());
  };

  const Tag = embedded ? 'div' : 'section';

  // Icon-tile checkboxes in the mobile advanced-search overlay (Key Features
  // section) — same 6 features/icons as the desktop .adv-checkboxes list.
  const mobileFeatureOptions: { key: string; label: string; icon: React.ReactNode }[] = [
    { key: 'balcony', label: t.search.filters.balcony, icon: (<><rect x="3" y="14" width="18" height="8" rx="2" ry="2"></rect><path d="M3 14h18M5 14v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"></path></>) },
    { key: 'garden', label: t.search.filters.garden, icon: (<path d="M11 20A7 7 0 0 1 14 6h7v7a7 7 0 0 1-10 7z"></path>) },
    { key: 'garage', label: t.search.filters.garage, icon: (<path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM5 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"></path>) },
    { key: 'terrace', label: t.search.filters.terrace, icon: (<path d="M2 22h20M12 2v20M6 10c0-4 3-8 6-8s6 4 6 8"></path>) },
    { key: 'elevator', label: t.search.filters.elevator, icon: (<><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><polyline points="12 6 12 18"></polyline><polyline points="9 9 12 6 15 9"></polyline><polyline points="9 15 12 18 15 15"></polyline></>) },
    { key: 'fireplace', label: t.search.filters.fireplace, icon: (<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>) },
  ];

  return (
    <Tag className={`search-section ${isDarkBg ? 'search-section-dark' : ''} ${embedded ? 'search-section-embedded' : ''}`}>
      <div className={`search-container reveal-base reveal-scale ${isVisible ? 'is-revealed' : ''}`} ref={(el) => {
        searchBarRef.current = el;
        if (el) containerRef.current = el;
      }}>
        
        {!hideHeader && (
          <div className="search-header">
            <div className="search-eyebrow">
              <span className="search-eyebrow-line"></span>
              <span className="search-eyebrow-text">{t.search.tag || 'PREMIUM LIVING'}</span>
              <span className="search-eyebrow-line"></span>
            </div>
            <h2 className="search-title">{t.search.headline}</h2>
            <p className="search-subhead">{t.search.subhead}</p>
          </div>
        )}

        {embedded ? (
          /* Card-style search widget (home page). Deliberate exception to the
             site's usual sharp-corner rule — rounded corners here match a
             client-provided reference design for this widget specifically. */
          <div className="search-card">
            <div className="search-card-tabs">
              <button
                type="button"
                className={`search-card-tab ${transactionType === 'purchase' ? 'active' : ''}`}
                onClick={() => setTransactionType('purchase')}
              >
                <IconHouse className="" />
                <span>{t.search.purchase}</span>
              </button>
              <button
                type="button"
                className={`search-card-tab ${transactionType === 'rent' ? 'active' : ''}`}
                onClick={() => setTransactionType('rent')}
              >
                <IconKey className="" />
                <span>{t.search.rent}</span>
              </button>
              <button
                type="button"
                className={`search-card-tab ${transactionType === 'investment' ? 'active' : ''}`}
                onClick={() => setTransactionType('investment')}
              >
                <IconChart className="" />
                <span>{t.search.investment}</span>
              </button>
            </div>

            {/* Location */}
            <div className="search-card-location">
              <IconPin />
              <div className="filter-text-col">
                <span className="filter-label">{t.search.location}</span>
                <input
                  type="text"
                  placeholder={t.search.placeholder}
                  className="search-input"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="search-card-location-divider"></div>
              <button type="button" className="locate-me-btn" aria-label="Use my current location">
                <IconCrosshair />
              </button>
            </div>

            <div className="search-card-grid">
              {/* Property Type */}
              <div className="search-field-box clickable" onClick={() => toggleDropdown('propertyType')}>
                <div className="filter-inner">
                  <IconHouse />
                  <div className="filter-text-col">
                    <span className="filter-label">{t.search.type}</span>
                    <div className="filter-value-row">
                      <span className="search-value">{propertyType}</span>
                      <IconChevron up={activeDropdown === 'propertyType'} />
                    </div>
                  </div>
                </div>
                {activeDropdown === 'propertyType' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <div className="dropdown-item" onClick={() => handleSelect(setPropertyType, 'Any')}>Any</div>
                    <div className="dropdown-header">House</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Bungalow')}>Bungalow</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Semi-detached house')}>Semi-detached house</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Single-family house')}>Single-family house</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'End-of-terrace house')}>End-of-terrace house</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Terraced house')}>Terraced house</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Two-family house')}>Two-family house</div>
                    <div className="dropdown-header">Apartment</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Penthouse apartment')}>Penthouse apartment</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Apartment')}>Apartment</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Maisonette apartment')}>Maisonette apartment</div>
                  </div>
                )}
              </div>

              {/* Bedrooms */}
              <div className="search-field-box clickable" onClick={() => toggleDropdown('bedrooms')}>
                <div className="filter-inner">
                  <IconBed />
                  <div className="filter-text-col">
                    <span className="filter-label">{t.search.bedrooms}</span>
                    <div className="filter-value-row">
                      <span className="search-value">{bedrooms}</span>
                      <IconChevron up={activeDropdown === 'bedrooms'} />
                    </div>
                  </div>
                </div>
                {activeDropdown === 'bedrooms' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {['Any', '1+', '2+', '3+', '4+', '5+', '6+', '7+', '8+'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setBedrooms, val)}>{val}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Year Built */}
              <div className="search-field-box clickable" onClick={() => toggleDropdown('yearBuilt')}>
                <div className="filter-inner">
                  <IconCalendar />
                  <div className="filter-text-col">
                    <span className="filter-label">{t.search.yearBuilt}</span>
                    <div className="filter-value-row">
                      <span className="search-value">{yearBuilt}</span>
                      <IconChevron up={activeDropdown === 'yearBuilt'} />
                    </div>
                  </div>
                </div>
                {activeDropdown === 'yearBuilt' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {['Any year', 'Before 1900', '1900 – 1949', '1950 – 1979', '1980 – 1999', '2000 – 2009', '2010 – 2019', '2020 – 2024', '2025 or newer'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setYearBuilt, val)}>{val}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="search-card-footer">
              <button type="button" className="advanced-search-link" onClick={() => setIsAdvancedOpen(o => !o)}>
                <IconSliders />
                <span>{t.search.advancedBtn}</span>
                <IconChevron up={isAdvancedOpen} />
              </button>
              <button type="button" className="search-card-submit" onClick={handleSearch}>
                <span>{t.search.searchBtn || 'Search'}</span>
                <IconSearch />
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Transaction Type Tabs */}
            <div className="search-tabs-wrapper">
              <div className="search-tabs-container">
                <button
                  type="button"
                  className={`search-tab ${transactionType === 'purchase' ? 'active' : ''}`}
                  onClick={() => setTransactionType('purchase')}
                >
                  {t.search.purchase}
                </button>
                <button
                  type="button"
                  className={`search-tab ${transactionType === 'rent' ? 'active' : ''}`}
                  onClick={() => setTransactionType('rent')}
                >
                  {t.search.rent}
                </button>
                <button
                  type="button"
                  className={`search-tab ${transactionType === 'investment' ? 'active' : ''}`}
                  onClick={() => setTransactionType('investment')}
                >
                  {t.search.investment}
                </button>
              </div>
            </div>

            {/* Main Search Bar */}
            <div className="search-bar">
              {/* Location */}
              <div className="search-filter filter-location">
                <div className="filter-inner">
                  <svg className="filter-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div className="filter-text-col">
                    <span className="filter-label">{t.search.location}</span>
                    <input
                      type="text"
                      placeholder={t.search.placeholder}
                      className="search-input"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                </div>
              </div>

              <div className="search-divider"></div>

              {/* Property Type */}
              <div className="search-filter filter-type clickable" onClick={() => toggleDropdown('propertyType')}>
                <div className="filter-inner">
                  <svg className="filter-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <div className="filter-text-col">
                    <span className="filter-label">{t.search.type}</span>
                    <div className="filter-value-row">
                      <span className="search-value">{propertyType}</span>
                      <svg className={`search-chevron ${activeDropdown === 'propertyType' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                </div>
                {activeDropdown === 'propertyType' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <div className="dropdown-item" onClick={() => handleSelect(setPropertyType, 'Any')}>Any</div>
                    <div className="dropdown-header">House</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Bungalow')}>Bungalow</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Semi-detached house')}>Semi-detached house</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Single-family house')}>Single-family house</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'End-of-terrace house')}>End-of-terrace house</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Terraced house')}>Terraced house</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Two-family house')}>Two-family house</div>
                    <div className="dropdown-header">Apartment</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Penthouse apartment')}>Penthouse apartment</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Apartment')}>Apartment</div>
                    <div className="dropdown-item sub-item" onClick={() => handleSelect(setPropertyType, 'Maisonette apartment')}>Maisonette apartment</div>
                  </div>
                )}
              </div>

              <div className="search-divider"></div>

              {/* Bedrooms */}
              <div className="search-filter filter-bedrooms clickable" onClick={() => toggleDropdown('bedrooms')}>
                <div className="filter-inner">
                  <svg className="filter-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
                  </svg>
                  <div className="filter-text-col">
                    <span className="filter-label">{t.search.bedrooms}</span>
                    <div className="filter-value-row">
                      <span className="search-value">{bedrooms}</span>
                      <svg className={`search-chevron ${activeDropdown === 'bedrooms' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                </div>
                {activeDropdown === 'bedrooms' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {['Any', '1+', '2+', '3+', '4+', '5+', '6+', '7+', '8+'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setBedrooms, val)}>{val}</div>
                    ))}
                  </div>
                )}
              </div>

              <div className="search-divider"></div>

              {/* Year Built */}
              <div className="search-filter filter-year clickable" onClick={() => toggleDropdown('yearBuilt')}>
                <div className="filter-inner">
                  <svg className="filter-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <div className="filter-text-col">
                    <span className="filter-label">{t.search.yearBuilt}</span>
                    <div className="filter-value-row">
                      <span className="search-value">{yearBuilt}</span>
                      <svg className={`search-chevron ${activeDropdown === 'yearBuilt' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                </div>
                {activeDropdown === 'yearBuilt' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {['Any year', 'Before 1900', '1900 – 1949', '1950 – 1979', '1980 – 1999', '2000 – 2009', '2010 – 2019', '2020 – 2024', '2025 or newer'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setYearBuilt, val)}>{val}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button type="button" className="search-submit-btn" onClick={handleSearch}>
                <span>{t.search.searchBtn || 'Search'}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>

            {/* Controls Row Below Search Bar */}
            <div className="search-sub-row">
              <label className="advanced-search-checkbox" htmlFor="advancedSearch">
                <input
                  type="checkbox"
                  id="advancedSearch"
                  className="custom-checkbox"
                  checked={isAdvancedOpen}
                  onChange={(e) => setIsAdvancedOpen(e.target.checked)}
                />
                <span>{t.search.advancedBtn}</span>
              </label>
            </div>
          </>
        )}

        {/* Expandable Advanced Area */}
        <div className={`advanced-filters-wrapper ${isAdvancedOpen ? 'open' : ''}`}>
          <div className="advanced-filters-content">
            
            {/* Top Grid: Ranges and Dropdowns */}
            <div className="adv-grid-top">
              <div className="adv-filter-box">
                <div className="adv-label">{t.search.price}</div>
                <div className="adv-input-group">
                  <input type="number" min="0" placeholder={t.search.filters.minPrice} value={minPrice} onChange={e => setMinPrice(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                  <span>{t.search.to}</span>
                  <input type="number" min="0" placeholder={t.search.filters.maxPrice} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                </div>
              </div>
              <div className="adv-filter-box">
                <div className="adv-label">{t.search.size}</div>
                <div className="adv-input-group">
                  <input type="number" min="0" placeholder={t.search.filters.minSqm} value={minSqm} onChange={e => setMinSqm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                  <span>{t.search.to}</span>
                  <input type="number" min="0" placeholder={t.search.filters.maxSqm} value={maxSqm} onChange={e => setMaxSqm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                </div>
              </div>
              <div className="adv-filter-box">
                <div className="adv-label">{t.search.landArea}</div>
                <div className="adv-input-group">
                  <input type="number" min="0" placeholder={t.search.filters.minSqm} value={minLandArea} onChange={e => setMinLandArea(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                  <span>{t.search.to}</span>
                  <input type="number" min="0" placeholder={t.search.filters.maxSqm} value={maxLandArea} onChange={e => setMaxLandArea(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                </div>
              </div>
              <div className="adv-filter-box clickable" onClick={() => toggleDropdown('advBathrooms')}>
                <div className="adv-label">{t.search.bathrooms}</div>
                <div className="adv-dropdown">
                  <span>{advBathrooms === 'Any' ? t.search.any : advBathrooms}</span> 
                  <svg className={`search-chevron ${activeDropdown === 'advBathrooms' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                {activeDropdown === 'advBathrooms' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {['Any', '1+', '2+', '3+', '4+'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setAdvBathrooms, val)}>
                        {val === 'Any' ? t.search.any : val}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="adv-filter-box clickable" onClick={() => toggleDropdown('energyRating')}>
                <div className="adv-label">{t.search.energyRating}</div>
                <div className="adv-dropdown">
                  <span>{energyRating === 'Any' ? t.search.any : energyRating}</span> 
                  <svg className={`search-chevron ${activeDropdown === 'energyRating' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                {activeDropdown === 'energyRating' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {['Any', 'A+', 'A', 'B', 'C', 'D', 'E'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setEnergyRating, val)}>
                        {val === 'Any' ? t.search.any : val}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Grid: Features and Availability */}
            <div className="adv-grid-bottom">
              <div className="adv-features">
                <div className="adv-label">{t.search.features}</div>
                <div className="adv-checkboxes">
                  <label><input type="checkbox" checked={features.includes('balcony')} onChange={() => handleFeatureToggle('balcony')}/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="14" width="18" height="8" rx="2" ry="2"></rect><path d="M3 14h18M5 14v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"></path></svg> {t.search.filters.balcony}</label>
                  <label><input type="checkbox" checked={features.includes('garden')} onChange={() => handleFeatureToggle('garden')}/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 14 6h7v7a7 7 0 0 1-10 7z"></path></svg> {t.search.filters.garden}</label>
                  <label><input type="checkbox" checked={features.includes('garage')} onChange={() => handleFeatureToggle('garage')}/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM5 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"></path></svg> {t.search.filters.garage}</label>
                  <label><input type="checkbox" checked={features.includes('terrace')} onChange={() => handleFeatureToggle('terrace')}/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 22h20M12 2v20M6 10c0-4 3-8 6-8s6 4 6 8"></path></svg> {t.search.filters.terrace}</label>
                  <label><input type="checkbox" checked={features.includes('elevator')} onChange={() => handleFeatureToggle('elevator')}/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><polyline points="12 6 12 18"></polyline><polyline points="9 9 12 6 15 9"></polyline><polyline points="9 15 12 18 15 15"></polyline></svg> {t.search.filters.elevator}</label>
                  <label><input type="checkbox" checked={features.includes('fireplace')} onChange={() => handleFeatureToggle('fireplace')}/> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg> {t.search.filters.fireplace}</label>
                </div>
              </div>

              <div className="adv-filter-box clickable" style={{ maxWidth: '15.625rem' }} onClick={() => toggleDropdown('availability')}>
                <div className="adv-label">{t.search.availability}</div>
                <div className="adv-dropdown">
                  <span>{availability === 'Any' ? t.search.any : availability}</span> 
                  <svg className={`search-chevron ${activeDropdown === 'availability' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                {activeDropdown === 'availability' && (
                  <div className="custom-dropdown-menu align-right" onClick={(e) => e.stopPropagation()}>
                    {['Any', 'Available immediately', 'By agreement', 'Rented', 'Reserved'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setAvailability, val)}>
                        {val === 'Any' ? t.search.any : val}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer row */}
            <div className="adv-footer">
              <button className="adv-reset" onClick={handleReset}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> 
                {t.search.reset}
              </button>
              {!hideResultsCount && <div className="adv-results">{t.search.found}</div>}
              <button className="adv-submit" onClick={handleSearch}>{t.search.show} &rarr;</button>
            </div>

          </div>
        </div>

        {/* Mobile-only Advanced Search overlay — client reference design:
            rounded card, icon-labeled sections, feature checkboxes as icon
            tiles. Renders only below the 768px breakpoint (.mobile-adv-overlay
            in globals.css); desktop keeps the inline panel above. Scoped to
            the embedded (home page) variant only — /properties keeps its
            original inline mobile panel untouched. Portaled to document.body
            — see the `mounted` comment above for why. */}
        {mounted && embedded && createPortal(
        <div className={`mobile-adv-overlay ${isAdvancedOpen ? 'open' : ''}`} onClick={() => setIsAdvancedOpen(false)}>
          <div className="mobile-adv-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={t.search.advancedBtn}>
            <div className="mobile-adv-header">
              <div className="mobile-adv-header-title">
                <span className="mobile-adv-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="21" y1="4" x2="14" y2="4"></line>
                    <line x1="10" y1="4" x2="3" y2="4"></line>
                    <line x1="21" y1="12" x2="12" y2="12"></line>
                    <line x1="8" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="20" x2="16" y2="20"></line>
                    <line x1="12" y1="20" x2="3" y2="20"></line>
                    <line x1="14" y1="2" x2="14" y2="6"></line>
                    <line x1="8" y1="10" x2="8" y2="14"></line>
                    <line x1="16" y1="18" x2="16" y2="22"></line>
                  </svg>
                </span>
                <h3 className="mobile-adv-title">{t.search.advancedBtn}</h3>
              </div>
              <div className="mobile-adv-header-actions">
                <button type="button" className="mobile-adv-reset-btn" onClick={handleReset}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                  {t.search.resetShort}
                </button>
                <span className="mobile-adv-vdivider"></span>
                <button type="button" className="mobile-adv-close-btn" onClick={() => setIsAdvancedOpen(false)} aria-label="Close">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>

            <div className="mobile-adv-body">
              {/* Price Range */}
              <div className="mobile-adv-block">
                <div className="mobile-adv-label accent">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="6" rx="8" ry="3"></ellipse><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"></path><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"></path></svg>
                  {t.search.priceRange}
                </div>
                <div className="mobile-adv-range">
                  <div className="mobile-adv-field">
                    <input type="number" min="0" inputMode="numeric" placeholder={t.search.filters.min} value={minPrice} onChange={e => setMinPrice(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                    <span>€</span>
                  </div>
                  <div className="mobile-adv-field">
                    <input type="number" min="0" inputMode="numeric" placeholder={t.search.filters.max} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                    <span>€</span>
                  </div>
                </div>
              </div>

              {/* Living Area */}
              <div className="mobile-adv-block">
                <div className="mobile-adv-label">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                  {t.search.size}
                </div>
                <div className="mobile-adv-range">
                  <div className="mobile-adv-field">
                    <input type="number" min="0" inputMode="numeric" placeholder={t.search.filters.min} value={minSqm} onChange={e => setMinSqm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                    <span>m²</span>
                  </div>
                  <div className="mobile-adv-field">
                    <input type="number" min="0" inputMode="numeric" placeholder={t.search.filters.max} value={maxSqm} onChange={e => setMaxSqm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                    <span>m²</span>
                  </div>
                </div>
              </div>

              {/* Land Area */}
              <div className="mobile-adv-block">
                <div className="mobile-adv-label">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect></svg>
                  {t.search.landArea}
                </div>
                <div className="mobile-adv-range">
                  <div className="mobile-adv-field">
                    <input type="number" min="0" inputMode="numeric" placeholder={t.search.filters.min} value={minLandArea} onChange={e => setMinLandArea(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                    <span>m²</span>
                  </div>
                  <div className="mobile-adv-field">
                    <input type="number" min="0" inputMode="numeric" placeholder={t.search.filters.max} value={maxLandArea} onChange={e => setMaxLandArea(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                    <span>m²</span>
                  </div>
                </div>
              </div>

              {/* Bathrooms */}
              <div className="mobile-adv-block clickable" onClick={() => toggleDropdown('mobileBathrooms')}>
                <div className="mobile-adv-label">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3z"></path><path d="M4 12V7a2 2 0 0 1 2-2h1"></path><line x1="9" y1="20" x2="9" y2="22"></line><line x1="15" y1="20" x2="15" y2="22"></line></svg>
                  {t.search.bathrooms}
                </div>
                <div className="mobile-adv-select">
                  <span>{advBathrooms === 'Any' ? t.search.any : advBathrooms}</span>
                  <svg className={`search-chevron ${activeDropdown === 'mobileBathrooms' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                {activeDropdown === 'mobileBathrooms' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {['Any', '1+', '2+', '3+', '4+'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setAdvBathrooms, val)}>
                        {val === 'Any' ? t.search.any : val}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Energy Rating */}
              <div className="mobile-adv-block clickable" onClick={() => toggleDropdown('mobileEnergy')}>
                <div className="mobile-adv-label accent">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 14 6h7v7a7 7 0 0 1-10 7z"></path><path d="M4 21c1-4 3-7 7-9"></path></svg>
                  {t.search.energyRating}
                </div>
                <div className="mobile-adv-select">
                  <span>{energyRating === 'Any' ? t.search.any : energyRating}</span>
                  <svg className={`search-chevron ${activeDropdown === 'mobileEnergy' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                {activeDropdown === 'mobileEnergy' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {['Any', 'A+', 'A', 'B', 'C', 'D', 'E'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setEnergyRating, val)}>
                        {val === 'Any' ? t.search.any : val}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mobile-adv-divider"></div>

              {/* Key Features */}
              <div className="mobile-adv-block">
                <div className="mobile-adv-label accent">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  {t.search.features}
                </div>
                <div className="mobile-adv-feature-grid">
                  {mobileFeatureOptions.map(opt => (
                    <label key={opt.key} className={`mobile-adv-feature ${features.includes(opt.key) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={features.includes(opt.key)} onChange={() => handleFeatureToggle(opt.key)} />
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{opt.icon}</svg>
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mobile-adv-divider"></div>

              {/* Availability */}
              <div className="mobile-adv-block clickable" onClick={() => toggleDropdown('mobileAvailability')}>
                <div className="mobile-adv-label">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  {t.search.availability}
                </div>
                <div className="mobile-adv-select">
                  <span>{availability === 'Any' ? t.search.any : availability}</span>
                  <svg className={`search-chevron ${activeDropdown === 'mobileAvailability' ? 'up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                {activeDropdown === 'mobileAvailability' && (
                  <div className="custom-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    {['Any', 'Available immediately', 'By agreement', 'Rented', 'Reserved'].map(val => (
                      <div key={val} className="dropdown-item" onClick={() => handleSelect(setAvailability, val)}>
                        {val === 'Any' ? t.search.any : val}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mobile-adv-footer">
              {!hideResultsCount && (() => {
                const match = t.search.found.match(/^(\d+)(.*)$/);
                return (
                  <div className="mobile-adv-results">
                    {match ? <><strong>{match[1]}</strong>{match[2]}</> : t.search.found}
                  </div>
                );
              })()}
              <button type="button" className="mobile-adv-submit-btn" onClick={() => { handleSearch(); setIsAdvancedOpen(false); }}>
                {t.search.show}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        </div>,
        document.body
        )}

        {!hideHeader && (
          <div className="search-bottom-brand">
            <div className="search-brand-tick"></div>
            <div className="search-brand-slogan">{t.search.slogan || 'EXCEPTIONAL HOMES. A BRIGHTER TOMORROW.'}</div>
          </div>
        )}

      </div>
    </Tag>
  );
}
