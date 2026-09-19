"use client";

import React, { Fragment } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import BtnArrow from './BtnArrow';

export default function ActionPromptSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.25);
  const { t } = useLanguage();
  const data = t.actionPrompt;
  const brandLines = data.brand.split('\n');

  return (
    <section className="action-prompt-section" ref={sectionRef}>
      <div className="action-prompt-text-col">
        <div className={`action-prompt-card reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
          <p className="action-prompt-brand">
            {brandLines.map((line, i) => (
              <Fragment key={i}>
                {line}
                {i < brandLines.length - 1 && <br />}
              </Fragment>
            ))}
          </p>

          <h2 className="action-prompt-headline">{data.headline}</h2>

          <p className="action-prompt-desc">{data.desc}</p>

          <a href="#contact" className="explore-btn explore-btn-dark action-prompt-btn">
            {data.btn}
            <BtnArrow />
          </a>
        </div>
      </div>

      <div className={`action-prompt-image-col reveal-base reveal-scale delay-100 ${isVisible ? 'is-revealed' : ''}`}>
        <Image
          src="/images/prop_apartment_new.jpg"
          alt={data.headline}
          fill
          sizes="(max-width: 900px) 100vw, 58vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
    </section>
  );
}
