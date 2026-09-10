"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Stat {
  number: string;
  label: string;
}

interface Props {
  stats: Stat[];
}

function parseNumberAndSuffix(str: string): { num: number, prefix: string, suffix: string } {
  // Matches optional non-digits, followed by digits, followed by optional non-digits (e.g., "€500M+", "100%")
  const match = str.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) return { num: parseInt(str) || 0, prefix: '', suffix: '' };
  return {
    prefix: match[1],
    num: parseInt(match[2], 10),
    suffix: match[3]
  };
}

function AnimatedCounter({ text, duration = 2000 }: { text: string, duration?: number }) {
  const { num, prefix, suffix } = parseNumberAndSuffix(text);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * num));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, num, duration]);

  if (isNaN(num) || num === 0) {
     return <div ref={ref}>{text}</div>;
  }

  return (
    <div ref={ref}>
      {prefix}{count}{suffix}
    </div>
  );
}

export default function AboutStats({ stats }: Props) {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1);

  if (!stats || stats.length === 0) return null;

  return (
    <section className="global-padding" ref={sectionRef} style={{ backgroundColor: 'var(--navy)', color: 'var(--white)', paddingTop: '8rem', paddingBottom: '8rem' }}>
      <div className={`inner-page-container reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', textAlign: 'center' }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: 'clamp(3.5rem, 6vw, 5rem)', fontWeight: 300, color: 'var(--bronze)', lineHeight: 1, fontFamily: 'var(--font-serif)' }}>
                <AnimatedCounter text={stat.number} />
              </div>
              <div style={{ fontSize: '1rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8, fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
