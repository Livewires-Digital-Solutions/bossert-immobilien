"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import ContactFAQ from '@/components/ContactFAQ';

export default function ContactPage() {
  const { ref: topRef, isVisible: topVisible } = useScrollReveal(0.1);
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal(0.2);

  const { t } = useLanguage();
  const contact = (t as any).contact;
  const settings = useSiteSettings();

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
    consent: false,
    company: '', // honeypot
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          inquiryType: form.inquiryType || contact.form.options?.[0] || '',
          source: 'contact_page',
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || 'request failed');
      }
      setSuccess(true);
    } catch {
      setError(contact.form.error ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!contact) return null;

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar invertOnLoad={true} />
      
      {/* 1. Top Section (Split Grid) */}
      <section className="global-padding" ref={topRef} style={{ paddingTop: '10rem', paddingBottom: '6rem' }}>
        <div className="inner-page-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '6rem' }}>
          
          {/* Left: Hero & Info */}
          <div className={`reveal-base reveal-up ${topVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
            
            {/* Hero */}
            <div style={{ marginBottom: '4rem' }}>
              <p className="services-subtitle" style={{ marginBottom: '1.5rem' }}>
                <span className="dot"></span> {contact.hero.tag}
              </p>
              <h1 className="editorial-headline" style={{ marginBottom: '1rem' }}>
                <span style={{ letterSpacing: '-0.07em', marginRight: '0.5rem' }}>{contact.hero.title}</span>
                <span className="italic-serif">{contact.hero.titleSerif}</span>
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'rgba(4,36,51,0.7)' }}>
                {contact.hero.subhead}
              </p>
            </div>

            {/* Contact Info (Stacked like reference) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(4,36,51,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <p style={{ fontWeight: 500, color: 'var(--navy)', marginBottom: '0.25rem' }}>{contact.info.locationTitle}</p>
                  <p style={{ color: 'rgba(4,36,51,0.7)', lineHeight: 1.6 }}>{settings.addressLine1}<br/>{settings.addressLine2}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(4,36,51,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <p style={{ fontWeight: 500, color: 'var(--navy)', marginBottom: '0.25rem' }}>{contact.info.phoneTitle}</p>
                  <a href={settings.phoneHref} style={{ color: 'rgba(4,36,51,0.7)', textDecoration: 'none' }}>{settings.phone}</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(4,36,51,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div>
                  <p style={{ fontWeight: 500, color: 'var(--navy)', marginBottom: '0.25rem' }}>{contact.info.emailTitle}</p>
                  <a href={`mailto:${settings.email}`} style={{ color: 'rgba(4,36,51,0.7)', textDecoration: 'none' }}>{settings.email}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The Form Card */}
          <div className={`reveal-base reveal-up delay-200 ${topVisible ? 'is-revealed' : ''}`} style={{ flex: '1 1 500px' }}>
            <div style={{ backgroundColor: 'var(--white)', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(4,36,51,0.03)' }}>
              {success ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <p className="italic-serif" style={{ fontSize: '2.5rem', color: 'var(--bronze)', marginBottom: '1rem' }}>Sent.</p>
                  <p style={{ color: 'var(--navy)', lineHeight: 1.6 }}>{contact.form.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                  {/* Honeypot — visually hidden, ignored by real users */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={form.company}
                    onChange={(e) => set('company', e.target.value)}
                    style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                  />

                  <div>
                    <input
                      type="text"
                      placeholder={contact.form.namePlaceholder}
                      required
                      minLength={2}
                      maxLength={120}
                      className="cta-input"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder={contact.form.emailPlaceholder ?? 'Your email address'}
                      required
                      maxLength={200}
                      className="cta-input"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder={contact.form.phonePlaceholder}
                      maxLength={60}
                      className="cta-input"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                    />
                  </div>

                  <div>
                    <select
                      className="cta-input"
                      style={{ appearance: 'none', cursor: 'pointer' }}
                      value={form.inquiryType || contact.form.options?.[0] || ''}
                      onChange={(e) => set('inquiryType', e.target.value)}
                    >
                      {contact.form.options.map((opt: string, idx: number) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <textarea
                      placeholder={contact.form.messagePlaceholder}
                      required
                      minLength={10}
                      maxLength={4000}
                      rows={4}
                      className="cta-textarea"
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                    />
                  </div>

                  {error && (
                    <p style={{ color: '#9a2b2b', fontSize: '0.85rem', margin: 0 }}>{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="explore-btn explore-btn-dark cta-submit-margin"
                    style={{ opacity: submitting ? 0.7 : 1, marginTop: '0.5rem' }}
                  >
                    <span>{submitting ? contact.form.submitting : contact.form.submit}</span>
                    <div className="explore-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      checked={form.consent}
                      onChange={(e) => set('consent', e.target.checked)}
                      style={{ accentColor: 'var(--navy)' }}
                    />
                    <label htmlFor="privacy" style={{ fontSize: '0.85rem', color: 'rgba(4,36,51,0.7)' }}>{contact.form.privacy}</label>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Cinematic Anchor Image */}
      <section className="global-padding" ref={imageRef}>
        <div className={`inner-page-container reveal-base reveal-scale ${imageVisible ? 'is-revealed' : ''}`}>
          <div style={{ position: 'relative', width: '100%', height: '60vh', minHeight: '500px', borderRadius: '16px', overflow: 'hidden' }}>
            <Image 
              src="/images/prop_penthouse_1787771396787.jpg"  
              alt="Luxury Bossert Property"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <ContactFAQ faqData={contact.faq} />

      <Footer />
    </main>
  );
}
