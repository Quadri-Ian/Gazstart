import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const localePath = (path: string) => `/${locale}${path}`;

  return (
    <footer className="border-t border-white/10 bg-dark-800 text-white/60">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link href={localePath("/")} className="text-xl font-bold text-white">
              Gaz<span className="text-primary-500">Start</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              World-class drilling and oilfield services for the global energy industry.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t("company")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={localePath("/company/about")}
                  className="transition-colors hover:text-white"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath("/company/sustainable-development")}
                  className="transition-colors hover:text-white"
                >
                  {t("sustainable")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {t("services")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={localePath("/services/drilling")}
                  className="transition-colors hover:text-white"
                >
                  {t("drilling")}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath("/services/service")}
                  className="transition-colors hover:text-white"
                >
                  {t("service")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={localePath("/press-center")}
                  className="transition-colors hover:text-white"
                >
                  {t("pressCenter")}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath("/careers")}
                  className="transition-colors hover:text-white"
                >
                  {t("careers")}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath("/procurement")}
                  className="transition-colors hover:text-white"
                >
                  {t("procurement")}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath("/contacts")}
                  className="transition-colors hover:text-white"
                >
                  {t("contacts")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between border-t border-white/10 pt-6 text-xs md:flex-row">
          <p>© {new Date().getFullYear()} GazStart, JSC. All rights reserved.</p>
          <div className="mt-3 flex gap-4 md:mt-0">
            <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="transition-colors hover:text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
