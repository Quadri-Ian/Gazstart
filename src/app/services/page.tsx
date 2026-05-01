import RootHeader from "@/components/layout/RootHeader";
import RootFooter from "@/components/layout/RootFooter";
import Link from "next/link";
import ScrollToSectionButton from "@/components/services/ScrollToSectionButton";

export const metadata = {
  title: "Services | Blueflare Energy",
  description:
    "Integrated solutions. Reliable execution. From the first procurement order to the last technical sign-off, we deliver full-cycle services across the energy value chain.",
};

/* ── Section 1: Hero ─────────────────────────────────────────────── */
function ServicesHero() {
  return (
    <section className="svc-hero">
      <video
        className="svc-hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/nafassets/services-hero.mp4" type="video/mp4" />
      </video>
      <div className="svc-hero__video-overlay" />
      <div className="svc-hero__content">
        {/* <p className="sust-eyebrow sust-eyebrow--light">SERVICES</p> */}
        <h1 className="svc-hero__title">Services</h1>
        <p className="svc-hero__body">
          Integrated solutions. Reliable execution. From the first procurement order to the last
          technical sign-off, we deliver full-cycle services across the energy value chain.
        </p>
        <ScrollToSectionButton
          targetId="what-we-do"
          className="svc-hero__scroll"
          ariaLabel="Scroll to services section"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3v12M3 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </ScrollToSectionButton>
      </div>
    </section>
  );
}

/* ── Section 2: What We Do ───────────────────────────────────────── */
function WhatWeDoSection() {
  const cards = [
    {
      num: "01",
      title: "Assess & Define",
      desc: "We assess project requirements and define the scope with clear objectives.",
    },
    {
      num: "02",
      title: "Mobilize Resources",
      desc: "Resources, equipment, and expertise are mobilized to site efficiently.",
    },
    {
      num: "03",
      title: "Execute & Monitor",
      desc: "Work is executed to the highest standards with continuous monitoring.",
    },
    {
      num: "04",
      title: "Test & Handover",
      desc: "Testing, quality checks, and handover ensure reliable, long-term performance.",
    },
  ];

  return (
    <section className="svc-whatwedo" id="what-we-do">
      <div className="svc-whatwedo__header">
        <div className="svc-whatwedo__header-left">
          <p className="sust-eyebrow">WHAT WE DO</p>
          <h2 className="svc-whatwedo__title">
            End-to-end capability.<br />Engineered for impact.
          </h2>
        </div>
        <div className="svc-whatwedo__header-right">
          <p className="svc-whatwedo__desc">
            Our process-driven delivery model ensures every engagement moves from scoping to
            handover with precision, transparency, and measurable performance.
          </p>
        </div>
      </div>
      <div className="services-strip svc-whatwedo__strip">
        <div className="services-strip__viewport">
          <div className="services-strip__track">
            {cards.map((item) => (
              <div key={item.num} className="service-card-frame">
                <article className="service-card">
                  <div className="service-card__top">
                    <span className="service-card__num">{item.num}</span>
                    <span className="service-card__icon" aria-hidden="true">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h10" />
                        <path d="m11 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="service-card__title">{item.title}</h3>
                  <p className="service-card__body">{item.desc}</p>
                  <Link href="/contacts" className="service-card__link">
                    Partner with us
                  </Link>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 3: Tools of Our Trade ──────────────────────────────── */
function ToolsSection() {
  return (
    <section className="svc-tools">
      <div className="svc-tools__content">
        <p className="sust-eyebrow">TOOLS OF OUR TRADE</p>
        <h2 className="svc-tools__title">
          Technology.<br />People. Performance.
        </h2>
        <p className="svc-tools__body">
          We deploy modern equipment and empower our people
          to deliver outstanding results in every environment.
        </p>
      </div>
      <div className="svc-tools__photos">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/nafassets/j-f-manzanero-QovxyL_FLTs-unsplash.jpg"
          alt="Offshore oil drilling platform"
          className="svc-tools__photo"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/nafassets/muhammed-jawad-nD1_lnWfNu8-unsplash.jpg"
          alt="Offshore drilling rig at sea"
          className="svc-tools__photo"
        />
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-[#394854]">
      <RootHeader />
      <main>
        <ServicesHero />
        <WhatWeDoSection />
        <ToolsSection />
      </main>
      <RootFooter />
    </div>
  );
}

