"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollReveal — global scroll-triggered entrance animations.
 *
 * Observes every <section> on the page. When a section enters the viewport
 * it receives the class `sr-visible` which triggers the fade-up animation
 * defined in globals.css. Sections already in view on mount are revealed
 * immediately (threshold 0.05 so they fire right away).
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "section, .story-block, .careers-value-card, .service-card-frame, .testimonials-section__left, .testimonials-section__right",
      ),
    ).filter((el) => {
      return !el.matches("section.intro, section.svc-hero, section.sust-hero");
    });

    if (!targets.length) {
      return;
    }

    // Mark all as ready when route content changes so animations replay per page.
    targets.forEach((el) => {
      el.classList.remove("sr-visible");
      el.classList.add("sr-ready");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sr-visible");
            entry.target.classList.remove("sr-ready");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    );

    const raf = requestAnimationFrame(() => {
      targets.forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
