import Reveal from "./Reveal";
import StatCounter from "./StatCounter";

const stats = [
  { value: "4+", label: "Áreas de Atuação" },
  { value: "100%", label: "Atendimento Personalizado" },
  { value: "SP", label: "Sede em Santos" },
];

export default function Sobre() {
  return (
    <section
      id="sobre"
      className="grid grid-cols-1 min-[861px]:grid-cols-[0.9fr_1.1fr] gap-[70px] items-start px-[6vw] py-[110px] bg-bg-secondary"
    >
      <Reveal>
        <div className="text-[14px] tracking-[3px] text-gold uppercase mb-4">
          Sobre o Advogado
        </div>
        <h2 className="font-heading text-[clamp(34px,4vw,46px)] text-text-heading mb-5 leading-[1.2]">
          Matheus Moraes
        </h2>
        <div className="w-[60px] h-[2px] bg-gold mb-6" />
      </Reveal>
      <Reveal delay={120}>
        <p className="text-[18.5px] leading-[1.85] text-text-secondary-light mb-[22px]">
          Advogado dedicado à prática de uma advocacia próxima, ética e
          personalizada. Atua em Santos e em todo o território nacional,
          acompanhando cada cliente com atenção individual e compromisso com
          resultados sólidos.
        </p>
        <p className="text-[18.5px] leading-[1.85] text-text-secondary-light mb-10">
          O escritório foi construído sobre um princípio simples: cada caso é
          único e merece dedicação real — não apenas assessoria técnica, mas
          cuidado humano em cada etapa do processo.
        </p>
        <div className="grid grid-cols-3 gap-6 border-t border-gold/20 pt-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <StatCounter
                value={stat.value}
                className="font-heading text-[34px] text-gold mb-1.5"
              />
              <div className="text-[14.5px] text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
