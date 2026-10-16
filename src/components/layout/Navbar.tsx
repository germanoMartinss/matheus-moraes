"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ButtonLink from "@/components/ui/Button";
import { navLinks } from "@/data/navigation";
import { site, whatsappUrl } from "@/lib/site";

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
          ? "bg-bg-primary/95 backdrop-blur-md border-gold/20 shadow-nav"
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
              {site.name.toUpperCase()}
            </div>
            <div className="text-[11px] tracking-[2px] text-gold uppercase">
              {site.brand}
            </div>
          </div>
        </div>

        <div className="hidden min-[861px]:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-base text-text-nav transition-colors hover:text-gold-light group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <ButtonLink href={whatsappUrl()} variant="outline" size="sm">
            Fale Agora
          </ButtonLink>
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
                className="text-base text-text-nav hover:text-gold-light"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink
              href={whatsappUrl()}
              onClick={() => setIsMenuOpen(false)}
              variant="outline"
              size="sm"
            >
              Fale Agora
            </ButtonLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
