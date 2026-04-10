const partners = [
  "Gazprom",
  "Rosneft",
  "Lukoil",
  "Novatek",
  "Schlumberger",
  "Halliburton",
  "Baker Hughes",
  "Weatherford",
  "TotalEnergies",
  "Shell",
];

export default function PartnersSection() {
  return (
    <section className="ui-light-background">
      <div className="container-h py-0">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {/* Header cell */}
          <div className="partners__item--head col-span-2 md:col-span-2">
            <h2>
              Our
              <br />
              Partners
            </h2>
          </div>

          {/* Partner logo cells */}
          {partners.map((name) => (
            <div key={name} className="partners__item">
              <span
                className="font-light"
                style={{
                  fontSize: "clamp(12px, 1.2vw, 15px)",
                  letterSpacing: "0.02em",
                  color: "rgba(14,26,39,0.4)",
                }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
