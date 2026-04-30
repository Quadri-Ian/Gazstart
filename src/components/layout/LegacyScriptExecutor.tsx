"use client";

import { useEffect } from "react";

type LegacyScriptExecutorProps = {
  routeKey: string;
  legacyBodyHtml: string;
};

function enforceCardCount(container: HTMLElement, panelId: string, keepCount: number) {
  container.querySelectorAll(`#${panelId} .cloned`).forEach((node) => node.remove());

  const cardItems = Array.from(
    container.querySelectorAll<HTMLElement>(`#${panelId} .carousel-owl-item, #${panelId} .owl-item`),
  );

  cardItems.forEach((node, index) => {
    if (index >= keepCount) {
      node.remove();
    }
  });

  container
    .querySelectorAll(`#${panelId} .card-article__bottom, #${panelId} .card-article__small, #${panelId} .card-article__day`)
    .forEach((node) => node.remove());
}

function setupServicesScrollReveal(container: HTMLElement): (() => void) | null {
  const frames = container.querySelectorAll<HTMLElement>(".service-card-frame");
  if (!frames.length) {
    return null;
  }

  // Each card is wrapped in a `.service-card-frame` div at its NATURAL layout
  // position (no transform). The IntersectionObserver observes the FRAME
  // (clean bbox), and toggles `is-not-revealed` on the INNER `.service-card`.
  // The card itself has `transform: translateX(±110%)` when hidden — but since
  // IO observes the frame (not the card), the off-screen transform has no
  // effect on intersection math. This is the standard workaround for
  // observing transformed elements + ancestor `overflow: clip`.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const card = entry.target.querySelector<HTMLElement>(".service-card");
        if (!card) return;
        card.classList.toggle("is-not-revealed", !entry.isIntersecting);
      });
    },
    { threshold: 0.15 },
  );

  frames.forEach((frame) => observer.observe(frame));

  return () => observer.disconnect();
}

function setupTestimonialsRotator(container: HTMLElement): (() => void) | null {
  const section = container.querySelector<HTMLElement>(".testimonials-section");
  if (!section) {
    return null;
  }

  // Roster of management members. Add/remove entries here to grow the rotator.
  const testimonials: Array<{
    src: string;
    alt: string;
    name: string;
    titleLines: string[];
  }> = [
    {
      src: "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Ava Lin portrait",
      name: "AVA LIN",
      titleLines: ["CREATIVE DIRECTOR,", "SELAH STUDIO"],
    },
    {
      src: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Marcus Okafor portrait",
      name: "MARCUS OKAFOR",
      titleLines: ["CHIEF OPERATIONS OFFICER,", "BLUEFLARE ENERGY"],
    },
    {
      src: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Daniel Adeyemi portrait",
      name: "DANIEL ADEYEMI",
      titleLines: ["HEAD OF ENGINEERING,", "BLUEFLARE ENERGY"],
    },
  ];

  const featuredImg = section.querySelector<HTMLImageElement>(".testimonials-section__featured img");
  const thumbsWrap = section.querySelector<HTMLElement>(".testimonials-section__thumbs");
  const creditName = section.querySelector<HTMLElement>(".testimonials-section__credit-name");
  const creditTitle = section.querySelector<HTMLElement>(".testimonials-section__credit-title");

  if (!featuredImg || !thumbsWrap || !creditName || !creditTitle) {
    return null;
  }

  let currentIdx = 0;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  const ROTATE_MS = 5000;

  function render() {
    const featured = testimonials[currentIdx];
    if (!featuredImg || !creditName || !creditTitle || !thumbsWrap) return;

    featuredImg.src = featured.src;
    featuredImg.alt = featured.alt;
    creditName.textContent = featured.name;

    // Build the multi-line title using text nodes + <br> (no innerHTML).
    while (creditTitle.firstChild) creditTitle.removeChild(creditTitle.firstChild);
    featured.titleLines.forEach((line, i) => {
      if (i > 0) creditTitle.appendChild(document.createElement("br"));
      creditTitle.appendChild(document.createTextNode(line));
    });

    // Rebuild thumbs from the non-featured testimonials, preserving order.
    while (thumbsWrap.firstChild) thumbsWrap.removeChild(thumbsWrap.firstChild);
    testimonials.forEach((t, idx) => {
      if (idx === currentIdx) return;
      const picture = document.createElement("picture");
      const img = document.createElement("img");
      img.src = t.src;
      img.alt = t.alt;
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        currentIdx = idx;
        render();
        scheduleNext();
      });
      picture.appendChild(img);
      thumbsWrap.appendChild(picture);
    });
  }

  function scheduleNext() {
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      currentIdx = (currentIdx + 1) % testimonials.length;
      render();
    }, ROTATE_MS);
  }

  render();
  scheduleNext();

  return () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}

