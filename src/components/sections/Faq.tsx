import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/Button";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { faqItems } from "@/data/faq";
import { whatsappUrl } from "@/lib/site";

export default function Faq() {
  return (
    <Section
      id="faq"
      tone="secondary"
      aria-labelledby="faq-titulo"
      containerClassName="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
    >
      <Reveal className="lg:sticky lg:top-32 lg:self-start">
        <SectionHeading
          id="faq-titulo"
          eyebrow="Perguntas frequentes"
          title="Dúvidas comuns"
          intro="Respostas gerais sobre o atendimento. Cada caso tem particularidades, que são tratadas na conversa inicial."
        />
        <div className="mt-8">
          <ButtonLink href={whatsappUrl()} variant="outline">
            Enviar outra dúvida
          </ButtonLink>
        </div>
      </Reveal>
      <FaqAccordion items={faqItems} />
    </Section>
  );
}
