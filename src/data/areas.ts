import type { PracticeArea } from "@/types";

// Plain-language descriptions. Final wording must be approved by the lawyer.
export const practiceAreas: PracticeArea[] = [
  {
    number: "01",
    title: "Direito de Família",
    description:
      "Questões que envolvem a família e exigem cuidado com as pessoas envolvidas, especialmente com os filhos.",
    examples: [
      "Divórcio consensual ou litigioso",
      "Guarda e convivência com os filhos",
      "Pensão alimentícia: pedido, revisão e cobrança",
    ],
    icon: "family",
  },
  {
    number: "02",
    title: "Direito Médico",
    description:
      "Atuação para profissionais e pacientes em conflitos ligados ao atendimento na área da saúde.",
    examples: [
      "Defesa em processos ético-disciplinares nos conselhos profissionais",
      "Responsabilidade civil por falhas no atendimento",
      "Orientação sobre direitos de pacientes e profissionais",
    ],
    icon: "medical",
  },
  {
    number: "03",
    title: "Direito Criminal",
    description:
      "Defesa técnica em todas as fases, do inquérito ao julgamento, com atenção aos direitos e garantias de quem é investigado ou acusado.",
    examples: [
      "Acompanhamento em inquérito e depoimentos",
      "Defesa no processo criminal",
      "Recursos e pedidos de liberdade",
    ],
    icon: "criminal",
  },
  {
    number: "04",
    title: "Concursos Públicos",
    description:
      "Orientação para candidatos em situações que podem afetar a aprovação, a nomeação ou a posse.",
    examples: [
      "Análise de editais e de regras de cada etapa",
      "Recursos contra notas, gabaritos e eliminações",
      "Ações judiciais sobre nomeação e posse",
    ],
    icon: "public-exams",
  },
];
