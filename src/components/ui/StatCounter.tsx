"use client";

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: string;
  className?: string;
};

/**
 * Renders the final value in the HTML. The count-up only runs when the number
 * starts off-screen and the user has not asked for reduced motion; screen
 * readers always get the final value.
 */
export default function StatCounter({ value, className = "" }: StatCounterProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const numericTarget = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(match ? match[1] : value);

  useEffect(() => {
    if (numericTarget === null) return;
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setDisplay("0");
    let frame = 0;
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
          if (progress < 1) frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [numericTarget]);

  return (
    <div ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
    </div>
  );
}
