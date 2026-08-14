"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqItems = [
  {
    question: "Como funciona a primeira consulta?",
    answer:
      "A primeira conversa serve para entender seu caso, esclarecer dúvidas e apresentar o caminho jurídico mais adequado. Pode ser feita presencialmente em Santos ou remotamente.",
  },
  {
    question: "O escritório atende clientes fora de Santos?",
    answer:
      "Sim. Embora a sede esteja em Santos/SP, o escritório presta assessoria jurídica em todo o território nacional.",
  },
  {
    question: "Quanto tempo dura um processo?",
    answer:
      "Cada caso tem particularidades próprias. Durante o atendimento, você recebe uma estimativa realista de prazos com base na área e complexidade do seu caso.",
  },
  {
    question: "Como são definidos os honorários?",
    answer:
      "Os valores são definidos após a análise do caso, considerando complexidade, urgência e área do direito envolvida, sempre com total transparência.",
  },
  {
    question: "Como entro em contato com o escritório?",
    answer:
      "Você pode falar diretamente pelo WhatsApp, telefone ou e-mail — todos disponíveis na seção de contato deste site.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="px-[6vw] py-[110px] bg-bg-secondary">
      <div className="max-w-[820px] mx-auto">
        <Reveal className="text-center mb-14">
          <div className="text-[14px] tracking-[3px] text-gold uppercase mb-4">
            Perguntas Frequentes
          </div>
          <h2 className="font-heading text-[clamp(34px,4vw,46px)] text-text-heading">
            Dúvidas comuns
          </h2>
        </Reveal>
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <Reveal key={item.question} delay={index * 60}>
              <div
                className="border-b border-gold/[0.18] py-[26px] cursor-pointer transition-colors duration-300 hover:border-gold/40"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center gap-5">
                  <h4 className="text-[18.5px] text-[#f0ede5] font-medium m-0">
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
                    <p className="text-[17px] leading-[1.75] text-[#a8a49a] mt-4 max-w-[680px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
