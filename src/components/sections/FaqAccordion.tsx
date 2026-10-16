"use client";

import { useId, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import type { FaqItem } from "@/types";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  const toggleFaq = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="border-t border-gold/[0.18]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-pergunta-${index}`;
        const panelId = `${baseId}-resposta-${index}`;
        return (
          <Reveal key={item.question} delay={index * 60}>
            <div className="border-b border-gold/[0.18] transition-colors duration-300 hover:border-gold/40">
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFaq(index)}
                  className="group w-full flex justify-between items-center gap-5 py-6 text-left cursor-pointer"
                >
                  <span className="text-[18px] leading-snug text-text-question font-medium transition-colors duration-300 group-hover:text-gold-light">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative flex items-center justify-center text-gold shrink-0 w-6 h-6 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    <span className="absolute w-3.5 h-[1.5px] bg-gold" />
                    <span className="absolute h-3.5 w-[1.5px] bg-gold" />
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`accordion-content ${isOpen ? "is-open" : ""}`}
              >
                <div>
                  <p className="text-[16.5px] leading-[1.8] text-text-answer max-w-[62ch] pb-6 pr-10 text-pretty">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
