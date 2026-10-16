import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import FaqAccordion from "@/components/sections/FaqAccordion";
import { faqItems } from "@/data/faq";

export default function Faq() {
  return (
    <Section id="faq" tone="secondary">
      <div className="max-w-[820px] mx-auto">
        <Reveal className="text-center mb-14">
          <Eyebrow>Perguntas Frequentes</Eyebrow>
          <SectionTitle>Dúvidas comuns</SectionTitle>
        </Reveal>
        <FaqAccordion items={faqItems} />
      </div>
    </Section>
  );
}
