import type { ProcessStep } from "@/types";

// "Como funciona o atendimento". Informative tone; validate with the lawyer.
export const processSteps: ProcessStep[] = [
  {
    title: "Primeiro contato",
    description:
      "Você entra em contato por WhatsApp, telefone ou e-mail, conta brevemente a situação e agenda uma conversa.",
  },
  {
    title: "Análise do caso",
    description:
      "Na conversa, presencial em Santos ou online, o caso é ouvido com atenção e os documentos disponíveis são avaliados, sempre sob sigilo profissional.",
  },
  {
    title: "Orientação e proposta",
    description:
      "Você recebe uma explicação clara dos caminhos jurídicos possíveis, com seus riscos e prazos estimados, e a proposta de honorários.",
  },
  {
    title: "Acompanhamento",
    description:
      "Com a contratação, você acompanha cada etapa do caso e tem um canal direto para tirar dúvidas.",
  },
];
