"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchProfileForm from '@/components/forms/SearchProfileForm';
import styles from '@/components/forms/LeadForm.module.css';

export default function SearchProfilePage() {
  return (
    <main style={{ backgroundColor: 'var(--navy)' }}>
      <Navbar />
      <div className={styles.standaloneContainer}>
        <div className={styles.standaloneCard}>
          <SearchProfileForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}