function setupGeographyMarkerOverlay(container: HTMLElement): (() => void) | null {
  const wrap = container.querySelector<HTMLElement>(".geography__map__wrap");
  if (!wrap) {
    return null;
  }

  const svgs = wrap.querySelectorAll<SVGSVGElement>(".geography__animate");
  const desktopSvg = Array.from(svgs).find(
    (s) => window.getComputedStyle(s).display !== "none",
  );
  if (!desktopSvg) {
    return null;
  }

  wrap.querySelectorAll(".geography__markers-overlay").forEach((node) => node.remove());

  const clone = desktopSvg.cloneNode(true) as SVGSVGElement;
  clone.classList.remove("geography__animate", "is-hidden--sm-down", "is-hidden--md-up");
  clone.classList.add("geography__markers-overlay");
  clone.querySelectorAll("path").forEach((p) => p.remove());
  // Strip text labels (Lagos, Abuja) and the connecting lines that pointed to them.
  clone.querySelectorAll("text, line").forEach((n) => n.remove());

  // Remove the original Abuja and Lagos markers — replaced entirely by the
  // user-specified leaf-icon set below.
  clone.querySelectorAll(".geography__map__ellipse, .geography__map__point").forEach((n) => n.remove());

  // Marker locations in SVG viewBox coords (1160×415). Tweak cx/cy to reposition.
  const SVG_NS = "http://www.w3.org/2000/svg";
  const markers: Array<{ cx: number; cy: number }> = [
    { cx: 510, cy: 180 }, // Abuja — Federal Capital Territory (central)
    { cx: 470, cy: 315 }, // Lagos — southwest coast
    { cx: 555, cy: 320 }, // Delta State — south central, east of Lagos
    { cx: 390, cy: 275 }, // Rivers — southwest region (Oyo/Osun area, north of Lagos)
  ];
  // Render each marker as the brand leaf icon. Icon is centered on (cx, cy)
  // by offsetting x/y by half the size. Adjust ICON_SIZE to scale all markers.
  const ICON_SIZE = 60;
  markers.forEach(({ cx, cy }) => {
    const img = document.createElementNS(SVG_NS, "image");
    img.setAttribute("href", "/nafassets/leaf.png");
    img.setAttribute("x", String(cx - ICON_SIZE / 2));
    img.setAttribute("y", String(cy - ICON_SIZE / 2));
    img.setAttribute("width", String(ICON_SIZE));
    img.setAttribute("height", String(ICON_SIZE));
    img.setAttribute("class", "geography__map__leaf-marker");
    img.setAttribute("preserveAspectRatio", "xMidYMid meet");
    clone.appendChild(img);
  });

  Object.assign(clone.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "3",
  });

  if (window.getComputedStyle(wrap).position === "static") {
    wrap.style.position = "relative";
  }

  wrap.appendChild(clone);

  return () => {
    clone.remove();
  };
}

