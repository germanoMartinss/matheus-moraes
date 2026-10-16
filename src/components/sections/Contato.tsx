import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ButtonLink from "@/components/ui/Button";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "@/components/icons";
import { addressLine, emailUrl, mapsUrl, phoneUrl, site, whatsappUrl } from "@/lib/site";

type ContactItem = {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  content: React.ReactNode;
};

const linkClass =
  "text-text-soft underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-light hover:decoration-gold";

const newTab = <span className="sr-only"> (abre em nova aba)</span>;

const contactItems: ContactItem[] = [
  {
    label: "Endereço",
    icon: MapPin,
    content: (
      <>
        <p className="text-text-secondary-light">
          {addressLine}
          {site.address.postalCode && ` — CEP ${site.address.postalCode}`}
        </p>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-flex items-center gap-1.5 text-[14px] ${linkClass}`}>
          Ver no mapa
          {newTab}
          <ArrowUpRight size={14} />
        </a>
      </>
    ),
  },
  ...(site.openingHours
    ? [
        {
          label: "Horário",
          icon: Clock,
          content: <p className="text-text-secondary-light">{site.openingHours}</p>,
        },
      ]
    : []),
  {
    label: "Telefone e WhatsApp",
    icon: Phone,
    content: (
      <a href={phoneUrl} className={linkClass}>
        {site.phone.display}
      </a>
    ),
  },
  {
    label: "E-mail",
    icon: Mail,
    content: (
      <a href={emailUrl} className={`break-all ${linkClass}`}>
        {site.email}
      </a>
    ),
  },
  {
    label: "Instagram",
    icon: Instagram,
    content: (
      <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
        @{site.instagram.handle}
        {newTab}
      </a>
    ),
  },
];

export default function Contato() {
  return (
    <Section
      id="contato"
      aria-labelledby="contato-titulo"
      className="relative overflow-hidden"
      containerClassName="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.035] pointer-events-none bg-hatch" />

      <Reveal className="relative">
        <SectionHeading
          id="contato-titulo"
          eyebrow="Contato"
          title="Gostaria de uma orientação?"
          intro="Atendimento presencial em Santos e online. Escolha o canal de sua preferência para agendar uma conversa."
        />
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href={whatsappUrl()} size="lg" className="w-full sm:w-auto">
            <MessageCircle size={18} />
            Conversar no WhatsApp
          </ButtonLink>
          <ButtonLink href={phoneUrl} variant="secondary" size="lg" className="w-full sm:w-auto">
            Ligar para o escritório
            <ArrowRight size={18} />
          </ButtonLink>
        </div>
        <p className="mt-5 text-[14px] text-text-secondary">
          A mensagem do WhatsApp já vem com um texto inicial, que você pode editar.
        </p>
      </Reveal>

      <Reveal delay={120} className="relative">
        <ul className="divide-y divide-gold/15 border-y border-gold/15">
          {contactItems.map(({ label, icon: Icon, content }) => (
            <li key={label} className="flex gap-5 py-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                <Icon size={18} />
              </span>
              <div className="min-w-0 text-[16px] leading-[1.65]">
                <p className="mb-1 text-[12.5px] font-medium tracking-[0.14em] text-gold uppercase">
                  {label}
                </p>
                {content}
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
