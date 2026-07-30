import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between flex-wrap gap-4 px-[6vw] py-10 bg-bg-tertiary border-t border-gold/15">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/mm-logo-white.png"
          alt="MM"
          width={32}
          height={31}
          className="object-contain"
        />
        <span className="font-heading text-base text-text-secondary-light">
          Matheus Moraes · Advocacia e Assessoria Jurídica
        </span>
      </div>
      <span className="text-sm text-[#6b6860]">
        © 2026 Todos os direitos reservados.
      </span>
    </footer>
  );
}
