"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import DropdownMenu from "./DropdownMenu";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hotlineOpen, setHotlineOpen] = useState(false);

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

  const hotlineItems = [
    { label: t("securityHotlineAnti") },
    { label: t("securityHotlineReport") },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-dark-800">
      {/* ── Row 1: Logo + contact bar ── */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href={localePath("/")} className="text-xl font-black uppercase tracking-wider text-white">
          GazStart
        </Link>

        {/* Right: phone + hotline + locale — desktop only */}
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={`tel:${t("phone").replace(/\s/g, "")}`}
            className="text-sm font-medium text-white/80 tracking-wide transition-colors hover:text-white"
          >
            {t("phone")}
          </a>

          {/* Security Hotline dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setHotlineOpen(true)}
              onMouseLeave={() => setHotlineOpen(false)}
              onClick={() => setHotlineOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded border border-white/20 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              {t("securityHotline")}
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${hotlineOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {hotlineOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  onMouseEnter={() => setHotlineOpen(true)}
                  onMouseLeave={() => setHotlineOpen(false)}
                  className="absolute right-0 top-full mt-1 w-52 rounded border border-white/10 bg-dark-800 py-1 shadow-2xl"
                >
                  {hotlineItems.map((item) => (
                    <button
                      key={item.label}
                      className="block w-full px-4 py-2 text-left text-xs text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Locale switcher — pill style */}
          <div className="flex items-center overflow-hidden rounded border border-white/20 text-xs font-semibold">
            <button
              onClick={() => switchLocale("en")}
              className={`px-3 py-1.5 transition-colors ${
                locale === "en"
                  ? "bg-white text-dark-800"
                  : "text-white/60 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => switchLocale("ru")}
              className={`px-3 py-1.5 transition-colors ${
                locale === "ru"
                  ? "bg-white text-dark-800"
                  : "text-white/60 hover:text-white"
              }`}
            >
              RU
            </button>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="text-white lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* ── Separator ── */}
      <div className="border-t border-white/10" />

      {/* ── Row 2: Navigation — desktop only ── */}
      <nav className="hidden lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-3">
          <DropdownMenu label={t("company")} items={companyItems} />
          <DropdownMenu label={t("services")} items={serviceItems} />
          <Link
            href={localePath("/press-center")}
            className="text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            {t("pressCenter")}
          </Link>
          <Link
            href={localePath("/careers")}
            className="text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            {t("careers")}
          </Link>
          <Link
            href={localePath("/procurement")}
            className="text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            {t("procurement")}
          </Link>
          <Link
            href={localePath("/contacts")}
            className="text-sm font-medium text-white/75 transition-colors hover:text-white"
          >
            {t("contacts")}
          </Link>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="border-t border-white/10 bg-dark-800 px-6 pb-6">
              <div className="flex flex-col gap-1 pt-4">
                <p className="mb-1 text-xs uppercase tracking-widest text-white/40">{t("company")}</p>
                {companyItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-1.5 pl-3 text-sm text-white/80 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <p className="mb-1 mt-3 text-xs uppercase tracking-widest text-white/40">{t("services")}</p>
                {serviceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-1.5 pl-3 text-sm text-white/80 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-3 border-t border-white/10 pt-3" />
                {[
                  { label: t("pressCenter"), path: "/press-center" },
                  { label: t("careers"), path: "/careers" },
                  { label: t("procurement"), path: "/procurement" },
                  { label: t("contacts"), path: "/contacts" },
                ].map(({ label, path }) => (
                  <Link
                    key={path}
                    href={localePath(path)}
                    className="py-1.5 text-sm text-white/80 hover:text-white"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
                <div className="mt-4 flex items-center gap-3">
                  <a href={`tel:${t("phone").replace(/\s/g, "")}`} className="text-sm text-white/60">
                    {t("phone")}
                  </a>
                  <div className="ml-auto flex overflow-hidden rounded border border-white/20 text-xs font-semibold">
                    <button
                      onClick={() => switchLocale("en")}
                      className={`px-3 py-1.5 ${locale === "en" ? "bg-white text-dark-800" : "text-white/60"}`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => switchLocale("ru")}
                      className={`px-3 py-1.5 ${locale === "ru" ? "bg-white text-dark-800" : "text-white/60"}`}
                    >
                      RU
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
