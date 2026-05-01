import RootHeader from "@/components/layout/RootHeader";
import RootFooter from "@/components/layout/RootFooter";

export const metadata = {
  title: "Terms of Services | Blueflare Energy",
  description: "Terms and conditions governing access to and use of Blueflare Energy digital services.",
};

export default function TermsOfServicesPage() {
  return (
    <div className="min-h-screen bg-white text-[#394854]">
      <RootHeader forceBackground />
      <main className="legal-page">
        <section className="legal-page__hero">
          {/* <p className="sust-eyebrow">LEGAL</p> */}
          <h1 className="legal-page__title">Terms of Services</h1>
          <p className="legal-page__subtitle">
            These terms define how visitors and business users may access, interact with, and rely
            on information, tools, and communication channels made available through Blueflare
            Energy digital platforms.
          </p>
        </section>

        <section className="legal-page__content">
          <aside className="legal-page__sticky">
            <h2>Terms of Services</h2>
            <p>Effective date: May 1, 2026</p>
          </aside>

          <div className="legal-page__body">
            <article>
              <h3>1. Acceptance of terms</h3>
              <p>
                By using this website, you confirm that you have read and accepted these terms. If
                you do not agree with any part of them, you should discontinue use of the site.
              </p>
            </article>

            <article>
              <h3>2. Permitted use</h3>
              <p>
                You may access content for lawful, informational, and business communication
                purposes. You may not misuse the site, attempt unauthorized access, disrupt
                operations, or use automated methods that materially affect platform performance.
              </p>
            </article>

            <article>
              <h3>3. Intellectual property</h3>
              <p>
                Text, design systems, trademarks, photography, and technical documents published on
                this platform remain the property of Blueflare Energy or its licensors unless stated
                otherwise. No rights are transferred except limited personal or internal business
                viewing rights.
              </p>
            </article>

            <article>
              <h3>4. Third-party links and resources</h3>
              <p>
                Some pages may reference external resources. Blueflare Energy is not responsible for
                third-party content, availability, privacy practices, or downstream service quality.
              </p>
            </article>

            <article>
              <h3>5. Service availability</h3>
              <p>
                We may modify, suspend, or discontinue any site feature without prior notice. While
                we aim for high reliability, uninterrupted availability cannot be guaranteed.
              </p>
            </article>

            <article>
              <h3>6. Limitation of liability</h3>
              <p>
                To the fullest extent permitted by applicable law, Blueflare Energy is not liable
                for indirect, consequential, or incidental losses resulting from use of this site,
                including business interruption, data loss, or reliance on published materials.
              </p>
            </article>

            <article>
              <h3>7. Governing framework</h3>
              <p>
                These terms are interpreted under applicable Nigerian law and relevant commercial
                regulations governing digital business communications.
              </p>
            </article>

            <article>
              <h3>8. Updates to terms</h3>
              <p>
                We may revise these terms periodically to reflect legal, operational, or technology
                changes. Continued use after updates indicates acceptance of the revised terms.
              </p>
            </article>
          </div>
        </section>
      </main>
      <RootFooter />
    </div>
  );
}
