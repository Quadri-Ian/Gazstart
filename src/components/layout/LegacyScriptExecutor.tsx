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

export default function LegacyScriptExecutor({ routeKey, legacyBodyHtml }: LegacyScriptExecutorProps) {
  useEffect(() => {
    const container = document.getElementById("main-content");
    if (!container) {
      return;
    }

    let cleanupDrillingRotator: (() => void) | null = null;

    if (routeKey === "") {
      enforceCardCount(container, "news", 1);
      enforceCardCount(container, "events", 1);
      enforceCardCount(container, "mass-media", 5);
      cleanupDrillingRotator = setupHomeDrillingRotator(container);
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
      // Keep executed scripts until next route render to preserve current behavior.
    };
  }, [routeKey, legacyBodyHtml]);

  return null;
}
