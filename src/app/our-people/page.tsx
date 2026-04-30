import Link from "next/link";
import RootFooter from "@/components/layout/RootFooter";
import RootHeader from "@/components/layout/RootHeader";

export const metadata = {
  title: "Our People | Blueflare Energy",
  description:
    "Driven by talent and united by safety, Blueflare teams combine local empowerment, technical excellence, and a zero-harm culture.",
};

const peopleBlocks = [
  {
    num: "01",
    title: "The Blueflare Workforce",
    body: "Our people are our greatest asset. We have assembled a diverse team of master logisticians, certified mechanical and electrical engineers, and project managers who bring decades of combined experience from both local and international fields.",
    body2:
      "At Blueflare, we do not just staff projects; we deploy specialists who take personal ownership of every bolt tightened and every order delivered.",
    cta: "Explore our services",
    href: "/services",
    img: "/nafassets/anita_starzycka-gas-863172.jpg",
  },
  {
    num: "02",
    title: "A Culture of Local Empowerment",
    body: "Continuous Training: Our staff undergoes regular certification programs to stay ahead of global engineering trends.",
    body2:
      "Mentorship: Senior experts work alongside junior Nigerian engineers to ensure the transfer of critical technical knowledge.",
    cta: "See our story",
    href: "/our-story",
    img: "/nafassets/frankowisko-bobrka-4580272.jpg",
  },
  {
    num: "03",
    title: "Safety as a Way of Life",
    body: "We operate under the Goal Zero principle: zero accidents, zero injuries, and zero environmental damage.",
    body2:
      "Every member of the Blueflare team is empowered with Stop Work Authority. If a situation is unsafe, our people have the mandate to halt operations immediately, regardless of the project timeline.",
    cta: "Contact our team",
    href: "/contacts",
    img: "/nafassets/vilkasss-ai-generated-8675589.jpg",
  },
];

export default function OurPeoplePage() {
  return (
    <div className="story-page min-h-screen bg-white text-[#394854]">
      <RootHeader />
      <main>
        <section className="story-hero" id="top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nafassets/pexels-mokhtar-med-1510192794-33150526.jpg"
            alt="Blueflare workforce"
            className="story-hero__bg"
          />
          <div className="story-hero__overlay" />
          <div className="story-hero__content">
            <p className="sust-eyebrow sust-eyebrow--light">OUR PEOPLE</p>
            <h1 className="story-hero__title">Driven by Talent, United by Safety</h1>
            <p className="story-hero__body">
              Our teams blend deep engineering knowledge, operational discipline, and local insight
              to deliver reliable outcomes on every project.
            </p>
            <a href="#people-sections" className="story-hero__scroll" aria-label="Scroll to people sections">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 3v12M3 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>

        <section className="story-sections" id="people-sections">
          {peopleBlocks.map((item, idx) => (
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
              People power performance, and performance powers progress.
            </p>
            <p className="story-quote__author">BLUEFLARE ENERGY</p>
          </div>
        </section>
      </main>
      <RootFooter />
    </div>
  );
}
