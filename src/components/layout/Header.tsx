"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

interface DropdownItem {
  label: string;
  href: string;
}

function NavDropdown({ label, items }: { label: string; items: DropdownItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm font-medium text-white/90 transition-colors hover:text-white">
        {label}
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full min-w-[200px] border border-white/10 bg-brand-nav py-2 shadow-xl">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hotlineOpen, setHotlineOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-brand-nav shadow-lg" : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div
        className={`border-b border-white/10 transition-all duration-300 ${
          scrolled ? "border-white/5" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          {/* Phone */}
          <a
            href="tel:+78001234567"
            className="flex items-center gap-2 text-xs text-white/70 transition-colors hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            +7 (800) 123-45-67
          </a>

          <div className="flex items-center gap-4">
            {/* Security Hotline dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setHotlineOpen(true)}
                onMouseLeave={() => setHotlineOpen(false)}
                className="flex items-center gap-1 text-xs text-white/70 transition-colors hover:text-white"
              >
                {t("securityHotline")}
                <svg
                  className={`h-3 w-3 transition-transform ${hotlineOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {hotlineOpen && (
                <div
                  className="absolute right-0 top-full min-w-[200px] border border-white/10 bg-brand-nav py-2 shadow-xl"
                  onMouseEnter={() => setHotlineOpen(true)}
                  onMouseLeave={() => setHotlineOpen(false)}
                >
                  <a
                    href="tel:+78001112233"
                    className="block px-4 py-2 text-xs text-white/70 hover:text-white"
                  >
                    +7 (800) 111-22-33
                  </a>
                  <a
                    href="mailto:security@gazstart.com"
                    className="block px-4 py-2 text-xs text-white/70 hover:text-white"
                  >
                    security@gazstart.com
                  </a>
                </div>
              )}
            </div>

            {/* Language toggle */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => switchLocale("en")}
                className={`text-xs transition-colors ${
                  locale === "en" ? "font-semibold text-white" : "text-white/40 hover:text-white"
                }`}
              >
                EN
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => switchLocale("ru")}
                className={`text-xs transition-colors ${
                  locale === "ru" ? "font-semibold text-white" : "text-white/40 hover:text-white"
                }`}
              >
                RU
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href={localePath("/")} className="text-xl font-bold tracking-tight text-white">
          Gaz<span className="text-brand-red">Start</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          <NavDropdown label={t("company")} items={companyItems} />
          <NavDropdown label={t("services")} items={serviceItems} />
          <Link
            href={localePath("/press-center")}
            className="text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            {t("pressCenter")}
          </Link>
          <Link
            href={localePath("/careers")}
            className="text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            {t("careers")}
          </Link>
          <Link
            href={localePath("/procurement")}
            className="text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            {t("procurement")}
          </Link>
          <Link
            href={localePath("/contacts")}
            className="text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            {t("contacts")}
          </Link>
        </nav>

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
        <div className="bg-brand-nav px-4 pb-6 lg:hidden">
          <div className="flex flex-col">
            <p className="mt-4 mb-2 text-xs uppercase tracking-widest text-white/40">
              {t("company")}
            </p>
            {companyItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-1.5 pl-2 text-sm text-white/80 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <p className="mt-4 mb-2 text-xs uppercase tracking-widest text-white/40">
              {t("services")}
            </p>
            {serviceItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-1.5 pl-2 text-sm text-white/80 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {[
              { href: localePath("/press-center"), label: t("pressCenter") },
              { href: localePath("/careers"), label: t("careers") },
              { href: localePath("/procurement"), label: t("procurement") },
              { href: localePath("/contacts"), label: t("contacts") },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mt-2 py-1.5 text-sm text-white/80 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
