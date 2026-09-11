'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  useInView,
  animate,
  type Variants,
  type MotionValue,
} from 'framer-motion';

/*
 * Shared animation primitives for the Properties experience.
 * Built on framer-motion (already a dependency). Every primitive degrades to a
 * plain, instant render when the visitor prefers reduced motion.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// ── Reveal — fade + rise (optionally blur) when scrolled into view ────────────

export function Reveal({
  children,
  y = 24,
  blur = 6,
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.3,
  as = 'div',
  className,
  style,
}: {
  children: React.ReactNode;
  y?: number;
  blur?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  as?: keyof typeof motion;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  if (reduce) {
    const Plain = as as React.ElementType;
    return (
      <Plain className={className} style={style}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: blur ? `blur(${blur}px)` : undefined }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}

// ── Stagger — reveal a group of children in sequence ──────────────────────────

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE_OUT } },
};

export function Stagger({
  children,
  className,
  style,
  amount = 0.2,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  amount?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div className={className} style={style} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

// ── CountUp — animate a number when it enters view ────────────────────────────

export function CountUp({
  value,
  duration = 1.6,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  // Render the final value for SSR / no-JS; the client animates once when in view.
  const [display, setDisplay] = React.useState(() => fmt(value));

  React.useEffect(() => {
    if (!inView || reduce) return;
    mv.set(0);
    const controls = animate(mv, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(fmt(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration, decimals, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// ── Magnetic — subtle pointer-follow for buttons / links ──────────────────────

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18, mass: 0.3 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18, mass: 0.3 });

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x, y, display: 'inline-flex' }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

// ── SplitText — word-by-word blur reveal for display headlines ────────────────

export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.08,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: React.ElementType;
}) {
  const reduce = useReducedMotion();
  const words = text.split(/(\s+)/);

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className} style={{ display: 'inline' }}>
      {words.map((w, i) =>
        /^\s+$/.test(w) ? (
          <span key={i}> </span>
        ) : (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
            <motion.span
              className={wordClassName}
              style={{ display: 'inline-block', willChange: 'transform' }}
              initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: delay + i * (stagger / 2), ease: EASE_OUT }}
            >
              {w}
            </motion.span>
          </span>
        ),
      )}
    </Tag>
  );
}

export { motion, useReducedMotion };
