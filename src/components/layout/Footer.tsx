import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <footer className="w-full bg-brand-nav text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact */}
          <div className="lg:col-span-1">
            <Link href={localePath("/")} className="text-xl font-bold tracking-tight text-white">
              Gaz<span className="text-brand-red">Start</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              World-class drilling and oilfield services for the global energy industry.
            </p>
            <a
              href="tel:+78001234567"
              className="mt-4 flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              +7 (800) 123-45-67
            </a>
            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/40 transition-colors hover:border-brand-red hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/40 transition-colors hover:border-brand-red hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="flex h-8 w-8 items-center justify-center border border-white/10 text-white/40 transition-colors hover:border-brand-red hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-white/40">
              {t("company")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={localePath("/company/about")} className="text-white/60 transition-colors hover:text-white">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href={localePath("/company/sustainable-development")} className="text-white/60 transition-colors hover:text-white">
                  {t("sustainable")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-white/40">
              {t("services")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={localePath("/services/drilling")} className="text-white/60 transition-colors hover:text-white">
                  {t("drilling")}
                </Link>
              </li>
              <li>
                <Link href={localePath("/services/service")} className="text-white/60 transition-colors hover:text-white">
                  {t("service")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Other links */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-wider text-white/40">
              Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={localePath("/press-center")} className="text-white/60 transition-colors hover:text-white">
                  {t("pressCenter")}
                </Link>
              </li>
              <li>
                <Link href={localePath("/careers")} className="text-white/60 transition-colors hover:text-white">
                  {t("careers")}
                </Link>
              </li>
              <li>
                <Link href={localePath("/procurement")} className="text-white/60 transition-colors hover:text-white">
                  {t("procurement")}
                </Link>
              </li>
              <li>
                <Link href={localePath("/contacts")} className="text-white/60 transition-colors hover:text-white">
                  {t("contacts")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/30 md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} GazStart, JSC. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
