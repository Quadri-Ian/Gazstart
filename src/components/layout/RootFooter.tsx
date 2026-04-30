"use client";

import Link from "next/link";
import { useState } from "react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/services", label: "Services" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/careers", label: "Careers" },
];

const informationLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookies Settings" },
];

const CONTACT_EMAIL = "hello@blueflareenergy.com";

export default function RootFooter() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  return (
    <footer className="footer-yellow">
      <div className="footer-yellow__inner">
        <div className="footer-yellow__grid">
          {/* Left column — headline + CTA + email */}
          <div className="footer-yellow__lead">
            <p className="footer-yellow__eyebrow">CONTACT US</p>
            <h2 className="footer-yellow__headline">
              Let&rsquo;s Discuss Your<br />
              Vision With Us
            </h2>
            <Link href="/contacts" className="footer-yellow__cta">
              Schedule a call now
              <span className="footer-yellow__cta-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            <p className="footer-yellow__eyebrow footer-yellow__eyebrow--spacer">OR EMAIL US AT</p>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="footer-yellow__email"
              aria-label={`Copy email address ${CONTACT_EMAIL}`}
            >
              <span>{CONTACT_EMAIL}</span>
              <span className="footer-yellow__email-icon" aria-hidden="true">
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L6 11L12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="3.5" y="3.5" width="7.5" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M5.5 3.5V2.2C5.5 1.7 5.9 1.2 6.5 1.2H10.6C11.1 1.2 11.6 1.7 11.6 2.2V9C11.6 9.6 11.1 10 10.6 10H10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                )}
              </span>
            </button>
          </div>

          {/* Quick Links column */}
          <nav className="footer-yellow__col">
            <p className="footer-yellow__eyebrow">QUICK LINKS</p>
            <ul className="footer-yellow__list">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-yellow__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Information column */}
          <nav className="footer-yellow__col">
            <p className="footer-yellow__eyebrow">INFORMATION</p>
            <ul className="footer-yellow__list">
              {informationLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-yellow__link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer-yellow__divider" />

        <div className="footer-yellow__bottom">
          <span className="footer-yellow__copyright">
            &copy; BLUEFLARE ENERGY 2026.&nbsp; ALL RIGHTS RESERVED.
          </span>
          <div className="footer-yellow__socials">
            <a href="#" aria-label="Facebook" className="footer-yellow__social">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M10.5 18v-7h2.4l.4-2.8h-2.8V6.4c0-.8.2-1.4 1.5-1.4h1.5V2.5C13.2 2.4 12.3 2.3 11.4 2.3c-2.4 0-4.1 1.5-4.1 4.2v2.7H4.8v2.8h2.5V18h3.2z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="footer-yellow__social">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M14.4 6.6c0 .1 0 .2 0 .3 0 3.4-2.6 7.4-7.4 7.4-1.5 0-2.8-.4-4-1.2.2 0 .4 0 .6 0 1.2 0 2.4-.4 3.3-1.1-1.2 0-2.1-.8-2.5-1.9.2 0 .3.1.5.1.2 0 .5 0 .7-.1-1.2-.3-2.1-1.4-2.1-2.7 0 0 0 0 0 0 .4.2.8.3 1.2.3-.7-.5-1.2-1.4-1.2-2.4 0-.5.1-1 .4-1.4 1.3 1.6 3.3 2.7 5.5 2.8 0-.2-.1-.4-.1-.6 0-1.5 1.2-2.7 2.7-2.7.8 0 1.5.3 2 .9.6-.1 1.2-.4 1.7-.7-.2.6-.6 1.2-1.2 1.5.5-.1 1.1-.2 1.6-.4-.4.6-.9 1.1-1.4 1.5z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="footer-yellow__social">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="14" height="14" rx="3.5" />
                <circle cx="9" cy="9" r="3.2" />
                <circle cx="13.2" cy="4.8" r="0.7" fill="currentColor" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="footer-yellow__social">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M3.6 16h-2.6V6.4h2.6V16zM2.3 5.4C1.4 5.4.7 4.7.7 3.8s.7-1.6 1.6-1.6 1.6.7 1.6 1.6-.7 1.6-1.6 1.6zM17 16h-2.6v-4.6c0-1.1-.4-1.9-1.4-1.9-1.1 0-1.7.7-1.7 1.9V16H8.7V6.4h2.6V7.6c.4-.7 1.2-1.4 2.4-1.4 2 0 3.3 1.3 3.3 4.1V16z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
