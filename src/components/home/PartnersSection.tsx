const partners = [
  { id: "gazprom-left", type: "gazprom" },
  { id: "rosneft", type: "rosneft" },
  { id: "russneft", type: "russneft" },
  { id: "messoyakha", type: "messoyakha" },
  { id: "gazprom-right", type: "gazprom" },
] as const;

function PartnerLogo({ type }: { type: (typeof partners)[number]["type"] }) {
  if (type === "gazprom") {
    return (
      <div className="text-center text-[#435465]">
        <div className="text-[34px] leading-none">G</div>
        <div className="-mt-1 text-[12px] font-medium uppercase tracking-[0.2em]">Gazprom</div>
        <div className="text-[8px] uppercase tracking-[0.34em] text-[#435465]/75">Neft</div>
      </div>
    );
  }

  if (type === "rosneft") {
    return (
      <div className="flex flex-col items-center gap-3 text-[#435465]">
        <div className="grid grid-cols-3 gap-[2px]">
          <span className="h-3.5 w-[5px] bg-current" />
          <span className="h-5 w-[5px] bg-current" />
          <span className="h-4 w-[5px] bg-current" />
        </div>
        <span className="text-[13px] font-medium uppercase tracking-[0.12em]">Rosneft</span>
      </div>
    );
  }

  if (type === "russneft") {
    return (
      <div className="flex flex-col items-center gap-2 text-[#435465]">
        <div className="rounded-full border border-current px-4 py-1 text-[12px] font-medium italic tracking-[-0.02em]">
          RussNeft
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 text-[#435465]">
      <div className="grid grid-cols-3 gap-[3px]">
        <span className="h-[7px] w-[7px] rotate-45 bg-current" />
        <span className="h-[7px] w-[7px] rotate-45 bg-current" />
        <span className="h-[7px] w-[7px] rotate-45 bg-current" />
        <span className="h-[7px] w-[7px] rotate-45 bg-current" />
        <span className="h-[7px] w-[7px] rotate-45 bg-current" />
        <span className="h-[7px] w-[7px] rotate-45 bg-current" />
      </div>
      <div className="text-center text-[11px] font-medium uppercase leading-tight tracking-[0.14em]">
        <div>Messoyakha</div>
        <div className="text-[9px] tracking-[0.18em] text-[#435465]/85">Neftegaz</div>
      </div>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-2 border-y border-black/10 md:grid-cols-5">
        <div className="flex min-h-[152px] items-start justify-start border-r border-black/10 px-6 py-7 text-[#394854] md:hidden">
          <h2 className="max-w-[82px] text-[18px] leading-[0.95] tracking-[-0.04em]">Our Partners</h2>
        </div>
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex min-h-[152px] items-center justify-center border-r border-black/10 px-8 py-12 last:border-r-0 md:min-h-[304px]"
          >
            <PartnerLogo type={partner.type} />
          </div>
        ))}
      </div>
    </section>
  );
}
