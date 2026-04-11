"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hotlineOpen, setHotlineOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const lastScrollY = useRef(0);

  const hotlineTimer = useRef<ReturnType<typeof setTimeout>>();
  const companyTimer = useRef<ReturnType<typeof setTimeout>>();
  const servicesTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 8);

      if (currentScrollY <= 8) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        setHeaderVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen || hotlineOpen || companyOpen || servicesOpen) {
      setHeaderVisible(true);
    }
  }, [mobileOpen, hotlineOpen, companyOpen, servicesOpen]);

  const open = (
    setter: (v: boolean) => void,
    timer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>
  ) => {
    clearTimeout(timer.current);
    setter(true);
  };
  const close = (
    setter: (v: boolean) => void,
    timer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>
  ) => {
    timer.current = setTimeout(() => setter(false), 150);
  };

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const localePath = (path: string) => `/${locale}${path}`;
  const otherLocale = locale === "en" ? "ru" : "en";
  const otherLocaleLabel = locale === "en" ? "Ру" : "En";

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
    <header
      className={`header fixed top-0 z-50 w-full transition-transform duration-500 ${
        headerVisible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled || mobileOpen ? "bg-dark-900" : "bg-transparent"}`}
    >
      {/* ── Row 1: primary bar ── */}
      <div className="header__primary transition-colors duration-500">
        <div
          className="container-h mx-auto flex max-w-[1680px] items-center px-5 sm:px-[60px] lg:px-[140px]"
          id="header"
        >
          {/* Logo */}
          <Link
            href={localePath("/")}
            className="header__logo mr-auto flex items-center py-[18px] text-white"
            title="GazStart"
          >
            <span className="text-[17px] font-semibold uppercase tracking-[0.12em] text-white">
              GAZSTART
            </span>
          </Link>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center border border-white/25 text-white"
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

          {/* Desktop: phone + hotline + lang */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:+74955891200"
              className="header__phone text-[13px] text-white/75 transition-colors duration-300 hover:text-white"
            >
              {t("phone")}
            </a>

            {/* Security Hotline — rounded pill border */}
            <div className="relative">
              <button
                id="security-hotline"
                onMouseEnter={() => open(setHotlineOpen, hotlineTimer)}
                onMouseLeave={() => close(setHotlineOpen, hotlineTimer)}
                className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 text-[13px] text-white/75 transition-all duration-300 hover:border-white/60 hover:text-white"
              >
                <span>{t("securityHotline")}</span>
                <svg
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                  className={`transition-transform duration-300 ${hotlineOpen ? "rotate-180" : ""}`}
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
                    transition={{ duration: 0.2, ease: [0.25, 0.74, 0.22, 0.99] }}
                    onMouseEnter={() => open(setHotlineOpen, hotlineTimer)}
                    onMouseLeave={() => close(setHotlineOpen, hotlineTimer)}
                    className="absolute right-0 top-full z-50 mt-3 w-[420px] bg-white shadow-2xl"
                  >
                    <div className="p-8">
                      <a
                        href="tel:88004447109"
                        className="block text-[38px] font-medium leading-none tracking-tight text-primary-600 transition-colors duration-300 hover:text-dark-900"
                      >
                        8 800 444 71 09
                      </a>
                      <div className="mt-5 border-t border-dark-900/10" />
                      <p className="mt-4 text-[12px] text-dark-900/50">
                        <span className="font-medium text-dark-900">Security Hotline</span>
                        <span className="mx-2 text-dark-900/25">|</span>
                        <span>Toll-free in Russia</span>
                      </p>
                      <p className="mt-3 text-[13px] leading-relaxed text-dark-900/60">
                        To inform on imminent crimes, actual or reasonably suspected economic,
                        financial or goodwill damage to the interests and assets of the Group of
                        Companies.
                      </p>
                      <Link
                        href={localePath("/contacts")}
                        className="mt-5 flex items-center justify-between border border-dark-900/15 px-4 py-3 text-[13px] text-dark-900 transition-all duration-300 hover:bg-dark-900 hover:text-white"
                        onClick={() => setHotlineOpen(false)}
                      >
                        <span className="flex h-6 w-6 items-center justify-center bg-dark-900 text-[11px] text-white">
                          →
                        </span>
                        <span>Learn more</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language toggle — square outline */}
            <button
              onClick={() => switchLocale(otherLocale)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-[13px] font-medium text-white/75 transition-all duration-300 hover:border-white/60 hover:text-white"
              aria-label={`Switch language to ${otherLocale}`}
            >
              {otherLocaleLabel}
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 2: nav bar — desktop only ── */}
      <div className="header__secondary hidden lg:block">
        <nav className="mx-auto max-w-[1680px] px-[140px]">
          {/* flex: items fill full width edge-to-edge */}
          <ul className="nav-primary flex gap-10">

            {/* Company dropdown */}
            <li className="group relative flex-1">
              {/* faint top border always; sweep line on hover (left→right) */}
              <div
                className="nav-primary__main-link relative flex h-full cursor-default items-center justify-between py-[18px] text-[13px] text-white/60 transition-colors duration-300 group-hover:text-white"
                onMouseEnter={() => open(setCompanyOpen, companyTimer)}
                onMouseLeave={() => close(setCompanyOpen, companyTimer)}
              >
                 <span className="pointer-events-none absolute left-1/2 top-0 h-px w-[116px] -translate-x-1/2 bg-white/[0.18]" />
                 <span className="nav-primary__main-link__line pointer-events-none absolute left-1/2 top-0 h-[2px] w-[116px] -translate-x-1/2 origin-center scale-x-0 bg-white/70 transition-transform duration-500 ease-[cubic-bezier(0.25,0.74,0.22,0.99)] group-hover:scale-x-100" />

                <span>{t("company")}</span>
                <svg
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                  className={`transition-transform duration-300 ${companyOpen ? "rotate-180" : ""}`}
                >
                  <path d="M0 0L5 5L10 0" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </div>

              <AnimatePresence>
                {companyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: [0.25, 0.74, 0.22, 0.99] }}
                    onMouseEnter={() => open(setCompanyOpen, companyTimer)}
                    onMouseLeave={() => close(setCompanyOpen, companyTimer)}
                    className="header-choice absolute left-0 top-full z-50 min-w-[260px] bg-white shadow-xl"
                  >
                    {companyItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="header-choice__link flex items-center justify-between gap-8 border-b border-dark-900/8 px-6 py-[18px] transition-colors duration-300 last:border-0 hover:bg-[#f5f5f5]"
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
            <li className="group relative flex-1">
              <div
                className="nav-primary__main-link relative flex h-full cursor-default items-center justify-between py-[18px] text-[13px] text-white/60 transition-colors duration-300 group-hover:text-white"
                onMouseEnter={() => open(setServicesOpen, servicesTimer)}
                onMouseLeave={() => close(setServicesOpen, servicesTimer)}
              >
                 <span className="pointer-events-none absolute left-1/2 top-0 h-px w-[116px] -translate-x-1/2 bg-white/[0.18]" />
                 <span className="nav-primary__main-link__line pointer-events-none absolute left-1/2 top-0 h-[2px] w-[116px] -translate-x-1/2 origin-center scale-x-0 bg-white/70 transition-transform duration-500 ease-[cubic-bezier(0.25,0.74,0.22,0.99)] group-hover:scale-x-100" />

                <span>{t("services")}</span>
                <svg
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                  className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                >
                  <path d="M0 0L5 5L10 0" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </div>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: [0.25, 0.74, 0.22, 0.99] }}
                    onMouseEnter={() => open(setServicesOpen, servicesTimer)}
                    onMouseLeave={() => close(setServicesOpen, servicesTimer)}
                    className="header-choice absolute left-0 top-full z-50 min-w-[260px] bg-white shadow-xl"
                  >
                    {serviceItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="header-choice__link flex items-center gap-4 border-b border-dark-900/8 px-6 py-[14px] transition-colors duration-300 last:border-0 hover:bg-[#f5f5f5]"
                        onClick={() => setServicesOpen(false)}
                      >
                        <div className="h-[72px] w-[72px] flex-shrink-0 bg-dark-700" />
                        <div className="flex flex-1 items-center justify-between">
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

            {/* Plain links */}
            {plainLinks.map((item) => (
              <li key={item.href} className="group relative flex-1">
                <Link
                  href={item.href}
                  className="nav-primary__main-link relative flex h-full items-center justify-between py-[18px] text-[13px] text-white/60 transition-colors duration-300 group-hover:text-white"
                >
                    <span className="pointer-events-none absolute left-1/2 top-0 h-px w-[116px] -translate-x-1/2 bg-white/[0.18]" />
                    <span className="nav-primary__main-link__line pointer-events-none absolute left-1/2 top-0 h-[2px] w-[116px] -translate-x-1/2 origin-center scale-x-0 bg-white/70 transition-transform duration-500 ease-[cubic-bezier(0.25,0.74,0.22,0.99)] group-hover:scale-x-100" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.74, 0.22, 0.99] }}
            className="overflow-hidden bg-[#0e1a27] lg:hidden"
          >
            <div className="px-5 pb-8 pt-2 sm:px-[60px]">
              <p className="mb-2 mt-4 text-[11px] uppercase tracking-widest text-white/30">
                {t("company")}
              </p>
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

              <p className="mb-2 mt-6 text-[11px] uppercase tracking-widest text-white/30">
                {t("services")}
              </p>
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

              <p className="mb-2 mt-6 text-[11px] uppercase tracking-widest text-white/30">
                Navigation
              </p>
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
