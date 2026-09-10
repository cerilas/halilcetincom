import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, isValidSession } from "@/lib/session";

const locales = ['tr', 'en', 'ar'];
const defaultLocale = 'tr';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // -- 1. Auth check for /admin --
  if (pathname.startsWith("/admin")) {
    if (pathname.startsWith("/admin/login")) return NextResponse.next();
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!(await isValidSession(token))) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // -- 2. i18n Routing --
  // Skip api, _next, yonetim, admin, and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/yonetim') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If they explicitly go to /tr/..., we can redirect to /... to keep URLs clean
    if (pathname.startsWith('/tr/') || pathname === '/tr') {
      const newPath = pathname.replace(/^\/tr/, '') || '/';
      return NextResponse.redirect(new URL(newPath, request.url));
    }
    return NextResponse.next();
  }

  // If no locale in pathname, it means it's the default locale (tr).
  // We rewrite the request to /tr/... so it hits the app/[lang] routes without changing URL.
  return NextResponse.rewrite(new URL(`/tr${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