// Scroll-triggered staged reveal for the geography section. Adds `.is-revealed`
// to the section when it enters the viewport — CSS rules then orchestrate the
// sequence: silhouette + heading fade in immediately, outlined map wipes in
// next, and the leaf markers pop in last. Toggling the class on/off as the
// user scrolls in/out lets the user replay the reveal.
function setupGeographyScrollReveal(container: HTMLElement): (() => void) | null {
  const section = container.querySelector<HTMLElement>(".geography");
  if (!section) return null;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        section.classList.toggle("is-revealed", entry.isIntersecting);
      });
    },
    { threshold: 0.2 },
  );
  observer.observe(section);
  return () => {
    observer.disconnect();
    section.classList.remove("is-revealed");
  };
}

// Scroll-triggered staged reveal for the Vision/Mission section (panel 2 of
// the horizontal scroll). Choreography:
//   1. Background fades in (CSS::before opacity)
//   2. Vision + Mission cards slide in from the left
//   3. "Vision" / "Mission" titles fade up
//   4. Body text reveals character-by-character (typewriter effect)
//
// The typewriter is implemented by pre-splitting each body paragraph into
// `<span>` per character at setup time, with an inline `transition-delay`
// computed per index. From then on, only the section's class flips —
// CSS does the rest.
function setupVisionMissionScrollReveal(container: HTMLElement): (() => void) | null {
  const section = container.querySelector<HTMLElement>(".vm-section");
  if (!section) return null;

  // ── Pre-split body text into character spans (typewriter setup) ─────
  const bodies = section.querySelectorAll<HTMLElement>(".vm-card__body");
  const TYPEWRITER_START = 1.4;     // seconds: when the first character appears
  const PER_CHAR = 0.015;            // seconds per character — ~67 chars/sec
  const originalTexts: Array<{ el: HTMLElement; text: string }> = [];

  bodies.forEach((p) => {
    // Idempotent: if already split (e.g. on hot-reload), skip
    if (p.dataset.typewriterSplit === "1") return;
    const text = p.textContent ?? "";
    originalTexts.push({ el: p, text });
    p.textContent = "";
    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      // Preserve spaces — single space chars in a span still wrap correctly
      // and render with the same width as a regular space.
      span.textContent = char;
      span.style.transitionDelay = `${TYPEWRITER_START + i * PER_CHAR}s`;
      p.appendChild(span);
    });
    p.dataset.typewriterSplit = "1";
  });

  // ── Scroll-triggered class flip ─────────────────────────────────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        section.classList.toggle("is-revealed", entry.isIntersecting);
      });
    },
    { threshold: 0.2 },
  );
  observer.observe(section);

  return () => {
    observer.disconnect();
    section.classList.remove("is-revealed");
    // Restore original textContent so cleanup is reversible (helps Fast Refresh)
    originalTexts.forEach(({ el, text }) => {
      el.textContent = text;
      delete el.dataset.typewriterSplit;
    });
  };
}

// Scroll-triggered staged reveal for the Culture / Core Values section.
// The section sits inside the horizontal-scroll wrapper as panel 1, so its
// bounding rect tracks the panel's translateX — IntersectionObserver still
// works correctly because IO uses post-transform geometry.
//
// Reveal sequence (CSS-driven via `.is-revealed`):
//   - Headline + subtitle fade up (same primitive as geography)
//   - 6 culture-cards slide in from the LEFT in left→right reading order
function setupCultureScrollReveal(container: HTMLElement): (() => void) | null {
  const section = container.querySelector<HTMLElement>(".culture-section");
  if (!section) return null;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        section.classList.toggle("is-revealed", entry.isIntersecting);
      });
    },
    { threshold: 0.2 },
  );
  observer.observe(section);
  return () => {
    observer.disconnect();
    section.classList.remove("is-revealed");
  };
}

