import RootHeader from "@/components/layout/RootHeader";
import RootFooter from "@/components/layout/RootFooter";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Blueflare Energy",
  description:
    "How Blueflare Energy collects, uses, and protects personal information across its digital platforms.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#394854]">
      <RootHeader forceBackground />
      <main className="legal-page">
        <section className="legal-page__hero">
          <h1 className="legal-page__title">Privacy Policy</h1>
          <p className="legal-page__subtitle">
            This policy explains what data we collect, why we collect it, and how we handle it in
            line with responsible operational and regulatory standards.
          </p>
        </section>

        <section className="legal-page__content">
          <aside className="legal-page__sticky">
            <h2>Privacy Policy</h2>
            <p>Effective date: May 1, 2026</p>
            <Link href="/terms-of-services" className="legal-page__cross-link">
              View Terms of Services
            </Link>
          </aside>

          <div className="legal-page__body">
            <article>
              <h3>1. Information we collect</h3>
              <p>
                We collect information you provide directly through contact forms, career
                applications, and business communication channels. This may include name, company,
                email, phone number, and message content.
              </p>
            </article>

            <article>
              <h3>2. Operational and technical data</h3>
              <p>
                We may process technical metadata such as browser type, approximate location,
                referring pages, and interaction metrics to improve reliability, performance, and
                user experience.
              </p>
            </article>

            <article>
              <h3>3. Purpose of processing</h3>
              <p>
                Personal and technical data is used to respond to requests, evaluate potential
                partnerships, support recruitment workflows, and maintain secure digital operations.
              </p>
            </article>

            <article>
              <h3>4. Data sharing</h3>
              <p>
                Information is shared only with authorized personnel, approved service providers,
                or where required by law. We do not sell personal data to third parties.
              </p>
            </article>

            <article>
              <h3>5. Security and retention</h3>
              <p>
                We apply proportionate technical and organizational controls to protect data against
                unauthorized access, disclosure, alteration, or loss. Data is retained only as long
                as necessary for stated operational or legal purposes.
              </p>
            </article>

            <article>
              <h3>6. Your rights</h3>
              <p>
                Subject to applicable law, you may request access, correction, or deletion of your
                personal data, or object to specific processing activities.
              </p>
            </article>

            <article>
              <h3>7. Contact</h3>
              <p>
                For privacy-related inquiries, please contact our team via the official channels on
                the Contact Us page and include enough information for identity and request
                verification.
              </p>
            </article>
          </div>
        </section>
      </main>
      <RootFooter />
    </div>
  );
}
