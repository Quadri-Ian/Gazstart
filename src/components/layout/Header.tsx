'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

const navItems = [
  { key: 'company', children: [{ key: 'about', href: '/company/about' }, { key: 'sustainable', href: '/company/sustainable-development' }] },
  { key: 'services', children: [{ key: 'drilling', href: '/services/drilling' }, { key: 'oilfieldServices', href: '/services/service' }] },
  { key: 'pressCenter', href: '/press-center' },
  { key: 'careers', href: '/careers' },
  { key: 'procurement', href: '/procurement' },
  { key: 'contacts', href: '/contacts' },
]

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const localePath = (href: string) => (locale === 'en' ? href : `/${locale}${href}`)

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-brand-navy shadow-lg' : 'bg-brand-navy/90 backdrop-blur-sm'}`}>
      <div className="container-custom flex h-16 items-center justify-between">
        <Link href={localePath('/')} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange font-display font-bold text-white">B</div>
          <span className="font-display text-lg font-bold text-white">Blueflare Energy</span>
        </Link>
        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {navItems.map((item) =>
            'children' in item && item.children ? (
              <div key={item.key} className="relative" onMouseEnter={() => setOpenDropdown(item.key)} onMouseLeave={() => setOpenDropdown(null)}>
                <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white">
                  {t(item.key as 'company' | 'services')}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {openDropdown === item.key && (
                  <div className="absolute left-0 top-full min-w-48 rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5">
                    {item.children.map((child) => (
                      <Link key={child.key} href={localePath(child.href)} className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-brand-orange/10 hover:text-brand-orange transition-colors" onClick={() => setOpenDropdown(null)}>
                        {t(child.key as 'about' | 'sustainable' | 'drilling' | 'oilfieldServices')}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.key} href={localePath((item as { key: string; href: string }).href)} className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${pathname.includes((item as { key: string; href: string }).href) ? 'text-brand-orange' : 'text-gray-300 hover:text-white'}`}>
                {t(item.key as 'pressCenter' | 'careers' | 'procurement' | 'contacts')}
              </Link>
            )
          )}
          <LanguageSwitcher />
        </nav>
        <button className="lg:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-white/10 bg-brand-navy lg:hidden">
          <nav className="container-custom py-4 space-y-1">
            {navItems.map((item) =>
              'children' in item && item.children ? (
                <div key={item.key}>
                  <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">{t(item.key as 'company' | 'services')}</div>
                  {item.children.map((child) => (
                    <Link key={child.key} href={localePath(child.href)} className="block px-6 py-2 text-sm text-gray-300 hover:text-white" onClick={() => setMobileOpen(false)}>
                      {t(child.key as 'about' | 'sustainable' | 'drilling' | 'oilfieldServices')}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={item.key} href={localePath((item as { key: string; href: string }).href)} className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white" onClick={() => setMobileOpen(false)}>
                  {t(item.key as 'pressCenter' | 'careers' | 'procurement' | 'contacts')}
                </Link>
              )
            )}
            <div className="px-3 pt-2"><LanguageSwitcher /></div>
          </nav>
        </div>
      )}
    </header>
  )
}