function setupHomeDrillingRotator(container: HTMLElement): (() => void) | null {
  const img = container.querySelector<HTMLImageElement>("#numbers-rotator");
  const section = container.querySelector<HTMLElement>(".numbers");
  if (!img || !section) {
    return null;
  }

  const frameIds = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 21, 27, 28, 29, 30, 31, 32, 33, 34,
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59, 60, 61, 62, 63, 64, 65, 66, 68, 69, 70, 71,
  ];

  const frames = frameIds.map((n) => `/nafassets/angles2/frame_${String(n).padStart(6, "0")}.webp`);
  if (!frames.length) {
    return null;
  }

  const centerIndex = Math.floor(frames.length / 2);
  let current = 0;
  let target = 0;
  let introPlayed = false;
  let rafId: number | null = null;

  frames.forEach((src) => {
    const preloaded = new Image();
    preloaded.src = src;
  });

  const render = (frame: number) => {
    const safe = Math.max(0, Math.min(frames.length - 1, Math.round(frame)));
    if (img.dataset.frame !== String(safe)) {
      img.src = frames[safe];
      img.dataset.frame = String(safe);
    }
  };

  const animate = () => {
    current += (target - current) * 0.045;
    if (Math.abs(target - current) < 0.02) {
      current = target;
    }
    render(current);
    rafId = window.requestAnimationFrame(animate);
  };

  const playIntro = () => {
    if (introPlayed) {
      return;
    }
    introPlayed = true;

    let start: number | null = null;
    const duration = 1800;

    const step = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      target = eased * centerIndex;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        target = centerIndex;
      }
    };

    window.requestAnimationFrame(step);
  };

  const updateFromMouse = (clientX: number) => {
    if (!introPlayed) {
      return;
    }
    const rect = section.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;
    ratio = Math.max(0.05, Math.min(0.95, ratio));
    target = ratio * (frames.length - 1);
  };

  const onMouseMove = (event: MouseEvent) => updateFromMouse(event.clientX);
  const onMouseLeave = () => {
    target = centerIndex;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playIntro();
        }
      });
    },
    { threshold: 0.35 },
  );

  observer.observe(section);
  section.addEventListener("mousemove", onMouseMove);
  section.addEventListener("mouseleave", onMouseLeave);

  render(0);
  rafId = window.requestAnimationFrame(animate);

  return () => {
    observer.disconnect();
    section.removeEventListener("mousemove", onMouseMove);
    section.removeEventListener("mouseleave", onMouseLeave);
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
    }
  };
}

