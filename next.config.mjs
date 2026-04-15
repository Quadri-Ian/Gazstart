import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "naftagaz.com",
			},
		],
	},
	async rewrites() {
		const ORIGIN = "https://naftagaz.com";
		const proxy = (pattern) => ({
			source: pattern,
			destination: `${ORIGIN}${pattern}`,
		});
		return [
			proxy("/upload/:path*"),
			proxy("/local/:path*"),
			proxy("/assets/:path*"),
			proxy("/bitrix/:path*"),
		];
	},
};

export default withNextIntl(nextConfig);
