"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import type { FaqItem } from "@/types";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <Reveal key={item.question} delay={index * 60}>
            <div
              className="border-b border-gold/[0.18] py-[26px] cursor-pointer transition-colors duration-300 hover:border-gold/40"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center gap-5">
                <h4 className="text-[18.5px] text-text-question font-medium m-0">
                  {item.question}
                </h4>
                <span
                  className={`relative flex items-center justify-center text-gold shrink-0 w-6 h-6 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : "rotate-0"
                  }`}
                >
                  <span className="absolute w-3.5 h-[1.5px] bg-gold" />
                  <span className="absolute h-3.5 w-[1.5px] bg-gold" />
                </span>
              </div>
              <div className={`accordion-content ${isOpen ? "is-open" : ""}`}>
                <div>
                  <p className="text-[17px] leading-[1.75] text-text-answer mt-4 max-w-[680px]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </>
  );
}
