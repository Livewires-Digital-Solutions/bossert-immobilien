'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function CtaSection() {
  const t = useTranslations('home.cta');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity()) {
      setStatus('submitting');
      // Simulate API call
      setTimeout(() => {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      }, 1000);
    } else {
      form.reportValidity();
    }
  };

  return (
    <section className="cta-section">
      {/* Left Column: Portrait Image */}
      <div className="cta-image-col reveal reveal-scale"></div>

      {/* Right Column: Form Block */}
      <div className="cta-form-col">
        <div className="cta-form-container reveal stagger-1">
          <h2 className="cta-headline">
            {t('headline')}<br/>
            <span className="italic-serif">{t('headlineSerif')}</span>
          </h2>
          <p className="cta-subhead">
            {t('subhead')}
          </p>
          
          <form className="cta-form" onSubmit={handleSubmit} noValidate>
            <div className="cta-form-row">
              <div className="cta-input-group">
                <input 
                  type="text" 
                  id="name" 
                  placeholder={t('namePlaceholder')} 
                  className="cta-input" 
                  required 
                  minLength={2} 
                  maxLength={50}
                  pattern="^[A-Za-zÀ-ÖØ-öø-ÿ\s\-\']+$"
                  title="Please enter a valid name (letters only)."
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[0-9]/g, '');
                  }}
                />
              </div>
              <div className="cta-input-group">
                <input 
                  type="email" 
                  id="email" 
                  placeholder={t('emailPlaceholder')} 
                  className="cta-input" 
                  required 
                  maxLength={100} 
                />
              </div>
            </div>
            
            <div className="cta-input-group">
              <textarea 
                id="message" 
                placeholder={t('msgPlaceholder')} 
                className="cta-textarea" 
                required 
                minLength={10}
                maxLength={1000}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="explore-btn explore-btn-dark cta-submit-margin"
              disabled={status === 'submitting'}
              style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
            >
              {status === 'idle' && t('btnIdle')}
              {status === 'submitting' && t('btnSending')}
              {status === 'success' && t('btnSent')}
              {status === 'idle' && (
                <div className="explore-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              )}
            </button>
            {status === 'success' && (
              <p style={{ color: 'var(--bronze)', marginTop: '1rem', fontSize: '0.85rem' }}>
                {t('success')}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
