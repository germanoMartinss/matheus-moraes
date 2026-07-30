"use client";

import { useState } from "react";

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
        <div className="text-center mb-14">
          <div className="text-[13px] tracking-[3px] text-gold uppercase mb-4">
            Perguntas Frequentes
          </div>
          <h2 className="font-heading text-[clamp(30px,3.5vw,42px)] text-text-heading">
            Dúvidas comuns
          </h2>
        </div>
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className="border-b border-gold/[0.18] py-[26px] cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center gap-5">
                <h4 className="text-[17px] text-[#f0ede5] font-medium m-0">
                  {item.question}
                </h4>
                <span className="text-[22px] text-gold shrink-0">
                  {isOpen ? "–" : "+"}
                </span>
              </div>
              {isOpen && (
                <p className="text-[15.5px] leading-[1.75] text-[#a8a49a] mt-4 max-w-[680px]">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
