import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/ui/Hero";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacts" });
  return { title: t("title") };
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacts" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <Hero title={t("heroTitle")} subtitle={t("heroSubtitle")} />
      <section className="bg-dark-900 py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <ScrollReveal>
              <h2 className="mb-6 text-2xl font-bold text-white">Get in Touch</h2>
              <div className="space-y-4 text-white/70">
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-primary-500">📍</span>
                  <div>
                    <p className="font-medium text-white">Head Office</p>
                    <p>1 Neftyanaya Street, Moscow, Russia, 117342</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-primary-500">📞</span>
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <p>+7 495 000 00 00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-primary-500">✉️</span>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p>info@blueflare.com</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h2 className="mb-6 text-2xl font-bold text-white">Send a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-white/60">Name</label>
                  <input
                    type="text"
                    className="w-full rounded border border-white/10 bg-dark-800 px-4 py-2.5 text-white placeholder-white/30 transition-colors focus:border-primary-500 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-white/60">Email</label>
                  <input
                    type="email"
                    className="w-full rounded border border-white/10 bg-dark-800 px-4 py-2.5 text-white placeholder-white/30 transition-colors focus:border-primary-500 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-white/60">Message</label>
                  <textarea
                    rows={5}
                    className="w-full resize-none rounded border border-white/10 bg-dark-800 px-4 py-2.5 text-white placeholder-white/30 transition-colors focus:border-primary-500 focus:outline-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded bg-primary-600 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  {tCommon("contactUs")}
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
