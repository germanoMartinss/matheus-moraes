const contactInfo = [
  {
    label: "Endereço",
    content: (
      <p className="text-[14.5px] text-text-secondary-light leading-[1.65]">
        Av. Conselheiro Nébias, 756, cj. 2421 — Helbor Offices — Vila Rica —
        Santos, SP
      </p>
    ),
  },
  {
    label: "Telefone",
    content: (
      <p className="text-[14.5px]">
        <a href="tel:+5513996764688" className="text-[#e8e5dc]">
          (13) 99676-4688
        </a>
      </p>
    ),
  },
  {
    label: "E-mail",
    content: (
      <p className="text-[14.5px] break-words">
        <a href="mailto:matheusmoraesadvogado@gmail.com" className="text-[#e8e5dc]">
          matheusmoraesadvogado@gmail.com
        </a>
      </p>
    ),
  },
];

export default function Contato() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden px-[6vw] py-[110px] bg-bg-primary"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 38px, #c8a862 38px, #c8a862 39px)",
        }}
      />
      <div className="relative z-10 max-w-[720px] mx-auto text-center">
        <div className="text-[13px] tracking-[3px] text-gold uppercase mb-4">
          Contato
        </div>
        <h2 className="font-heading text-[clamp(30px,3.5vw,42px)] text-text-heading mb-5">
          Gostaria de uma orientação?
        </h2>
        <p className="text-[17px] text-text-secondary-light leading-[1.7] mb-12">
          Estamos aqui para lhe ajudar. Entre em contato e agende sua
          conversa.
        </p>
        <div className="grid grid-cols-1 min-[861px]:grid-cols-3 gap-px bg-gold/15 border border-gold/15 mb-12 text-left">
          {contactInfo.map((item) => (
            <div key={item.label} className="bg-bg-secondary px-[26px] py-8">
              <div className="text-xs tracking-[1.5px] text-gold uppercase mb-2.5">
                {item.label}
              </div>
              {item.content}
            </div>
          ))}
        </div>
        <a
          href="https://wa.me/5513996764688"
          className="inline-block text-[15px] tracking-[0.5px] px-11 py-[18px] bg-gold text-bg-secondary rounded-[2px] font-medium"
        >
          Conversar no WhatsApp
        </a>
      </div>
    </section>
  );
}
