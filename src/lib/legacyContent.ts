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

// "Top-Notch Services" — horizontal-scroll cards section. Header has a small
// pill + two-line headline; cards have number, icon, title, body, learn-more
// link. Cards scroll horizontally with snap points; the JS rotator (added
// elsewhere) handles next/prev arrow navigation.
const servicesSectionHtml = `
<section class="services-strip" data-scroll-section>
  <div class="container-h container-v-averaged">
    <div class="services-strip__header">
      <h2 class="services-strip__headline">Blueflare Energy Pillars of Service</h2>
      <p class="services-strip__subheading">Three core capabilities that define how we deliver value &mdash; from the first procurement order to the last technical sign-off.</p>
    </div>
    <div class="services-strip__viewport">
      <div class="services-strip__track">
        <div class="service-card-frame"><article class="service-card is-not-revealed">
          <div class="service-card__top">
            <span class="service-card__num">01</span>
            <span class="service-card__icon" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8l9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="m3 8 9 5 9-5"/></svg>
            </span>
          </div>
          <h3 class="service-card__title">Strategic Procurement</h3>
          <p class="service-card__body">Global sourcing of OEM parts, heavy machinery, and specialized tools with streamlined clearing and delivery.</p>
          <a href="/services" class="service-card__link">Learn more &rarr;</a>
        </article></div>
        <div class="service-card-frame"><article class="service-card is-not-revealed">
          <div class="service-card__top">
            <span class="service-card__num">02</span>
            <span class="service-card__icon" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </span>
          </div>
          <h3 class="service-card__title">Technical Support</h3>
          <p class="service-card__body">On-site maintenance, installation, and engineering services backed by a highly skilled local workforce.</p>
          <a href="/services" class="service-card__link">Learn more &rarr;</a>
        </article></div>
        <div class="service-card-frame"><article class="service-card is-not-revealed">
          <div class="service-card__top">
            <span class="service-card__num">03</span>
            <span class="service-card__icon" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="13" height="11" rx="1"/><path d="M14 9h4l3 3v5h-7"/><circle cx="6" cy="19" r="2"/><circle cx="17" cy="19" r="2"/></svg>
            </span>
          </div>
          <h3 class="service-card__title">Supply Chain Management</h3>
          <p class="service-card__body">End-to-end logistics that minimise lead times and maximise project efficiency.</p>
          <a href="/services" class="service-card__link">Learn more &rarr;</a>
        </article></div>
      </div>
    </div>
  </div>
</section>
`;

// Vision/Mission split section — two horizontal cards side by side. Vision
// uses a multi-color gradient backdrop, Mission uses solid dark. Both cards
// share the same content layout: title (top-left), body, tagline + arrow
// (bottom row). Edit copy here.
const visionMissionSectionHtml = `
<section class="vm-section" data-scroll-section>
  <div class="container-h container-v-averaged">
    <div class="vm-section__grid">
      <article class="vm-card vm-card--vision">
        <div class="vm-card__bg" aria-hidden="true"></div>
        <div class="vm-card__content">
          <h3 class="vm-card__title">Vision</h3>
          <p class="vm-card__body">To be Africa&rsquo;s most trusted integrated energy partner, recognised for bridge building between global standards and local operational needs.</p>
          <div class="vm-card__footer">
            <span class="vm-card__tag">Blueflare Energy &mdash; Forward Together</span>
            <span class="vm-card__arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </article>
      <article class="vm-card vm-card--mission">
        <div class="vm-card__content">
          <h3 class="vm-card__title">Mission</h3>
          <p class="vm-card__body">To provide world class technical and seamless procurement services to the Nigerian energy sector through innovative engineering, local talent development, and a steadfast commitment to operational safety and environmental responsibility.</p>
          <div class="vm-card__footer">
            <span class="vm-card__tag">Precise. Reliable. Local.</span>
            <span class="vm-card__arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>
`;

