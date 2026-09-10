'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  importPropertyFromOnOffice,
  refreshFieldCatalog,
} from '@/app/admin/properties/actions';
import styles from '@/app/admin/properties/properties.module.css';

export default function PropertyImportForm({ disabled }: { disabled?: boolean }) {
  const router = useRouter();
  const [internalId, setInternalId] = useState('');
  const [externalId, setExternalId] = useState('');
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [pending, startTransition] = useTransition();

  function syncCatalog() {
    setError('');
    setNote('Syncing field labels from onOffice — this can take up to a minute…');
    startTransition(async () => {
      const res = await refreshFieldCatalog();
      if (res.ok) setNote(`Field catalogue updated — ${res.data.fields} fields.`);
      else {
        setNote('');
        setError(res.error);
      }
    });
  }

  function submit() {
    setError('');
    if (!internalId.trim() && !externalId.trim()) {
      setError('Enter an Internal ID or an External ID.');
      return;
    }
    startTransition(async () => {
      const res = await importPropertyFromOnOffice({ internalId, externalId });
      if (res.ok) {
        setInternalId('');
        setExternalId('');
        router.push(`/admin/properties/${res.data.id}`);
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <div className={styles.importPanel}>
      <h2 className={styles.importTitle}>Import from onOffice</h2>
      <p className={styles.importHint}>
        Enter the estate&apos;s Internal ID (onOffice estate number) or its External ID
        (<code>objektnr_extern</code>). The Internal ID is used for the lookup when both
        are given; the other value is filled in from the response.
      </p>

      <form
        className={styles.importForm}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label className={styles.field}>
          <span className={styles.label}>Internal ID</span>
          <input
            className={styles.input}
            value={internalId}
            onChange={(e) => setInternalId(e.target.value)}
            placeholder="e.g. 1234"
            disabled={disabled || pending}
            inputMode="numeric"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>External ID</span>
          <input
            className={styles.input}
            value={externalId}
            onChange={(e) => setExternalId(e.target.value)}
            placeholder="e.g. 26-BO-619"
            disabled={disabled || pending}
          />
        </label>

        <button type="submit" className={styles.btn} disabled={disabled || pending}>
          {pending ? 'Working…' : 'Fetch property'}
        </button>
        <button
          type="button"
          className={styles.btnGhost}
          onClick={syncCatalog}
          disabled={disabled || pending}
          title="Refresh field names & option labels from onOffice"
        >
          Sync field labels
        </button>
      </form>

      {note && <div className={styles.notice} style={{ marginTop: '0.9rem', marginBottom: 0 }}>{note}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
