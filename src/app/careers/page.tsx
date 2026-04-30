import Link from "next/link";
import RootFooter from "@/components/layout/RootFooter";
import RootHeader from "@/components/layout/RootHeader";

export const metadata = {
  title: "Careers | Blueflare Energy",
};

const valueCards = [
  {
    title: "Grow With Us",
    body: "Develop your skills and build a long-term career with real opportunities.",
  },
  {
    title: "Work With Integrity",
    body: "We do the right thing, every time - for our clients and our communities.",
  },
  {
    title: "Innovate Every Day",
    body: "Bring ideas to the table and help shape smarter, more efficient solutions.",
  },
  {
    title: "Make an Impact",
    body: "Be part of projects that drive progress and create lasting value.",
  },
];

export default function CareersPage() {
  return (
    <div className="careers-page min-h-screen bg-white text-[#394854]">
      <RootHeader />
      <main>
        <section className="careers-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nafassets/ChatGPT%20Image%20Apr%2030,%202026,%2008_45_30%20PM.png"
            alt="Blueflare careers"
            className="careers-hero__bg"
          />
          <div className="careers-hero__overlay" />
          <div className="careers-hero__content">
            <p className="sust-eyebrow sust-eyebrow--light">CAREERS</p>
            <h1 className="careers-hero__title">Build Your Future. Power Progress.</h1>
            <p className="careers-hero__body">
              At Blueflare Energy, we&apos;re always looking for driven minds who are ready to solve
              complex challenges and make a real impact.
            </p>
            <Link href="/careers" className="careers-hero__cta">View Open Positions</Link>
          </div>
        </section>

        <section className="careers-values">
          <p className="sust-eyebrow">WHY JOIN BLUEFLARE</p>
          <h2 className="careers-values__title">More than a Job. A Purpose.</h2>
          <p className="careers-values__subtitle">
            We are a team of innovators and problem solvers committed to delivering reliable
            energy solutions that power industries and communities.
          </p>
          <div className="careers-values__grid">
            {valueCards.map((item) => (
              <article key={item.title} className="careers-value-card">
                <h3 className="careers-value-card__title">{item.title}</h3>
                <p className="careers-value-card__body">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="careers-banner">
          <div className="careers-banner__left">
            <h2 className="careers-banner__title">Ready to make your next move?</h2>
          </div>
          <div className="careers-banner__right">
            <p className="careers-banner__body">Explore current openings and find a role where you can thrive.</p>
            <Link href="/careers" className="careers-banner__cta">View Open Positions</Link>
          </div>
        </section>
      </main>
      <RootFooter />
    </div>
  );
}