// Auto-scrolling image marquee — placed just above the core values section.
// The track holds each image TWICE; CSS animates the track from 0 to -50%
// translation so the second copy seamlessly takes over once the first fully
// scrolls off, creating an infinite loop.
const imageMarqueeSectionHtml = `
<section class="image-marquee" data-scroll-section>
  <div class="image-marquee__track">
    <div class="image-marquee__item"><img src="https://images.pexels.com/photos/162568/oil-pump-jack-sunset-clouds-silhouette-162568.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Oil pump jack at sunset" /></div>
    <div class="image-marquee__item"><img src="https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Industrial pipeline network" /></div>
    <div class="image-marquee__item"><img src="https://images.pexels.com/photos/15970032/pexels-photo-15970032.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Refinery facility at dusk" /></div>
    <div class="image-marquee__item"><img src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Engineer reviewing plans on site" /></div>
    <div class="image-marquee__item"><img src="https://images.pexels.com/photos/8487338/pexels-photo-8487338.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Worker in personal protective equipment" /></div>
    <div class="image-marquee__item"><img src="https://images.pexels.com/photos/29787613/pexels-photo-29787613.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Operational energy site" /></div>
    <div class="image-marquee__item" aria-hidden="true"><img src="https://images.pexels.com/photos/162568/oil-pump-jack-sunset-clouds-silhouette-162568.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" /></div>
    <div class="image-marquee__item" aria-hidden="true"><img src="https://images.pexels.com/photos/257700/pexels-photo-257700.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" /></div>
    <div class="image-marquee__item" aria-hidden="true"><img src="https://images.pexels.com/photos/15970032/pexels-photo-15970032.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" /></div>
    <div class="image-marquee__item" aria-hidden="true"><img src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" /></div>
    <div class="image-marquee__item" aria-hidden="true"><img src="https://images.pexels.com/photos/8487338/pexels-photo-8487338.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" /></div>
    <div class="image-marquee__item" aria-hidden="true"><img src="https://images.pexels.com/photos/29787613/pexels-photo-29787613.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="" /></div>
  </div>
</section>
`;

// Culture / values section — six-card grid placed at the end of the home
// legacy body, just before the footer. Styled in globals.css under
// `.culture-section`. Each card has a simple inline SVG icon, title, and
// description. Edit content/icons here.
const cultureSectionHtml = `
<section class="culture-section" data-scroll-section>
  <div class="container-h container-v-averaged">
    <div class="culture-section__header">
      <h2 class="culture-section__headline">Our Core Values</h2>
      <p class="culture-section__subtitle">The principles that guide every project, partnership, and decision at Blueflare Energy.</p>
    </div>
    <div class="culture-section__grid">
      <article class="culture-card">
        <span class="culture-card__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>
        </span>
        <h3 class="culture-card__title">Precision</h3>
        <p class="culture-card__body">Accuracy in procurement and technical execution to ensure zero downtime.</p>
      </article>
      <article class="culture-card">
        <span class="culture-card__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14 4.5 19.5a4.243 4.243 0 0 1-6-6L4 8"/><path d="M14 10l5.5-5.5a4.243 4.243 0 0 1 6 6L20 16" transform="translate(-1.5 0)"/><path d="M9.5 14.5 14.5 9.5"/></svg>
        </span>
        <h3 class="culture-card__title">Reliability</h3>
        <p class="culture-card__body">A commitment to being the consistent link in our clients' supply chains.</p>
      </article>
      <article class="culture-card">
        <span class="culture-card__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="1.6"/><path d="M9 4V3h6v1"/><path d="m9 12 2 2 4-4"/></svg>
        </span>
        <h3 class="culture-card__title">Accountability</h3>
        <p class="culture-card__body">Taking full ownership of project timelines and quality control.</p>
      </article>
      <article class="culture-card">
        <span class="culture-card__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
        </span>
        <h3 class="culture-card__title">Local Content Excellence</h3>
        <p class="culture-card__body">Championing Nigerian talent and resources to drive domestic growth.</p>
      </article>
      <article class="culture-card">
        <span class="culture-card__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.7 1 1.5 1 2.5v1h6v-1c0-1 .2-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg>
        </span>
        <h3 class="culture-card__title">Innovation</h3>
        <p class="culture-card__body">Utilizing smart logistics and modern engineering to solve complex energy challenges.</p>
      </article>
      <article class="culture-card">
        <span class="culture-card__icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 11.6a4.5 4.5 0 0 0-7.6-4.6 4.5 4.5 0 0 0-7.6 4.6L12 19l8.8-7.4z"/></svg>
        </span>
        <h3 class="culture-card__title">Customer Centric</h3>
        <p class="culture-card__body">Putting our clients at the heart of every decision &mdash; their success is our success.</p>
      </article>
    </div>
  </div>
</section>
`;

