import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionTitle from "@/components/ui/SectionTitle";
import ButtonLink from "@/components/ui/Button";
import { emailUrl, phoneUrl, site, whatsappUrl } from "@/lib/site";

const { address } = site;
const addressLine = `${address.street}, ${address.complement} — ${address.building} — ${address.district} — ${address.city}, ${address.state}`;

const contactInfo = [
  {
    label: "Endereço",
    content: (
      <p className="text-[16px] text-text-secondary-light leading-[1.65]">
        {addressLine}
      </p>
    ),
  },
  {
    label: "Telefone",
    content: (
      <p className="text-[16px]">
        <a href={phoneUrl} className="text-text-soft">
          {site.phone.display}
        </a>
      </p>
    ),
  },
  {
    label: "E-mail",
    content: (
      <p className="text-[16px] break-all">
        <a href={emailUrl} className="text-text-soft">
          {site.email}
        </a>
      </p>
    ),
  },
];

export default function Contato() {
  return (
    <Section id="contato" aria-labelledby="contato-titulo" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] pointer-events-none bg-hatch" />
      <Reveal className="relative z-10 max-w-[860px] mx-auto text-center">
        <Eyebrow>Contato</Eyebrow>
        <SectionTitle id="contato-titulo" className="mb-5">Gostaria de uma orientação?</SectionTitle>
        <p className="text-[18.5px] text-text-secondary-light leading-[1.7] mb-12">
          Estamos aqui para lhe ajudar. Entre em contato e agende sua
          conversa.
        </p>
        <div className="grid grid-cols-1 min-[861px]:grid-cols-[1fr_0.8fr_1.2fr] gap-px bg-gold/15 border border-gold/15 mb-12 text-left">
          {contactInfo.map((item) => (
            <div
              key={item.label}
              className="bg-bg-secondary px-[26px] py-8 transition-all duration-300 hover:bg-bg-secondary/60 hover:shadow-card-hover"
            >
              <div className="text-[13px] tracking-[1.5px] text-gold uppercase mb-2.5">
                {item.label}
              </div>
              {item.content}
            </div>
          ))}
        </div>
        <ButtonLink href={whatsappUrl()} variant="primary" size="lg">
          Conversar no WhatsApp
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
