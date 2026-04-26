import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";

const FIX_LINKS_SCRIPT = `
<script>
(function() {
  const urlMap = {
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
    "career/index.html": "/careers",
    "career/hall-of-fame/index.html": "/careers",
    "hotline/index.html": "/hotline",
    "privacy/index.html": "/privacy"
  };

  function normalizeHref(href) {
    let normalized = href.trim();

    try {
      normalized = new URL(normalized, window.location.href).pathname;
    } catch {
      // keep raw href if it is not a valid URL format
    }

    normalized = normalized.replace(/^\/+/, "");
    normalized = normalized.replace(/^(en|ru)\//, "");
    normalized = normalized.replace(/^\.\//, "");

    while (normalized.startsWith("../")) {
      normalized = normalized.slice(3);
    }

    return normalized;
  }

  function mapToCleanPath(normalizedHref) {
    const cleanUrl = urlMap[normalizedHref];
    if (cleanUrl) return cleanUrl;

    if (normalizedHref.endsWith('/index.html')) {
      const withoutIndex = normalizedHref.slice(0, -'/index.html'.length);
      const indexed = urlMap[withoutIndex + '/index.html'];
      if (indexed) return indexed;
    }

    if (normalizedHref.startsWith('company/')) {
      if (normalizedHref.includes('sustainable_development')) return '/sustainability';
      if (normalizedHref.includes('sustainable-development')) return '/sustainability';
      if (normalizedHref.includes('our-story')) return '/our-story';
      if (normalizedHref.includes('our-people')) return '/our-people';
      if (normalizedHref.includes('our-business')) return '/our-business';
      if (normalizedHref.includes('our-governance')) return '/our-governance';
      return '/our-story';
    }

    if (normalizedHref.startsWith('career/')) {
      return '/careers';
    }

    if (!normalizedHref.startsWith('/')) {
      const firstPart = normalizedHref.split('/')[0];
      if (firstPart === 'company') return '/our-story';
      if (firstPart === 'services') return '/services';
      if (firstPart === 'career') return '/careers';
      if (firstPart === 'news') return '/news';
      if (firstPart === 'contacts') return '/contacts';
    }

    return null;
  }

  function shouldSkipLink(href) {
    return (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      href.startsWith('/local') ||
      href.startsWith('/bitrix') ||
      href.startsWith('/mc.yandex.ru')
    );
  }

  function rewriteAnchor(anchor) {
    if (!anchor || typeof anchor.getAttribute !== 'function') return;

    const href = anchor.getAttribute('href');
    if (!href || shouldSkipLink(href)) return;

    const normalizedHref = normalizeHref(href);
    if (!normalizedHref) return;

    let mapped = mapToCleanPath(normalizedHref);

    // Some mirrored pages contain hard-rewritten wrong href values (for example
    // Services -> /). Correct core nav labels deterministically.
    if (!mapped || mapped === '/') {
      const text = (anchor.textContent || '').trim().toLowerCase();
      if (text === 'services') mapped = '/services';
      else if (text === 'home') mapped = '/';
      else if (text === 'sustainability') mapped = '/sustainability';
      else if (text === 'careers') mapped = '/careers';
      else if (text === 'contact us' || text === 'contacts') mapped = '/contacts';
    }

    if (mapped && href !== mapped) {
      anchor.setAttribute('href', mapped);
      if (anchor.hasAttribute('data-href')) {
        anchor.setAttribute('data-href', mapped);
      }
    }
  }

  function rewriteAllAnchors(root) {
    if (!root || typeof root.querySelectorAll !== 'function') return;
    root.querySelectorAll('a[href]').forEach(rewriteAnchor);
  }

  rewriteAllAnchors(document);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.target instanceof Element) {
        if (mutation.target.matches('a[href]')) {
          rewriteAnchor(mutation.target);
        }
        return;
      }

      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node.matches('a[href]')) rewriteAnchor(node);
        rewriteAllAnchors(node);
      });
    });
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['href', 'data-href']
  });

  const rewriteFromPointerTarget = function(event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest('a[href]');
    if (anchor) rewriteAnchor(anchor);
  };

  document.addEventListener('mouseover', rewriteFromPointerTarget, true);
  document.addEventListener('focusin', rewriteFromPointerTarget, true);

  // Legacy scripts can re-apply old hrefs after initial render; keep correcting briefly.
  let safetyPasses = 0;
  const safetyInterval = window.setInterval(function() {
    rewriteAllAnchors(document);
    safetyPasses += 1;
    if (safetyPasses > 80) {
      window.clearInterval(safetyInterval);
    }
  }, 250);

  document.addEventListener('click', function(event) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const anchor = target.closest('a[href]');
    if (!anchor) return;

    rewriteAnchor(anchor);

    const href = anchor.getAttribute('href');
    if (!href) return;

    if (shouldSkipLink(href)) {
      return;
    }

    let nextUrl;
    try {
      nextUrl = new URL(anchor.href, window.location.origin);
    } catch {
      return;
    }

    if (nextUrl.origin !== window.location.origin) return;

    // If the target is the same page (same pathname + search, no hash), don't
    // reload — just scroll to the top smoothly. A full reload on the same URL
    // causes the Bitrix preloader's image-preload queue (jt()) to get stuck,
    // which prevents stickyHeader/popover/appear plugins from initialising and
    // leaves the page with an invisible header and hidden images.
    const isSamePage =
      nextUrl.pathname === window.location.pathname &&
      nextUrl.search === window.location.search &&
      !nextUrl.hash;

    if (isSamePage) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    event.preventDefault();
    window.location.assign(nextUrl.pathname + nextUrl.search + nextUrl.hash);
  }, true);

  // ── Preloader completion guard ──────────────────────────────────────────
  // Bitrix plugin initialisation is gated on the preloader firing
  // "complete.preloader".  On cold loads the preloader's internal jt()
  // image queue waits for every appear element's image (loaded lazily from
  // an external CDN) which can take several seconds.  If the preloader has
  // not hidden itself 4 seconds after window.load, we force-complete it so
  // that stickyHeader, popover, appear and all other plugins always
  // initialise and the header is never left at opacity:0.
  (function() {
    function forceCompletePreloader() {
      var overlay = document.querySelector('.js-preloader');
      if (!overlay) return;

      // Already hidden — plugins should be running fine.
      if (overlay.classList.contains('is-hidden')) return;
      if (overlay.getAttribute('aria-hidden') === 'true') return;

      // Force the overlay hidden.
      overlay.setAttribute('aria-hidden', 'true');
      overlay.classList.add('is-hidden');

      // Trigger the jQuery event the plugin system listens to.
      if (window.jQuery) {
        window.jQuery(overlay).trigger('complete.preloader');
        // Also run the full body.plugins() init in case the one-time listener
        // already fired but body.plugins was not called yet.
        if (window.jQuery.fn && window.jQuery.fn.plugins) {
          window.jQuery('body').plugins({ isPageLoadEvent: true, isAjaxPageLoadEvent: false });
        }
      }

      // Ensure the sticky header becomes visible regardless of plugin state.
      var header = document.querySelector('.js-header');
      if (header) {
        header.classList.add('header--sticky--enabled');
      }
    }

    // Give the preloader 4 s after window.load to complete on its own.
    if (document.readyState === 'complete') {
      setTimeout(forceCompletePreloader, 4000);
    } else {
      window.addEventListener('load', function() {
        setTimeout(forceCompletePreloader, 4000);
      });
    }
  })();
})();
</script>
`;

