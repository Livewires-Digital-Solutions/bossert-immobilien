"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CtaSection from '@/components/CtaSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useLanguage } from '@/context/LanguageContext';
import ApproachHeadline from '@/components/ApproachHeadline';
import HorizontalScrollPhilosophy from '@/components/HorizontalScrollPhilosophy';
import AboutStats from '@/components/AboutStats';
import BtnArrow from '@/components/BtnArrow';
import Image from 'next/image';

export default function AboutPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: heritageRef, isVisible: heritageVisible } = useScrollReveal(0.2);
  const { ref: teamRef, isVisible: teamVisible } = useScrollReveal(0.1);
  const { ref: philosophyRef, isVisible: philosophyVisible } = useScrollReveal(0.1);

  const { t, lang } = useLanguage();
  const about = (t as any).about;

  interface ApiTeamMember {
    id: string;
    name: string;
    image: string;
    en: { title: string; quote: string };
    de: { title: string; quote: string };
  }
  const [teamMembers, setTeamMembers] = useState<ApiTeamMember[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/team-members')
      .then((res) => (res.ok ? res.json() : { members: [] }))
      .then((json) => {
        if (!cancelled) setTeamMembers(json.members ?? []);
      })
      .catch(() => {
        if (!cancelled) setTeamMembers([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!about) return null;

  // Mock images for staggered philosophy section
  const philosophyImages = ['/card1.jpg', '/card2.jpg', '/card3.jpg'];
  // Fallback portraits, used only until real team member photos are uploaded.
  const fallbackPortraits = ['/maximilian bossert.webp', '/elena bossert.webp'];
  const members = (teamMembers ?? []).map((m, idx) => ({
    name: m.name,
    title: lang === 'de' ? m.de.title : m.en.title,
    quote: lang === 'de' ? m.de.quote : m.en.quote,
    image: m.image || fallbackPortraits[idx % fallbackPortraits.length],
  }));

  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      {/* 1. Hero Section — same bg image, fade, font, height and centered
          text as the properties hero. On mobile only, this is restyled to
          match the client reference image (eyebrow tag, serif headline
          with a bronze sub-line, and a "Get in Touch" CTA) — scoped under
          .about-editorial-hero so laptop/desktop keep the original layout
          shared with the properties/services/contact/references heroes. */}
      <div className="properties-editorial-hero about-editorial-hero" ref={heroRef}>
        <div className="properties-hero-bg" />
        <div className="properties-hero-overlay-cream" />
        <Navbar invertOnLoad={true} />

        <div className="editorial-hero-content">
          {about.hero.tag && (
            <div className={`about-hero-eyebrow reveal-base reveal-up ${heroVisible ? 'is-revealed' : ''}`}>
              <span className="about-hero-eyebrow-line" />
              <span className="about-hero-eyebrow-text">{about.hero.tag}</span>
              <span className="about-hero-eyebrow-line" />
            </div>
          )}

          <div className="editorial-hero-middle">
            <h1 className={`editorial-headline reveal-base reveal-up delay-100 ${heroVisible ? 'is-revealed' : ''}`}>
              {about.hero.title} <br /><span className="italic-serif">{about.hero.titleSerif}</span>
            </h1>
          </div>

          <div className="editorial-hero-bottom">
            <p className={`editorial-subhead reveal-base reveal-up delay-200 ${heroVisible ? 'is-revealed' : ''}`}>
              {about.hero.description}
            </p>
          </div>

          {about.hero.cta && (
            <div className={`about-hero-cta-wrap reveal-base reveal-up delay-300 ${heroVisible ? 'is-revealed' : ''}`}>
              <Link href="/contact" className="explore-btn explore-btn-dark about-hero-btn">
                {about.hero.cta}
                <BtnArrow />
              </Link>
            </div>
          )}
        </div>
      </div>

        {/* 2. Our Approach (Massive Typography Layout) */}
        <section ref={heritageRef} style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
          <ApproachHeadline 
            tag={about.approach.tag}
            l1={about.approach.l1}
            s1={about.approach.s1}
            l2={about.approach.l2}
            l3={about.approach.l3}
            s2={about.approach.s2}
            l4={about.approach.l4}
            bgImage="/aboutbg.png"
          />
        </section>

      {/* 3. Our Philosophy (Horizontal Scroll Filmstrip) */}
      <HorizontalScrollPhilosophy 
        tag={about.philosophy.tag}
        title={about.philosophy.title}
        titleSerif={about.philosophy.titleSerif}
        description={about.philosophy.description}
        pillars={about.philosophy.pillars}
        images={philosophyImages}
      />
      
      {/* 3. Stats Section */}
      <AboutStats stats={about.stats} />

      {/* 4. The Leadership / Founders */}
      {members.length > 0 && (
        <section className="global-padding" ref={teamRef} style={{ paddingTop: '10rem', paddingBottom: '4rem' }}>
          <div className="inner-page-container">
          <div className={`reveal-base reveal-up ${teamVisible ? 'is-revealed' : ''}`} style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <p className="services-subtitle" style={{ justifyContent: 'center' }}>
               <span className="dot"></span> {about.team.tag}
            </p>
            <h2 className="explore-headline" style={{ marginTop: '1rem' }}>
              {about.team.title} <br /><span className="italic-serif">{about.team.titleSerif}</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(25rem, 100%), 1fr))', gap: '6rem' }}>
            {members.map((member, idx) => (
              <div key={idx} className={`reveal-base reveal-up delay-${((idx % 3) + 1) * 200} ${teamVisible ? 'is-revealed' : ''}`}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3 className="why-headline" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{member.name}</h3>
                <p className="italic-serif" style={{ color: 'rgba(4,36,51,0.6)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>{member.title}</p>
                {member.quote && (
                  <p className="why-subhead" style={{ lineHeight: '1.8' }}>
                    {member.quote}
                  </p>
                )}
              </div>
            ))}
          </div>
          </div>
        </section>
      )}

      {/* 5. CTA */}
      <CtaSection variant="about" />

      <Footer />
    </main>
  );
}
