import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutFacts } from "@/data/stats";
import { oabLabel, site } from "@/lib/site";

export default function Sobre() {
  const credentials = [
    oabLabel(),
    site.practiceSince && `Advogado desde ${site.practiceSince}`,
    site.education,
  ].filter(Boolean);

  return (
    <Section
      id="sobre"
      aria-labelledby="sobre-titulo"
      containerClassName="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20"
    >
      <Reveal>
        <SectionHeading id="sobre-titulo" eyebrow="Sobre o advogado" title={site.name} />
        <div aria-hidden="true" className="mt-7 h-[2px] w-14 bg-gold" />
        {credentials.length > 0 && (
          <ul className="mt-7 space-y-2 text-[15px] text-text-secondary">
            {credentials.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </Reveal>

      <Reveal delay={120}>
        <div className="max-w-[62ch] space-y-6 text-[17px] leading-[1.85] text-text-secondary-light text-pretty">
          <p>
            Advogado dedicado à prática de uma advocacia próxima, ética e
            personalizada. Atua em Santos e em todo o território nacional,
            acompanhando cada cliente com atenção individual em todas as etapas
            do caso.
          </p>
          <p>
            O escritório foi construído sobre um princípio simples: cada caso é
            único e merece dedicação real — não apenas assessoria técnica, mas
            cuidado humano em cada etapa do processo.
          </p>
        </div>

        <dl className="mt-10 grid gap-6 border-t border-gold/20 pt-8 sm:grid-cols-3">
          {aboutFacts.map((fact) => (
            <div key={fact.label} className="flex flex-col-reverse gap-1.5">
              <dt className="text-[13px] tracking-[0.08em] text-text-secondary uppercase">
                {fact.label}
              </dt>
              <dd className="font-heading text-[22px] leading-tight text-gold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
