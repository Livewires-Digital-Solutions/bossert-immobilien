"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import styles from './LeadForm.module.css';
import { EMAIL_RE } from './propertyLeadFields';

interface InquiryValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  website: string; // honeypot
}

const initialValues: InquiryValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
  website: '',
};

const isFilled = (v: string) => v.trim().length > 0;

/**
 * Contact-about-a-property form. Rendered both as the intercepted modal
 * (@modal/(.)property-inquiry) and the standalone page (/property-inquiry),
 * exactly like SearchProfileForm / PropertyLeadWizard. The property being
 * asked about is passed via query string (?property=<id>&title=<title>) since
 * intercepting routes only match on pathname.
 */
export default function PropertyInquiryForm() {
  const { t } = useLanguage();
  const lf = (t as any).leadForms;
  const s = lf.propertyInquiry;
  const c = lf.common;

  const searchParams = useSearchParams();
  const propertyId = searchParams.get('property') ?? '';
  const propertyTitle = searchParams.get('title') ?? '';

  const [values, setValues] = useState<InquiryValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const set = (name: keyof InquiryValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value } as InquiryValues));
    if (errors[name as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as string];
        return next;
      });
    }
  };

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!isFilled(values.name)) e.name = c.required;
    if (!isFilled(values.email)) e.email = c.required;
    else if (!EMAIL_RE.test(values.email.trim())) e.email = c.invalidEmail;
    if (!values.consent) e.consent = c.required;
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    if (values.website.trim().length > 0) {
      // Honeypot tripped — pretend success, send nothing.
      setStatus('success');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          message:
            values.message.trim() ||
            `Interesse an: ${propertyTitle || propertyId || 'einer Immobilie'}`,
          inquiryType: 'Immobilienanfrage',
          heardAbout: propertyId ? `Objekt ${propertyId} — ${propertyTitle}`.slice(0, 120) : undefined,
          source: propertyId ? `property_${propertyId}` : 'property_inquiry',
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error('request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{s.eyebrow}</span>
          <h2 className={styles.title}>{s.successTitle}</h2>
        </div>
        <div className={styles.body}>
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <p className={styles.successBody}>{s.successBody}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{s.eyebrow}</span>
        <h2 className={styles.title}>{s.title}</h2>
        <p className={styles.subhead}>{s.subhead}</p>
        {propertyTitle && (
          <p className={styles.subhead} style={{ marginTop: '0.5rem', fontWeight: 500, color: 'var(--navy)' }}>
            {s.regarding}: {propertyTitle}
          </p>
        )}
      </div>

      <div className={styles.body}>
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            className={styles.honeypot}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={values.website}
            onChange={(e) => set('website', e.target.value)}
          />

          <div className={styles.field}>
            <label className={styles.label} htmlFor="pi-name">
              {s.name}<span className={styles.required}>*</span>
            </label>
            <input
              id="pi-name"
              type="text"
              className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
              value={values.name}
              onChange={(e) => set('name', e.target.value)}
              aria-invalid={!!errors.name}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pi-email">
                {s.email}<span className={styles.required}>*</span>
              </label>
              <input
                id="pi-email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                value={values.email}
                onChange={(e) => set('email', e.target.value)}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="pi-phone">
                {s.phone}
              </label>
              <input
                id="pi-phone"
                type="tel"
                className={styles.input}
                value={values.phone}
                onChange={(e) => set('phone', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="pi-message">
              {s.message}
            </label>
            <textarea
              id="pi-message"
              className={styles.textarea}
              placeholder={s.messagePlaceholder}
              value={values.message}
              onChange={(e) => set('message', e.target.value)}
              maxLength={2000}
            />
          </div>

          <div className={styles.consentRow}>
            <input
              id="pi-consent"
              type="checkbox"
              className={styles.checkbox}
              checked={values.consent}
              onChange={(e) => set('consent', e.target.checked)}
            />
            <label className={styles.consentText} htmlFor="pi-consent">
              {c.consent}
            </label>
          </div>
          {errors.consent && <span className={styles.errorText}>{errors.consent}</span>}

          {status === 'error' && (
            <span className={styles.errorText} style={{ display: 'block', marginTop: '0.75rem' }}>
              {(t as any).contact?.form?.error ?? 'Something went wrong. Please try again.'}
            </span>
          )}

          <button
            type="submit"
            className={`${styles.btnPrimary} ${styles.submitFull}`}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? '…' : s.submit}
          </button>
        </form>
      </div>
    </>
  );
}
