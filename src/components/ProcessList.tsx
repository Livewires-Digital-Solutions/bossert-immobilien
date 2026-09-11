"use client";

import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './ProcessList.module.css';

interface ProcessStep {
  name: string;
  desc: string;
}

// Inner component for each step so it reveals individually on scroll
// (used by the "timeline" variant only)
function ProcessStepItem({ step, idx, invertBackground, totalSteps }: { step: ProcessStep, idx: number, invertBackground: boolean, totalSteps: number }) {
  const { ref, isVisible } = useScrollReveal(0.4); // Trigger when 40% into view
  const descColor = invertBackground ? 'rgba(254,252,246,0.7)' : 'rgba(4,36,51,0.7)';
  const borderColor = invertBackground ? 'rgba(254,252,246,0.15)' : 'rgba(4,36,51,0.15)';

  return (
    <div ref={ref} style={{ position: 'relative', paddingLeft: '4rem', paddingBottom: idx === totalSteps - 1 ? '0' : '5rem' }}>

      {/* Timeline Line */}
      {idx !== totalSteps - 1 && (
        <div style={{
          position: 'absolute',
          left: '11px',
          top: '3rem',
          bottom: '-1rem',
          width: '2px',
          backgroundColor: borderColor,
          zIndex: 0
        }}>
          {/* Animated fill line */}
          <div style={{
            width: '100%',
            height: isVisible ? '100%' : '0%',
            backgroundColor: 'var(--bronze)',
            transition: 'height 1s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0.2s'
          }} />
        </div>
      )}

      {/* Timeline Node */}
      <div
        style={{
          position: 'absolute',
          left: '0',
          top: '0.4rem',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: isVisible ? 'var(--bronze)' : (invertBackground ? 'var(--navy)' : 'var(--cream)'),
          border: `2px solid ${isVisible ? 'var(--bronze)' : borderColor}`,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 1,
          boxShadow: isVisible ? '0 0 20px rgba(181, 143, 98, 0.4)' : 'none',
          transform: isVisible ? 'scale(1.2)' : 'scale(1)'
        }}
      />

      {/* Content */}
      <div className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`} style={{ transitionDelay: '0.1s' }}>
        <div className="italic-serif" style={{ fontSize: '2.5rem', color: 'var(--bronze)', marginBottom: '0.5rem', lineHeight: 1, opacity: 0.6 }}>
          0{idx + 1}
        </div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          {step.name}
        </h3>
        <p style={{ color: descColor, lineHeight: 1.7, fontSize: '1.15rem', margin: 0 }}>
          {step.desc}
        </p>
      </div>

    </div>
  );
}

// Click-driven, auto-advancing tab stepper (used by the "stepper" variant only)
function ProcessStepper({ steps, invertBackground }: { steps: ProcessStep[], invertBackground: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotionRef = useRef<boolean | null>(null);

  const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return true;
    if (reduceMotionRef.current === null) {
      reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return reduceMotionRef.current;
  };

  // Auto-advance every 4.5s, pausing on hover/focus/manual interaction and
  // skipped entirely under prefers-reduced-motion.
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(id);
  }, [paused, steps.length]);

  const selectStep = (idx: number) => {
    setActive(idx);
    setPaused(true);
  };

  const descColor = invertBackground ? 'rgba(254,252,246,0.75)' : 'rgba(4,36,51,0.75)';

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.stepperTabs}>
        {steps.map((step, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => selectStep(idx)}
            className={`${styles.stepperTab} ${active === idx ? styles.stepperTabActive : ''}`}
          >
            <span className={styles.stepperNum}>0{idx + 1}</span>
            <span className={styles.stepperTabLabel}>{step.name}</span>
            <span className={styles.stepperTabTrack} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className={styles.stepperPanel}>
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`${styles.stepperContent} ${active === idx ? styles.stepperContentActive : ''}`}
            aria-hidden={active !== idx}
          >
            <div className={styles.stepperIndex}>0{idx + 1}</div>
            <h3 className={styles.stepperTitle}>{step.name}</h3>
            <p className={styles.stepperDesc} style={{ color: descColor }}>{step.desc}</p>
          </div>
        ))}
      </div>

      <div className={styles.stepperDots}>
        {steps.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to step ${idx + 1}`}
            onClick={() => selectStep(idx)}
            className={`${styles.stepperDot} ${active === idx ? styles.stepperDotActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

// Drag/scroll-snap horizontal card rail with a scroll-linked progress bar
// and nav arrows (used by the "rail" variant only)
function ProcessRail({ steps, invertBackground }: { steps: ProcessStep[], invertBackground: boolean }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const measure = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);

    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const card = child as HTMLElement;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  };

  const onScroll = () => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      measure();
      rafRef.current = null;
    });
  };

  useEffect(() => {
    measure();
  }, []);

  const scrollToIndex = (idx: number) => {
    const el = trackRef.current;
    const card = el?.children[idx] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  const step = (dir: 1 | -1) => scrollToIndex(Math.min(Math.max(active + dir, 0), steps.length - 1));

  return (
    <div className={styles.railWrap} data-invert={invertBackground ? 'true' : 'false'}>
      <ul ref={trackRef} className={styles.railTrack} onScroll={onScroll} role="list">
        {steps.map((s, idx) => (
          <li
            key={idx}
            role="listitem"
            tabIndex={0}
            onClick={() => scrollToIndex(idx)}
            onFocus={() => scrollToIndex(idx)}
            className={`${styles.railCard} ${invertBackground ? styles.railCardInverted : ''} ${active === idx ? styles.railCardActive : ''}`}
          >
            <div className={styles.railNum}>0{idx + 1}</div>
            <h3 className={styles.railTitle}>{s.name}</h3>
            <p className={styles.railDesc}>{s.desc}</p>
          </li>
        ))}
      </ul>

      <div className={styles.railControls}>
        <button type="button" className={styles.railNavBtn} onClick={() => step(-1)} disabled={active === 0} aria-label="Previous step">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div className={styles.railProgressTrack}>
          <div className={styles.railProgressFill} style={{ width: `${progress * 100}%` }} />
        </div>
        <button type="button" className={styles.railNavBtn} onClick={() => step(1)} disabled={active === steps.length - 1} aria-label="Next step">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

// Hover Accordion variant
function ProcessHoverAccordion({ steps, invertBackground }: { steps: ProcessStep[], invertBackground: boolean }) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.hoverAccordionWrap}>
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={`${styles.haCard} ${invertBackground ? styles.haCardInverted : ''} ${active === idx ? styles.haCardActive : ''}`}
          onMouseEnter={() => setActive(idx)}
          onClick={() => setActive(idx)}
          onFocus={() => setActive(idx)}
          tabIndex={0}
          role="button"
          aria-expanded={active === idx}
        >
          <div className={styles.haNum}>0{idx + 1}</div>
          <div className={styles.haTitleWrap}>
            <h3 className={styles.haTitle}>{step.name}</h3>
          </div>
          <div className={styles.haDescWrap}>
            <div className={styles.haDescInner}>
              <p className={styles.haDesc}>{step.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// 3D Carousel variant (CoverFlow style)
function ProcessCarousel({ steps, invertBackground }: { steps: ProcessStep[], invertBackground: boolean }) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.carouselWrap} data-invert={invertBackground ? 'true' : 'false'}>
      <div className={styles.carouselStage}>
        {steps.map((step, idx) => {
          const offset = idx - active;
          const zIndex = 100 - Math.abs(offset);
          let translateX = offset * 120;
          let translateZ = Math.abs(offset) * -150;
          let rotateY = offset > 0 ? -25 : offset < 0 ? 25 : 0;
          let opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2;

          return (
            <button
              key={idx}
              type="button"
              className={`${styles.carouselCard} ${active === idx ? styles.carouselCardActive : ''} ${invertBackground ? styles.carouselCardInverted : ''}`}
              style={{
                zIndex,
                opacity,
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
              }}
              onMouseEnter={() => setActive(idx)}
              onFocus={() => setActive(idx)}
              onClick={() => setActive(idx)}
            >
              <div className={styles.carouselNum}>0{idx + 1}</div>
              <h3 className={styles.carouselTitle}>{step.name}</h3>
              <p className={styles.carouselDesc}>{step.desc}</p>
            </button>
          );
        })}
      </div>
      
      <div className={styles.carouselControls}>
        <button type="button" className={styles.carouselBtn} onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div className={styles.carouselDots}>
          {steps.map((_, i) => (
             <span key={i} className={`${styles.carouselDot} ${i === active ? styles.carouselDotActive : ''}`} onClick={() => setActive(i)} />
          ))}
        </div>
        <button type="button" className={styles.carouselBtn} onClick={() => setActive(Math.min(steps.length - 1, active + 1))} disabled={active === steps.length - 1}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

// Spotlight Grid variant
function ProcessSpotlightGrid({ steps, invertBackground }: { steps: ProcessStep[], invertBackground: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(`.${styles.spotCardWrapper}`);
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <div ref={containerRef} className={styles.spotGrid} onMouseMove={handleMouseMove}>
      {steps.map((step, idx) => (
        <div key={idx} className={`${styles.spotCardWrapper} ${invertBackground ? styles.spotCardInverted : ''}`}>
          <div className={styles.spotCardInner}>
            <div className={styles.spotNum}>0{idx + 1}</div>
            <h3 className={styles.spotTitle}>{step.name}</h3>
            <p className={styles.spotDesc}>{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface Props {
  processData: {
    tag: string;
    title: string;
    titleSerif: string;
    subhead: string;
    steps: ProcessStep[];
  };
  invertBackground?: boolean;
  imagePath?: string;
  /** "timeline" = vertical scroll-revealed line. "stepper" = click-driven, auto-advancing tabs. "rail" = horizontal cards. "hover-accordion" = interactive flexing cards. "3d-carousel" = 3D CoverFlow slider. "spotlight-grid" = Interactive glowing border bento grid. */
  variant?: 'timeline' | 'stepper' | 'rail' | 'hover-accordion' | '3d-carousel' | 'spotlight-grid';
}

export default function ProcessList({ processData, invertBackground = false, variant = 'timeline' }: Props) {
  const { ref, isVisible } = useScrollReveal(0.1);

  const bgColor = invertBackground ? 'var(--navy)' : 'var(--cream)';
  const textColor = invertBackground ? 'var(--cream)' : 'var(--navy)';
  const descColor = invertBackground ? 'rgba(254,252,246,0.7)' : 'rgba(4,36,51,0.7)';

  return (
    <section className="global-padding" ref={ref} style={{ backgroundColor: bgColor, color: textColor, paddingTop: '10rem', paddingBottom: '10rem' }}>
      <div className="inner-page-container">

        <style>{`
          .timeline-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          @media (min-width: 1024px) {
            .timeline-layout {
              grid-template-columns: 1fr 1.2fr;
              gap: 8rem;
              align-items: start;
            }
          }
        `}</style>

        <div className="timeline-layout">
          {/* Left: Sticky Header */}
          <div style={{ position: 'sticky', top: '10rem' }}>
            <div className={`reveal-base reveal-up ${isVisible ? 'is-revealed' : ''}`}>
              <p className="services-subtitle" style={{ color: textColor, marginBottom: '1.5rem' }}>
                <span className="dot" style={{ backgroundColor: 'var(--bronze)' }}></span> {processData.tag}
              </p>
              <h2 className="explore-headline" style={{ color: textColor, marginBottom: '2rem', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
                {processData.title} <br/>
                <span className="italic-serif">{processData.titleSerif}</span>
              </h2>
              <p style={{ color: descColor, fontSize: '1.25rem', lineHeight: 1.6, maxWidth: '500px' }}>
                {processData.subhead}
              </p>
            </div>
          </div>

          {/* Right: The Process — timeline or stepper */}
          <div style={{ position: 'relative', marginTop: '2rem' }}>
            {variant === 'stepper' && (
              <ProcessStepper steps={processData.steps} invertBackground={invertBackground} />
            )}
            {variant === 'rail' && (
              <ProcessRail steps={processData.steps} invertBackground={invertBackground} />
            )}
            {variant === 'hover-accordion' && (
              <ProcessHoverAccordion steps={processData.steps} invertBackground={invertBackground} />
            )}
            {variant === '3d-carousel' && (
              <ProcessCarousel steps={processData.steps} invertBackground={invertBackground} />
            )}
            {variant === 'spotlight-grid' && (
              <ProcessSpotlightGrid steps={processData.steps} invertBackground={invertBackground} />
            )}
            {variant === 'timeline' && processData.steps.map((step, idx) => (
              <ProcessStepItem key={idx} step={step} idx={idx} invertBackground={invertBackground} totalSteps={processData.steps.length} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
