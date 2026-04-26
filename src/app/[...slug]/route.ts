import { NextResponse } from "next/server";
import { serveLegacyHtml } from "@/lib/serveLegacyHtml";

export const dynamic = "force-dynamic";

// Map clean URLs to legacy file paths
const pathMap: Record<string, string> = {
  "": "/legacy/naftagaz.com/en/index.html",
  "index.html": "/legacy/naftagaz.com/en/index.html",
  "career/hall-of-fame/index.html": "/legacy/naftagaz.com/en/career/hall-of-fame/index.html",
  "services/service/index.html": "/legacy/naftagaz.com/en/services/service/index.html",
  "services/driling/index.html": "/legacy/naftagaz.com/en/services/driling/index.html",
  "career/index.html": "/legacy/naftagaz.com/en/career/index.html",
  "contacts/index.html": "/legacy/naftagaz.com/en/contacts/index.html",
  "news/index.html": "/legacy/naftagaz.com/en/news/index.html",
  "hotline/index.html": "/legacy/naftagaz.com/en/hotline/index.html",
  "privacy/index.html": "/legacy/naftagaz.com/en/privacy/index.html",
  "company/index.html": "/legacy/naftagaz.com/en/company/index.html",
  "company/our-story/index.html": "/legacy/naftagaz.com/en/company/our-story/index.html",
  "company/our-people/index.html": "/legacy/naftagaz.com/en/company/our-people/index.html",
  "company/our-business/index.html": "/legacy/naftagaz.com/en/company/our-business/index.html",
  "company/our-governance/index.html": "/legacy/naftagaz.com/en/company/our-governance/index.html",
  "company/sustainable_development/index.html": "/legacy/naftagaz.com/en/company/sustainable_development/index.html",
  "services": "/legacy/naftagaz.com/en/services/service/index.html",
  "our-story": "/legacy/naftagaz.com/en/company/our-story/index.html",
  "sustainability": "/legacy/naftagaz.com/en/company/sustainable_development/index.html",
  "contacts": "/legacy/naftagaz.com/en/contacts/index.html",
  "news": "/legacy/naftagaz.com/en/news/index.html",
  "careers": "/legacy/naftagaz.com/en/career/hall-of-fame/index.html",
  "career": "/legacy/naftagaz.com/en/career/index.html",
  "hotline": "/legacy/naftagaz.com/en/hotline/index.html",
  "our-people": "/legacy/naftagaz.com/en/company/our-people/index.html",
  "our-business": "/legacy/naftagaz.com/en/company/our-business/index.html",
  "our-governance": "/legacy/naftagaz.com/en/company/our-governance/index.html",
  "drilling": "/legacy/naftagaz.com/en/services/driling/index.html",
  "privacy": "/legacy/naftagaz.com/en/privacy/index.html",
};

export async function GET(request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  
  // Handle root
  if (!slug || slug.length === 0) {
    return serveLegacyHtml(pathMap[""] || "legacy/naftagaz.com/en/index.html");
  }

  // Build path from slug
  const pathKey = slug.join("/");
  const mappedPath = pathMap[pathKey];

  if (!mappedPath) {
    return new NextResponse("404 Not Found", { status: 404 });
  }

  return serveLegacyHtml(mappedPath);
}
