import RootFooter from "@/components/layout/RootFooter";
import RootHeader from "@/components/layout/RootHeader";

export const metadata = {
  title: "Contacts | Blueflare Energy",
};

export default function ContactsPage() {
  return (
    <div className="contact-page min-h-screen bg-white text-[#394854]">
      <RootHeader />
      <main>
        <section className="contact-hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nafassets/pexels-maxmishin-11802670.jpg"
            alt="Blueflare contact hero"
            className="contact-hero__bg"
          />
          <div className="contact-hero__overlay" />
          <div className="contact-hero__content">
            <p className="sust-eyebrow sust-eyebrow--light">CONTACTS</p>
            <h1 className="contact-hero__title">Let&apos;s Start the Conversation</h1>
            <p className="contact-hero__body">
              Reach out to our team for project inquiries, partnership opportunities, or general
              support. We&apos;ll connect you with the right experts.
            </p>
          </div>
        </section>

        <section className="contact-layout">
          <div className="contact-layout__info">
            <p className="sust-eyebrow">GET IN TOUCH</p>
            <h2 className="contact-layout__title">Blueflare Energy</h2>
            <p className="contact-layout__line">1234 Energy Avenue, Almaty, Kazakhstan</p>
            <p className="contact-layout__line">+7 (727) 000 00 00</p>
            <p className="contact-layout__line">info@blueflare-energy.com</p>
            <div className="contact-layout__map" aria-label="Office location map preview">
              <span>Map Preview</span>
            </div>
          </div>

          <form className="contact-form" action="#" method="post">
            <h3 className="contact-form__title">Send a Message</h3>
            <label className="contact-form__field">
              <span>Name</span>
              <input type="text" name="name" placeholder="Your full name" required />
            </label>
            <label className="contact-form__field">
              <span>Email</span>
              <input type="email" name="email" placeholder="you@company.com" required />
            </label>
            <label className="contact-form__field">
              <span>Subject</span>
              <input type="text" name="subject" placeholder="How can we help?" required />
            </label>
            <label className="contact-form__field">
              <span>Message</span>
              <textarea name="message" rows={5} placeholder="Tell us about your request" required />
            </label>
            <button type="submit" className="contact-form__submit">Send Message</button>
          </form>
        </section>
      </main>
      <RootFooter />
    </div>
  );
}
