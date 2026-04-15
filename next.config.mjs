import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const LEGACY_LOCALE = "en";

const canonicalRoutes = [
  {
    canonical: "/:locale(en|ru)",
    legacy: `/legacy/naftagaz.com/${LEGACY_LOCALE}/index.html`,
  },
  {
    canonical: "/:locale(en|ru)/company",
    legacy: `/legacy/naftagaz.com/${LEGACY_LOCALE}/company/index.html`,
  },
  {
    canonical: "/:locale(en|ru)/company/sustainable-development",
    legacy: `/legacy/naftagaz.com/${LEGACY_LOCALE}/company/sustainable_development/index.html`,
  },
  {
    canonical: "/:locale(en|ru)/services",
    legacy: `/legacy/naftagaz.com/${LEGACY_LOCALE}/services/service/index.html`,
  },
  {
    canonical: "/:locale(en|ru)/services/drilling",
    legacy: `/legacy/naftagaz.com/${LEGACY_LOCALE}/services/driling/index.html`,
  },
  {
    canonical: "/:locale(en|ru)/contacts",
    legacy: `/legacy/naftagaz.com/${LEGACY_LOCALE}/contacts/index.html`,
  },
  {
    canonical: "/:locale(en|ru)/hotline",
    legacy: `/legacy/naftagaz.com/${LEGACY_LOCALE}/hotline/index.html`,
  },
  {
    canonical: "/:locale(en|ru)/privacy",
    legacy: `/legacy/naftagaz.com/${LEGACY_LOCALE}/privacy/index.html`,
  },
  {
    canonical: "/:locale(en|ru)/press-center",
    legacy: `/legacy/naftagaz.com/${LEGACY_LOCALE}/news/index.html`,
  },
  {
    canonical: "/:locale(en|ru)/press-center/:slug*",
    legacy: `/legacy/naftagaz.com/${LEGACY_LOCALE}/news/:slug*/index.html`,
  },
  {
    canonical: "/:locale(en|ru)/careers",
    legacy: `/legacy/naftagaz.com/${LEGACY_LOCALE}/career/index.html`,
  },
  {
    canonical: "/:locale(en|ru)/careers/hall-of-fame",
    legacy: `/legacy/naftagaz.com/${LEGACY_LOCALE}/career/hall-of-fame/index.html`,
  },
];

const legacyAssetRoots = ["upload", "local", "assets", "bitrix"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "naftagaz.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/en/company/", permanent: false },
      { source: "/company", destination: "/en/company/", permanent: false },
      { source: "/services", destination: "/en/services/", permanent: false },
      { source: "/contacts", destination: "/en/contacts/", permanent: false },
      { source: "/careers", destination: "/en/careers/", permanent: false },
      { source: "/news", destination: "/en/press-center/", permanent: false },
      { source: "/privacy", destination: "/en/privacy/", permanent: false },
      {
        source: "/:locale(en|ru)/about",
        destination: "/:locale/company/",
        permanent: false,
      },
      {
        source: "/:locale(en|ru)/career",
        destination: "/:locale/careers/",
        permanent: false,
      },
      {
        source: "/:locale(en|ru)/career/hall-of-fame",
        destination: "/:locale/careers/hall-of-fame/",
        permanent: false,
      },
      {
        source: "/:locale(en|ru)/news",
        destination: "/:locale/press-center/",
        permanent: false,
      },
      {
        source: "/:locale(en|ru)/services/service",
        destination: "/:locale/services/",
        permanent: false,
      },
      {
        source: "/:locale(en|ru)/services/driling",
        destination: "/:locale/services/drilling/",
        permanent: false,
      },
      {
        source: "/:locale(en|ru)/company/about",
        destination: "/:locale/company/",
        permanent: false,
      },
      {
        source: "/:locale(en|ru)/company/sustainable_development",
        destination: "/:locale/company/sustainable-development/",
        permanent: false,
      },
      {
        source: "/:locale(en|ru)/procurement",
        destination: "https://etp.naftagaz.com/",
        permanent: false,
      },
      {
        source: "/:locale(en|ru)/:path*/index.html",
        destination: "/:locale/:path*/",
        permanent: false,
      },
      {
        source: "/legacy/naftagaz.com/:locale(en|ru)/index.html",
        destination: "/:locale/",
        permanent: false,
      },
      {
        source: "/legacy/naftagaz.com/:locale(en|ru)/company/index.html",
        destination: "/:locale/company/",
        permanent: false,
      },
      {
        source: "/legacy/naftagaz.com/:locale(en|ru)/company/sustainable_development/index.html",
        destination: "/:locale/company/sustainable-development/",
        permanent: false,
      },
      {
        source: "/legacy/naftagaz.com/:locale(en|ru)/services/service/index.html",
        destination: "/:locale/services/",
        permanent: false,
      },
      {
        source: "/legacy/naftagaz.com/:locale(en|ru)/services/driling/index.html",
        destination: "/:locale/services/drilling/",
        permanent: false,
      },
      {
        source: "/legacy/naftagaz.com/:locale(en|ru)/contacts/index.html",
        destination: "/:locale/contacts/",
        permanent: false,
      },
      {
        source: "/legacy/naftagaz.com/:locale(en|ru)/hotline/index.html",
        destination: "/:locale/hotline/",
        permanent: false,
      },
      {
        source: "/legacy/naftagaz.com/:locale(en|ru)/privacy/index.html",
        destination: "/:locale/privacy/",
        permanent: false,
      },
      {
        source: "/legacy/naftagaz.com/:locale(en|ru)/news/:slug*/index.html",
        destination: "/:locale/press-center/:slug*/",
        permanent: false,
      },
      {
        source: "/legacy/naftagaz.com/:locale(en|ru)/career/index.html",
        destination: "/:locale/careers/",
        permanent: false,
      },
      {
        source: "/legacy/naftagaz.com/:locale(en|ru)/career/hall-of-fame/index.html",
        destination: "/:locale/careers/hall-of-fame/",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    const ORIGIN = "https://naftagaz.com";
    const proxy = (pattern) => ({
      source: pattern,
      destination: `${ORIGIN}${pattern}`,
    });

    return {
      beforeFiles: [
        ...legacyAssetRoots.map((root) => ({
          source: `/legacy/naftagaz.com/${root}/:path*`,
          destination: `/${root}/:path*`,
        })),
        ...canonicalRoutes.map((route) => ({
          source: route.canonical,
          destination: route.legacy,
        })),
      ],
      fallback: [
        proxy("/upload/:path*"),
        proxy("/local/:path*"),
        proxy("/assets/:path*"),
        proxy("/bitrix/:path*"),
      ],
    };
  },
};

export default withNextIntl(nextConfig);
