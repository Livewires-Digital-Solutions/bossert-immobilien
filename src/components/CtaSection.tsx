'use client';

import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

interface CtaSectionProps {
  variant?: 'default' | 'properties' | 'services' | 'knowledge' | 'about';
  invert?: boolean;
}

export default function CtaSection({ variant = 'default', invert = false }: CtaSectionProps) {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.15);
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const headline = variant === 'properties' ? t.propertiesCta.headline : variant === 'services' ? (t as any).servicesCta.headline : t.cta.headline;
  const headlineSerif = variant === 'properties' ? t.propertiesCta.headlineSerif : variant === 'services' ? (t as any).servicesCta.headlineSerif : t.cta.headlineSerif;
  const subhead = variant === 'properties' ? t.propertiesCta.subhead : variant === 'services' ? (t as any).servicesCta.subhead : t.cta.subhead;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setStatus('submitting');
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
    <section className={`cta-section ${invert ? 'cta-inverted' : ''}`} ref={sectionRef}>
      {/* Inner framed card */}
      <div className="cta-inner-card">

        {/* ── Left column: Text content ── */}
        <div className={`cta-text-col reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
          <div className="cta-form-tag">
            <span className="dot" />
            Get in Touch
          </div>

          <h2 className="cta-headline">
            {headline}<br />
            <span className="italic-serif">{headlineSerif}</span>
          </h2>

          <p className="cta-subhead">{subhead}</p>

          {/* Contact details */}
          <div className="cta-contact-details">
            <div className="cta-detail-item">
              <span className="cta-detail-label">Phone</span>
              <a href="tel:+49691234567" className="cta-detail-value">+49 (0) 69 1234 567</a>
            </div>
            <div className="cta-detail-item">
              <span className="cta-detail-label">Email</span>
              <a href="mailto:inquiry@bossert-immo.de" className="cta-detail-value">inquiry@bossert-immo.de</a>
            </div>
            <div className="cta-detail-item">
              <span className="cta-detail-label">Address</span>
              <span className="cta-detail-value">Opernplatz 14, Suite 200<br />60313 Frankfurt, Germany</span>
            </div>
          </div>
        </div>

        {/* Vertical golden divider */}
        <div className="cta-col-divider" aria-hidden="true" />

        {/* ── Right column: Form ── */}
        <div className={`cta-form-col reveal-base reveal-up delay-100 ${isVisible ? 'is-revealed' : ''}`}>
          <form className="cta-form" onSubmit={handleSubmit} noValidate>
            <div className="cta-form-row">
              <div className="cta-input-group">
                <label className="cta-input-label" htmlFor="cta-name">Your Name</label>
                <input
                  type="text"
                  id="cta-name"
                  placeholder="John Doe"
                  className="cta-input"
                  required
                  minLength={2}
                  maxLength={50}
                  pattern="^[A-Za-zÀ-ÖØ-öø-ÿ\s\-\']+$"
                  title="Please enter a valid name."
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[0-9]/g, '');
                  }}
                />
              </div>
              <div className="cta-input-group">
                <label className="cta-input-label" htmlFor="cta-email">Email Address</label>
                <input
                  type="email"
                  id="cta-email"
                  placeholder="you@example.com"
                  className="cta-input"
                  required
                  maxLength={100}
                />
              </div>
            </div>

            <div className="cta-input-group">
              <label className="cta-input-label" htmlFor="cta-phone">Phone (optional)</label>
              <input
                type="tel"
                id="cta-phone"
                placeholder="+49 000 0000000"
                className="cta-input"
                maxLength={30}
              />
            </div>

            <div className="cta-input-group">
              <label className="cta-input-label" htmlFor="cta-message">Message</label>
              <textarea
                id="cta-message"
                placeholder={t.cta.msgPlaceholder}
                className="cta-textarea"
                required
                minLength={10}
                maxLength={1000}
              />
            </div>

            <button
              type="submit"
              className="cta-submit-btn"
              disabled={status === 'submitting'}
              style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
            >
              {status === 'idle' && t.cta.btnIdle}
              {status === 'submitting' && t.cta.btnSending}
              {status === 'success' && t.cta.btnSent}
              {status === 'idle' && (
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              )}
            </button>

            {status === 'success' && (
              <p className="cta-success-msg">{t.cta.success}</p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
