import { NextResponse } from 'next/server';

/**
 * Backend Kill-Switch Configuration
 * 
 * Default behavior: FALSE (Backend OFF).
 * 
 * Why default to false?
 * To prevent accidental connections to a production database or API integrations 
 * if environment variables are missing or misconfigured during deployment or local setup.
 * 
 * Both variables must be kept in sync manually in your .env file:
 * BACKEND_ENABLED=true
 * NEXT_PUBLIC_BACKEND_ENABLED=true
 */

/**
 * Server-side check for backend availability.
 * Reads `process.env.BACKEND_ENABLED`.
 * Safe for use in API routes, middleware, and Server Components.
 */
export function isBackendEnabled(): boolean {
  return process.env.BACKEND_ENABLED === 'true';
}

/**
 * Client-side check for backend availability.
 * Reads `process.env.NEXT_PUBLIC_BACKEND_ENABLED`.
 * Safe for use in Client Components to conditionally skip fetches.
 */
export function isBackendEnabledClient(): boolean {
  return process.env.NEXT_PUBLIC_BACKEND_ENABLED === 'true';
}

/**
 * HOC wrapper for Next.js API route handlers.
 * Instantly returns a 503 Service Unavailable if the backend is disabled.
 */
export function withBackendGuard(handler: Function) {
  return async (req: Request, ...args: any[]) => {
    if (!isBackendEnabled()) {
      return NextResponse.json(
        { error: 'Backend disabled: The API is currently running in a safe mock state.' },
        { status: 503 }
      );
    }
    return handler(req, ...args);
  };
}
