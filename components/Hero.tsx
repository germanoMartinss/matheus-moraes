import Image from "next/image";

const trustPoints = [
  "Atendimento presencial e remoto",
  "Consulta inicial sigilosa",
  "Atuação em todo o território nacional",
];

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
        <div className="text-[15px] tracking-[3px] text-gold uppercase mb-[22px] animate-fade-in-up">
          Santos, SP · Atuação Nacional
        </div>
        <h1
          className="font-heading text-[clamp(48px,6.2vw,76px)] leading-[1.12] mb-7 text-text-heading font-semibold animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Defesa séria e dedicada dos seus interesses.
        </h1>
        <p
          className="text-2xl leading-[1.7] text-text-secondary-light mb-10 max-w-[580px] animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Com anos de experiência, o escritório Matheus Moraes oferece
          assessoria jurídica personalizada em Direito de Família, Direito
          Médico, Direito Criminal e Concursos Públicos.
        </p>
        <div
          className="flex gap-[18px] flex-wrap animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="https://wa.me/5513996764688"
            className="text-lg tracking-[0.5px] px-9 py-[18px] bg-gold text-bg-secondary rounded-[2px] font-medium transition-all duration-300 hover:bg-gold-light hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(200,168,98,0.3)]"
          >
            Falar no WhatsApp
          </a>
          <a
            href="#areas"
            className="text-lg tracking-[0.5px] px-9 py-[18px] border border-text-primary/30 text-text-primary rounded-[2px] transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-1"
          >
            Áreas de Atuação
          </a>
        </div>

        <div
          className="flex flex-col gap-3 mt-14 pt-8 border-t border-gold/15 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {trustPoints.map((point) => (
            <div key={point} className="flex items-center gap-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gold shrink-0"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className="text-[15px] text-text-secondary">{point}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex justify-center items-center h-full animate-fade-in">
        <Image
          src="/assets/matheus-oval.png"
          alt="Matheus Moraes"
          width={520}
          height={520}
          priority
          className="relative w-[min(100%,520px)] h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-[1.02]"
        />
      </div>
    </section>
  );
}
