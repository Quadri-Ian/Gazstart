import Link from "next/link";
import RootFooter from "@/components/layout/RootFooter";
import RootHeader from "@/components/layout/RootHeader";

export const metadata = {
  title: "Our Business | Blueflare Energy",
  description:
    "Integrated procurement, technical servicing, and asset integrity support built for the Nigerian energy sector.",
};

const businessBlocks = [
  {
    num: "01",
    title: "Strategic Procurement & Supply Chain",
    body: "OEM Equipment Sourcing: Direct partnerships with global manufacturers for valves, pumps, turbines, and drilling components.",
    body2:
      "Quality Assurance and Inspection: Every item we procure undergoes rigorous factory acceptance tests and technical vetting before it leaves the source. Expediting and Clearing: We navigate the complexities of international shipping and Nigerian customs with a specialized team that ensures your project never stalls due to missing parts.",
    cta: "View all services",
    href: "/services",
    img: "/nafassets/pexels-dirk-schuneman-113939707-9720534.jpg",
  },
  {
    num: "02",
    title: "Technical Servicing & Asset Integrity",
    body: "On-Site Installation and Commissioning: Ensuring new equipment is integrated perfectly into existing systems.",
    body2:
      "Routine and Emergency Maintenance: Preventive maintenance schedules that extend the life of your assets and 24/7 rapid-response teams for technical failures. Asset Integrity Management: Using modern diagnostic tools to monitor the health of pipelines, vessels, and facilities, preventing leaks and downtime before they happen.",
    cta: "Talk to our experts",
    href: "/contacts",
    img: "/nafassets/anita_starzycka-gas-863172.jpg",
  },
  {
    num: "03",
    title: "Built for Reliable Delivery",
    body: "Our business model combines commercial discipline with field-ready execution to keep operations moving safely and efficiently.",
    body2:
      "By integrating sourcing, logistics, and technical support into one coordinated workflow, we reduce delays and protect long-term asset performance.",
    cta: "Learn our story",
    href: "/our-story",
    img: "/nafassets/frankowisko-bobrka-4580272.jpg",
  },
];

export default function OurBusinessPage() {
  return (
    <div className="story-page min-h-screen bg-white text-[#394854]">
      <RootHeader />
      <main>
        <section className="story-hero" id="top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nafassets/pexels-dirk-schuneman-113939707-9720534.jpg"
            alt="Blueflare business operations"
            className="story-hero__bg"
          />
          <div className="story-hero__overlay" />
          <div className="story-hero__content">
            <p className="sust-eyebrow sust-eyebrow--light">OUR BUSINESS</p>
            <h1 className="story-hero__title">Integrated Solutions for an Evolving Energy Sector</h1>
            <p className="story-hero__body">
              Blueflare combines procurement precision, technical depth, and operational speed to
              deliver dependable outcomes in complex environments.
            </p>
            <a href="#business-sections" className="story-hero__scroll" aria-label="Scroll to business sections">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 3v12M3 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>

        <section className="story-sections" id="business-sections">
          {businessBlocks.map((item, idx) => (
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
              Integrated execution is how we turn complexity into certainty.
            </p>
            <p className="story-quote__author">BLUEFLARE ENERGY</p>
          </div>
        </section>
      </main>
      <RootFooter />
    </div>
  );
}
