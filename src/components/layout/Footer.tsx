import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const lp = (path: string) => `/${locale}${path}`;
  const navLinks = [
    { href: lp("/company/about"), label: t("about") },
    { href: lp("/company/sustainable-development"), label: t("sustainable") },
    { href: lp("/services/drilling"), label: t("drilling") },
    { href: lp("/services/service"), label: t("service") },
    { href: lp("/press-center"), label: t("pressCenter") },
    { href: lp("/careers"), label: t("careers") },
    { href: lp("/procurement"), label: t("procurement") },
    { href: lp("/contacts"), label: t("contacts") },
  ];

  return (
    <footer className="bg-white text-[#394854]">
      <div className="mx-auto w-full max-w-[1680px] px-5 pt-12 md:px-[60px] md:pt-20 lg:px-[150px] lg:pt-24">
        <div className="grid min-h-[300px] grid-cols-[1fr_auto] gap-x-6 gap-y-10 pb-14 md:grid-cols-[240px_1fr_auto] md:gap-8 lg:pb-24">
          <div>
            <div className="mb-8 flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/11195107"
                aria-label="LinkedIn"
                className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-[#435465] text-white transition-colors hover:bg-[#354555]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M4.477 20H.327V6.647h4.15V20zM2.4 4.825A2.413 2.413 0 1 1 2.4 0a2.413 2.413 0 0 1 0 4.825zM19.996 20h-4.142v-6.5c0-1.55-.031-3.538-2.157-3.538-2.157 0-2.487 1.685-2.487 3.426V20H7.07V6.647h3.98v1.847h.058c.553-1.049 1.905-2.157 3.923-2.157 4.198 0 4.969 2.764 4.969 6.355V20h-.004z" />
                </svg>
              </a>
              <a
                href="https://vk.com/blueflare"
                aria-label="VK"
                className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-[#435465] text-white transition-colors hover:bg-[#354555]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10.9 14.438s.36-.04.544-.241c.169-.184.163-.528.163-.528s-.023-1.613.724-1.849c.737-.231 1.683 1.558 2.686 2.246.758.52 1.333.406 1.333.406l2.677-.038s1.4-.086.736-1.188c-.054-.09-.386-.814-1.984-2.302-1.672-1.558-1.45-1.306.566-4.002 1.227-1.637 1.718-2.636 1.564-3.063-.147-.408-1.044-.3-1.044-.3l-3.013.019s-.223-.03-.389.068c-.162.097-.268.321-.268.321s-.476 1.27-1.11 2.35c-1.337 2.271-1.872 2.391-2.09 2.25-.509-.33-.382-1.323-.382-2.03 0-2.205.334-3.124-.65-3.362-.326-.079-.566-.131-1.4-.14-1.07-.01-1.975.004-2.487.254-.341.166-.604.536-.444.557.198.026.646.121.884.444.308.42.297 1.362.297 1.362s.176 2.595-.412 2.918c-.404.218-.958-.227-2.146-2.267-.61-1.055-1.07-2.222-1.07-2.222s-.089-.218-.249-.334a1.226 1.226 0 0 0-.479-.177L1.16 5.895s-.44.012-.6.204c-.143.172-.011.529-.011.529s2.208 5.167 4.707 7.772c2.292 2.39 4.893 2.233 4.893 2.233l1.25-.032-.5.163z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCkqpY3wF17TOpwvTzqGJ_5g"
                aria-label="YouTube"
                className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-[#435465] text-white transition-colors hover:bg-[#354555]"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M19.58 5.25a2.507 2.507 0 0 0-1.766-1.773C16.328 3 10 3 10 3S3.672 3 2.186 3.477A2.507 2.507 0 0 0 .42 5.25 26.13 26.13 0 0 0 0 10a26.13 26.13 0 0 0 .42 4.75 2.507 2.507 0 0 0 1.766 1.773C3.672 17 10 17 10 17s6.328 0 7.814-.477a2.507 2.507 0 0 0 1.766-1.773A26.13 26.13 0 0 0 20 10a26.13 26.13 0 0 0-.42-4.75zM8 13V7l5.197 3L8 13z" />
                </svg>
              </a>
            </div>

            <div className="text-[15px] tracking-[-0.03em] text-[#435465] md:text-[16px]">
              <a href="tel:+74955891200" className="transition-colors hover:text-[#b4042f]">
                {t("phone")}
              </a>
            </div>
          </div>

          <nav className="col-span-2 justify-self-start md:col-span-1">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] leading-[1.55] tracking-[-0.02em] text-[#394854] transition-colors hover:text-[#b4042f]"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex justify-end md:items-start">
            <a
              href="#top"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f6f6f7] text-[#394854]/45 transition-colors hover:text-[#394854]"
            >
              <svg width="9" height="5" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 5l4-4 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className="h-px w-full bg-black/10" />
        <div className="flex flex-col gap-4 py-7 text-[12px] leading-none tracking-[-0.01em] text-[#435465]/55 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Blueflare Energy</span>
          <a href="#" className="transition-colors hover:text-[#394854]">
            Privacy Policy
          </a>
          <a
            href="https://videinfra.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#394854]"
          >
            SITE BY VIDE INFRA
          </a>
        </div>
      </div>
    </footer>
  );
}