import { useEffect, useRef } from "react";

export default function useMobileHorizontalReveal<T extends HTMLElement = HTMLDivElement>(distance = 88) {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    let frameId: number | null = null;
    let currentX = 0;
    let targetX = 0;

    const reset = () => {
      const node = elementRef.current;
      currentX = 0;
      targetX = 0;

      if (!node) {
        return;
      }

      node.style.transform = "translate3d(0px, 0, 0)";
      node.style.willChange = "auto";
    };

    const update = () => {
      const node = elementRef.current;
      if (!node) {
        frameId = window.requestAnimationFrame(update);
        return;
      }

      if (!mediaQuery.matches) {
        reset();
        frameId = window.requestAnimationFrame(update);
        return;
      }

      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.52;
      const elementCenter = rect.top + rect.height * 0.5;
      const normalized = Math.max(-1, Math.min(1, (elementCenter - viewportCenter) / (window.innerHeight * 0.72)));

      targetX = normalized * distance;
      currentX += (targetX - currentX) * 0.12;

      if (Math.abs(targetX - currentX) < 0.18) {
        currentX = targetX;
      }

      node.style.transform = `translate3d(${currentX}px, 0, 0)`;
      node.style.willChange = "transform";

      frameId = window.requestAnimationFrame(update);
    };

    const handleMediaChange = () => {
      if (!mediaQuery.matches) {
        reset();
      }
    };

    handleMediaChange();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    frameId = window.requestAnimationFrame(update);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }

      reset();
    };
  }, [distance]);

  return elementRef;
}