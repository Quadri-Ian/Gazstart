"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

const people = [
  {
    id: 0,
    name: ["Tural", "Kerimov"],
    post: ["Chairman", "of the", "Board"],
    quote:
      "GazStart is one of key drilling contractors in Yamal-Nenets and Khanty-Mansiysk Autonomous Okrugs, Tyumen and Tomsk Oblasts. The Company is on the path of sustainable growth outlined by our long-term business strategy.",
    href: "/company/about",
    bgColor: "#152030",
  },
  {
    id: 1,
    name: ["Nikolay", "Grishankov"],
    post: ["Chief", "Executive", "Officer"],
    quote:
      "Safety, efficiency, and innovation drive everything we do. Our operations teams work tirelessly to meet the highest standards while pushing the boundaries of what is possible in difficult formations.",
    href: "/company/about",
    bgColor: "#1e2e40",
  },
];

export default function ManagementSlider() {
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    // Reset the bar
    fill.style.transition = "none";
    fill.style.width = "0%";
    // Force reflow
    void fill.offsetWidth;
    fill.style.transition = "width 8s linear";
    fill.style.width = "100%";

    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % people.length);
    }, 8000);
    return () => clearTimeout(timer);
  }, [active]);

  const person = people[active];
  const next = people[(active + 1) % people.length];

  return (
    <section className="ui-dark-background" id="ceo">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left: photo panel */}
        <div className="appeal-ceo__top" style={{ backgroundColor: person.bgColor }}>
          {/* Person avatar placeholder */}
          <div className="appeal-ceo__image flex items-end justify-center">
            <div
              className="w-full h-full flex items-end justify-center"
              style={{
                background: `linear-gradient(to top, ${person.bgColor}, transparent 60%)`,
                position: "absolute",
                inset: 0,
                zIndex: 2,
              }}
            />
            {/* Initials placeholder since no photo assets */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: 1 }}
            >
              <span
                className="text-white/10 font-light select-none"
                style={{ fontSize: "clamp(80px, 14vw, 200px)", letterSpacing: "-0.06em" }}
              >
                {person.name[0][0]}
                {person.name[1][0]}
              </span>
            </div>
          </div>

          {/* Post title overlay */}
          <div className="appeal-ceo__post" style={{ zIndex: 10 }}>
            {person.post.map((line, i) => (
              <span key={i}>
                {line}
                {i < person.post.length - 1 && <br />}
              </span>
            ))}
          </div>

          {/* Next person tab — bottom right */}
          <button
            onClick={() => setActive((prev) => (prev + 1) % people.length)}
            className="absolute bottom-6 right-6 flex items-center gap-3 group"
            style={{ zIndex: 10 }}
            aria-label="Next person"
          >
            <div className="text-right">
              <p className="text-xs text-white/40">{next.name[0]}</p>
              <p className="text-xs text-white/40">{next.name[1]}</p>
            </div>
            <span
              className="flex items-center justify-center bg-[#BF0632] text-white transition-transform group-hover:scale-105"
              style={{ width: 32, height: 32 }}
            >
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
                <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>

        {/* Right: text panel */}
        <div className="appeal-ceo__bottom">
          {/* Title */}
          <div className="title-border mb-8">
            <h2>Management message</h2>
          </div>

          {/* Name */}
          <div className="appeal-ceo__name">
            <h4>
              {person.name[0]}
              <br />
              {person.name[1]}
            </h4>
          </div>

          {/* Quote */}
          <div className="appeal-ceo__text__quote">
            <blockquote>
              {/* Quote icon */}
              <svg width="34" height="30" viewBox="0 0 34 30" fill="none" aria-hidden="true" className="mb-2 opacity-40">
                <path d="M0 30V18C0 7.333 4.667 1.333 14 0l2 3C11.333 4.333 9.333 7 9 11h5v19H0zm19 0V18C19 7.333 23.667 1.333 33 0l2 3c-4.667 1.333-6.667 4-7 8h5v19H19z" fill="white" />
              </svg>
              <p>{person.quote}</p>
            </blockquote>
            <Link
              href={`/${locale}${person.href}`}
              className="appeal-ceo__text__more"
            >
              Learn more
            </Link>
          </div>

          {/* Progress bar */}
          <div className="appeal-ceo__load-bar mt-10">
            <div ref={fillRef} className="appeal-ceo__load-fill" />
          </div>

          {/* Person dots */}
          <div className="flex gap-3 mt-4">
            {people.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                aria-label={`${p.name[0]} ${p.name[1]}`}
                className="transition-colors duration-200"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 0,
                  background: i === active ? "#BF0632" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
