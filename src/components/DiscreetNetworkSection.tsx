"use client";

import React from 'react';
import Image from 'next/image';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function DiscreetNetworkSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.25);
  const { t } = useLanguage();
  const data = t.discreetNetwork;

  return (
    <section className="discreet-network-section" ref={sectionRef}>
      <div className="discreet-network-container">

        <div className={`discreet-network-image-col reveal-base reveal-scale ${isVisible ? 'is-revealed' : ''}`}>
          <Image
            src="/images/prop_penthouse_1787771396787.jpg"
            alt={data.headline}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="discreet-network-text-col">
          <p className={`discreet-network-tag reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
            {data.tag}
          </p>
          <h2 className={`discreet-network-headline reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
            {data.headline}
          </h2>
          <p className={`discreet-network-desc reveal-base reveal-up delay-200 ${isVisible ? 'is-revealed' : ''}`}>
            {data.desc}
          </p>
        </div>

      </div>
    </section>
  );
}
