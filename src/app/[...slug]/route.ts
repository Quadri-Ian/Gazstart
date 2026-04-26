import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

const fixLinksScript = `
<script>
(function() {
  const urlMap = {
    "company/our-story/index.html": "/our-story",
    "company/our-people/index.html": "/our-people",
    "company/our-business/index.html": "/our-business",
    "company/our-governance/index.html": "/our-governance",
    "company/sustainable_development/index.html": "/sustainability",
    "company/index.html": "/our-story",
    "services/service/index.html": "/services",
    "services/driling/index.html": "/drilling",
    "services/drilling/index.html": "/drilling",
    "contacts/index.html": "/contacts",
    "news/index.html": "/news",
    "career/hall-of-fame/index.html": "/careers",
    "hotline/index.html": "/hotline",
    "privacy/index.html": "/privacy"
  };
  document.querySelectorAll('a[href]').forEach(link => {
    let href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('http') || href.startsWith('/local') || href.startsWith('/bitrix')) return;
    const cleanUrl = urlMap[href];
    if (cleanUrl) {
      link.setAttribute('href', cleanUrl);
    } else if (!href.startsWith('/') && !href.startsWith('#')) {
      const parts = href.split('/');
      const firstPart = parts[0];
      if (firstPart === 'company') link.setAttribute('href', '/our-story');
      else if (firstPart === 'services') link.setAttribute('href', '/services');
      else if (firstPart === 'news') link.setAttribute('href', '/news');
      else if (firstPart === 'contacts') link.setAttribute('href', '/contacts');
    }
  });
  const header = document.querySelector('.js-header');
  if (header) {
    header.style.position = 'sticky';
    header.style.top = '0';
    header.style.zIndex = '999';
  }
})();
</script>
`;

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
      let html = readFileSync(filePath, "utf-8");
      html = html.replace("</body>", fixLinksScript + "</body>");
      return new NextResponse(html, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    } catch (_error) {
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
    let html = readFileSync(filePath, "utf-8");
    html = html.replace("</body>", fixLinksScript + "</body>");
    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (_error) {
    return new NextResponse("404 Not Found", { status: 404 });
  }
}
