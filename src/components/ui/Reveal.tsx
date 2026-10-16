"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

type Phase = "static" | "pending" | "visible";

/**
 * Fade-in on scroll that never hides content waiting for JavaScript: the
 * server renders everything visible, and only elements still below the fold
 * after hydration are hidden (off-screen, so nothing flashes) until they
 * scroll into view. Skipped entirely when the user prefers reduced motion.
 */
export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("static");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setPhase("pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${phase === "pending" ? "is-pending" : ""} ${className}`}
      style={phase === "visible" ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
