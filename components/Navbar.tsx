"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#areas", label: "Áreas de Atuação" },
  { href: "#sobre", label: "Sobre" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-bg-primary/95 backdrop-blur-md border-gold/20 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          : "bg-bg-primary/70 backdrop-blur-sm border-transparent"
      }`}
    >
      <div
        className={`flex items-center justify-between px-[6vw] transition-all duration-300 ${
          isScrolled ? "py-3" : "py-[18px]"
        }`}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/assets/mm-logo-white.png"
            alt="MM"
            width={40}
            height={39}
            className="object-contain transition-transform duration-300"
          />
          <div className="leading-[1.1]">
            <div className="font-heading text-[19px] font-bold tracking-[0.5px] text-text-heading">
              MATHEUS MORAES
            </div>
            <div className="text-[11px] tracking-[2px] text-gold uppercase">
              Advocacia &amp; Assessoria Jurídica
            </div>
          </div>
        </div>

        <div className="hidden min-[861px]:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-base text-[#d8d4cb] transition-colors hover:text-gold-light group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="https://wa.me/5513996764688"
            className="text-[15px] tracking-[0.5px] px-[22px] py-[11px] border border-gold text-gold rounded-[2px] whitespace-nowrap transition-all duration-300 hover:bg-gold hover:text-bg-primary hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(200,168,98,0.25)]"
          >
            Fale Agora
          </a>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="min-[861px]:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
        >
          <span
            className={`block h-[1.5px] w-6 bg-text-primary transition-transform duration-300 ${
              isMenuOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-text-primary transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-text-primary transition-transform duration-300 ${
              isMenuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`min-[861px]:hidden grid transition-all duration-300 ease-out border-t bg-bg-primary ${
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100 border-gold/15"
            : "grid-rows-[0fr] opacity-0 border-transparent"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col items-start gap-6 px-[6vw] pb-8 pt-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base text-[#d8d4cb] hover:text-gold-light"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/5513996764688"
              onClick={() => setIsMenuOpen(false)}
              className="text-[15px] tracking-[0.5px] px-[22px] py-[11px] border border-gold text-gold rounded-[2px] whitespace-nowrap"
            >
              Fale Agora
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
