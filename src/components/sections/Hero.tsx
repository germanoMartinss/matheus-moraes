import Image from "next/image";
import ButtonLink from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { ArrowRight, MapPin, Shield, Video } from "@/components/icons";
import { practiceAreas } from "@/data/areas";
import { trustPoints } from "@/data/hero";
import { oabLabel, site, whatsappUrl } from "@/lib/site";

const trustIcons = { video: Video, shield: Shield, pin: MapPin };

export default function Hero() {
  const oab = oabLabel();
  return (
    <section
      id="topo"
      aria-labelledby="topo-titulo"
      className="relative overflow-hidden bg-bg-primary bg-glow-gold pt-[112px] pb-16 md:pt-[136px] md:pb-24"
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] pointer-events-none bg-hatch" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="max-w-[640px]">
          <p className="flex items-center gap-3 text-[12px] font-medium tracking-[0.14em] text-gold uppercase sm:text-[13px] sm:tracking-[0.22em] animate-fade-in-up">
            <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
            {site.brand}
          </p>

          <h1
            id="topo-titulo"
            className="mt-6 font-heading text-[clamp(44px,6.4vw,80px)] leading-[1.04] font-semibold text-text-heading animate-fade-in-up"
            style={{ animationDelay: "0.08s" }}
          >
            {site.name}
          </h1>

          {oab && (
            <p
              className="mt-3 text-[14px] font-medium tracking-[0.18em] text-gold uppercase animate-fade-in-up"
              style={{ animationDelay: "0.12s" }}
            >
              {oab}
            </p>
          )}

          <ul
            aria-label="Áreas de atuação"
            className="mt-7 grid grid-cols-2 gap-x-6 gap-y-2 text-[15px] text-text-secondary-light sm:flex sm:flex-wrap animate-fade-in-up"
            style={{ animationDelay: "0.16s" }}
          >
            {practiceAreas.map((area) => (
              <li key={area.title} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-gold" />
                {area.title}
              </li>
            ))}
          </ul>

          <p
            className="mt-8 font-heading text-[clamp(22px,2.4vw,28px)] leading-[1.4] text-text-heading/90 text-balance animate-fade-in-up"
            style={{ animationDelay: "0.22s" }}
          >
            Defesa séria e dedicada dos seus interesses, com atendimento
            presencial em Santos e online em todo o país.
          </p>

          <div
            className="mt-10 flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.28s" }}
          >
            <ButtonLink href={whatsappUrl()} size="lg" className="w-full sm:w-auto">
              Agendar uma conversa
              <ArrowRight
                size={18}
                className="transition-transform duration-300 motion-safe:group-hover/button:translate-x-1"
              />
            </ButtonLink>
            <ButtonLink href="#areas" variant="secondary" size="lg" className="w-full sm:w-auto">
              Áreas de atuação
            </ButtonLink>
          </div>

          <ul
            className="mt-12 flex flex-col gap-4 border-t border-gold/15 pt-8 sm:flex-row sm:flex-wrap sm:gap-x-8 animate-fade-in-up"
            style={{ animationDelay: "0.34s" }}
          >
            {trustPoints.map((point) => {
              const Icon = trustIcons[point.icon];
              return (
                <li key={point.label} className="flex items-center gap-3 text-[14px] leading-snug text-text-secondary">
                  <Icon size={18} className="shrink-0 text-gold" />
                  {point.label}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:mr-4 lg:max-w-[340px] animate-fade-in">
          {/* Concentric frame: same arch shape grown by the gap on every side
              (rounded-t-full keeps the radius at half the width), so the
              spacing is identical all around and the line closes at the base. */}
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-t-full border border-gold/60 sm:-inset-4"
          />
          <div className="relative aspect-[4/7] overflow-hidden rounded-t-full bg-bg-secondary">
            {/* Not the LCP element (it fades in) and below the fold on phones,
                so it keeps the default lazy loading — see README. */}
            <Image
              src="/assets/matheus-retrato.jpg"
              alt="Matheus Moraes"
              width={272}
              height={476}
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 300px, 260px"
              className="h-full w-full object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-primary/75 to-transparent"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
