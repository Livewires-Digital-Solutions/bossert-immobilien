import { auth } from "@/lib/auth";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const isApi = req.nextUrl.pathname.startsWith('/api');
  const isAdmin = req.nextUrl.pathname.startsWith('/admin');
  const isAuthPage = req.nextUrl.pathname.startsWith('/admin/login');

  if (isAdmin && !isAuthPage) {
    if (!req.auth) {
      return Response.redirect(new URL('/admin/login', req.nextUrl));
    }
    return; // Don't run intl middleware for admin routes
  }

  if (isApi || isAdmin) {
    return;
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)']
};
