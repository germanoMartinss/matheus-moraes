import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import AreaIcon from "@/components/icons/AreaIcon";
import { practiceAreas } from "@/data/areas";

export default function AreasAtuacao() {
  return (
    <Section id="areas" aria-labelledby="areas-titulo">
      <Reveal className="text-center max-w-[640px] mx-auto mb-16">
        <Eyebrow>Áreas de Atuação</Eyebrow>
        <SectionTitle id="areas-titulo" className="mb-[18px]">Como podemos ajudar</SectionTitle>
        <p className="text-lg text-text-secondary leading-[1.7]">
          Assessoria jurídica completa, com foco na defesa dos melhores
          interesses de cada cliente.
        </p>
      </Reveal>
      <div className="grid grid-cols-2 min-[861px]:grid-cols-4 gap-px bg-gold/15 border border-gold/15">
        {practiceAreas.map((area, index) => (
          <Reveal key={area.number} delay={index * 90} className="h-full">
            <div className="group h-full bg-bg-secondary px-8 py-11 transition-all duration-300 hover:bg-bg-secondary/60 hover:shadow-card-hover">
              <div className="flex items-center justify-between mb-5">
                <AreaIcon
                  name={area.icon}
                  className="text-gold transition-transform duration-300 motion-safe:group-hover:-translate-y-1"
                />
                <span aria-hidden="true" className="font-heading text-[30px] text-gold/75">
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
    </Section>
  );
}
