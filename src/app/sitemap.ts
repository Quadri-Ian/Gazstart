import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blueflare.vercel.app";

const slugs = [
  "blueflare-secures-new-contracts",
  "safety-milestone-2025",
  "technology-innovation-awards",
  "arctic-operations-expansion",
  "esg-report-2025",
  "partnership-announcement",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "ru"];
  const pages = [
    "",
    "/company/about",
    "/company/sustainable-development",
    "/services/drilling",
    "/services/service",
    "/press-center",
    "/careers",
    "/procurement",
    "/contacts",
  ];

  const staticRoutes = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const newsRoutes = locales.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${baseUrl}/${locale}/press-center/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...newsRoutes];
}
