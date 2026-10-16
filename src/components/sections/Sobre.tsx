import Reveal from "@/components/ui/Reveal";
import StatCounter from "@/components/ui/StatCounter";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import { aboutStats } from "@/data/stats";
import { site } from "@/lib/site";

export default function Sobre() {
  return (
    <Section
      id="sobre"
      aria-labelledby="sobre-titulo"
      tone="secondary"
      className="grid grid-cols-1 min-[861px]:grid-cols-[0.9fr_1.1fr] gap-[70px] items-start"
    >
      <Reveal>
        <Eyebrow>Sobre o Advogado</Eyebrow>
        <SectionTitle id="sobre-titulo" className="mb-5 leading-[1.2]">{site.name}</SectionTitle>
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
          {aboutStats.map((stat) => (
            <div key={stat.label}>
              <StatCounter
                value={stat.value}
                className="font-heading text-[34px] text-gold mb-1.5"
              />
              <div className="text-[14.5px] text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
