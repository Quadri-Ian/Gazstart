'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    let newPath: string
    if (locale === 'en') {
      newPath = `/${newLocale}${pathname}`
    } else {
      const withoutLocale = pathname.replace(`/${locale}`, '') || '/'
      newPath = newLocale === 'en' ? withoutLocale : `/${newLocale}${withoutLocale}`
    }
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-1 rounded-lg bg-white/10 p-1">
      {(['en', 'ru'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          className={`rounded-md px-2 py-1 text-xs font-semibold uppercase transition-colors ${
            locale === lang ? 'bg-brand-orange text-white' : 'text-gray-300 hover:text-white'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}
