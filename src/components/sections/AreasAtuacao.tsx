import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import AreaIcon from "@/components/icons/AreaIcon";
import { Check } from "@/components/icons";
import { practiceAreas } from "@/data/areas";

export default function AreasAtuacao() {
  return (
    <Section id="areas" tone="secondary" aria-labelledby="areas-titulo">
      <Reveal>
        <SectionHeading
          id="areas-titulo"
          eyebrow="Áreas de atuação"
          title="Como podemos ajudar"
          intro="Conheça as áreas em que o escritório atua e alguns exemplos das questões mais comuns em cada uma."
        />
      </Reveal>

      <div className="mt-14 grid gap-px border border-gold/15 bg-gold/15 md:grid-cols-2">
        {practiceAreas.map((area, index) => (
          <Reveal key={area.number} delay={(index % 2) * 90} className="h-full">
            <article
              aria-labelledby={`area-${area.number}`}
              className="group flex h-full flex-col bg-bg-secondary p-8 transition-[background-color,box-shadow] duration-300 hover:bg-bg-primary/60 hover:shadow-card-hover sm:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-300 group-hover:border-gold/70">
                  <AreaIcon name={area.icon} className="h-6 w-6" />
                </span>
                <span aria-hidden="true" className="font-heading text-[28px] text-gold/75">
                  {area.number}
                </span>
              </div>
              <h3 id={`area-${area.number}`} className="mt-7 font-heading text-[25px] font-medium text-text-heading">
                {area.title}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.75] text-text-secondary text-pretty">
                {area.description}
              </p>
              <ul className="mt-6 space-y-3 border-t border-gold/10 pt-6">
                {area.examples.map((example) => (
                  <li key={example} className="flex gap-3 text-[15.5px] leading-snug text-text-secondary-light">
                    <Check size={17} className="mt-0.5 shrink-0 text-gold" />
                    {example}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
