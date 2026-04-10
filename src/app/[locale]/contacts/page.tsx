import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ContactsClient from '@/components/sections/ContactsClient'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contacts')
  return { title: t('hero.title'), description: t('hero.subtitle') }
}

export default function ContactsPage() {
  return <ContactsClient />
}
