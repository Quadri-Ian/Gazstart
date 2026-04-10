'use client'

import { useTranslations } from 'next-intl'
import Hero from '@/components/ui/Hero'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useState } from 'react'

export default function ContactsClient() {
  const t = useTranslations('contacts')
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Hero title={t('hero.title')} subtitle={t('hero.subtitle')} />
      <section className="py-20">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            <ScrollReveal>
              <div>
                <h2 className="section-heading mb-8">{t('info.title')}</h2>
                <div className="space-y-6">
                  {[
                    { icon: '📍', label: 'Address', value: t('info.address') },
                    { icon: '📞', label: 'Phone', value: t('info.phone') },
                    { icon: '✉️', label: 'Email', value: t('info.email') },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <div className="font-semibold text-brand-navy">{item.label}</div>
                        <div className="text-gray-600">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="mb-4 text-6xl">✅</div>
                    <p className="text-xl font-semibold text-brand-navy">{t('form.success')}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {(['name', 'email', 'phone', 'subject'] as const).map((field) => (
                      <div key={field}>
                        <label className="mb-1 block text-sm font-medium text-gray-700">{t(`form.${field}`)}</label>
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          value={form[field]}
                          onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
                          required={field !== 'phone'}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">{t('form.message')}</label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full">{t('form.submit')}</button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
