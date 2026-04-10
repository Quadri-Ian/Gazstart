import { useTranslations } from "next-intl";

export default function LocationsSection() {
  const t = useTranslations("home");

  return (
    <section className="ui-dark-background py-20 md:py-28" id="geography">
      <div className="container-h">
        {/* Title */}
        <div className="title-border">
          <h2>{t("locationsTitle")}</h2>
        </div>

        {/* Counter + description row */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20 mb-16">
          <div>
            <span className="geography__count">6 800 000+</span>
            <span className="geography__count-title">
              Drilling{" "}
              <br />
              volume, m
            </span>
          </div>
          <div className="flex items-end">
            <p className="geography__description">
              {`The Company's core business activities are drilling of oil and gas wells and full range of rig-up services. The Company mainly operates in Yamal-Nenets and Khanty-Mansiysk Autonomous Okrugs, Krasnoyarsk Krai, Tyumen and Tomsk Oblasts.`}
            </p>
          </div>
        </div>

        {/* Simplified Russia map placeholder with animated location dots */}
        <div className="relative w-full overflow-hidden" style={{ height: "320px" }}>
          <svg
            viewBox="0 0 900 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-hidden="true"
          >
            {/* Simplified Russia outline */}
            <path
              d="M50 200 L100 160 L160 140 L240 130 L320 120 L400 110 L500 100 L600 110 L680 130 L750 150 L820 170 L860 200 L840 250 L780 280 L700 300 L600 310 L500 320 L400 315 L300 310 L200 300 L120 280 L70 250 Z"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* Location dot 1 — West Siberia */}
            <g>
              <ellipse
                cx="600"
                cy="200"
                rx="68"
                ry="68"
                fill="rgba(191,6,50,0.12)"
                className="geography__map__ellipse--big"
              />
              <ellipse cx="600" cy="200" rx="32" ry="32" fill="rgba(191,6,50,0.2)" />
              <ellipse cx="600" cy="200" rx="6" ry="6" fill="#BF0632" />
              <line x1="600" y1="194" x2="600" y2="60" stroke="rgba(191,6,50,0.3)" strokeWidth="0.5" />
              <text x="605" y="58" fill="rgba(255,255,255,0.5)" fontSize="11" letterSpacing="-0.01em">
                Western Siberia
              </text>
            </g>
            {/* Location dot 2 — YNAO */}
            <g>
              <ellipse
                cx="320"
                cy="160"
                rx="50"
                ry="50"
                fill="rgba(191,6,50,0.10)"
                className="geography__map__ellipse--small"
              />
              <ellipse cx="320" cy="160" rx="22" ry="22" fill="rgba(191,6,50,0.18)" />
              <ellipse cx="320" cy="160" rx="5" ry="5" fill="#BF0632" />
              <line x1="320" y1="155" x2="320" y2="55" stroke="rgba(191,6,50,0.3)" strokeWidth="0.5" />
              <text x="325" y="53" fill="rgba(255,255,255,0.5)" fontSize="11" letterSpacing="-0.01em">
                Yamal-Nenets
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}