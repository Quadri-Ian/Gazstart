import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Paths served as legacy static HTML via beforeFiles rewrites — skip locale routing
const legacyPaths = new Set([
  "/",
  "/services",
  "/contacts",
  "/our-story",
  "/sustainability",
  "/hotline",
  "/news",
  "/careers",
  "/our-people",
  "/our-business",
  "/our-governance",
  "/drilling",
  "/privacy",
  "/index.html",
]);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through legacy HTML paths and any .html requests
  if (legacyPaths.has(pathname) || pathname.endsWith("/index.html")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
