import Reveal from "./Reveal";

const areas = [
  {
    number: "01",
    title: "Direito de Família",
    description:
      "Divórcio, guarda, pensão alimentícia e demais questões familiares tratadas com sensibilidade e firmeza jurídica.",
    icon: (
      <path d="M12 21c-4.4-2.8-8-6.2-8-10.2C4 7.6 6.5 5 9.5 5c1.6 0 3 0.8 3.9 2 0.9-1.2 2.3-2 3.9-2 3 0 5.6 2.6 5.6 5.8 0 4-3.6 7.4-8 10.2z" />
    ),
  },
  {
    number: "02",
    title: "Direito Médico",
    description:
      "Defesa de profissionais e pacientes em processos ético-disciplinares e responsabilidade civil na área da saúde.",
    icon: (
      <>
        <path d="M12 3v6M9 6h6" />
        <rect x="4" y="10" width="16" height="10" rx="2" />
      </>
    ),
  },
  {
    number: "03",
    title: "Direito Criminal",
    description:
      "Atuação estratégica na defesa criminal, do inquérito ao julgamento, preservando direitos e garantias.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      </>
    ),
  },
  {
    number: "04",
    title: "Concursos Públicos",
    description:
      "Assessoria em editais, recursos e ações judiciais relacionadas a concursos e ingresso no serviço público.",
    icon: (
      <>
        <path d="M4 19.5V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v13" />
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H19" />
        <path d="M8 8h7M8 11h7" />
      </>
    ),
  },
];

export default function AreasAtuacao() {
  return (
    <section id="areas" className="px-[6vw] py-[110px] bg-bg-primary">
      <Reveal className="text-center max-w-[640px] mx-auto mb-16">
        <div className="text-[14px] tracking-[3px] text-gold uppercase mb-4">
          Áreas de Atuação
        </div>
        <h2 className="font-heading text-[clamp(34px,4vw,46px)] text-text-heading mb-[18px]">
          Como podemos ajudar
        </h2>
        <p className="text-lg text-text-secondary leading-[1.7]">
          Assessoria jurídica completa, com foco na defesa dos melhores
          interesses de cada cliente.
        </p>
      </Reveal>
      <div className="grid grid-cols-2 min-[861px]:grid-cols-4 gap-px bg-gold/15 border border-gold/15">
        {areas.map((area, index) => (
          <Reveal key={area.number} delay={index * 90} className="h-full">
            <div className="group h-full bg-bg-secondary px-8 py-11 transition-all duration-300 hover:bg-bg-secondary/60 hover:shadow-[inset_0_0_0_1px_rgba(200,168,98,0.35)]">
              <div className="flex items-center justify-between mb-5">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold transition-transform duration-300 group-hover:-translate-y-1"
                >
                  {area.icon}
                </svg>
                <span className="font-heading text-[30px] text-gold/40">
                  {area.number}
                </span>
              </div>
              <h3 className="text-[20.5px] text-text-heading mb-3 font-medium">
                {area.title}
              </h3>
              <p className="text-[16px] leading-[1.7] text-text-secondary">
                {area.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
