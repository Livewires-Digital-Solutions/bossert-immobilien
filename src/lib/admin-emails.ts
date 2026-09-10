/**
 * Admin authorization is driven by an env allowlist (`ADMIN_EMAILS`,
 * comma-separated) in addition to the DB role. Kept free of `server-only`
 * so it can be imported by `auth.config.ts` (shared with the proxy).
 */

export function parseAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return parseAdminEmails().includes(email.toLowerCase());
}

type AppRole = 'USER' | 'ADMIN' | 'SUPERADMIN';

/** True when the account may access /admin — allowlisted email OR elevated role. */
export function isAdminAccount(email?: string | null, role?: AppRole | null): boolean {
  return isAdminEmail(email) || role === 'ADMIN' || role === 'SUPERADMIN';
}
