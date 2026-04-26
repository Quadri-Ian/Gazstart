import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

// Map clean URLs to legacy file paths
const pathMap: Record<string, string> = {
  "": "/legacy/naftagaz.com/en/index.html",
  "index.html": "/legacy/naftagaz.com/en/index.html",
  "services": "/legacy/naftagaz.com/en/services/service/index.html",
  "our-story": "/legacy/naftagaz.com/en/company/our-story/index.html",
  "sustainability": "/legacy/naftagaz.com/en/company/sustainable_development/index.html",
  "contacts": "/legacy/naftagaz.com/en/contacts/index.html",
  "news": "/legacy/naftagaz.com/en/news/index.html",
  "careers": "/legacy/naftagaz.com/en/career/hall-of-fame/index.html",
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
    const filePath = join(process.cwd(), "public", pathMap[""] || "legacy/naftagaz.com/en/index.html");
    try {
      const html = readFileSync(filePath, "utf-8");
      return new NextResponse(html, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    } catch (error) {
      return new NextResponse("404 Not Found", { status: 404 });
    }
  }

  // Build path from slug
  const pathKey = slug.join("/");
  const mappedPath = pathMap[pathKey];

  if (!mappedPath) {
    return new NextResponse("404 Not Found", { status: 404 });
  }

  const filePath = join(process.cwd(), "public", mappedPath);

  try {
    const html = readFileSync(filePath, "utf-8");
    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    return new NextResponse("404 Not Found", { status: 404 });
  }
}
