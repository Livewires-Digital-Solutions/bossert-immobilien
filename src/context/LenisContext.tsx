"use client";

import React, { createContext, useContext } from 'react';
import type Lenis from 'lenis';

interface LenisContextType {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextType>({ lenis: null });

export const LenisProvider = LenisContext.Provider;

/** Returns the shared Lenis instance, or null before it's mounted (SSR / first paint). */
export const useLenis = () => useContext(LenisContext).lenis;
