"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hotlineOpen, setHotlineOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const hotlineTimer = useRef<ReturnType<typeof setTimeout>>();
  const companyTimer = useRef<ReturnType<typeof setTimeout>>();
  const servicesTimer = useRef<ReturnType<typeof setTimeout>>();

  const open = (setter: (v: boolean) => void, timer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) => {
    clearTimeout(timer.current);
    setter(true);
  };
  const close = (setter: (v: boolean) => void, timer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>) => {
    timer.current = setTimeout(() => setter(false), 120);
  };

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const localePath = (path: string) => `/${locale}${path}`;
  const otherLocale = locale === "en" ? "ru" : "en";
  const otherLocaleLabel = locale === "en" ? "Рu" : "En";

  const companyItems = [
    { label: t("about"), href: localePath("/company/about") },
    { label: t("sustainable"), href: localePath("/company/sustainable-development") },
  ];

  const serviceItems = [
    { label: t("drilling"), href: localePath("/services/drilling") },
    { label: t("service"), href: localePath("/services/service") },
  ];

  const plainLinks = [
    { label: t("pressCenter"), href: localePath("/press-center") },
    { label: t("careers"), href: localePath("/careers") },
    { label: t("procurement"), href: localePath("/procurement") },
    { label: t("contacts"), href: localePath("/contacts") },
  ];

  return (
    <header className="header fixed top-0 z-50 w-full bg-dark-900">

      {/* ══ Row 1: header__primary — Logo + Contact bar ══ */}
      <div className="header__primary border-b border-white/10">
        <div className="container-h mx-auto flex max-w-[1680px] items-center px-5 sm:px-[60px] lg:px-[140px]" id="header">

          {/* Logo */}
          <Link
            href={localePath("/")}
            className="header__logo mr-auto flex items-center py-[18px] text-white"
            title="GazStart"
          >
            <span className="text-[17px] font-semibold tracking-[0.12em] uppercase text-white">
              GAZSTART
            </span>
          </Link>

          {/* Mobile: hamburger (hidden on desktop) */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center border border-white/25 text-white transition-colors duration-300 hover:border-white/50"
              aria-label="Open navigation menu"
            >
              {mobileOpen ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <line x1="0" y1="0" x2="14" y2="14" stroke="currentColor" strokeWidth="1.4" />
                  <line x1="14" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              ) : (
                <svg width="17" height="6" viewBox="0 0 17 6" fill="none">
                  <line x1="0" y1="1" x2="17" y2="1" stroke="currentColor" strokeWidth="1.4" />
                  <line x1="0" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop: phone + hotline + language (hidden on mobile) */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+74955891200"
              className="header__phone text-[13px] text-white/75 transition-colors duration-[400ms] hover:text-white"
            >
              {t("phone")}
            </a>

            {/* Security Hotline button + popover */}
            <div className="relative">
              <button
                id="security-hotline"
                onMouseEnter={() => open(setHotlineOpen, hotlineTimer)}
                onMouseLeave={() => close(setHotlineOpen, hotlineTimer)}
                className="flex items-center gap-2 border border-white/30 px-3.5 py-1.5 text-[13px] text-white/75 transition-all duration-[400ms] hover:border-white/55 hover:text-white"
              >
                <span>{t("securityHotline")}</span>
                <svg
                  width="10" height="5" viewBox="0 0 10 5" fill="none"
                  className={`transition-transform duration-[400ms] ${hotlineOpen ? "rotate-180" : ""}`}
                >
                  <path d="M0 0L5 5L10 0" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>

              <AnimatePresence>
                {hotlineOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.74, 0.22, 0.99] }}
                    onMouseEnter={() => open(setHotlineOpen, hotlineTimer)}
                    onMouseLeave={() => close(setHotlineOpen, hotlineTimer)}
                    className="absolute right-0 top-full z-50 mt-[14px] w-[400px] bg-white shadow-2xl"
                  >
                    <div className="p-8">
                      <a
                        href="tel:88004447109"
                        className="block text-[38px] font-medium leading-none tracking-tight text-primary-600 transition-colors duration-[400ms] hover:text-dark-900"
                      >
                        8 800 444 71 09
                      </a>
                      <div className="security-hotline__line mt-5 border-t border-dark-900/10" />
                      <p className="mt-4 text-[12px] text-dark-600/60">
                        <span className="font-medium text-dark-900">Security Hotline</span>
                        <span className="mx-2 text-dark-900/25">|</span>
                        <span>Toll-free in Russia</span>
                      </p>
                      <p className="mt-3 text-[13px] leading-relaxed text-dark-900/65">
                        To inform on imminent crimes, actual or reasonably suspected economic, financial or goodwill damage to the interests and assets of the Group of Companies.
                      </p>
                      <Link
                        href={localePath("/contacts")}
                        className="mt-5 flex items-center justify-between border border-dark-900/15 px-4 py-3 text-[13px] font-medium text-dark-900 transition-all duration-[400ms] hover:bg-dark-900 hover:text-white"
                        onClick={() => setHotlineOpen(false)}
                      >
                        <span className="flex h-6 w-6 items-center justify-center bg-dark-900 text-[11px] text-white transition-colors duration-[400ms] group-hover:bg-white group-hover:text-dark-900">
                          →
                        </span>
                        <span>Learn more</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language switcher — single button for the OTHER locale */}
            <button
              onClick={() => switchLocale(otherLocale)}
              className="flex h-8 w-10 items-center justify-center border border-white/30 text-[13px] font-medium text-white/75 transition-all duration-[400ms] hover:border-white/55 hover:text-white"
              aria-label={`Switch language to ${otherLocale}`}
            >
              {otherLocaleLabel}
            </button>
          </div>
        </div>

        {/* Mobile separator line */}
        <div className="header__line border-b border-white/10 lg:hidden" />
      </div>

      {/* ══ Row 2: header__secondary — Navigation (desktop only) ══ */}
      <div className="header__secondary hidden border-b border-white/10 lg:block">
        <nav className="mx-auto max-w-[1680px] px-[140px]">
          <ul className="nav-primary flex items-center gap-8">

            {/* Company dropdown */}
            <li className="relative">
              <div
                className="nav-primary__main-link group relative flex cursor-default items-center gap-1.5 py-4 text-[13px] text-white/70 transition-colors duration-[400ms] hover:text-white"
                onMouseEnter={() => open(setCompanyOpen, companyTimer)}
                onMouseLeave={() => close(setCompanyOpen, companyTimer)}
              >
                <span>{t("company")}</span>
                <svg
                  width="10" height="5" viewBox="0 0 10 5" fill="none"
                  className={`transition-transform duration-[400ms] ${companyOpen ? "rotate-180" : ""}`}
                >
                  <path d="M0 0L5 5L10 0" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                {/* Red underline — slides from left on hover */}
                <span className="nav-primary__main-link__line absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-primary-600 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.74,0.22,0.99)] group-hover:scale-x-100" />
              </div>

              <AnimatePresence>
                {companyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.74, 0.22, 0.99] }}
                    onMouseEnter={() => open(setCompanyOpen, companyTimer)}
                    onMouseLeave={() => close(setCompanyOpen, companyTimer)}
                    className="header-choice absolute left-0 top-full z-50 bg-white shadow-xl"
                  >
                    {companyItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="header-choice__link flex items-center justify-between gap-10 px-6 py-[18px] transition-colors duration-[400ms] hover:bg-gray-50"
                        onClick={() => setCompanyOpen(false)}
                      >
                        <p className="whitespace-nowrap text-[13px] text-dark-900">{item.label}</p>
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center bg-primary-600 text-[10px] text-white">
                          →
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Services dropdown */}
            <li className="relative">
              <div
                className="nav-primary__main-link group relative flex cursor-default items-center gap-1.5 py-4 text-[13px] text-white/70 transition-colors duration-[400ms] hover:text-white"
                onMouseEnter={() => open(setServicesOpen, servicesTimer)}
                onMouseLeave={() => close(setServicesOpen, servicesTimer)}
              >
                <span>{t("services")}</span>
                <svg
                  width="10" height="5" viewBox="0 0 10 5" fill="none"
                  className={`transition-transform duration-[400ms] ${servicesOpen ? "rotate-180" : ""}`}
                >
                  <path d="M0 0L5 5L10 0" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="nav-primary__main-link__line absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-primary-600 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.74,0.22,0.99)] group-hover:scale-x-100" />
              </div>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.74, 0.22, 0.99] }}
                    onMouseEnter={() => open(setServicesOpen, servicesTimer)}
                    onMouseLeave={() => close(setServicesOpen, servicesTimer)}
                    className="header-choice absolute left-0 top-full z-50 bg-white shadow-xl"
                  >
                    {serviceItems.map((item, i) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="header-choice__link flex items-center gap-4 px-6 py-[14px] transition-colors duration-[400ms] hover:bg-gray-50"
                        onClick={() => setServicesOpen(false)}
                      >
                        {/* Thumbnail placeholder (141×141 in reference) */}
                        <div className="h-[72px] w-[72px] flex-shrink-0 overflow-hidden bg-dark-700">
                          <div className="h-full w-full bg-gradient-to-br from-dark-700 to-dark-600" />
                        </div>
                        <div className="flex items-center justify-between gap-10">
                          <p className="whitespace-nowrap text-[13px] text-dark-900">{item.label}</p>
                          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center bg-primary-600 text-[10px] text-white">
                            →
                          </span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Plain nav links */}
            {plainLinks.map((item) => (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className="nav-primary__main-link group relative flex items-center py-4 text-[13px] text-white/70 transition-colors duration-[400ms] hover:text-white"
                >
                  <span>{item.label}</span>
                  <span className="nav-primary__main-link__line absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-primary-600 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.74,0.22,0.99)] group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ══ Mobile drawer ══ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.74, 0.22, 0.99] }}
            className="overflow-hidden bg-dark-900 lg:hidden"
          >
            <div className="px-5 pb-8 pt-2 sm:px-[60px]">
              <p className="mb-2 mt-4 text-[11px] uppercase tracking-widest text-white/30">{t("company")}</p>
              {companyItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-white/10 py-3.5 text-[15px] text-white/75 transition-colors hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <p className="mb-2 mt-6 text-[11px] uppercase tracking-widest text-white/30">{t("services")}</p>
              {serviceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-white/10 py-3.5 text-[15px] text-white/75 transition-colors hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <p className="mb-2 mt-6 text-[11px] uppercase tracking-widest text-white/30">Navigation</p>
              {plainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-b border-white/10 py-3.5 text-[15px] text-white/75 transition-colors hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <a href="tel:+74955891200" className="text-[13px] text-white/55">
                  {t("phone")}
                </a>
                <button
                  onClick={() => switchLocale(otherLocale)}
                  className="ml-auto border border-white/25 px-3.5 py-1.5 text-[13px] text-white/60 transition-colors hover:text-white"
                >
                  {otherLocaleLabel}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
