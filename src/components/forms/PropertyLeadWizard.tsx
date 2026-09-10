"use client";

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './LeadForm.module.css';
import {
  LeadCategory,
  PropertyLeadValues,
  initialPropertyLeadValues,
  validatePropertyLead,
  PropertyDetailsFields,
  FeaturesConditionFields,
  IntentFields,
  ContactFields,
} from './propertyLeadFields';

type WizardStep = 0 | 1 | 2 | 3 | 4;

const CATEGORY_ICONS: Record<LeadCategory, React.ReactNode> = {
  house: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  apartment: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="3" width="12" height="18" rx="1"></rect>
      <path d="M10 7h.01M14 7h.01M10 11h.01M14 11h.01M10 15h.01M14 15h.01"></path>
    </svg>
  ),
  commercial: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01"></path>
    </svg>
  ),
};

const Chevron = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default function PropertyLeadWizard() {
  const { t } = useLanguage();
  const lf = (t as any).leadForms;
  const p = lf.propertyLead.picker;
  const w = lf.propertyLead.wizard;
  const common = lf.common;

  const [step, setStep] = useState<WizardStep>(0);
  const [values, setValues] = useState<PropertyLeadValues>(initialPropertyLeadValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const msgs = {
    required: common.required,
    invalidEmail: common.invalidEmail,
    invalidNumber: common.invalidNumber,
  };

  const update = (name: keyof PropertyLeadValues, value: string | string[] | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value } as PropertyLeadValues));
    if (errors[name as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as string];
        return next;
      });
    }
  };

  const pickCategory = (category: LeadCategory) => {
    setValues({ ...initialPropertyLeadValues, category });
    setErrors({});
    setStep(1);
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => (s - 1) as WizardStep);
  };

  const goNext = () => {
    const stepErrors = validatePropertyLead(values.category, values, step as 1 | 2 | 3 | 4, msgs);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (step < 4) {
      setStep((s) => (s + 1) as WizardStep);
    } else {
      submit();
    }
  };

  const submit = () => {
    // Honeypot — silently accept but discard
    if (values.website.trim().length > 0) {
      // eslint-disable-next-line no-console
      console.warn('[lead:property] honeypot triggered — submission ignored');
      setStatus('success');
      return;
    }
    setStatus('submitting');
    // Stubbed submit — no backend wired (mirrors auth / ConsultationModal pattern)
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('[lead:property] submitted', values);
      setStatus('success');
    }, 1200);
  };

  if (status === 'success') {
    return (
      <>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{p.eyebrow}</span>
          <h2 className={styles.title}>{lf.propertyLead.success.title}</h2>
        </div>
        <div className={styles.body}>
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <p className={styles.successBody}>{lf.propertyLead.success.body}</p>
          </div>
        </div>
      </>
    );
  }

  /* ── Step 0 — category picker ─────────────────────────── */
  if (step === 0) {
    return (
      <>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{p.eyebrow}</span>
          <h2 className={styles.title}>{p.title}</h2>
          <p className={styles.subhead}>{p.subhead}</p>
        </div>
        <div className={styles.body}>
          <div className={styles.pickerGrid}>
            {(['house', 'apartment', 'commercial'] as LeadCategory[]).map((cat) => (
              <button key={cat} type="button" className={styles.pickerCard} onClick={() => pickCategory(cat)}>
                <span className={styles.pickerIcon}>{CATEGORY_ICONS[cat]}</span>
                {p[cat]}
                <span className={styles.pickerArrow}><Chevron /></span>
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  /* ── Steps 1–4 ────────────────────────────────────────── */
  const stepTitles = [w.step1, w.step2, w.step3, w.step4];

  return (
    <>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{p.eyebrow}</span>
        <h2 className={styles.title}>{w.title}</h2>
        <p className={styles.subhead}>{w.subhead}</p>

        <div className={styles.stepper} aria-hidden="true">
          {[1, 2, 3, 4].map((n, i) => (
            <React.Fragment key={n}>
              {i > 0 && (
                <span className={`${styles.stepConnector} ${step > n - 1 ? styles.stepConnectorDone : ''}`} />
              )}
              <span
                className={`${styles.stepNode} ${step === n ? styles.stepNodeActive : ''} ${step > n ? styles.stepNodeDone : ''}`}
              >
                {n}
              </span>
            </React.Fragment>
          ))}
        </div>
        <p className={styles.stepCount}>
          {w.stepOf.replace('{current}', String(step)).replace('{total}', '4')}
        </p>
      </div>

      <div className={styles.body}>
        <div className={styles.stepPanel} key={step}>
          <h3 className={styles.stepTitle}>{stepTitles[step - 1]}</h3>

          {step === 1 && <PropertyDetailsFields values={values} errors={errors} onChange={update} />}
          {step === 2 && <FeaturesConditionFields values={values} errors={errors} onChange={update} />}
          {step === 3 && <IntentFields values={values} errors={errors} onChange={update} />}
          {step === 4 && <ContactFields values={values} errors={errors} onChange={update} />}
        </div>

        {/* Honeypot */}
        <input
          type="text"
          name="website"
          className={styles.honeypot}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={values.website}
          onChange={(e) => update('website', e.target.value)}
        />

        <div className={styles.actions}>
          <button type="button" className={styles.btnGhost} onClick={goBack}>
            {w.back}
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={goNext}
            disabled={status === 'submitting'}
          >
            {step < 4
              ? w.next
              : status === 'submitting'
                ? '…'
                : w.submit}
          </button>
        </div>
      </div>
    </>
  );
}
