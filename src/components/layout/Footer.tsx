import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const lp = (path: string) => `/${locale}${path}`;

  return (
    <footer className="ui-light-background">
      <div className="container-h py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* Left col: social + phone */}
          <div className="md:col-span-1">
            {/* Social icons */}
            <div className="flex items-center gap-0 mb-6">
              <a
                href="https://www.linkedin.com/company/11195107"
                aria-label="LinkedIn"
                className="social__item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M4.477 20H.327V6.647h4.15V20zM2.4 4.825A2.413 2.413 0 1 1 2.4 0a2.413 2.413 0 0 1 0 4.825zM19.996 20h-4.142v-6.5c0-1.55-.031-3.538-2.157-3.538-2.157 0-2.487 1.685-2.487 3.426V20H7.07V6.647h3.98v1.847h.058c.553-1.049 1.905-2.157 3.923-2.157 4.198 0 4.969 2.764 4.969 6.355V20h-.004z" />
                </svg>
              </a>
              <a
                href="https://vk.com/naftagazcom"
                aria-label="VK"
                className="social__item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10.9 14.438s.36-.04.544-.241c.169-.184.163-.528.163-.528s-.023-1.613.724-1.849c.737-.231 1.683 1.558 2.686 2.246.758.52 1.333.406 1.333.406l2.677-.038s1.4-.086.736-1.188c-.054-.09-.386-.814-1.984-2.302-1.672-1.558-1.45-1.306.566-4.002 1.227-1.637 1.718-2.636 1.564-3.063-.147-.408-1.044-.3-1.044-.3l-3.013.019s-.223-.03-.389.068c-.162.097-.268.321-.268.321s-.476 1.27-1.11 2.35c-1.337 2.271-1.872 2.391-2.09 2.25-.509-.33-.382-1.323-.382-2.03 0-2.205.334-3.124-.65-3.362-.326-.079-.566-.131-1.4-.14-1.07-.01-1.975.004-2.487.254-.341.166-.604.536-.444.557.198.026.646.121.884.444.308.42.297 1.362.297 1.362s.176 2.595-.412 2.918c-.404.218-.958-.227-2.146-2.267-.61-1.055-1.07-2.222-1.07-2.222s-.089-.218-.249-.334a1.226 1.226 0 0 0-.479-.177L1.16 5.895s-.44.012-.6.204c-.143.172-.011.529-.011.529s2.208 5.167 4.707 7.772c2.292 2.39 4.893 2.233 4.893 2.233l1.25-.032-.5.163z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCkqpY3wF17TOpwvTzqGJ_5g"
                aria-label="YouTube"
                className="social__item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M19.58 5.25a2.507 2.507 0 0 0-1.766-1.773C16.328 3 10 3 10 3S3.672 3 2.186 3.477A2.507 2.507 0 0 0 .42 5.25 26.13 26.13 0 0 0 0 10a26.13 26.13 0 0 0 .42 4.75 2.507 2.507 0 0 0 1.766 1.773C3.672 17 10 17 10 17s6.328 0 7.814-.477a2.507 2.507 0 0 0 1.766-1.773A26.13 26.13 0 0 0 20 10a26.13 26.13 0 0 0-.42-4.75zM8 13V7l5.197 3L8 13z" />
                </svg>
              </a>
            </div>

            {/* Phone */}
            <div className="footer__phone">
              <a href="tel:+74955891200">{t("phone")}</a>
            </div>
          </div>

          {/* Right cols: nav */}
          <nav className="md:col-span-2 md:col-start-2">
            <ul className="space-y-0">
              {[
                { href: lp("/company/about"), label: t("about") },
                { href: lp("/company/sustainable-development"), label: t("sustainable") },
                { href: lp("/services/drilling"), label: t("drilling") },
                { href: lp("/services/service"), label: t("service") },
                { href: lp("/press-center"), label: t("pressCenter") },
                { href: lp("/careers"), label: t("careers") },
                { href: lp("/procurement"), label: t("procurement") },
                { href: lp("/contacts"), label: t("contacts") },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__nav__link">
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Scroll to top */}
          <div className="md:col-span-1 flex md:justify-end md:items-start">
            <a
              href="#top"
              aria-label="Back to top"
              className="flex items-center justify-center border border-black/10 text-[#0e1a27]/40 hover:text-[#0e1a27] hover:border-black/20 transition-colors"
              style={{ width: 40, height: 40 }}
            >
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 5l4-4 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__line mt-10 mb-6" />
        <div className="footer__bottom flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="footer__copy">© 2026 GazStart, JSC</span>
          <div className="flex items-center gap-6">
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


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
