'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  setSubmissionStatus,
  markSubmissionRead,
  deleteSubmission,
} from '@/app/admin/contact/actions';
import styles from '@/app/admin/contact/contact.module.css';

type Status = 'NEW' | 'READ' | 'RESPONDED';

export default function ContactDetailPanel({
  id,
  name,
  email,
  phone,
  status: initialStatus,
}: {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: Status;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(initialStatus);
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  const marked = useRef(false);

  // Opening a NEW enquiry marks it READ.
  useEffect(() => {
    if (initialStatus === 'NEW' && !marked.current) {
      marked.current = true;
      markSubmissionRead(id).then(() => {
        setStatus((s) => (s === 'NEW' ? 'READ' : s));
        router.refresh();
      });
    }
  }, [id, initialStatus, router]);

  function changeStatus(next: Status) {
    const prev = status;
    setStatus(next);
    setError('');
    startTransition(async () => {
      const res = await setSubmissionStatus({ id, status: next });
      if (!res.ok) {
        setStatus(prev);
        setError(res.error);
      } else {
        router.refresh();
      }
    });
  }

  function onDelete() {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    setError('');
    startTransition(async () => {
      const res = await deleteSubmission(id);
      if (res.ok) router.push('/admin/contact');
      else setError(res.error);
    });
  }

  const mailHref = email
    ? `mailto:${email}?subject=${encodeURIComponent('Re: your enquiry — Bossert Immobilien')}&body=${encodeURIComponent(`Hello ${name},\n\n`)}`
    : null;

  return (
    <div className={styles.controls}>
      <label className={styles.metaLabel} htmlFor="inq-status">
        Status
      </label>
      <select
        id="inq-status"
        className={styles.select}
        value={status}
        onChange={(e) => changeStatus(e.target.value as Status)}
        disabled={pending}
      >
        <option value="NEW">New</option>
        <option value="READ">Read</option>
        <option value="RESPONDED">Responded</option>
      </select>

      {mailHref && (
        <a className={styles.btn} href={mailHref}>
          Reply by email
        </a>
      )}
      {phone && (
        <a className={styles.btnGhost + ' ' + styles.btn} href={`tel:${phone}`}>
          Call {phone}
        </a>
      )}

      <button className={styles.btn + ' ' + styles.btnDanger} onClick={onDelete} disabled={pending}>
        Delete
      </button>

      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
