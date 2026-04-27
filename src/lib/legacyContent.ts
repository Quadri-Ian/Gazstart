import { readFileSync } from "fs";
import { join } from "path";

export type LegacyPageData = {
  title: string;
  subtitle: string;
  bodyHtml: string;
};

const ROUTE_TO_LEGACY: Record<string, string> = {
  "": "legacy/naftagaz.com/en/index.html",
  services: "legacy/naftagaz.com/en/services/service/index.html",
  drilling: "legacy/naftagaz.com/en/services/driling/index.html",
  company: "legacy/naftagaz.com/en/company/index.html",
  "our-story": "legacy/naftagaz.com/en/company/our-story/index.html",
  "our-people": "legacy/naftagaz.com/en/company/our-people/index.html",
  "our-business": "legacy/naftagaz.com/en/company/our-business/index.html",
  "our-governance": "legacy/naftagaz.com/en/company/our-governance/index.html",
  sustainability: "legacy/naftagaz.com/en/company/sustainable_development/index.html",
  contacts: "legacy/naftagaz.com/en/contacts/index.html",
  news: "legacy/naftagaz.com/en/news/index.html",
  careers: "legacy/naftagaz.com/en/career/hall-of-fame/index.html",
  career: "legacy/naftagaz.com/en/career/index.html",
  hotline: "legacy/naftagaz.com/en/hotline/index.html",
  privacy: "legacy/naftagaz.com/en/privacy/index.html",
};

const HERO_CONTENT: Record<string, { title: string; subtitle: string }> = {
  "": {
    title: "Powering the Future of Nigerian Energy.",
    subtitle:
      "Blueflare Energy provides high-precision servicing and innovative engineering solutions tailored to the unique demands of the West African oil and gas industry.",
  },
  services: {
    title: "Engineering and Field Services",
    subtitle:
      "Integrated operational support from planning through execution for complex wells and production systems.",
  },
  drilling: {
    title: "Advanced Drilling Operations",
    subtitle:
      "Safe, high-performance drilling programs delivered by experienced teams and modern equipment.",
  },
  company: {
    title: "Built for Long-Term Impact",
    subtitle:
      "Blueflare combines operational reliability, technology, and responsible governance across every project.",
  },
  sustainability: {
    title: "Our Commitment to Sustainability",
    subtitle:
      "Environmental stewardship, workforce safety, and community value are embedded in every stage of delivery.",
  },
  contacts: {
    title: "Contact Blueflare",
    subtitle:
      "Reach our teams for partnerships, operations support, and project consultations.",
  },
  careers: {
    title: "Build Your Career with Blueflare",
    subtitle:
      "Join a team focused on safety, innovation, and measurable impact in energy operations.",
  },
};

const URL_MAP: Record<string, string> = {
  "index.html": "/",
  "company/index.html": "/company",
  "company/our-story/index.html": "/our-story",
  "company/our-people/index.html": "/our-people",
  "company/our-business/index.html": "/our-business",
  "company/our-governance/index.html": "/our-governance",
  "company/sustainable_development/index.html": "/sustainability",
  "company/sustainable-development/index.html": "/sustainability",
  "services/service/index.html": "/services",
  "services/driling/index.html": "/drilling",
  "services/drilling/index.html": "/drilling",
  "contacts/index.html": "/contacts",
  "news/index.html": "/news",
  "career/index.html": "/career",
  "career/hall-of-fame/index.html": "/careers",
  "hotline/index.html": "/hotline",
  "privacy/index.html": "/privacy",
};

export function resolveLegacyPath(slug: string[]): string | null {
  const key = slug.join("/");
  return ROUTE_TO_LEGACY[key] ?? null;
}

