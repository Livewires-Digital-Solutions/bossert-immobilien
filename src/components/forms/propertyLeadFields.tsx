"use client";

/**
 * propertyLeadFields — SINGLE SOURCE OF TRUTH for the Eigentümer property-lead
 * field definitions + validation rules.
 *
 * Consumed today by PropertyLeadWizard (the /list-property flow).
 * TODO: migrate ConsultationModal's house_form / apartment_form / commercial_form
 *       routes onto these same field groups so the owners page and the wizard
 *       share one definition (tracked in ConsultationModal.tsx).
 */

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './LeadForm.module.css';

export type LeadCategory = 'house' | 'apartment' | 'commercial';

export interface PropertyLeadValues {
  category: LeadCategory | '';
  // Step 1 — property details
  propertyType: string;
  buildYear: string;
  livingArea: string;
  usableArea: string;
  totalArea: string;
  rooms: string;
  bathrooms: string;
  rentalStatus: string;
  // Step 2 — fit-out & condition
  condition: string;
  features: string[];
  parkingSpaces: string;
  // Step 3 — plans
  intent: string;
  timeframe: string;
  location: string;
  message: string;
  // Step 4 — contact
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
  // honeypot
  website: string;
}

export const initialPropertyLeadValues: PropertyLeadValues = {
  category: '',
  propertyType: '',
  buildYear: '',
  livingArea: '',
  usableArea: '',
  totalArea: '',
  rooms: '',
  bathrooms: '',
  rentalStatus: '',
  condition: '',
  features: [],
  parkingSpaces: '',
  intent: '',
  timeframe: '',
  location: '',
  message: '',
  salutation: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  consent: false,
  website: '',
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isFilled = (v: string) => v.trim().length > 0;
const isNumeric = (v: string) => /^\d+([.,]\d+)?$/.test(v.trim());

/**
 * Per-step validation. Returns a map of fieldName -> error message
 * (empty object = step is valid). Messages come from leadForms.common.
 */
export function validatePropertyLead(
  category: LeadCategory | '',
  values: PropertyLeadValues,
  step: 1 | 2 | 3 | 4,
  messages: { required: string; invalidEmail: string; invalidNumber: string }
): Record<string, string> {
  const e: Record<string, string> = {};
  const { required, invalidEmail, invalidNumber } = messages;
  const currentYear = new Date().getFullYear();

  if (step === 1) {
    if (!isFilled(values.propertyType)) e.propertyType = required;

    if (!isFilled(values.buildYear)) {
      e.buildYear = required;
    } else if (!isNumeric(values.buildYear)) {
      e.buildYear = invalidNumber;
    } else {
      const y = parseInt(values.buildYear, 10);
      if (y < 1500 || y > currentYear + 3) e.buildYear = invalidNumber;
    }

    if (category === 'commercial') {
      if (!isFilled(values.totalArea)) e.totalArea = required;
      else if (!isNumeric(values.totalArea)) e.totalArea = invalidNumber;
    } else {
      if (!isFilled(values.livingArea)) e.livingArea = required;
      else if (!isNumeric(values.livingArea)) e.livingArea = invalidNumber;
    }

    if (isFilled(values.usableArea) && !isNumeric(values.usableArea)) e.usableArea = invalidNumber;
    if (isFilled(values.rooms) && !isNumeric(values.rooms)) e.rooms = invalidNumber;
    if (isFilled(values.bathrooms) && !isNumeric(values.bathrooms)) e.bathrooms = invalidNumber;
  }

  if (step === 2) {
    if (isFilled(values.parkingSpaces) && !isNumeric(values.parkingSpaces)) {
      e.parkingSpaces = invalidNumber;
    }
  }

  if (step === 3) {
    if (!isFilled(values.intent)) e.intent = required;
    if (!isFilled(values.location)) e.location = required;
  }

  if (step === 4) {
    if (!isFilled(values.firstName)) e.firstName = required;
    if (!isFilled(values.lastName)) e.lastName = required;
    if (!isFilled(values.email)) e.email = required;
    else if (!EMAIL_RE.test(values.email.trim())) e.email = invalidEmail;
    if (!isFilled(values.phone)) e.phone = required;
    if (!values.consent) e.consent = required;
  }

  return e;
}

/* ── Shared small field primitives ───────────────────────── */

interface FieldProps {
  values: PropertyLeadValues;
  errors: Record<string, string>;
  onChange: (name: keyof PropertyLeadValues, value: string | string[] | boolean) => void;
}

function TextField({
  name, label, required, type = 'text', placeholder, values, errors, onChange,
}: FieldProps & {
  name: keyof PropertyLeadValues; label: string; required?: boolean;
  type?: string; placeholder?: string;
}) {
  const err = errors[name as string];
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={`pl-${name}`}>
        {label}{required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={`pl-${name}`}
        type={type}
        inputMode={type === 'number' ? 'numeric' : undefined}
        className={`${styles.input} ${err ? styles.inputError : ''}`}
        value={values[name] as string}
        placeholder={placeholder}
        onChange={(ev) => onChange(name, ev.target.value)}
        aria-invalid={!!err}
      />
      {err && <span className={styles.errorText}>{err}</span>}
    </div>
  );
}

function SelectField({
  name, label, required, options, placeholder, values, errors, onChange,
}: FieldProps & {
  name: keyof PropertyLeadValues; label: string; required?: boolean;
  options: { value: string; label: string }[]; placeholder: string;
}) {
  const err = errors[name as string];
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={`pl-${name}`}>
        {label}{required && <span className={styles.required}>*</span>}
      </label>
      <select
        id={`pl-${name}`}
        className={`${styles.select} ${err ? styles.inputError : ''}`}
        value={values[name] as string}
        onChange={(ev) => onChange(name, ev.target.value)}
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
}

const toOpts = (arr: string[]) => arr.map((s) => ({ value: s, label: s }));

/* ── Step 1: Property details ────────────────────────────── */

export function PropertyDetailsFields({ values, errors, onChange }: FieldProps) {
  const { t } = useLanguage();
  const lf = (t as any).leadForms;
  const f = lf.propertyLead.fields;
  const c = lf.common;

  const category = values.category as LeadCategory;
  const typeLabel =
    category === 'house' ? f.propertyTypeHouse
    : category === 'apartment' ? f.propertyTypeApartment
    : f.propertyTypeCommercial;
  const typeOptions =
    category === 'house' ? c.houseTypes
    : category === 'apartment' ? c.apartmentTypes
    : c.commercialTypes;

  return (
    <>
      <SelectField
        name="propertyType" label={typeLabel} required
        options={toOpts(typeOptions)} placeholder={f.select}
        values={values} errors={errors} onChange={onChange}
      />

      <div className={styles.row}>
        <TextField
          name="buildYear" label={f.buildYear} required type="number" placeholder="1984"
          values={values} errors={errors} onChange={onChange}
        />
        {category === 'commercial' ? (
          <TextField
            name="totalArea" label={f.totalArea} required type="number" placeholder="120"
            values={values} errors={errors} onChange={onChange}
          />
        ) : (
          <TextField
            name="livingArea" label={f.livingArea} required type="number" placeholder="120"
            values={values} errors={errors} onChange={onChange}
          />
        )}
      </div>

      <div className={styles.row}>
        <TextField
          name="usableArea" label={f.usableArea} type="number" placeholder="58"
          values={values} errors={errors} onChange={onChange}
        />
        {category === 'commercial' ? (
          <SelectField
            name="rentalStatus" label={f.rentalStatus}
            options={[{ value: 'yes', label: f.yes }, { value: 'no', label: f.no }]}
            placeholder={f.select}
            values={values} errors={errors} onChange={onChange}
          />
        ) : (
          <TextField
            name="rooms" label={f.rooms} type="number" placeholder="3"
            values={values} errors={errors} onChange={onChange}
          />
        )}
      </div>

      {category !== 'commercial' && (
        <div className={styles.row}>
          <TextField
            name="bathrooms" label={f.bathrooms} type="number" placeholder="1"
            values={values} errors={errors} onChange={onChange}
          />
          <div />
        </div>
      )}
    </>
  );
}

/* ── Step 2: Fit-out & condition ─────────────────────────── */

export function FeaturesConditionFields({ values, errors, onChange }: FieldProps) {
  const { t } = useLanguage();
  const lf = (t as any).leadForms;
  const f = lf.propertyLead.fields;
  const c = lf.common;

  const toggleFeature = (feat: string) => {
    const set = new Set(values.features);
    if (set.has(feat)) set.delete(feat);
    else set.add(feat);
    onChange('features', Array.from(set));
  };

  return (
    <>
      <SelectField
        name="condition" label={f.condition}
        options={toOpts(c.conditions)} placeholder={f.select}
        values={values} errors={errors} onChange={onChange}
      />

      <div className={styles.field}>
        <span className={styles.label}>{f.features}</span>
        <div className={styles.featureGrid}>
          {c.featureList.map((feat: string) => (
            <label key={feat} className={styles.featureLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={values.features.includes(feat)}
                onChange={() => toggleFeature(feat)}
              />
              {feat}
            </label>
          ))}
        </div>
      </div>

      <TextField
        name="parkingSpaces" label={f.parkingSpaces} type="number" placeholder="0"
        values={values} errors={errors} onChange={onChange}
      />
    </>
  );
}

/* ── Step 3: Plans ──────────────────────────────────────── */

export function IntentFields({ values, errors, onChange }: FieldProps) {
  const { t } = useLanguage();
  const lf = (t as any).leadForms;
  const f = lf.propertyLead.fields;
  const c = lf.common;

  return (
    <>
      <div className={styles.field}>
        <span className={styles.label}>
          {f.intent}<span className={styles.required}>*</span>
        </span>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio" name="pl-intent" value="sell"
              checked={values.intent === 'sell'}
              onChange={() => onChange('intent', 'sell')}
            />
            {f.intentSell}
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio" name="pl-intent" value="rent"
              checked={values.intent === 'rent'}
              onChange={() => onChange('intent', 'rent')}
            />
            {f.intentRent}
          </label>
        </div>
        {errors.intent && <span className={styles.errorText}>{errors.intent}</span>}
      </div>

      <SelectField
        name="timeframe" label={f.timeframe}
        options={toOpts(c.timeframes)} placeholder={f.select}
        values={values} errors={errors} onChange={onChange}
      />

      <TextField
        name="location" label={f.location} required placeholder="Wiesbaden"
        values={values} errors={errors} onChange={onChange}
      />

      <div className={styles.field}>
        <label className={styles.label} htmlFor="pl-message">{f.message}</label>
        <textarea
          id="pl-message"
          className={styles.textarea}
          value={values.message}
          onChange={(ev) => onChange('message', ev.target.value)}
        />
      </div>
    </>
  );
}

/* ── Step 4: Contact ────────────────────────────────────── */

export function ContactFields({ values, errors, onChange }: FieldProps) {
  const { t } = useLanguage();
  const lf = (t as any).leadForms;
  const f = lf.propertyLead.fields;
  const s = lf.common.salutations;

  const salutationOpts = [
    { value: 'mr', label: s.mr },
    { value: 'ms', label: s.ms },
    { value: 'family', label: s.family },
    { value: 'couple', label: s.couple },
    { value: 'company', label: s.company },
  ];

  return (
    <>
      <SelectField
        name="salutation" label={f.salutation}
        options={salutationOpts} placeholder={f.select}
        values={values} errors={errors} onChange={onChange}
      />
      <div className={styles.row}>
        <TextField name="firstName" label={f.firstName} required values={values} errors={errors} onChange={onChange} />
        <TextField name="lastName" label={f.lastName} required values={values} errors={errors} onChange={onChange} />
      </div>
      <div className={styles.row}>
        <TextField name="email" label={f.email} required type="email" values={values} errors={errors} onChange={onChange} />
        <TextField name="phone" label={f.phone} required type="tel" values={values} errors={errors} onChange={onChange} />
      </div>

      <label className={styles.consentRow}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={values.consent}
          onChange={(ev) => onChange('consent', ev.target.checked)}
        />
        <span className={styles.consentText}>{lf.common.consent}</span>
      </label>
      {errors.consent && <span className={styles.errorText}>{errors.consent}</span>}
    </>
  );
}
