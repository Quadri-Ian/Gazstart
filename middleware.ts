import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

// Only apply locale routing to /en/* and /ru/* paths
// All other routes (/, /services, /contacts, etc.) are handled by route handlers
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Apply locale routing only to /en/* and /ru/* paths
    "/(en|ru)/:path*",
  ],
};
