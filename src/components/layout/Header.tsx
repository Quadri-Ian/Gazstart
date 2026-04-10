"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import DropdownMenu from "./DropdownMenu";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const localePath = (path: string) => `/${locale}${path}`;

  const companyItems = [
    { label: t("about"), href: localePath("/company/about") },
    { label: t("sustainable"), href: localePath("/company/sustainable-development") },
  ];

  const serviceItems = [
    { label: t("drilling"), href: localePath("/services/drilling") },
    { label: t("service"), href: localePath("/services/service") },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-dark-900/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href={localePath("/")} className="text-2xl font-bold text-white">
          Gaz<span className="text-primary-500">Start</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          <DropdownMenu label={t("company")} items={companyItems} />
          <DropdownMenu label={t("services")} items={serviceItems} />
          <Link
            href={localePath("/press-center")}
            className="text-sm text-white/80 transition-colors hover:text-white"
          >
            {t("pressCenter")}
          </Link>
          <Link
            href={localePath("/careers")}
            className="text-sm text-white/80 transition-colors hover:text-white"
          >
            {t("careers")}
          </Link>
          <Link
            href={localePath("/procurement")}
            className="text-sm text-white/80 transition-colors hover:text-white"
          >
            {t("procurement")}
          </Link>
          <Link
            href={localePath("/contacts")}
            className="text-sm text-white/80 transition-colors hover:text-white"
          >
            {t("contacts")}
          </Link>
        </nav>

        {/* Language switcher */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={() => switchLocale("en")}
            className={`rounded px-2 py-1 text-sm transition-colors ${
              locale === "en" ? "font-semibold text-white" : "text-white/50 hover:text-white"
            }`}
          >
            EN
          </button>
          <span className="text-white/30">|</span>
          <button
            onClick={() => switchLocale("ru")}
            className={`rounded px-2 py-1 text-sm transition-colors ${
              locale === "ru" ? "font-semibold text-white" : "text-white/50 hover:text-white"
            }`}
          >
            RU
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="bg-dark-800 px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-2">
            <p className="mt-2 text-xs uppercase tracking-widest text-white/40">{t("company")}</p>
            {companyItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-1 pl-2 text-white/80 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <p className="mt-2 text-xs uppercase tracking-widest text-white/40">{t("services")}</p>
            {serviceItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-1 pl-2 text-white/80 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={localePath("/press-center")}
              className="py-1 text-white/80 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {t("pressCenter")}
            </Link>
            <Link
              href={localePath("/careers")}
              className="py-1 text-white/80 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {t("careers")}
            </Link>
            <Link
              href={localePath("/procurement")}
              className="py-1 text-white/80 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {t("procurement")}
            </Link>
            <Link
              href={localePath("/contacts")}
              className="py-1 text-white/80 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {t("contacts")}
            </Link>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => switchLocale("en")}
                className={locale === "en" ? "font-bold text-white" : "text-white/50"}
              >
                EN
              </button>
              <span className="text-white/30">|</span>
              <button
                onClick={() => switchLocale("ru")}
                className={locale === "ru" ? "font-bold text-white" : "text-white/50"}
              >
                RU
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
