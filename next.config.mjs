import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "blueflare.com",
			},
			{
				protocol: "https",
				hostname: "images.pexels.com",
			},
		],
	},
	async rewrites() {
		return {
			beforeFiles: [
				// Clean main URLs — served directly from legacy HTML without redirect
				{ source: "/", destination: "/legacy/naftagaz.com/en/index.html" },
				{ source: "/index.html", destination: "/legacy/naftagaz.com/en/index.html" },
				{ source: "/services", destination: "/legacy/naftagaz.com/en/services/service/index.html" },
				{ source: "/our-story", destination: "/legacy/naftagaz.com/en/company/our-story/index.html" },
				{ source: "/sustainability", destination: "/legacy/naftagaz.com/en/company/sustainable_development/index.html" },
				{ source: "/contacts", destination: "/legacy/naftagaz.com/en/contacts/index.html" },
				{ source: "/news", destination: "/legacy/naftagaz.com/en/news/index.html" },
				{ source: "/careers", destination: "/legacy/naftagaz.com/en/career/hall-of-fame/index.html" },
				{ source: "/hotline", destination: "/legacy/naftagaz.com/en/hotline/index.html" },
				{ source: "/our-people", destination: "/legacy/naftagaz.com/en/company/our-people/index.html" },
				{ source: "/our-business", destination: "/legacy/naftagaz.com/en/company/our-business/index.html" },
				{ source: "/our-governance", destination: "/legacy/naftagaz.com/en/company/our-governance/index.html" },
				{ source: "/drilling", destination: "/legacy/naftagaz.com/en/services/driling/index.html" },
				{ source: "/privacy", destination: "/legacy/naftagaz.com/en/privacy/index.html" },
				// Catch-all for internal relative-link navigation from HTML pages
				{ source: "/:path+/index.html", destination: "/legacy/naftagaz.com/en/:path/index.html" },
			],
		};
	},
};

export default withNextIntl(nextConfig);
