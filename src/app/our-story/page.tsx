import Link from "next/link";
import RootFooter from "@/components/layout/RootFooter";
import RootHeader from "@/components/layout/RootHeader";

export const metadata = {
  title: "Our Story | Blueflare Energy",
  description:
    "The Blueflare journey: bridging global standards with Nigerian excellence through local insight, technical rigor, and reliable delivery.",
};

const storyBlocks = [
  {
    num: "01",
    title: "The Genesis",
    body: "Blueflare Energy was born out of a fundamental observation of the West African energy market: while global technology was available, there was a disconnect in how that technology was procured, integrated, and maintained within the local landscape.",
    body2:
      "We saw the need for an indigenous partner that didn't just understand the terrain, but mastered the complex logistics and technical rigor required to keep energy assets alive.",
    cta: "Learn more about our services",
    href: "/services",
    img: "/nafassets/j-f-manzanero-QovxyL_FLTs-unsplash.jpg",
  },
  {
    num: "02",
    title: "The Blueflare Philosophy",
    body: "The name Blueflare is inspired by the 'blue flame' - the hottest, most efficient, and cleanest part of fire. It represents our core philosophy: achieving maximum efficiency with zero waste.",
    body2:
      "We started with a vision to become the most reliable link in the Nigerian energy value chain, and that vision has guided us from a boutique consultancy to a multi-faceted servicing and procurement powerhouse.",
    cta: "Explore our core values",
    href: "/our-story",
    img: "/nafassets/frankowisko-bobrka-4580272.jpg",
  },
  {
    num: "03",
    title: "Building the Future",
    body: "Our story is one of resilience and local empowerment. In an industry often dominated by international conglomerates, we have carved out a space defined by precision and local insight.",
    body2:
      "Today, Blueflare is not just a company; it is a promise of quality to the Nigerian people and the global energy community.",
    cta: "Partner with us",
    href: "/contacts",
    img: "/nafassets/vilkasss-ai-generated-8675589.jpg",
  },
];

export default function OurStoryPage() {
  return (
    <div className="story-page min-h-screen bg-white text-[#394854]">
      <RootHeader />
      <main>
        <section className="story-hero" id="top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nafassets/pexels-maxmishin-11802670.jpg"
            alt="Blueflare industrial plant"
            className="story-hero__bg"
          />
          <div className="story-hero__overlay" />
          <div className="story-hero__content">
            <p className="sust-eyebrow sust-eyebrow--light">The Blueflare Journey</p>
            <h1 className="story-hero__title">
              Bridging Global Standards with Nigerian Excellence
            </h1>
            <p className="story-hero__body">
              Our story is rooted in purpose, driven by people, and defined by our commitment
              to powering Nigeria&rsquo;s future with precision and integrity.
            </p>
            <a href="#story-genesis" className="story-hero__scroll" aria-label="Scroll to story sections">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 3v12M3 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>

        <section className="story-sections" id="story-genesis">
          {storyBlocks.map((item, idx) => (
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
              We don&rsquo;t just deliver equipment. We deliver certainty, efficiency, and peace of mind.
            </p>
            <p className="story-quote__author">BLUEFLARE ENERGY</p>
          </div>
        </section>
      </main>
      <RootFooter />
    </div>
  );
}
