"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
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
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="stat-number">
      {count}{suffix}
    </div>
  );
}

export default function StatsSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal(0.1);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className={`stats-grid reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
        <div className="stat-item">
          <AnimatedCounter end={30} suffix="+" />
          <div className="stat-label">Jahre Erfahrung</div>
        </div>
        <div className="stat-item">
          <AnimatedCounter end={500} suffix="+" />
          <div className="stat-label">Erfolgreiche Verkäufe</div>
        </div>
        <div className="stat-item">
          <AnimatedCounter end={100} suffix="%" />
          <div className="stat-label">Kundenzufriedenheit</div>
        </div>
      </div>
    </section>
  );
}
