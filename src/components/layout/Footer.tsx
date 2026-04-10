'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()
  const localePath = (href: string) => (locale === 'en' ? href : `/${locale}${href}`)

  return (
    <footer className="bg-brand-navy text-gray-300">
      <div className="container-custom py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange font-display font-bold text-white">B</div>
              <span className="font-display text-lg font-bold text-white">Blueflare Energy</span>
            </div>
            <p className="text-sm leading-relaxed">{t('description')}</p>
          </div>
          <div>
            <h4 className="mb-4 font-display font-bold text-white">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              {[{ label: 'About Us', href: '/company/about' }, { label: 'Sustainable Development', href: '/company/sustainable-development' }, { label: 'Press Center', href: '/press-center' }, { label: 'Careers', href: '/careers' }, { label: 'Contacts', href: '/contacts' }].map((link) => (
                <li key={link.href}><Link href={localePath(link.href)} className="hover:text-brand-orange transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-display font-bold text-white">{t('services')}</h4>
            <ul className="space-y-2 text-sm">
              {[{ label: 'Drilling Services', href: '/services/drilling' }, { label: 'Oilfield Services', href: '/services/service' }, { label: 'Procurement', href: '/procurement' }].map((link) => (
                <li key={link.href}><Link href={localePath(link.href)} className="hover:text-brand-orange transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-display font-bold text-white">{t('contact')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><span>📍</span><span>123 Energy Plaza, Houston, TX 77002, USA</span></li>
              <li className="flex items-center gap-2"><span>📞</span><a href="tel:+17135550100" className="hover:text-brand-orange transition-colors">+1 (713) 555-0100</a></li>
              <li className="flex items-center gap-2"><span>✉️</span><a href="mailto:info@blueflare-energy.com" className="hover:text-brand-orange transition-colors">info@blueflare-energy.com</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm">{t('copyright')}</p>
          <div className="flex gap-4 text-sm">
            <Link href={localePath('/privacy')} className="hover:text-brand-orange transition-colors">{t('privacy')}</Link>
            <Link href={localePath('/terms')} className="hover:text-brand-orange transition-colors">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