// Scroll-jacked horizontal scroll: converts vertical scroll progress through
// the `.hscroll` outer container into horizontal `translate3d` motion on the
// inner `.hscroll__track`. While the user is within the container's range,
// the inner `.hscroll__pinned` element stays sticky at viewport top, and the
// track slides leftward. After the last panel, the sticky unsticks naturally
// and vertical scroll resumes at the next section.
//
// Disabled on small viewports / reduced-motion via the matching CSS @media —
// the JS is still attached but the track has `transform: none !important`,
// so the JS-set translate has no effect (CSS wins on `!important`).
function setupHorizontalScroll(container: HTMLElement): (() => void) | null {
  const hscroll = container.querySelector<HTMLElement>(".hscroll");
  if (!hscroll) return null;
  const track = hscroll.querySelector<HTMLElement>(".hscroll__track");
  const panelCount = parseInt(hscroll.dataset.hscrollPanels || "0", 10);
  if (!track || panelCount < 2) return null;

  let rafId: number | null = null;

  const update = () => {
    rafId = null;
    // If CSS fallback is active (mobile / reduced-motion), the track is
    // column-direction and CSS forces transform:none — bail out cleanly.
    const isFallback = window.matchMedia(
      "(max-width: 980px), (prefers-reduced-motion: reduce)",
    ).matches;
    if (isFallback) {
      track.style.transform = "";
      return;
    }

    const rect = hscroll.getBoundingClientRect();
    // How far we've scrolled past the top of the .hscroll container.
    // 0 means container's top just hit viewport top; positive = already
    // scrolled past that point (sticky pin is active).
    const scrolledPast = -rect.top;
    // The pin is active for (containerHeight - viewportHeight) px.
    const pinDistance = hscroll.offsetHeight - window.innerHeight;
    if (pinDistance <= 0) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    // Map vertical-scroll-within-pin → horizontal-translate-of-track.
    // panelCount × 100vw is the track's width; we need to expose
    // (panelCount - 1) × 100vw of horizontal travel (because panel 1
    // is shown at translateX=0, and the last panel is shown at
    // translateX = -(panelCount-1) × viewportWidth).
    const horizontalDistance = (panelCount - 1) * window.innerWidth;
    let progress = scrolledPast / pinDistance;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    const x = -progress * horizontalDistance;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  };

  const requestUpdate = () => {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  // Initial paint
  update();

  return () => {
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    track.style.transform = "";
  };
}

export default function LegacyScriptExecutor({ routeKey, legacyBodyHtml }: LegacyScriptExecutorProps) {
  useEffect(() => {
    const container = document.getElementById("main-content");
    if (!container) {
      return;
    }

    let cleanupDrillingRotator: (() => void) | null = null;
    let cleanupMarkerOverlay: (() => void) | null = null;
    let cleanupTestimonialsRotator: (() => void) | null = null;
    let cleanupServicesScrollReveal: (() => void) | null = null;
    let cleanupHorizontalScroll: (() => void) | null = null;
    let cleanupGeographyReveal: (() => void) | null = null;
    let cleanupCultureReveal: (() => void) | null = null;
    let cleanupVisionMissionReveal: (() => void) | null = null;

    if (routeKey === "") {
      enforceCardCount(container, "news", 1);
      enforceCardCount(container, "events", 1);
      enforceCardCount(container, "mass-media", 5);
      cleanupDrillingRotator = setupHomeDrillingRotator(container);
      cleanupMarkerOverlay = setupGeographyMarkerOverlay(container);
      cleanupTestimonialsRotator = setupTestimonialsRotator(container);
      cleanupServicesScrollReveal = setupServicesScrollReveal(container);
      cleanupHorizontalScroll = setupHorizontalScroll(container);
      // The marker overlay must be set up first (it injects the SVG image
      // markers); the scroll-reveal observer then watches the section so the
      // staged reveal animation can orchestrate the now-present markers.
      cleanupGeographyReveal = setupGeographyScrollReveal(container);
      cleanupCultureReveal = setupCultureScrollReveal(container);
      cleanupVisionMissionReveal = setupVisionMissionScrollReveal(container);
    }

    // Remove previously executed inline scripts to avoid repeated handlers.
    document
      .querySelectorAll("script[data-legacy-inline-exec='1']")
      .forEach((node) => node.parentElement?.removeChild(node));

    const scriptNodes = Array.from(container.querySelectorAll("script"));
    if (!scriptNodes.length) {
      return;
    }

    let queue = Promise.resolve();

    scriptNodes.forEach((oldScript) => {
      queue = queue.then(
        () =>
          new Promise<void>((resolve) => {
            const src = oldScript.getAttribute("src");
            if (src) {
              // External legacy bundles are loaded globally from layout.tsx.
              resolve();
              return;
            }

            const inlineCode = oldScript.textContent?.trim();
            if (!inlineCode) {
              resolve();
              return;
            }

            const script = document.createElement("script");
            script.setAttribute("data-legacy-inline-exec", "1");
            script.text = inlineCode;
            document.body.appendChild(script);
            resolve();
          }),
      );
    });

    return () => {
      cleanupDrillingRotator?.();
      cleanupMarkerOverlay?.();
      cleanupTestimonialsRotator?.();
      cleanupServicesScrollReveal?.();
      cleanupHorizontalScroll?.();
      cleanupGeographyReveal?.();
      cleanupCultureReveal?.();
      cleanupVisionMissionReveal?.();
      // Keep executed scripts until next route render to preserve current behavior.
    };
  }, [routeKey, legacyBodyHtml]);

  return null;
}
