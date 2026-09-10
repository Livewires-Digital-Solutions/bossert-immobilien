/**
 * Lightweight same-origin guard for custom auth endpoints.
 * (Auth.js's own /api/auth/* routes have built-in CSRF protection; these don't.)
 */
export function assertSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // same-origin navigations / server-to-server may omit Origin

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return true;

  try {
    return new URL(origin).host === new URL(siteUrl).host;
  } catch {
    return false;
  }
}
