import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { locales } from '@/lib/i18n/request'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Blueflare Energy — World-Class Energy Services',
    template: '%s | Blueflare Energy',
  },
  description:
    'Blueflare Energy delivers world-class drilling and oilfield services with safety, efficiency, and sustainability.',
  openGraph: {
    siteName: 'Blueflare Energy',
    type: 'website',
  },
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  if (!locales.includes(locale as (typeof locales)[number])) notFound()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
