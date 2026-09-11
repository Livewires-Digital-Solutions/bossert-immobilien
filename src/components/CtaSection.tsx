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
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const headline = variant === 'properties' ? t.propertiesCta.headline : variant === 'services' ? (t as any).servicesCta.headline : t.cta.headline;
  const headlineSerif = variant === 'properties' ? t.propertiesCta.headlineSerif : variant === 'services' ? (t as any).servicesCta.headlineSerif : t.cta.headlineSerif;
  const subhead = variant === 'properties' ? t.propertiesCta.subhead : variant === 'services' ? (t as any).servicesCta.subhead : t.cta.subhead;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const fd = new FormData(form);
    if (fd.get('company')) {
      // Honeypot — bail silently.
      setStatus('success');
      form.reset();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(fd.get('name') ?? ''),
          email: String(fd.get('email') ?? ''),
          phone: String(fd.get('phone') ?? ''),
          message: String(fd.get('message') ?? ''),
          inquiryType: 'General Inquiry',
          source: `cta_${variant}`,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error('failed');
      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
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
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />
            <div className="cta-form-row">
              <div className="cta-input-group">
                <label className="cta-input-label" htmlFor="cta-name">Your Name</label>
                <input
                  type="text"
                  id="cta-name"
                  name="name"
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
                  name="email"
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
                name="phone"
                placeholder="+49 000 0000000"
                className="cta-input"
                maxLength={30}
              />
            </div>

            <div className="cta-input-group">
              <label className="cta-input-label" htmlFor="cta-message">Message</label>
              <textarea
                id="cta-message"
                name="message"
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
              {(status === 'idle' || status === 'error') && t.cta.btnIdle}
              {status === 'submitting' && t.cta.btnSending}
              {status === 'success' && t.cta.btnSent}
              {(status === 'idle' || status === 'error') && (
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              )}
            </button>

            {status === 'error' && (
              <p className="cta-success-msg" style={{ color: '#9a2b2b' }}>
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            {status === 'success' && (
              <p className="cta-success-msg">{t.cta.success}</p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