function normalizeHref(href: string, docRelativePath: string): string {
  let normalized = href.trim();
  try {
    const baseUrl = new URL("https://legacy.local/" + docRelativePath);
    normalized = new URL(normalized, baseUrl).pathname;
  } catch {
    // keep the original href
  }

  normalized = normalized.replace(/^\/+/, "");
  normalized = normalized.replace(/^(en|ru)\//, "");
  normalized = normalized.replace(/^\.\//, "");

  while (normalized.startsWith("../")) {
    normalized = normalized.slice(3);
  }

  return normalized;
}

function rewriteHrefs(html: string, legacyPath: string): string {
  const normalizedPath = legacyPath.replace(/\\/g, "/");
  const idx = normalizedPath.indexOf("/en/");
  const docRelativePath = idx >= 0 ? normalizedPath.slice(idx + 4) : normalizedPath;

  return html.replace(/href=(['"])(.*?)\1/gi, (full, q: string, href: string) => {
    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:") ||
      href.startsWith("/local") ||
      href.startsWith("/bitrix") ||
      href.startsWith("/mc.yandex.ru")
    ) {
      return full;
    }

    const normalizedHref = normalizeHref(href, docRelativePath);
    const mapped = URL_MAP[normalizedHref];
    if (!mapped) return full;

    return `href=${q}${mapped}${q}`;
  });
}

function cleanLegacyMain(mainHtml: string, routeKey: string): string {
  let html = mainHtml;

  // Remove legacy intro only for home; keep original top sections on other pages.
  if (!routeKey) {
    html = html.replace(/^\s*<section[^>]*\bintro\b[\s\S]*?<\/section>/i, "");
    html = html.replace(/\s*<section[^>]*\bvalues-hub\b[^>]*>[\s\S]*?<\/section>/i, "");
  }

  // Unhide media/content previously toggled by legacy JS.
  html = html.replace(/\bis-hidden--no-js\b/g, "");
  html = html.replace(/\bis-invisible--js\b/g, "");

  // Hydrate lazy media without legacy JS.
  html = html.replace(/\sdata-srcset=(['"])(.*?)\1/gi, (_m, _q, v) => ` srcset="${v}"`);
  html = html.replace(/\sdata-src=(['"])(.*?)\1/gi, (_m, _q, v) => ` src="${v}"`);

  // Normalize asset paths from prior migration attempts / mirror variants.
  html = html.replace(/\/local\/templates\/blueflare\//gi, "/local/templates/naftagaz/");
  html = html.replace(/(["'(])\/assets\/images\//gi, "$1/local/templates/naftagaz/assets/images/");

  // Repair known mojibake artifacts found in mirrored legacy service pages.
  html = html.replace(/�Digital Drilling\s*<br>\s*Rig�/gi, "&ldquo;Digital Drilling<br>Rig&rdquo;");
  html = html.replace(/�Digital Drilling Rig�/gi, "&ldquo;Digital Drilling Rig&rdquo;");
  html = html.replace(/�([^<>\n\r]{1,120}?)�/g, "&ldquo;$1&rdquo;");
  html = html.replace(/digital �environment�/gi, "digital &ldquo;environment&rdquo;");
  html = html.replace(/�\s*2026\s+Blueflare,\s*JSC/gi, "&copy; 2026 Blueflare, JSC");

  if (routeKey === "services" || routeKey === "drilling") {
    html = html.replace(
      /<div([^>]*class=(['"])[^'"]*services-intro__content[^'"]*\2[^>]*)>/i,
      '<div$1 style="background: #3F5669; background-image: none;">',
    );

    html = html.replace(
      /<div class="technologies technologies--large ui-accent sticky technologies-sticky-animation"([^>]*)data-plugin="stickyNews reveal"([^>]*)data-sticky-news-enable-mq="md-up"([^>]*)id="technologies-sticky-animation"([^>]*)>/i,
      '<div class="technologies technologies--large ui-accent technologies-sticky-animation"$1data-plugin="reveal"$2$3id="technologies-sticky-animation"$4>',
    );

    html = html.replace(
      /<div class="sticky__sticky technologies__wrap-height" data-scroll data-scroll-sticky data-scroll-target="#technologies-sticky-animation">/i,
      '<div class="technologies__wrap-height">',
    );

    html = html.replace(
      /<\/section>\s*<section class="section" data-scroll-section>\s*<div class="container-h container-v-averaged">\s*<div class="we-use">/i,
      '</section><section class="section we-use-section" data-scroll-section><div class="container-h container-v-averaged"><div class="we-use">',
    );

    html = `<style>.legacy-content .services-intro__content{background:#3F5669 !important;background-image:none !important;}.legacy-content .technologies-sticky-animation{height:auto !important;min-height:0 !important;}.legacy-content .technologies-sticky-animation .technologies__wrap-height{position:relative !important;top:auto !important;height:auto !important;min-height:0 !important;}.legacy-content .technologies-sticky-animation .container-h.technologies__wrap{max-width:none !important;width:100% !important;padding-right:0 !important;}.legacy-content .technologies-sticky-animation .row.row--pad{margin-right:0 !important;}.legacy-content .technologies-sticky-animation .col.col--md-5{padding-right:0 !important;}.legacy-content .technologies-sticky-animation .technologies__custom-carousel{margin-right:0 !important;}.legacy-content .we-use-section{margin-top:40px !important;margin-bottom:560px !important;padding-bottom:40px !important;}.legacy-content .we-use-section .container-v-averaged{padding-top:0 !important;padding-bottom:0 !important;}.legacy-content .we-use-section .we-use{margin-top:0 !important;margin-bottom:0 !important;}</style>${html}`;
  }

  if (routeKey === "careers" || routeKey === "career") {
    html = `<style>.legacy-content section.intro{background:#355486 !important;}.legacy-content section.intro::before,.legacy-content section.intro::after,.legacy-content section.intro .intro__logo::before,.legacy-content section.intro .intro__logo::after{display:none !important;content:none !important;}.legacy-content section.intro .intro__content{padding-top:7rem !important;padding-bottom:3rem !important;}.legacy-content section.intro .intro__content__title{font-size:clamp(4.8rem,8.5vw,11rem) !important;line-height:.92 !important;max-width:7ch !important;}.legacy-content section.intro .intro__logo{left:50vw !important;right:auto !important;top:auto !important;bottom:0 !important;width:50vw !important;height:calc(var(--spacing) * 5.6 + calc(var(--scale-px) * 170)) !important;margin:0 !important;max-width:none !important;display:flex !important;align-items:flex-end !important;overflow:hidden !important;mix-blend-mode:normal !important;filter:none !important;opacity:1 !important;transform:none !important;}.legacy-content section.intro .intro__logo picture,.legacy-content section.intro .intro__logo img{mix-blend-mode:normal !important;filter:none !important;opacity:1 !important;transform:none !important;}.legacy-content section.intro .intro__logo picture{display:block !important;height:100% !important;width:100% !important;}.legacy-content section.intro .intro__logo img{width:100% !important;height:100% !important;object-fit:cover !important;object-position:center bottom !important;}.legacy-content .hall-of-fame-item__title,.legacy-content .success-stories-item__title,.legacy-content .success-story-item__title{display:none !important;}</style>${html}`;
  }

  if (routeKey === "contacts") {
    html = `<style>.legacy-content .contacts-intro .ui-dark-background{background:#3f4d5b !important;}.legacy-content .contacts-intro .ui-accent-background,.legacy-content .contacts-tabs__background,.legacy-content .contacts-tabs__map.ui-accent{background:#0a4f9e !important;}.legacy-content .contacts-intro__title h1{font-size:clamp(4.6rem,10.5vw,8.7rem) !important;line-height:.88 !important;letter-spacing:-.02em !important;}.legacy-content .contacts-tabs .btn--outline{border-color:rgba(255,255,255,.4) !important;color:#fff !important;}.legacy-content .contacts-tabs .btn--outline.is-active{background:#fff !important;border-color:#fff !important;color:#014ab1 !important;}.legacy-content .contacts-tabs__organization .text--lead,.legacy-content .contacts-tabs__organization .contacts-tabs__link a,.legacy-content .contacts-tabs__organization .contact-tabs__phone a{color:#fff !important;}.legacy-content .contacts-tabs__background picture,.legacy-content .contacts-tabs__background img{mix-blend-mode:normal !important;filter:none !important;opacity:1 !important;}.legacy-content .contacts-tabs{margin-bottom:0 !important;}.legacy-content .contacts-tabs__organization{padding-bottom:2.5rem !important;}.legacy-content .contacts-tabs__map{position:relative !important;top:auto !important;left:0 !important;right:0 !important;margin:0 !important;padding:0 !important;background:transparent !important;}.legacy-content .contacts-tabs__map:after{display:none !important;content:none !important;}.legacy-content .contacts-tabs__map__wrap{height:clamp(260px,35vw,460px) !important;}.legacy-content .contacts-tabs__map .map{height:100% !important;}.legacy-content .contacts-tabs__map .map__content{display:block !important;height:100% !important;}.legacy-content .contacts-tabs__map .map__content img{display:block !important;width:100% !important;height:100% !important;object-fit:cover !important;}.legacy-content .hot-line-heading{margin-top:40px !important;}.legacy-content .contacts-tabs__background .is-invisible--js,.legacy-content .contacts-tabs__background .is-hidden--no-js{visibility:visible !important;opacity:1 !important;display:block !important;}</style>${html}`;
  }

  return `<div class="legacy-content">${html}</div>`;
}

function extractLegacyHeadStyles(rawHtml: string): string {
  // Some legacy pages (e.g. about/services) keep critical visual overrides in <head>.
  const headMatch = rawHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const head = headMatch?.[1] ?? "";
  if (!head) {
    return "";
  }

  const styleMatches = head.match(/<style\b[^>]*>[\s\S]*?<\/style>/gi) ?? [];
  return styleMatches.join("\n");
}

export function loadLegacyMainContent(legacyPath: string, routeKey: string): LegacyPageData {
  const filePath = join(process.cwd(), "public", legacyPath.replace(/^\/+/, ""));
  const rawHtml = readFileSync(filePath, "utf-8");

  const titleMatch = rawHtml.match(/<title>([\s\S]*?)<\/title>/i);
  const rawTitle = titleMatch?.[1]?.replace(/\s+/g, " ").trim() || "Blueflare Energy";
  const title = rawTitle
    .replace(/Naftagaz/gi, "Blueflare")
    .replace(/Нафтогаз/gi, "Blueflare")
    .replace(/НафтаГаз/gi, "Blueflare")
    .replace(/\uFFFD/g, "");

  const mainMatch = rawHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const mainInner = mainMatch?.[1] || "";
  const rewritten = rewriteHrefs(mainInner, legacyPath);
  const customStyles = extractLegacyHeadStyles(rawHtml);
  const bodyHtml = `${customStyles}${cleanLegacyMain(rewritten, routeKey)}`;

  const hero = HERO_CONTENT[routeKey] ?? HERO_CONTENT[""];

  return {
    title,
    subtitle: hero.subtitle,
    bodyHtml,
  };
}
