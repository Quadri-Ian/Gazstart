"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function RootHeader() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [hotlineOpen, setHotlineOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const aboutTimer = useRef<ReturnType<typeof setTimeout>>();
  const hotlineTimer = useRef<ReturnType<typeof setTimeout>>();

  const openMenu = (
    setter: (v: boolean) => void,
    timer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>,
  ) => { clearTimeout(timer.current); setter(true); };

  const closeMenu = (
    setter: (v: boolean) => void,
    timer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>,
  ) => { timer.current = setTimeout(() => setter(false), 150); };

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setCollapsed(current > 8);

      if (current <= 8) {
        setHeaderVisible(true);
      } else if (current > lastScrollY.current + 8) {
        setHeaderVisible(false);
      } else if (current < lastScrollY.current) {
        setHeaderVisible(true);
      }

      lastScrollY.current = current;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (aboutOpen || hotlineOpen) {
      setHeaderVisible(true);
    }
  }, [aboutOpen, hotlineOpen]);

  return (
    <header
      data-plugin="stickyHeader"
      data-sticky-header-collapsed-class-name="header--collapsed ui-dark"
      className={`header header--sticky header--sticky--enabled ui-dark is-hidden--print js-header ${
        collapsed ? "header--collapsed" : ""
      }`}
      style={{
        transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform .45s cubic-bezier(.25,.74,.22,.99)",
      }}
    >
      {/* Primary row: logo + phone + hotline */}
      <div className="container-h header__primary">
        <div className="header__content" id="header">
          <Link href="/" className="header__logo" title="Blueflare">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nafassets/blueflare-logo-white.png"
              alt="Blueflare Energy"
              className="icon icon-logo"
              draggable={false}
            />
          </Link>

          {/* Mobile menu button */}
          <div className="is-hidden--md-up">
            <a className="btn btn--dark btn--square header__menu-mobile" href="#menu-mobile" aria-label="Open navigation menu">
              <span className="btn__content">
                <svg className="icon icon-menu btn__icon" width="17" height="6" aria-hidden="true" viewBox="0 0 17 6">
                  <use href="/local/templates/naftagaz/assets/images/icons.svg#menu" />
                </svg>
              </span>
            </a>
          </div>

          {/* Phone + Security Hotline */}
          <div className="group group--nowrap group--middle group--spacing is-hidden--sm-down">
            <a className="header__phone" href="tel:+74955891200">+7 495 589 12 00</a>
            <div>
              <div className="group group--nowrap group--md">
                <button
                  className="btn btn--outline header__hotline"
                  id="security-hotline"
                  onMouseEnter={() => openMenu(setHotlineOpen, hotlineTimer)}
                  onMouseLeave={() => closeMenu(setHotlineOpen, hotlineTimer)}
                  onClick={() => setHotlineOpen((v) => !v)}
                  aria-expanded={hotlineOpen}
                >
                  <span className="btn__content">
                    <span className="btn__text">Security Hotline</span>
                    <svg className="icon icon-arrow-down-small btn__icon" width="10" height="5" aria-hidden="true" viewBox="0 0 10 5">
                      <use href="/local/templates/naftagaz/assets/images/icons.svg#arrow-down-small" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="header__line is-hidden--md-up"></div>
      </div>

      {/* Security Hotline popover */}
      {hotlineOpen && (
        <div
          className="popover popover--triangle popover--triangle-equal popover--size-auto is-hidden--sm-down"
          onMouseEnter={() => openMenu(setHotlineOpen, hotlineTimer)}
          onMouseLeave={() => closeMenu(setHotlineOpen, hotlineTimer)}
        >
          <div className="popover__content">
            <div className="security-hotline ui-light ui-light-background">
              <a href="tel:88004447109" className="security-hotline__phone">8 800 444 71 09</a>
              <div className="security-hotline__line"></div>
              <div className="security-hotline__breadcrumb group">
                <span className="security-hotline__breadcrumb__title">Security Hotline</span>
                <span className="security-hotline__breadcrumb__delimiter is-hidden--sm-down"></span>
                <span>Toll-free in Russia</span>
              </div>
              <div className="security-hotline__bottom">
                <p>To inform on imminent crimes, actual or reasonably suspected economic, financial or goodwill damage to the interests and assets of the Group of Companies.</p>
                <Link className="btn btn--secondary--rising btn--rect" href="/hotline" role="button" onClick={() => setHotlineOpen(false)}>
                  <span className="btn__content row row--between-xs">
                    <span className="btn btn--dark btn--square btn--smallest">
                      <svg className="icon icon-arrow-right-small btn__icon" width="5" height="8" aria-hidden="true" viewBox="0 0 5 8">
                        <use href="/local/templates/naftagaz/assets/images/icons.svg#arrow-right-small" />
                      </svg>
                    </span>
                    <span>Learn more</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secondary row: main nav */}
      <div className="container-h header__secondary is-hidden--sm-down">
        <nav>
          <ul className="nav-primary group group--spacing">
            <li>
              <Link href="/" className="nav-primary__main-link">
                <span>Home</span>
                <div className="nav-primary__main-link__line"></div>
              </Link>
            </li>
            <li>
              <div
                className="nav-primary__main-link"
                onMouseEnter={() => openMenu(setAboutOpen, aboutTimer)}
                onMouseLeave={() => closeMenu(setAboutOpen, aboutTimer)}
                style={{ cursor: "pointer" }}
              >
                <span>About Us</span>
                <div className="nav-primary__main-link__line"></div>
                <svg className="icon icon-arrow-down-small" width="10" height="5" aria-hidden="true" viewBox="0 0 10 5">
                  <use href="/local/templates/naftagaz/assets/images/icons.svg#arrow-down-small" />
                </svg>
                {aboutOpen && (
                  <div className="popover popover--triangle ui-light" style={{ position: "absolute" }}>
                    <div className="popover__content header-choice ui-light-background" style={{ flexWrap: "wrap" }}>
                      {[
                        { href: "/our-story", label: "Our story" },
                        { href: "/our-people", label: "Our people" },
                        { href: "/our-business", label: "Our business" },
                        { href: "/our-governance", label: "Our governance" },
                      ].map((item) => (
                        <Link key={item.href} href={item.href} className="header-choice__link btn-container js-popover-link" onClick={() => setAboutOpen(false)}>
                          <div className="header-choice__content">
                            <p>{item.label}</p>
                            <span className="btn btn--primary btn--square btn--sm">
                              <span className="btn__content">
                                <svg className="icon icon-arrow-right-small btn__icon" width="5" height="8" aria-hidden="true" viewBox="0 0 5 8">
                                  <use href="/local/templates/naftagaz/assets/images/icons.svg#arrow-right-small" />
                                </svg>
                              </span>
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </li>
            <li>
              <Link href="/sustainability" className="nav-primary__main-link">
                <span>Sustainability</span>
                <div className="nav-primary__main-link__line"></div>
              </Link>
            </li>
            <li>
              <Link href="/services" className="nav-primary__main-link">
                <span>Services</span>
                <div className="nav-primary__main-link__line"></div>
              </Link>
            </li>
            <li>
              <Link href="/careers" className="nav-primary__main-link">
                <span>Careers</span>
                <div className="nav-primary__main-link__line"></div>
              </Link>
            </li>
            <li>
              <Link href="/contacts" className="nav-primary__main-link">
                <span>Contact Us</span>
                <div className="nav-primary__main-link__line"></div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
