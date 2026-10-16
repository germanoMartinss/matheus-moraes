import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export default function Atendimento() {
  return (
    <Section id="atendimento" tone="secondary" aria-labelledby="atendimento-titulo">
      <Reveal>
        <SectionHeading
          id="atendimento-titulo"
          eyebrow="Como funciona o atendimento"
          title="Do primeiro contato ao acompanhamento do caso"
          intro="Um caminho simples, para que você saiba o que esperar em cada etapa."
        />
      </Reveal>

      <Reveal delay={100} className="relative mt-14">
        {/* Thin gold line linking the steps on wide screens. */}
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-gold/50 via-gold/25 to-transparent lg:block"
        />
        <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-bg-secondary font-heading text-[18px] text-gold">
                <span className="sr-only">Etapa </span>
                {index + 1}
              </span>
              <h3 className="mt-6 text-[19px] font-medium text-text-heading">{step.title}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.75] text-text-secondary">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
