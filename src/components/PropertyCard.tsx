"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

interface PropertyCardProps {
  id?: string;
  imageSrc: string;
  type: string;
  price: string;
  location: string;
  specs?: string; // Legacy
  title?: string;
  summary?: string;
  status?: string;
  transactionType?: string;
  detailedSpecs?: {
    livingArea?: number;
    rooms?: number;
    otherRooms?: number;
    bathrooms?: number;
    plotArea?: number;
  };
  galleryImages?: string[];
  className?: string;
}

export default function PropertyCard({ 
  id, 
  imageSrc, 
  type, 
  price, 
  location, 
  title,
  summary,
  status,
  transactionType,
  detailedSpecs,
  galleryImages = [],
  className = "" 
}: PropertyCardProps) {
  const href = id ? `/properties/${id}` : "#";
  const { t } = useLanguage();
  
  // Safe translation access helpers
  const getStatusTrans = (key: string) => {
    const map: Record<string, string> = {
      'Verfügbar': (t as any).propertyCard?.status?.available || 'Verfügbar',
      'Reserviert': (t as any).propertyCard?.status?.reserved || 'Reserviert',
      'Verkauft': (t as any).propertyCard?.status?.sold || 'Verkauft'
    };
    return map[key] || key;
  };

  const getTypeTrans = (key: string) => {
    const map: Record<string, string> = {
      'Buy': (t as any).propertyCard?.transaction?.buy || 'Buy',
      'Rent': (t as any).propertyCard?.transaction?.rent || 'Rent'
    };
    return map[key] || key;
  };

  const imageCount = Math.max(1, galleryImages.length);

  return (
    <Link href={href} className={`property-card-new ${className}`}>
      {/* Top Image Box */}
      <div className="pc-image-box">
        <Image src={imageSrc} alt={location} fill className="pc-image" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="pc-overlays">
          <div className="pc-badges-left">
            {status && (
              <span className="pc-badge-status">
                <span className="pc-dot"></span> {getStatusTrans(status)}
              </span>
            )}
            {transactionType && (
              <span className="pc-badge-type">{getTypeTrans(transactionType)}</span>
            )}
          </div>
          <div className="pc-badges-right">
            <button className="pc-badge-heart" aria-label="Save property" onClick={(e) => e.preventDefault()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
          <div className="pc-image-count">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>1 / {imageCount}</span>
          </div>
        </div>
      </div>
      
      {/* Content Box */}
      <div className="pc-content-box">
        <div className="pc-location-subhead">
          <span className="pc-line"></span> {location.toUpperCase()}
        </div>
        
        <h3 className="pc-title">{title || type}</h3>
        
        {summary && <p className="pc-summary">{summary}</p>}
        
        <div className="pc-address">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>65207, {location}</span>
        </div>

        {/* Specifications Grid */}
        {detailedSpecs && (
          <div className="pc-specs-grid">
            {detailedSpecs.livingArea !== undefined && (
              <div className="pc-spec-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #9a7d54)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.3 15.3l-5.3 5.3a2 2 0 0 1-2.8 0L2.8 10.2a2 2 0 0 1 0-2.8l5.3-5.3a2 2 0 0 1 2.8 0l10.4 10.4a2 2 0 0 1 0 2.8z"></path>
                  <path d="M14.5 5.5l4 4"></path>
                  <path d="M12 8l4 4"></path>
                  <path d="M9.5 10.5l4 4"></path>
                </svg>
                <div className="pc-spec-val">{detailedSpecs.livingArea} m²</div>
                <div className="pc-spec-lbl">{(t as any).propertyCard?.specs?.livingArea || 'Wohnfläche'}</div>
              </div>
            )}
            {detailedSpecs.rooms !== undefined && (
              <div className="pc-spec-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #9a7d54)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 4v16"></path>
                  <path d="M2 8h18a2 2 0 0 1 2 2v10"></path>
                  <path d="M2 17h20"></path>
                  <path d="M6 8v9"></path>
                </svg>
                <div className="pc-spec-val">{detailedSpecs.rooms}</div>
                <div className="pc-spec-lbl">{(t as any).propertyCard?.specs?.rooms || 'Zimmer'}</div>
              </div>
            )}
            {detailedSpecs.otherRooms !== undefined && detailedSpecs.otherRooms > 0 && (
              <div className="pc-spec-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #9a7d54)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2"></path>
                  <path d="M22 13v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"></path>
                </svg>
                <div className="pc-spec-val">{detailedSpecs.otherRooms}</div>
                <div className="pc-spec-lbl">{(t as any).propertyCard?.specs?.otherRooms || 'Weitere Räume'}</div>
              </div>
            )}
            {detailedSpecs.bathrooms !== undefined && (
              <div className="pc-spec-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #9a7d54)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path>
                  <line x1="10" y1="5" x2="8" y2="7"></line>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <line x1="7" y1="19" x2="7" y2="21"></line>
                  <line x1="17" y1="19" x2="17" y2="21"></line>
                </svg>
                <div className="pc-spec-val">{detailedSpecs.bathrooms}</div>
                <div className="pc-spec-lbl">{(t as any).propertyCard?.specs?.bathrooms || 'Bäder'}</div>
              </div>
            )}
            {detailedSpecs.plotArea !== undefined && detailedSpecs.plotArea > 0 && (
              <div className="pc-spec-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold, #9a7d54)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeDasharray="4 4"></rect>
                </svg>
                <div className="pc-spec-val">{detailedSpecs.plotArea} m²</div>
                <div className="pc-spec-lbl">{(t as any).propertyCard?.specs?.plotArea || 'Grundstück'}</div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="pc-footer">
          <div className="pc-price-col">
            <div className="pc-price">{price}</div>
            <div className="pc-price-label">{(t as any).propertyCard?.priceLabel || 'KAUFPREIS'}</div>
          </div>
          <div className="pc-action-col">
            <button className="pc-btn" onClick={(e) => e.preventDefault()}>
              {(t as any).propertyCard?.btnAction || 'VIEW PROPERTY'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
