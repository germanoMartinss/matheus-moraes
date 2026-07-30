"use client";

import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "#areas", label: "Áreas de Atuação" },
  { href: "#sobre", label: "Sobre" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/85 backdrop-blur-md border-b border-gold/15">
      <div className="flex items-center justify-between px-[6vw] py-[18px]">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/mm-logo-white.png"
            alt="MM"
            width={40}
            height={39}
            className="object-contain"
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
              className="text-base text-[#d8d4cb] hover:text-gold-light"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5513996764688"
            className="text-[15px] tracking-[0.5px] px-[22px] py-[11px] border border-gold text-gold rounded-[2px] whitespace-nowrap"
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
            className={`block h-[1.5px] w-6 bg-text-primary transition-transform ${
              isMenuOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-text-primary transition-opacity ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-text-primary transition-transform ${
              isMenuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {isMenuOpen && (
        <div className="min-[861px]:hidden flex flex-col items-start gap-6 px-[6vw] pb-8 pt-2 border-t border-gold/15 bg-bg-primary">
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
      )}
    </nav>
  );
}
