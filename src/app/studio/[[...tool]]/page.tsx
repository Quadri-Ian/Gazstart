'use client'

/**
 * Sanity Studio is run as a standalone process (not embedded in this Next.js app).
 *
 * To start the studio locally:
 *   npx sanity dev --dir src/sanity
 *
 * Or access the hosted studio at: https://www.sanity.io/manage
 *
 * This page redirects to the hosted Sanity management interface.
 */
import { useEffect } from 'react'

export default function StudioPage() {
  useEffect(() => {
    window.location.href = 'https://www.sanity.io/manage'
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4 text-5xl">🔧</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Sanity Studio</h1>
        <p className="mb-6 text-gray-600">
          Redirecting to Sanity management console...
        </p>
        <p className="text-sm text-gray-400">
          Or run{' '}
          <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs">
            npx sanity dev --dir src/sanity
          </code>{' '}
          to start the studio locally.
        </p>
      </div>
    </div>
  )
}
