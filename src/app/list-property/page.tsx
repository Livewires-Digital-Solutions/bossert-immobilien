"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyLeadWizard from '@/components/forms/PropertyLeadWizard';
import styles from '@/components/forms/LeadForm.module.css';

export default function ListPropertyPage() {
  return (
    <main style={{ backgroundColor: 'var(--navy)' }}>
      <Navbar />
      <div className={styles.standaloneContainer}>
        <div className={styles.standaloneCard}>
          <PropertyLeadWizard />
        </div>
      </div>
      <Footer />
    </main>
  );
}
