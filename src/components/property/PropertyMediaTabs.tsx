"use client";

import React, { useState } from 'react';
import { Property } from '@/data/properties';

interface PropertyMediaTabsProps {
  property: Property;
}

export default function PropertyMediaTabs({ property }: PropertyMediaTabsProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'tour' | 'floorplans'>('video');

  // P-04: Video & 3D tour only show when an admin has explicitly switched them
  // on for this property (off by default) AND content exists for them.
  // Documents (brochure/EPC) are a future, login-gated feature — never
  // rendered here, and never read from `property` at all so no URL for them
  // can leak into this client component's props.
  const showVideo = Boolean(property.videoEnabled && property.videoUrl);
  const showTour = Boolean(property.virtualTourEnabled && property.virtualTourUrl);
  const showFloorPlans = Boolean(property.floorPlans && property.floorPlans.length > 0);

  const hasMedia = showVideo || showTour || showFloorPlans;

  if (!hasMedia) return null;

  return (
    <div className="property-media-tabs-container property-section">
      <div className="media-tabs-header">
        {showVideo && (
          <button
            className={`media-tab-btn ${activeTab === 'video' ? 'active' : ''}`}
            onClick={() => setActiveTab('video')}
          >
            Property Video
          </button>
        )}
        {showTour && (
          <button
            className={`media-tab-btn ${activeTab === 'tour' ? 'active' : ''}`}
            onClick={() => setActiveTab('tour')}
          >
            3D Virtual Tour
          </button>
        )}
        {showFloorPlans && (
          <button
            className={`media-tab-btn ${activeTab === 'floorplans' ? 'active' : ''}`}
            onClick={() => setActiveTab('floorplans')}
          >
            Floor Plans
          </button>
        )}
      </div>

      <div className="media-tab-content">
        {activeTab === 'video' && showVideo && (
          <div className="media-video-wrapper">
            <iframe
              src={property.videoUrl}
              title="Property Video"
              allowFullScreen
              className="media-iframe"
            ></iframe>
          </div>
        )}

        {activeTab === 'tour' && showTour && (
          <div className="media-tour-wrapper">
            <iframe
              src={property.virtualTourUrl}
              title="Virtual Tour"
              allowFullScreen
              className="media-iframe"
            ></iframe>
          </div>
        )}

        {activeTab === 'floorplans' && showFloorPlans && (
          <div className="media-floorplans-grid">
            {property.floorPlans!.map((plan, idx) => (
              <div key={idx} className="floorplan-card">
                <img src={plan} alt={`Floor Plan ${idx + 1}`} className="floorplan-image" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
