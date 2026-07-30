const areas = [
  {
    number: "01",
    title: "Direito de Família",
    description:
      "Divórcio, guarda, pensão alimentícia e demais questões familiares tratadas com sensibilidade e firmeza jurídica.",
  },
  {
    number: "02",
    title: "Direito Médico",
    description:
      "Defesa de profissionais e pacientes em processos ético-disciplinares e responsabilidade civil na área da saúde.",
  },
  {
    number: "03",
    title: "Direito Criminal",
    description:
      "Atuação estratégica na defesa criminal, do inquérito ao julgamento, preservando direitos e garantias.",
  },
  {
    number: "04",
    title: "Concursos Públicos",
    description:
      "Assessoria em editais, recursos e ações judiciais relacionadas a concursos e ingresso no serviço público.",
  },
];

export default function AreasAtuacao() {
  return (
    <section id="areas" className="px-[6vw] py-[110px] bg-bg-primary">
      <div className="text-center max-w-[640px] mx-auto mb-16">
        <div className="text-[13px] tracking-[3px] text-gold uppercase mb-4">
          Áreas de Atuação
        </div>
        <h2 className="font-heading text-[clamp(30px,3.5vw,42px)] text-text-heading mb-[18px]">
          Como podemos ajudar
        </h2>
        <p className="text-base text-text-secondary leading-[1.7]">
          Assessoria jurídica completa, com foco na defesa dos melhores
          interesses de cada cliente.
        </p>
      </div>
      <div className="grid grid-cols-2 min-[861px]:grid-cols-4 gap-px bg-gold/15 border border-gold/15">
        {areas.map((area) => (
          <div key={area.number} className="bg-bg-secondary px-8 py-11">
            <div className="font-heading text-[32px] text-gold mb-5">
              {area.number}
            </div>
            <h3 className="text-[19px] text-text-heading mb-3 font-medium">
              {area.title}
            </h3>
            <p className="text-[14.5px] leading-[1.7] text-text-secondary">
              {area.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
