import "./globals.css";
import Script from "next/script";
import ScrollReveal from "@/components/ScrollReveal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="has-hover">
      <head>
        <link href="/local/templates/naftagaz/assets/stylesheets/globale4b8.css" rel="stylesheet" />
        <link href="/local/templates/naftagaz/assets/stylesheets/landing0727.css" rel="stylesheet" />
        <link href="/local/templates/naftagaz/assets/stylesheets/about9ea1.css" rel="stylesheet" />
        <link href="/local/templates/naftagaz/assets/stylesheets/career49f8.css" rel="stylesheet" />
        <link href="/local/templates/naftagaz/assets/stylesheets/ceo-modald037.css" rel="stylesheet" />
        <link href="/local/templates/naftagaz/assets/stylesheets/contactsca02.css" rel="stylesheet" />
        <link href="/local/templates/naftagaz/assets/stylesheets/driling722c.css" rel="stylesheet" />
        <link href="/local/templates/naftagaz/assets/stylesheets/hotline78f0.css" rel="stylesheet" />
        <link href="/local/templates/naftagaz/assets/stylesheets/press-center9c0c.css" rel="stylesheet" />
        <link href="/local/templates/naftagaz/assets/stylesheets/privacy-policy4110.css" rel="stylesheet" />
        <link href="/local/templates/naftagaz/assets/stylesheets/project-modald3cd.css" rel="stylesheet" />
        <link href="/local/templates/naftagaz/assets/stylesheets/service8079.css" rel="stylesheet" />
        <link href="/local/templates/naftagaz/assets/stylesheets/social4b23.css" rel="stylesheet" />
      </head>
      <body>
        <ScrollReveal />
        {children}

        {/* Legacy plugin/runtime bundles needed for tabs, hover cards, and scroll animations */}
        <Script src="/nafassets/fix-images.js" strategy="afterInteractive" />
        <Script src="/local/templates/naftagaz/assets/javascripts/shared.js" strategy="afterInteractive" />
        <Script src="/local/templates/naftagaz/assets/javascripts/blank.js" strategy="afterInteractive" />
        <Script src="/local/templates/naftagaz/assets/javascripts/landing.js" strategy="afterInteractive" />
        <Script src="/local/templates/naftagaz/assets/javascripts/about.js" strategy="afterInteractive" />
        <Script src="/local/templates/naftagaz/assets/javascripts/services.js" strategy="afterInteractive" />
        <Script src="/local/templates/naftagaz/assets/javascripts/career.js" strategy="afterInteractive" />
        <Script src="/local/templates/naftagaz/assets/javascripts/contacts.js" strategy="afterInteractive" />
        <Script src="/local/templates/naftagaz/assets/javascripts/hotline.js" strategy="afterInteractive" />
        <Script src="/local/templates/naftagaz/assets/javascripts/press-center.js" strategy="afterInteractive" />
        <Script src="/local/templates/naftagaz/assets/javascripts/social.js" strategy="afterInteractive" />
        <Script src="/local/templates/naftagaz/assets/javascripts/illustration.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
