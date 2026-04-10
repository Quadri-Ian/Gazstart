"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpStatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  className?: string;
}

export default function CountUpStat({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  label,
  className,
}: CountUpStatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className={label ? "text-center" : undefined}>
      <div className={className ?? "text-4xl font-bold text-white md:text-5xl"}>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      {label && <div className="mt-2 text-sm text-white/60">{label}</div>}
    </div>
  );
}