function stripFaviconLinks(html: string): string {
  return html
    .replace(/<link[^>]*rel=["'](?:shortcut\s+icon|icon|apple-touch-icon(?:-precomposed)?)?["'][^>]*>/gi, "")
    .replace(/<link[^>]*rel=["'][^"']*(?:icon|mask-icon)[^"']*["'][^>]*>/gi, "");
}

function stripCookieUi(html: string): string {
  return html
    // Cookie alert CSS/JS payloads
    .replace(/<link[^>]*arturgolubev\.cookiealert[^>]*>/gi, "")
    .replace(/<script[^>]*arturgolubev\.cookiealert[^>]*><\/script>/gi, "")
    .replace(/<script>\s*var\s+agcookie_params[\s\S]*?<\/script>/gi, "")
    // Mirrored cookie consent scripts
    .replace(/<script>[\s\S]*?cookieConsentStatus[\s\S]*?<\/script>/gi, "")
    // Rendered cookie banner block
    .replace(/<!--noindex-->[\s\S]*?ag_cookie_alert_window[\s\S]*?<!--\/noindex-->/gi, "")
    // Fallback: remove any top-level cookie consent node by id
    .replace(/<[^>]*id=["']cookie-consent["'][\s\S]*?<\/[^>]+>/gi, "");
}

function stripBrowserMessageUi(html: string): string {
  return html
    // Remove the full browser-messages wrapper (cookie + browser warning bar)
    // that appears right after <body> and before the preloader.
    .replace(/<div\s+class=["']browser-messages["'][^>]*>[\s\S]*?(?=<div\s+class=["']page-transition-overlay)/gi, "")
    // Extra fallbacks for pages with slight markup differences.
    .replace(/<div[^>]*class=["'][^"']*browser-messages[^"']*["'][^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, "")
    .replace(/<[^>]*id=["']browser-message["'][\s\S]*?<\/[^>]+>/gi, "")
    // Remove browser message scripts (showMessage/hideMessage handlers).
    .replace(/<script>[\s\S]*?browser-message[\s\S]*?<\/script>/gi, "")
    .replace(/<script>[\s\S]*?js-browser-message-close[\s\S]*?<\/script>/gi, "")
    .replace(/<script[^>]*>\s*\(function\s*\(\)\s*\{[\s\S]*?checkCssVariables\(\)[\s\S]*?<\/script>/gi, "");
}

function stripConflictingHeaderFixScript(html: string): string {
  return html.replace(
    /<!--\s*Header visibility fix for Barba\.js transitions\s*-->\s*<script>[\s\S]*?<\/script>/gi,
    ""
  );
}

function rewriteBrandingText(html: string): string {
  // Keep lowercase path segments like /local/templates/naftagaz intact.
  return html
    .replace(/Naftagaz/g, "Blueflare")
    .replace(/NAFTAGAZ/g, "BLUEFLARE")
    .replace(/\/local\/templates\/naftagaz/gi, "/local/templates/blueflare")
    .replace(/naftagaz\.com/gi, "blueflare.com")
    .replace(/Нафтогаз/g, "Blueflare")
    .replace(/НафтаГаз/g, "Blueflare");
}

const SERVER_URL_MAP: Record<string, string> = {
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
  "career/index.html": "/careers",
  "career/hall-of-fame/index.html": "/careers",
  "hotline/index.html": "/hotline",
  "privacy/index.html": "/privacy",
};

function getDocumentRelativePath(normalizedLegacyPath: string): string {
  const slashPath = normalizedLegacyPath.replace(/\\/g, "/");
  const localeMarker = "/en/";
  const localeIndex = slashPath.indexOf(localeMarker);

  if (localeIndex >= 0) {
    const afterLocale = slashPath.slice(localeIndex + localeMarker.length);
    return afterLocale || "index.html";
  }

  return slashPath;
}

function normalizeServerHref(href: string, documentRelativePath: string): string {
  let normalized = href.trim();

  try {
    if (/^https?:\/\//i.test(normalized)) {
      normalized = new URL(normalized).pathname;
    } else {
      const baseUrl = new URL("https://legacy.local/" + documentRelativePath);
      normalized = new URL(normalized, baseUrl).pathname;
    }
  } catch {
    // Keep original value if URL parsing fails
  }

  normalized = normalized.replace(/^\/+/, "");
  normalized = normalized.replace(/^(en|ru)\//, "");
  normalized = normalized.replace(/^\.\//, "");

  while (normalized.startsWith("../")) {
    normalized = normalized.slice(3);
  }

  return normalized;
}

function mapServerHref(normalizedHref: string): string | null {
  const direct = SERVER_URL_MAP[normalizedHref];
  if (direct) return direct;

  if (normalizedHref.startsWith("company/")) {
    if (normalizedHref.includes("sustainable_development")) return "/sustainability";
    if (normalizedHref.includes("sustainable-development")) return "/sustainability";
    if (normalizedHref.includes("our-story")) return "/our-story";
    if (normalizedHref.includes("our-people")) return "/our-people";
    if (normalizedHref.includes("our-business")) return "/our-business";
    if (normalizedHref.includes("our-governance")) return "/our-governance";
    return "/our-story";
  }

  if (normalizedHref.startsWith("career/")) return "/careers";
  if (normalizedHref.startsWith("services/")) return "/services";
  if (normalizedHref.startsWith("contacts/")) return "/contacts";
  if (normalizedHref.startsWith("news/")) return "/news";

  return null;
}

function rewriteHrefAttributes(html: string, normalizedLegacyPath: string): string {
  const documentRelativePath = getDocumentRelativePath(normalizedLegacyPath);

  return html.replace(/href=(['"])(.*?)\1/gi, (full, quote: string, href: string) => {
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

    const normalizedHref = normalizeServerHref(href, documentRelativePath);
    if (!normalizedHref) return full;

    const mapped = mapServerHref(normalizedHref);
    if (!mapped) return full;

    return `href=${quote}${mapped}${quote}`;
  });
}

function injectEnhancements(html: string, normalizedLegacyPath: string): string {
  const withoutFavicons = stripFaviconLinks(html);
  const withoutCookies = stripCookieUi(withoutFavicons);
  const withoutBrowserMessage = stripBrowserMessageUi(withoutCookies);
  const withoutHeaderConflictScript = stripConflictingHeaderFixScript(withoutBrowserMessage);
  const withBrandingUpdated = rewriteBrandingText(withoutHeaderConflictScript);
  const rewrittenHtml = rewriteHrefAttributes(withBrandingUpdated, normalizedLegacyPath);

  if (rewrittenHtml.includes("</body>")) {
    return rewrittenHtml.replace("</body>", FIX_LINKS_SCRIPT + "</body>");
  }

  return rewrittenHtml + FIX_LINKS_SCRIPT;
}

export function serveLegacyHtml(legacyPath: string): NextResponse {
  const normalizedPath = legacyPath.replace(/^\/+/, "");
  const filePath = join(process.cwd(), "public", normalizedPath);

  try {
    const html = readFileSync(filePath, "utf-8");
    return new NextResponse(injectEnhancements(html, normalizedPath), {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch {
    return new NextResponse("404 Not Found", { status: 404 });
  }
}
