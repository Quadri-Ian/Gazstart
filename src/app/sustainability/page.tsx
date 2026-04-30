import RootHeader from "@/components/layout/RootHeader";
import RootFooter from "@/components/layout/RootFooter";
import Link from "next/link";

export const metadata = {
  title: "Sustainability | Blueflare Energy",
  description:
    "At Blueflare Energy, sustainability is not a peripheral concern — it is the lens through which we view every procurement contract and every technical service we deliver.",
};

/* ── Icon components ─────────────────────────────────────────────── */
function LeafIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="13.5" stroke="#c8d8f0" />
      <path d="M9 19c1-5 5-8 9-9-1 5-5 8-9 9z" stroke="#394854" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M9 19c3-3 5-5 8-9" stroke="#394854" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="13.5" stroke="#c8d8f0" />
      <circle cx="11" cy="11.5" r="2.2" stroke="#394854" strokeWidth="1.4" />
      <circle cx="17" cy="11.5" r="2.2" stroke="#394854" strokeWidth="1.4" />
      <path d="M7 20c0-2.5 1.8-4 4-4h6c2.2 0 4 1.5 4 4" stroke="#394854" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="13.5" stroke="#c8d8f0" />
      <path d="M14 8l5 2.2v4c0 3-2.5 5-5 5.8C9.5 19.2 7 17 7 14.2v-4L14 8z" stroke="#394854" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <path d="M11.5 14l1.8 1.8 3-3.3" stroke="#394854" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowRightCircle() {
  return (
    <span className="sust-priorities__arrow" aria-hidden="true">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19.5" fill="#06285f" />
        <path d="M15 20h10M22 17l3 3-3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* ── Section 1: Hero ─────────────────────────────────────────────── */
function SustainabilityHero() {
  return (
    <section className="sust-hero">
      <video
        className="sust-hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/nafassets/sustainability-hero.mp4" type="video/mp4" />
      </video>
      <div className="sust-hero__video-overlay" />
      <div className="sust-hero__content-col">
        <p className="sust-eyebrow sust-eyebrow--light">SUSTAINABILITY</p>
        <h1 className="sust-hero__title">
          Energy for Today.<br />
          Responsibility for Tomorrow.
        </h1>
        <p className="sust-hero__body">
          At Blueflare Energy, sustainability is not a peripheral concern—
          it is the lens through which we view every procurement contract
          and every technical service we deliver.
        </p>
      </div>
    </section>
  );
}

/* ── Section 2: Our Commitment ───────────────────────────────────── */
function CommitmentSection() {
  const cards = [
    {
      icon: <LeafIcon />,
      title: "Environmental Stewardship",
      body: "Minimizing environmental impact through efficient operations, responsible resource use, and partnerships that promote cleaner energy solutions.",
    },
    {
      icon: <PeopleIcon />,
      title: "Local Capacity Building",
      body: "Investing in people and communities by creating local opportunities, building capacity, and supporting education and development initiatives.",
    },
    {
      icon: <ShieldIcon />,
      title: "Governance Excellence",
      body: "Upholding the highest standards of ethics, transparency, and accountability in our operations and relationships.",
    },
  ];

  return (
    <section className="sust-commitment">
      <div className="sust-commitment__inner">
        <div className="sust-commitment__lead">
          <p className="sust-eyebrow">OUR COMMITMENT</p>
          <h2 className="sust-commitment__title">
            Our strategic<br />sustainability<br />priorities.
          </h2>
          <p className="sust-commitment__body">
            We have anchored our sustainability strategy on three definitive pillars
            that guide our actions and measure our impact.
          </p>
        </div>
        <div className="sust-commitment__cards">
          {cards.map((c) => (
            <div key={c.title} className="sust-card">
              <div className="sust-card__icon">{c.icon}</div>
              <h3 className="sust-card__title">{c.title}</h3>
              <p className="sust-card__body">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 3: Our Sustainability Priorities ────────────────────── */
function PrioritiesSection() {
  const priorities = [
    {
      num: "01",
      title: "Environmental Stewardship",
      bullets: ["Asset Integrity & Emission Control", "Waste Management Protocols", "Energy-Efficient Procurement", "Promoting Low-Impact Operations"],
    },
    {
      num: "02",
      title: "Local Capacity Building",
      bullets: ["Local Content Development", "Skills & Technology Transfer", "Supporting Local Vendors", "Community Development"],
    },
    {
      num: "03",
      title: "Ethical Supply Chain & Governance",
      bullets: ["Responsible Sourcing", "Transparent Partnerships", "Health, Safety & Compliance", "Strong Corporate Governance"],
    },
  ];

  return (
    <section className="sust-priorities">
      <div className="sust-priorities__inner">
        <div className="sust-priorities__lead">
          <p className="sust-eyebrow">OUR SUSTAINABILITY PRIORITIES</p>
          <h2 className="sust-priorities__title">
            Driving meaningful<br />impact across our<br />value chain.
          </h2>
        </div>
        <div className="sust-priorities__list">
          {priorities.map((p, i) => (
            <div key={p.num} className={`sust-priorities__row${i < priorities.length - 1 ? "" : " sust-priorities__row--last"}`}>
              <span className="sust-priorities__num">{p.num}</span>
              <span className="sust-priorities__row-title">{p.title}</span>
              <ul className="sust-priorities__bullets">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <ArrowRightCircle />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 4: Our Approach ─────────────────────────────────────── */
function ApproachSection() {
  const pillars = [
    {
      label: "Cleaner Operations",
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="24" height="24" rx="5" stroke="#394854" strokeWidth="1.4" />
          <path d="M7 14c2-4 7-6 12-5" stroke="#394854" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M13 9v2M9 11l1.5 1.5M17 11l-1.5 1.5" stroke="#394854" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Resource Efficiency",
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="24" height="24" rx="5" stroke="#394854" strokeWidth="1.4" />
          <path d="M8 18V12M13 18V8M18 18v-5" stroke="#394854" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Community Empowerment",
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="24" height="24" rx="5" stroke="#394854" strokeWidth="1.4" />
          <circle cx="10" cy="11" r="2" stroke="#394854" strokeWidth="1.3" />
          <circle cx="16" cy="11" r="2" stroke="#394854" strokeWidth="1.3" />
          <path d="M6 19c0-2 1.8-3.5 4-3.5h6c2.2 0 4 1.5 4 3.5" stroke="#394854" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Safe & Reliable Delivery",
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="24" height="24" rx="5" stroke="#394854" strokeWidth="1.4" />
          <path d="M13 6l5 2.5v4.5c0 3-2.5 5-5 5.8-2.5-.8-5-2.8-5-5.8V8.5L13 6z" stroke="#394854" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
          <path d="M10.5 13l1.8 1.8 3-3.3" stroke="#394854" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="sust-approach">
      <div className="sust-approach__image-col">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/nafassets/9lq7jij2dmddqtcf9e8mimkfn6amt7zh.jpg"
          alt="Engineer at industrial facility"
          className="sust-approach__img"
        />
      </div>
      <div className="sust-approach__content-col">
        <p className="sust-eyebrow">OUR APPROACH</p>
        <h2 className="sust-approach__title">
          Engineering solutions<br />for a sustainable future.
        </h2>
        <p className="sust-approach__body">
          We partner with global leaders and local innovators to deliver
          solutions that reduce emissions, optimize resource use, and
          improve operational efficiency across the Nigerian energy
          sector and beyond.
        </p>
        <div className="sust-approach__pillars">
          {pillars.map((p) => (
            <div key={p.label} className="sust-approach__pillar">
              <div className="sust-approach__pillar-icon">{p.icon}</div>
              <span className="sust-approach__pillar-label">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 5: The Blueflare Legacy ────────────────────────────── */
function LegacySection() {
  return (
    <section className="sust-legacy">
      <div className="sust-legacy__image-col">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/nafassets/pexels-quang-nguyen-vinh-222549-35105445.jpg"
          alt="Industrial sustainability operations"
          className="sust-legacy__img"
        />
      </div>
      <div className="sust-legacy__content-col">
        <p className="sust-eyebrow sust-eyebrow--muted">THE BLUEFLARE LEGACY</p>
        <h2 className="sust-legacy__title">
          A legacy of responsibility.<br />A future of possibility.
        </h2>
        <p className="sust-legacy__body">
          Sustainability at Blueflare Energy is a journey of continuous improvement.
          As the energy transition evolves, we are committed to being the indigenous
          leader that provides all oil and gas operations can be safe, clean, and
          profoundly beneficial to the Nigerian people.
        </p>
        <Link href="/contacts" className="sust-legacy__cta">
          Partner With Us
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white text-[#394854]">
      <RootHeader />
      <main>
        <SustainabilityHero />
        <CommitmentSection />
        <PrioritiesSection />
        <ApproachSection />
        <LegacySection />
      </main>
      <RootFooter />
    </div>
  );
}

