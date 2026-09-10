"use client";

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './LeadForm.module.css';
import { EMAIL_RE } from './propertyLeadFields';

interface SearchProfileValues {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  marketingType: string;
  propertyCategory: string;
  propertyType: string;
  city: string;
  radius: string;
  priceFrom: string;
  priceTo: string;
  roomsFrom: string;
  roomsTo: string;
  specialWishes: string;
  consent: boolean;
  website: string; // honeypot
}

const initialValues: SearchProfileValues = {
  salutation: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  marketingType: 'kauf',
  propertyCategory: '',
  propertyType: '',
  city: '',
  radius: '',
  priceFrom: '',
  priceTo: '',
  roomsFrom: '',
  roomsTo: '',
  specialWishes: '',
  consent: false,
  website: '',
};

const isFilled = (v: string) => v.trim().length > 0;
const isNumeric = (v: string) => /^\d+([.,]\d+)?$/.test(v.trim());
const num = (v: string) => parseFloat(v.replace(',', '.'));

export default function SearchProfileForm() {
  const { t } = useLanguage();
  const lf = (t as any).leadForms;
  const s = lf.searchProfile;
  const c = lf.common;

  const [values, setValues] = useState<SearchProfileValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const set = (name: keyof SearchProfileValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value } as SearchProfileValues));
    if (errors[name as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as string];
        return next;
      });
    }
  };

  const salutationOpts = [
    { value: 'mr', label: c.salutations.mr },
    { value: 'ms', label: c.salutations.ms },
    { value: 'family', label: c.salutations.family },
    { value: 'couple', label: c.salutations.couple },
    { value: 'company', label: c.salutations.company },
  ];
  const marketingOpts = [
    { value: 'kauf', label: c.marketingTypes.kauf },
    { value: 'miete', label: c.marketingTypes.miete },
    { value: 'pacht', label: c.marketingTypes.pacht },
    { value: 'erbpacht', label: c.marketingTypes.erbpacht },
  ];
  const categoryOpts = [
    { value: 'wohnung', label: c.categories.wohnung },
    { value: 'haus', label: c.categories.haus },
    { value: 'grundstueck', label: c.categories.grundstueck },
    { value: 'gewerbe', label: c.categories.gewerbe },
  ];
  const typeOptions: string[] =
    values.propertyCategory === 'wohnung' ? c.apartmentTypes
    : values.propertyCategory === 'haus' ? c.houseTypes
    : values.propertyCategory === 'gewerbe' ? c.commercialTypes
    : [];

  const validate = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!isFilled(values.firstName)) e.firstName = c.required;
    if (!isFilled(values.lastName)) e.lastName = c.required;
    if (!isFilled(values.email)) e.email = c.required;
    else if (!EMAIL_RE.test(values.email.trim())) e.email = c.invalidEmail;
    if (!isFilled(values.phone)) e.phone = c.required;
    if (!values.consent) e.consent = c.required;

    (['radius', 'priceFrom', 'priceTo', 'roomsFrom', 'roomsTo'] as const).forEach((k) => {
      if (isFilled(values[k]) && !isNumeric(values[k])) e[k] = c.invalidNumber;
    });
    if (!e.priceFrom && !e.priceTo && isFilled(values.priceFrom) && isFilled(values.priceTo) && num(values.priceTo) < num(values.priceFrom)) {
      e.priceTo = c.invalidNumber;
    }
    if (!e.roomsFrom && !e.roomsTo && isFilled(values.roomsFrom) && isFilled(values.roomsTo) && num(values.roomsTo) < num(values.roomsFrom)) {
      e.roomsTo = c.invalidNumber;
    }
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    if (values.website.trim().length > 0) {
      // eslint-disable-next-line no-console
      console.warn('[lead:search-profile] honeypot triggered — submission ignored');
      setStatus('success');
      return;
    }
    setStatus('submitting');
    // Stubbed submit — no backend wired (mirrors auth / ConsultationModal pattern)
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('[lead:search-profile] submitted', values);
      setStatus('success');
    }, 1200);
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

  const field = (
    name: keyof SearchProfileValues,
    label: string,
    opts?: { required?: boolean; type?: string; placeholder?: string }
  ) => {
    const err = errors[name as string];
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={`sp-${name}`}>
          {label}{opts?.required && <span className={styles.required}>*</span>}
        </label>
        <input
          id={`sp-${name}`}
          type={opts?.type || 'text'}
          inputMode={opts?.type === 'number' ? 'numeric' : undefined}
          className={`${styles.input} ${err ? styles.inputError : ''}`}
          value={values[name] as string}
          placeholder={opts?.placeholder}
          onChange={(ev) => set(name, ev.target.value)}
          aria-invalid={!!err}
        />
        {err && <span className={styles.errorText}>{err}</span>}
      </div>
    );
  };

  const select = (
    name: keyof SearchProfileValues,
    label: string,
    options: { value: string; label: string }[],
    placeholder: string,
    opts?: { required?: boolean; disabled?: boolean }
  ) => {
    const err = errors[name as string];
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={`sp-${name}`}>
          {label}{opts?.required && <span className={styles.required}>*</span>}
        </label>
        <select
          id={`sp-${name}`}
          className={`${styles.select} ${err ? styles.inputError : ''}`}
          value={values[name] as string}
          disabled={opts?.disabled}
          onChange={(ev) => set(name, ev.target.value)}
          aria-invalid={!!err}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {err && <span className={styles.errorText}>{err}</span>}
      </div>
    );
  };

  return (
    <>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{s.eyebrow}</span>
        <h2 className={styles.title}>{s.title}</h2>
        <p className={styles.subhead}>{s.subhead}</p>
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

          <p className={styles.sectionLabel}>{s.sectionPersonal}</p>
          {select('salutation', s.salutation, salutationOpts, c.select)}
          <div className={styles.row}>
            {field('firstName', s.firstName, { required: true })}
            {field('lastName', s.lastName, { required: true })}
          </div>
          <div className={styles.row}>
            {field('email', s.email, { required: true, type: 'email' })}
            {field('phone', s.phone, { required: true, type: 'tel' })}
          </div>

          <p className={styles.sectionLabel}>{s.sectionCriteria}</p>
          {select('marketingType', s.marketingType, marketingOpts, c.select, { required: true })}
          <div className={styles.row}>
            {select('propertyCategory', s.propertyCategory, categoryOpts, s.selectCategory)}
            {select(
              'propertyType',
              s.propertyType,
              typeOptions.map((x) => ({ value: x, label: x })),
              s.selectType,
              { disabled: typeOptions.length === 0 }
            )}
          </div>
          <div className={styles.row}>
            {field('city', s.city)}
            {field('radius', s.radius, { type: 'number', placeholder: '25' })}
          </div>
          <div className={styles.row}>
            {field('priceFrom', s.priceFrom, { type: 'number' })}
            {field('priceTo', s.priceTo, { type: 'number' })}
          </div>
          <div className={styles.row}>
            {field('roomsFrom', s.roomsFrom, { type: 'number' })}
            {field('roomsTo', s.roomsTo, { type: 'number' })}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="sp-specialWishes">{s.specialWishes}</label>
            <textarea
              id="sp-specialWishes"
              className={styles.textarea}
              placeholder={s.specialWishesPlaceholder}
              value={values.specialWishes}
              onChange={(ev) => set('specialWishes', ev.target.value)}
            />
          </div>

          <label className={styles.consentRow}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={values.consent}
              onChange={(ev) => set('consent', ev.target.checked)}
            />
            <span className={styles.consentText}>{c.consent}</span>
          </label>
          {errors.consent && <span className={styles.errorText}>{errors.consent}</span>}

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
