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

export async function GET() {
  const filePath = join(process.cwd(), "public", "legacy/naftagaz.com/en/index.html");
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
