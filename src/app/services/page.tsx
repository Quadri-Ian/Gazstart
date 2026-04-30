import RootHeader from "@/components/layout/RootHeader";
import RootFooter from "@/components/layout/RootFooter";
import Link from "next/link";

export const metadata = {
  title: "Services | Blueflare Energy",
  description:
    "Integrated solutions. Reliable execution. From the first procurement order to the last technical sign-off, we deliver full-cycle services across the energy value chain.",
};

/* ── Service card icons ──────────────────────────────────────────── */
function DrillingIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="17.5" stroke="#c8d8f0" />
      <path d="M18 8v12M14 20h8l-2 6h-4l-2-6z" stroke="#394854" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11 14h14" stroke="#394854" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function ProcurementIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="17.5" stroke="#c8d8f0" />
      <rect x="11" y="13" width="14" height="11" rx="1.5" stroke="#394854" strokeWidth="1.4" />
      <path d="M15 13v-2a3 3 0 016 0v2" stroke="#394854" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M15 18h6" stroke="#394854" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function TechnicalIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="17.5" stroke="#c8d8f0" />
      <path d="M13 13l10 10M23 13L13 23" stroke="#394854" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="18" r="3.5" stroke="#394854" strokeWidth="1.3" />
    </svg>
  );
}
function TestingIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="17.5" stroke="#c8d8f0" />
      <path d="M14 9h8l2 10H12L14 9z" stroke="#394854" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <path d="M12 19l-1 4c0 1 .8 2 2 2h10c1.2 0 2-.9 2-2l-1-4" stroke="#394854" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M15 15h6" stroke="#394854" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

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
        <h1 className="svc-hero__title">Services</h1>
        <p className="svc-hero__body">
          Integrated solutions. Reliable execution.<br />
          From the first procurement order to the last<br />
          technical sign-off, we deliver full-cycle<br />
          services across the energy value chain.
        </p>
        <a href="#what-we-do" className="svc-hero__scroll" aria-label="Scroll to services">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3v12M3 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}

/* ── Section 2: What We Do ───────────────────────────────────────── */
function WhatWeDoSection() {
  const services = [
    {
      num: "01",
      icon: <DrillingIcon />,
      title: "Drilling and Field Services",
      body: "Integrated drilling solutions delivered with precision, safety, and efficiency.",
      bullets: ["Drilling Operations", "Well Support Services", "Rig Management", "Field Logistics"],
    },
    {
      num: "02",
      icon: <ProcurementIcon />,
      title: "Procurement and Supply",
      body: "Global sourcing. Local expertise. Quality you can trust.",
      bullets: ["Equipment Procurement", "OEM Partnerships", "Inventory Management", "Logistics & Delivery"],
    },
    {
      num: "03",
      icon: <TechnicalIcon />,
      title: "Technical Support and Maintenance",
      body: "Keeping your assets performing at their peak.",
      bullets: ["Preventive Maintenance", "Shutdown & Turnaround", "Repairs & Overhauls", "24/7 Technical Support"],
    },
    {
      num: "04",
      icon: <TestingIcon />,
      title: "Testing and Inspection",
      body: "Accurate testing. Assured compliance. Total confidence.",
      bullets: ["Material Testing", "NDT & Inspection", "QA / QC Services", "Certification Support"],
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
            Blueflare provides integrated drilling and field services,
            procurement, and technical support tailored to the unique
            demands of oil and gas operations in West Africa.
          </p>
        </div>
      </div>
      <div className="svc-cards">
        {services.map((s) => (
          <div key={s.num} className="svc-card">
            <span className="svc-card__num">{s.num}</span>
            <div className="svc-card__icon">{s.icon}</div>
            <h3 className="svc-card__title">{s.title}</h3>
            <p className="svc-card__body">{s.body}</p>
            <ul className="svc-card__bullets">
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Section 3: Production Processes ────────────────────────────── */
function ProductionProcessesSection() {
  const steps = [
    { num: "01", desc: "We assess project requirements and define the scope with clear objectives." },
    { num: "02", desc: "Resources, equipment, and expertise are mobilized to site efficiently." },
    { num: "03", desc: "Work is executed to the highest standards with continuous monitoring." },
    { num: "04", desc: "Testing, quality checks, and handover ensure reliable, long-term performance." },
  ];

  return (
    <section className="svc-production">
      <div className="svc-production__left">
        <h2 className="svc-production__title">
          Production<br />Processes
        </h2>
        <p className="svc-production__body">
          Our proven process ensures quality, transparency, and efficiency at every step.
        </p>
        <Link href="/contacts" className="svc-production__cta" aria-label="Partner with us">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      <div className="svc-production__right">
        {steps.map((s, i) => (
          <div key={s.num} className={`svc-production__step${i === 0 ? " svc-production__step--first" : ""}`}>
            <span className="svc-production__step-num">{s.num}</span>
            <p className="svc-production__step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Section 4: Tools of Our Trade ──────────────────────────────── */
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
        <ProductionProcessesSection />
        <ToolsSection />
      </main>
      <RootFooter />
    </div>
  );
}