// Editorial-style testimonials section, styled in globals.css under
// `.testimonials-section`. Injected into the home page legacy HTML right after
// the geography section. Edit copy/portraits here.
const testimonialsSectionHtml = `
<section class="testimonials-section" data-scroll-section>
  <div class="container-h container-v-averaged">
    <div class="testimonials-section__header">
      <h2 class="testimonials-section__headline">
        A <em>Message</em> from <em>Management</em>
      </h2>
      <p class="testimonials-section__subheading">A direct word from the team driving Nigeria&rsquo;s energy future &mdash; on what Blueflare stands for and where we&rsquo;re headed.</p>
    </div>
    <div class="testimonials-section__body">
      <div class="testimonials-section__left">
        <div class="testimonials-section__featured">
          <picture>
            <img src="https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Featured testimonial portrait" />
          </picture>
        </div>
        <div class="testimonials-section__thumbs">
          <picture><img src="https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" /></picture>
          <picture><img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" /></picture>
        </div>
        <div class="testimonials-section__credit">
          <p class="testimonials-section__credit-name">AVA LIN</p>
          <p class="testimonials-section__credit-title">CREATIVE DIRECTOR,<br>SELAH STUDIO</p>
        </div>
      </div>
      <div class="testimonials-section__right">
        <span class="testimonials-section__quote-mark" aria-hidden="true">&ldquo;</span>
        <div class="testimonials-section__quote-body">
          <p>The Nigerian energy sector is evolving, and at Blueflare Energy, we are proud to be at the forefront of that evolution.</p>
          <p>Our journey began with a clear mission: to prove that a homegrown company can deliver procurement and servicing solutions that rival any global competitor. We understand the unique logistical and technical challenges of the Nigerian terrain, and we meet them with a blend of innovation, integrity, and relentless precision.</p>
          <p>To our clients, we are more than a vendor; we are a strategic asset. To our community, we are a beacon of local potential. As we continue to grow, our focus remains fixed on powering the industry through reliability and building a sustainable legacy for the next generation of African energy leaders.</p>
        </div>
        <p class="testimonials-section__quote-attrib">&mdash; The Executive Management Team, Blueflare Energy</p>
      </div>
    </div>
  </div>
</section>
`;

function cleanLegacyMain(mainHtml: string, routeKey: string): string {
  let html = mainHtml;

  // Remove legacy intro only for home; keep original top sections on other pages.
  if (!routeKey) {
    html = html.replace(/^\s*<section[^>]*\bintro\b[\s\S]*?<\/section>/i, "");
    html = html.replace(/\s*<section[^>]*\bvalues-hub\b[^>]*>[\s\S]*?<\/section>/i, "");
    // Strip the "A Message from Management" CEO/Chairman appeal section.
    html = html.replace(/\s*<section[^>]*\bid=(['"])ceo\1[^>]*>[\s\S]*?<\/section>/i, "");

    // Strip the legacy partners logo strip (Russian oil-co brand wall).
    html = html.replace(/\s*<section[^>]*\bpartners\b[^>]*>[\s\S]*?<\/section>/i, "");

    // Strip the social-duty section (legacy occupational-safety photo panel).
    html = html.replace(/\s*<section[^>]*\bsocial-duty\b[^>]*>[\s\S]*?<\/section>/i, "");

    // Strip the legacy Values section (Mission/Vision/Core Values tabs). It has
    // generic classes so we match it by the unique <h2>Values</h2> heading.
    html = html.replace(
      /\s*<section[^>]*>(?:(?!<\/section>)[\s\S])*?<h2>Values<\/h2>[\s\S]*?<\/section>/i,
      "",
    );

    // Image marquee row immediately above the culture/values section.
    html = html + imageMarqueeSectionHtml;

    // The next THREE sections — Culture, Vision/Mission, Message from
    // Management — are wrapped in a horizontal-scroll container. The user
    // scrolls vertically; JS reads the scroll progress and translates the
    // inner track horizontally. After the last panel finishes scrolling
    // sideways, vertical scroll resumes at the Services section. This
    // narrative-arc framing (values → vision → leadership voice) reads
    // more cinematically as a side-scrolling slideshow than as three
    // separate stacked sections. Mobile and reduced-motion users get a
    // CSS fallback to vertical stacking — see globals.css `.hscroll`.
    html =
      html +
      `<div class="hscroll" data-hscroll-panels="3"><div class="hscroll__pinned"><div class="hscroll__track">` +
      cultureSectionHtml +
      visionMissionSectionHtml +
      testimonialsSectionHtml +
      `</div></div></div>`;

    // Then the horizontal-scroll services strip.
    html = html + servicesSectionHtml;
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

  // Brand/copy overrides for the home geography section.
  // - "Abuja" inside the Head Office subtitle becomes "Lagos, Nigeria".
  //   Targeted via the surrounding "Head Office<br><span>" context so we don't
  //   accidentally rename the SVG marker label or other Abuja references.
  // - "Our Projects" CTA below the map becomes "Sustainability" (matches both
  //   the desktop and mobile variants because the text node lives between tags).
  html = html.replace(
    /(Head Office<br>\s*<span>)Abuja(<\/span>)/g,
    "$1Lagos, Nigeria$2",
  );
  html = html.replace(/>Our Projects</g, ">Sustainability<");

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
