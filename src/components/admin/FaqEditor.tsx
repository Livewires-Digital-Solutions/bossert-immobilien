'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { saveFaq, deleteFaq, type FaqFormValues } from '@/app/admin/faqs/actions';
import styles from './ArticleEditor.module.css';

type Props = { initial?: (FaqFormValues & { id: string }) | null };

const EMPTY: FaqFormValues = {
  questionEn: '',
  questionDe: '',
  answerEn: '',
  answerDe: '',
  order: 0,
  isActive: true,
};

export default function FaqEditor({ initial }: Props) {
  const router = useRouter();
  const { t } = useLanguage();
  const c = t.admin.common;
  const tf = t.admin.faqs.form;
  const editing = Boolean(initial?.id);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [lang, setLang] = useState<'en' | 'de'>('en');
  const [f, setF] = useState<FaqFormValues>(initial ?? EMPTY);

  const set = <K extends keyof FaqFormValues>(k: K, v: FaqFormValues[K]) => setF((p) => ({ ...p, [k]: v }));

  function submit() {
    setError('');
    startTransition(async () => {
      const res = await saveFaq(f);
      if (res.ok) router.push('/admin/faqs');
      else setError(res.error);
    });
  }

  function onDelete() {
    if (!initial?.id) return;
    if (!window.confirm(c.deleteConfirm)) return;
    startTransition(async () => {
      await deleteFaq(initial.id);
      router.push('/admin/faqs');
    });
  }

  return (
    <div className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>{c.order}</span>
          <input className={styles.input} type="number" value={f.order} onChange={(e) => set('order', Number(e.target.value) || 0)} />
        </label>
        <label className={`${styles.field} ${styles.checkField}`}>
          <input type="checkbox" checked={f.isActive} onChange={(e) => set('isActive', e.target.checked)} />
          <span className={styles.label}>{c.active}</span>
        </label>
      </div>

      <div className={styles.langTabs}>
        <button type="button" className={`${styles.langTab} ${lang === 'en' ? styles.langActive : ''}`} onClick={() => setLang('en')}>
          {c.english}
        </button>
        <button type="button" className={`${styles.langTab} ${lang === 'de' ? styles.langActive : ''}`} onClick={() => setLang('de')}>
          {c.german}
        </button>
      </div>

      <div hidden={lang !== 'en'}>
        <label className={styles.field}>
          <span className={styles.label}>{tf.questionEn}</span>
          <input className={styles.input} value={f.questionEn} onChange={(e) => set('questionEn', e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{tf.answerEn}</span>
          <textarea className={styles.textarea} rows={4} value={f.answerEn} onChange={(e) => set('answerEn', e.target.value)} />
        </label>
      </div>
      <div hidden={lang !== 'de'}>
        <label className={styles.field}>
          <span className={styles.label}>{tf.questionDe}</span>
          <input className={styles.input} value={f.questionDe} onChange={(e) => set('questionDe', e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{tf.answerDe}</span>
          <textarea className={styles.textarea} rows={4} value={f.answerDe} onChange={(e) => set('answerDe', e.target.value)} />
        </label>
      </div>

      <div className={styles.actions}>
        <button className={styles.save} type="button" onClick={submit} disabled={pending}>
          {pending ? c.saving : editing ? c.save : c.create}
        </button>
        <button className={styles.cancel} type="button" onClick={() => router.push('/admin/faqs')}>
          {c.cancel}
        </button>
        {editing && (
          <button className={styles.delete} type="button" onClick={onDelete} disabled={pending}>
            {c.delete}
          </button>
        )}
      </div>
    </div>
  );
}
