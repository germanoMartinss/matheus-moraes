import Image from "next/image";
import { oabLabel, site } from "@/lib/site";

export default function Footer() {
  const oab = oabLabel();
  return (
    <footer className="flex items-center justify-between flex-wrap gap-4 px-[6vw] py-10 bg-bg-tertiary border-t border-gold/15">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/mm-logo-white.png"
          alt=""
          width={32}
          height={31}
          className="object-contain transition-transform duration-500 motion-safe:hover:rotate-[8deg]"
        />
        <span className="font-heading text-base text-text-secondary-light">
          {site.legalName}
          {oab && <span className="font-body text-sm text-text-secondary"> · {oab}</span>}
        </span>
      </div>
      {/* Evaluated at build time and on every daily revalidation of the page
          (see app/page.tsx), so the year rolls over within a day. */}
      <span className="text-sm text-text-muted">
        © {new Date().getFullYear()} Todos os direitos reservados.
      </span>
    </footer>
  );
}
