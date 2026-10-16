import Image from "next/image";
import { Container } from "@/components/ui/Section";
import { navLinks } from "@/data/navigation";
import { addressLine, emailUrl, oabLabel, phoneUrl, site, whatsappUrl } from "@/lib/site";

const linkClass = "text-text-secondary-light transition-colors hover:text-gold-light";

export default function Footer() {
  const oab = oabLabel();
  return (
    <footer className="border-t border-gold/15 bg-bg-tertiary">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/assets/mm-logo-white.png" alt="" width={40} height={39} />
            <div className="leading-[1.15]">
              <p className="font-heading text-[19px] font-bold tracking-[0.03em] text-text-heading">
                {site.name.toUpperCase()}
              </p>
              <p className="text-[11px] tracking-[0.18em] text-gold uppercase">{site.brand}</p>
            </div>
          </div>
          {oab && <p className="mt-5 text-[14px] text-text-secondary-light">{oab}</p>}
          <p className="mt-5 max-w-[42ch] text-[14.5px] leading-[1.7] text-text-secondary">
            Atendimento presencial em Santos, SP, e online em todo o Brasil.
          </p>
        </div>

        <div>
          <h2 className="text-[12.5px] font-medium tracking-[0.14em] text-gold uppercase">Contato</h2>
          <address className="mt-5 space-y-3 text-[14.5px] leading-[1.6] not-italic">
            <p className="text-text-secondary">{addressLine}</p>
            {site.openingHours && <p className="text-text-secondary">{site.openingHours}</p>}
            <p>
              <a href={phoneUrl} className={linkClass}>
                {site.phone.display}
              </a>
              <span className="text-text-secondary"> · </span>
              <a href={whatsappUrl()} className={linkClass}>
                WhatsApp
              </a>
            </p>
            <p>
              <a href={emailUrl} className={`break-all ${linkClass}`}>
                {site.email}
              </a>
            </p>
            <p>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Instagram @{site.instagram.handle}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="Links rápidos">
          <h2 className="text-[12.5px] font-medium tracking-[0.14em] text-gold uppercase">Navegação</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[14.5px] md:grid-cols-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <div className="border-t border-gold/10">
        <Container className="flex flex-col gap-3 py-7 text-[13px] leading-[1.6] text-text-muted md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="max-w-[70ch]">
            O conteúdo deste site tem caráter exclusivamente informativo e não
            constitui consultoria jurídica.
          </p>
          {/* Evaluated at build time and on every daily revalidation of the page
              (see app/page.tsx), so the year rolls over within a day. */}
          <p className="shrink-0">
            © {new Date().getFullYear()} {site.name}
            {oab && ` · ${oab}`}
          </p>
        </Container>
      </div>
    </footer>
  );
}
