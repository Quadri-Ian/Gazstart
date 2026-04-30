"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

type RootHeroProps = {
  title: string;
  subtitle: string;
  routeKey?: string;
};

function HeroBanners() {
  return (
    <div className="intro__banners is-hidden--sm-down">
      <div className="container-h">
        <div className="group group--spacing">
          <Link href="/contacts" className="rising-banner btn-container ui-light">
            <div className="rising-banner__effect">
              <picture className="rising-banner__effect__image" draggable="false">
                <img
                  src="https://images.pexels.com/photos/37198885/pexels-photo-37198885.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Engineering team reviewing plans"
                  draggable="false"
                />
              </picture>
            </div>
            <div className="rising-banner__content">
              <p className="rising-banner__title">Partner With Us</p>
              <p className="rising-banner__count">01</p>
            </div>
            <div className="rising-banner__icon">
              <span className="btn btn--secondary--rising btn--square btn--sm">
                <span className="btn__content">
                  <svg
                    className="icon icon-arrow-right-small btn__icon"
                    width="5"
                    height="8"
                    aria-hidden="true"
                    viewBox="0 0 5 8"
                  >
                    <use href="/local/templates/naftagaz/assets/images/icons.svg#arrow-right-small" />
                  </svg>
                </span>
              </span>
            </div>
          </Link>

          <Link href="/services" className="rising-banner btn-container ui-light">
            <div className="rising-banner__effect">
              <picture className="rising-banner__effect__image" draggable="false">
                <img
                  src="https://images.pexels.com/photos/36824351/pexels-photo-36824351.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Industrial pipeline facility"
                  draggable="false"
                />
              </picture>
            </div>
            <div className="rising-banner__content">
              <p className="rising-banner__title">Services</p>
              <p className="rising-banner__count">02</p>
            </div>
            <div className="rising-banner__icon">
              <span className="btn btn--secondary--rising btn--square btn--sm">
                <span className="btn__content">
                  <svg
                    className="icon icon-arrow-right-small btn__icon"
                    width="5"
                    height="8"
                    aria-hidden="true"
                    viewBox="0 0 5 8"
                  >
                    <use href="/local/templates/naftagaz/assets/images/icons.svg#arrow-right-small" />
                  </svg>
                </span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function IntroHero({ title, subtitle, showBanners }: { title: string; subtitle: string; showBanners: boolean }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const manRef = useRef<HTMLDivElement | null>(null);

  // Staged scroll/load reveal: background fades in first, then text + buttons
  // + engineer image slide in from the right. Implementation lives entirely in
  // CSS keyed off `.intro.is-revealed` — this hook just toggles the class.
  // Because the hero starts in the viewport, IO fires on initial mount,
  // playing the reveal as a "page load" animation. Toggling on viewport-exit
  // lets the user replay it by scrolling away and back.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          section.classList.toggle("is-revealed", entry.isIntersecting);
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      section.classList.remove("is-revealed");
    };
  }, []);

  useEffect(() => {
    if (!showBanners) {
      return;
    }

    const section = sectionRef.current;
    const background = backgroundRef.current;
    const man = manRef.current;

    if (!section || !background || !man) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      if (window.innerWidth < 980) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      background.style.transform = `translate3d(${x * -14}px, ${y * -9}px, 0) scale(1.03)`;
      man.style.transform = `translate3d(${x * 30}px, ${y * 20}px, 0)`;
    };

    const onLeave = () => {
      background.style.transform = "translate3d(0, 0, 0) scale(1)";
      man.style.transform = "translate3d(0, 0, 0)";
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      onLeave();
    };
  }, [showBanners]);

  const heroTitle = showBanners ? "Powering the Future of Nigerian Energy." : title;
  const heroSubtitle = showBanners
    ? "Blueflare Energy provides high-precision servicing and innovative engineering solutions tailored to the unique demands of the West African oil and gas industry."
    : subtitle;

  return (
    <section
      ref={sectionRef}
      className={`section section--full-height ui-dark ui-dark-background intro ${
        showBanners ? "intro--home" : ""
      }`}
      id="top"
    >
      <div className="intro__wrap">
        <div className="intro__content container-h">
          <h1
            className="intro__content__title leading-trim"
            style={
              showBanners
                ? {
                    maxWidth: "22ch",
                    fontSize: "clamp(6rem, 5vw, 9.2rem)",
                  }
                : undefined
            }
          >
            {heroTitle}
          </h1>
          <p
            className="intro__content__description leading-trim"
            style={
              showBanners
                ? {
                    marginTop: "calc(clamp(5rem, 6vh, 8rem) + 50px)",
                    position: "relative",
                    zIndex: 2,
                  }
                : undefined
            }
          >
            {heroSubtitle}
          </p>
        </div>

        {showBanners ? <HeroBanners /> : null}

        {showBanners ? (
          <div className="intro__next">
            <div className="intro__next__wrap">
              <a
                className="btn btn--secondary btn--md btn--square intro__next__btn"
                href="#geography"
                aria-label="Our Locations"
              >
                <span className="btn__content">
                  <svg
                    className="icon icon-arrow-down btn__icon"
                    width="12"
                    height="6"
                    aria-hidden="true"
                    viewBox="0 0 12 6"
                  >
                    <use href="/local/templates/naftagaz/assets/images/icons.svg#arrow-down" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        ) : null}

        <div className="intro__background" ref={backgroundRef}>
          <picture draggable="false">
            <source
              srcSet="https://images.pexels.com/photos/15970032/pexels-photo-15970032.jpeg?auto=compress&cs=tinysrgb&w=2000"
              media="(min-width: 980px)"
            />
            <img
              src="https://images.pexels.com/photos/15970032/pexels-photo-15970032.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Oil refinery facility"
              width="470"
              height="846"
              draggable="false"
            />
          </picture>
        </div>

        <div
          ref={manRef}
          className="intro__man intro__man--1"
          style={
            showBanners
              ? {
                  zIndex: 3,
                  right: "4vw",
                  width: "52vw",
                }
              : undefined
          }
        >
          <picture draggable="false">
            <source srcSet="/nafassets/hero-image.webp" media="(min-width: 1920px)" />
            <source srcSet="/nafassets/hero-image.webp" media="(min-width: 1440px)" />
            <source srcSet="/nafassets/hero-image.webp" media="(min-width: 980px)" />
            <img
              src="/nafassets/hero-image.webp"
              alt="Engineer in protective gear"
              width="800"
              height="1200"
              style={
                showBanners
                  ? {
                      display: "block",
                      width: "100%",
                      height: "auto",
                      maxHeight: "100vh",
                    }
                  : undefined
              }
              draggable="false"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}

function ServicesHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="section section--full-height ui-dark ui-dark-background services-intro section--top" id="top">
      <div className="services-intro__logo services-intro__logo--lt">
        <div className="container-h services-intro__logo__container">
          <div className="services-intro__logo__wrap">
            <picture draggable="false">
              <source
                srcSet="https://images.pexels.com/photos/29787613/pexels-photo-29787613.jpeg?auto=compress&cs=tinysrgb&w=2000"
                media="(min-width: 1920px) and (min-height: 600px)"
              />
              <source
                srcSet="https://images.pexels.com/photos/29787613/pexels-photo-29787613.jpeg?auto=compress&cs=tinysrgb&w=1800"
                media="(min-width: 1440px) and (min-height: 600px)"
              />
              <source
                srcSet="https://images.pexels.com/photos/29787613/pexels-photo-29787613.jpeg?auto=compress&cs=tinysrgb&w=1600"
                media="(min-width: 980px)"
              />
              <img
                src="https://images.pexels.com/photos/29787613/pexels-photo-29787613.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Operational energy site"
                width="840"
                height="398"
                draggable="false"
              />
            </picture>
          </div>
        </div>
      </div>

      <div
        className="services-intro__content"
        style={{ background: "#3F5669" }}
      >
        <div className="services-intro__content__wrap">
          <div className="container-h">
            <h1 className="services-intro__content__title leading-trim">{title}</h1>
            <p className="services-intro__content__subtitle leading-trim">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RootHero({ title, subtitle, routeKey = "" }: RootHeroProps) {
  const serviceLikeRoute = routeKey === "services" || routeKey === "drilling";

  if (serviceLikeRoute) {
    return <ServicesHero title={title} subtitle={subtitle} />;
  }

  return (
    <IntroHero title={title} subtitle={subtitle} showBanners={routeKey === ""} />
  );
}
