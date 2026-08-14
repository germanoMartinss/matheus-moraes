"use client";

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: string;
  className?: string;
};

export default function StatCounter({ value, className = "" }: StatCounterProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const numericTarget = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(numericTarget === null ? value : "0");

  useEffect(() => {
    if (numericTarget === null) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1200;
        const start = performance.now();

        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(String(Math.round(eased * numericTarget)));
          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [numericTarget]);

  return (
    <div ref={ref} className={className}>
      {display}
      {suffix}
    </div>
  );
}
