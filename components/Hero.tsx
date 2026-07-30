import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="topo"
      className="relative min-h-screen grid grid-cols-1 min-[861px]:grid-cols-[1.1fr_0.9fr] items-center gap-10 px-[6vw] pt-[120px] pb-[60px] overflow-hidden bg-bg-primary"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(200,168,98,0.06), transparent 45%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 38px, #c8a862 38px, #c8a862 39px)",
        }}
      />
      <div className="relative z-10 max-w-[640px]">
        <div className="text-[15px] tracking-[3px] text-gold uppercase mb-[22px]">
          Santos, SP · Atuação Nacional
        </div>
        <h1 className="font-heading text-[clamp(48px,6.2vw,76px)] leading-[1.12] mb-7 text-text-heading font-semibold">
          Defesa séria e dedicada dos seus interesses.
        </h1>
        <p className="text-2xl leading-[1.7] text-text-secondary-light mb-10 max-w-[580px]">
          Com anos de experiência, o escritório Matheus Moraes oferece
          assessoria jurídica personalizada em Direito de Família, Direito
          Médico, Direito Criminal e Concursos Públicos.
        </p>
        <div className="flex gap-[18px] flex-wrap">
          <a
            href="https://wa.me/5513996764688"
            className="text-lg tracking-[0.5px] px-9 py-[18px] bg-gold text-bg-secondary rounded-[2px] font-medium"
          >
            Falar no WhatsApp
          </a>
          <a
            href="#areas"
            className="text-lg tracking-[0.5px] px-9 py-[18px] border border-text-primary/30 text-text-primary rounded-[2px]"
          >
            Áreas de Atuação
          </a>
        </div>
      </div>
      <div className="relative z-10 flex justify-center items-center h-full">
        <Image
          src="/assets/matheus-oval.png"
          alt="Matheus Moraes"
          width={520}
          height={520}
          priority
          className="relative w-[min(100%,520px)] h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        />
      </div>
    </section>
  );
}
