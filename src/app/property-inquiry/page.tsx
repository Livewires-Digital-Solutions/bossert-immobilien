"use client";

import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyInquiryForm from '@/components/forms/PropertyInquiryForm';
import styles from '@/components/forms/LeadForm.module.css';

export default function PropertyInquiryPage() {
  return (
    <main style={{ backgroundColor: 'var(--navy)' }}>
      <Navbar />
      <div className={styles.standaloneContainer}>
        <div className={styles.standaloneCard}>
          <Suspense fallback={null}>
            <PropertyInquiryForm />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  );
}
