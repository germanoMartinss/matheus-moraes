"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ButtonLink from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { navLinks } from "@/data/navigation";
import { site, whatsappUrl } from "@/lib/site";

const MOBILE_MENU_ID = "menu-mobile";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "bg-bg-primary/95 backdrop-blur-md border-gold/20 shadow-nav"
          : "bg-bg-primary/70 backdrop-blur-sm border-transparent"
      }`}
    >
      <Container
        className={`flex items-center justify-between transition-[padding] duration-300 ${
          isScrolled ? "py-3" : "py-[18px]"
        }`}
      >
        <a href="#topo" className="flex items-center gap-3">
          <Image
            src="/assets/mm-logo-white.png"
            alt=""
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
        </a>

        <nav aria-label="Principal" className="hidden min-[1180px]:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[15px] text-text-nav transition-colors hover:text-gold-light group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <ButtonLink href={whatsappUrl()} variant="outline" size="sm">
            Agendar conversa
          </ButtonLink>
        </nav>

        {/* 44px touch target; the negative margin keeps the original 32px layout box. */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls={MOBILE_MENU_ID}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="min-[1180px]:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 -m-1.5"
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
      </Container>

      <div
        id={MOBILE_MENU_ID}
        inert={!isMenuOpen}
        className={`min-[1180px]:hidden grid transition-all duration-300 ease-out border-t bg-bg-primary ${
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100 border-gold/15"
            : "grid-rows-[0fr] opacity-0 border-transparent"
        }`}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Menu móvel"
            className="mx-auto flex max-w-[1200px] flex-col items-start gap-1 px-5 pb-8 pt-4 sm:px-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="flex min-h-11 items-center text-[17px] text-text-nav hover:text-gold-light"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink href={whatsappUrl()} onClick={closeMenu} variant="outline" size="sm" className="mt-4">
              Agendar conversa
            </ButtonLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
