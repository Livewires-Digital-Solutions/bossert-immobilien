"use client";

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../context/LanguageContext';
import styles from './LeadForm.module.css';

/**
 * LeadModalShell — overlay wrapper for the intercepting-route lead forms
 * (/search-profile, /list-property). Mirrors ModalShell (auth) conventions:
 * overlay click + Escape → router.back(), body scroll lock. Wider container
 * than the auth modal to fit multi-column / multi-step forms.
 */
export default function LeadModalShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const close = (t as any).leadForms?.common?.close || 'Close';

  const handleClose = () => router.back();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus the dialog for keyboard users
    containerRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.overlay} onClick={handleClose} role="dialog" aria-modal="true">
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
        ref={containerRef}
        tabIndex={-1}
      >
        <button className={styles.closeButton} onClick={handleClose} aria-label={close}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
