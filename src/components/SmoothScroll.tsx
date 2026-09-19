"use client";

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { LenisProvider } from '@/context/LenisContext';

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    setLenis(instance);

    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisProvider value={{ lenis }}>{children}</LenisProvider>;
}
