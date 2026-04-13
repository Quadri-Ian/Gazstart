import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Blueflare Energy — Oil & Gas Services",
    template: "%s | Blueflare Energy",
  },
  description:
    "Blueflare Energy provides world-class drilling and oilfield services for the energy industry.",
  openGraph: {
    type: "website",
    siteName: "Blueflare Energy",
    title: "Blueflare Energy — Oil & Gas Services",
    description:
      "Blueflare Energy provides world-class drilling and oilfield services for the energy industry.",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ru")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-dark-900 text-white antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
