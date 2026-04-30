import Link from "next/link";
import RootFooter from "@/components/layout/RootFooter";
import RootHeader from "@/components/layout/RootHeader";

export const metadata = {
  title: "Our Governance | Blueflare Energy",
  description:
    "Ethical oversight, regulatory compliance, and financial integrity shape every Blueflare decision.",
};

const governanceBlocks = [
  {
    num: "01",
    title: "Corporate Oversight",
    body: "Blueflare Energy operates under a strict corporate governance framework that ensures accountability at every level.",
    body2:
      "Our Board of Directors provides strategic oversight, ensuring that our growth is matched by an unwavering commitment to legal and ethical compliance. We believe that transparency is the bedrock of trust, especially in the high-stakes world of energy procurement.",
    cta: "See our business model",
    href: "/our-business",
    img: "/nafassets/pexels-ganesh-ramsumair-489944037-15961091.jpg",
  },
  {
    num: "02",
    title: "Our Governance Pillars",
    body: "Ethical Procurement: We maintain a zero-tolerance policy for bribery, corruption, or unethical bidding practices. Our vendors and partners are vetted through a rigorous Know Your Partner process.",
    body2:
      "Regulatory Compliance: We operate in full alignment with the laws of the Federal Republic of Nigeria, including DPR regulations, NCDMB mandates, and environmental protection laws. Financial Integrity: Our financial reporting follows international standards, providing our partners and stakeholders with a clear, audited view of our stability and growth.",
    cta: "Contact leadership",
    href: "/contacts",
    img: "/nafassets/anita_starzycka-gas-863172.jpg",
  },
  {
    num: "03",
    title: "Governance in Practice",
    body: "Our policies are designed to protect people, projects, and long-term value across the full lifecycle of execution.",
    body2:
      "From procurement controls to transparent reporting and operational accountability, governance remains embedded in how we plan, decide, and deliver.",
    cta: "Learn our story",
    href: "/our-story",
    img: "/nafassets/frankowisko-bobrka-4580272.jpg",
  },
];

export default function OurGovernancePage() {
  return (
    <div className="story-page min-h-screen bg-white text-[#394854]">
      <RootHeader />
      <main>
        <section className="story-hero" id="top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nafassets/pexels-ganesh-ramsumair-489944037-15961091.jpg"
            alt="Blueflare governance"
            className="story-hero__bg"
          />
          <div className="story-hero__overlay" />
          <div className="story-hero__content">
            <p className="sust-eyebrow sust-eyebrow--light">OUR GOVERNANCE</p>
            <h1 className="story-hero__title">Uncompromising Standards, Ethical Leadership</h1>
            <p className="story-hero__body">
              We uphold robust oversight, transparent processes, and compliance-first execution to
              build trust with every stakeholder.
            </p>
            <a href="#governance-sections" className="story-hero__scroll" aria-label="Scroll to governance sections">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 3v12M3 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>

        <section className="story-sections" id="governance-sections">
          {governanceBlocks.map((item, idx) => (
            <article
              key={item.num}
              className={`story-block${idx % 2 === 1 ? " story-block--dark story-block--reverse" : ""}`}
            >
              <div className="story-block__text">
                <p className="story-block__num">{item.num}</p>
                <h2 className="story-block__title">{item.title}</h2>
                <p className="story-block__body">{item.body}</p>
                <p className="story-block__body">{item.body2}</p>
                <Link href={item.href} className="story-block__cta">
                  {item.cta}
                </Link>
              </div>
              <div className="story-block__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt={item.title} className="story-block__img" />
              </div>
            </article>
          ))}
        </section>

        <section className="story-quote">
          <div className="story-quote__inner">
            <p className="story-quote__mark">&ldquo;</p>
            <p className="story-quote__text">
              Governance is not a document, it is a daily operating discipline.
            </p>
            <p className="story-quote__author">BLUEFLARE ENERGY</p>
          </div>
        </section>
      </main>
      <RootFooter />
    </div>
  );
}
