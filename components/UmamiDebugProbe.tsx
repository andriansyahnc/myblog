'use client'

import { useEffect } from 'react'

function isUmamiDebugEnabled() {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('umami-debug') === '1'
}

export default function UmamiDebugProbe() {
  useEffect(() => {
    if (!isUmamiDebugEnabled()) return

    const logStatus = (label: string) => {
      const scriptEl = document.querySelector<HTMLScriptElement>('script[data-website-id]')
      const websiteId = scriptEl?.getAttribute('data-website-id') || null
      const scriptSrc = scriptEl?.getAttribute('src') || null
      const hasUmamiRuntime = typeof window !== 'undefined' && Boolean(window.umami?.track)

      console.info(`[umami-debug] ${label}`, {
        websiteId,
        scriptSrc,
        hasUmamiRuntime,
        hostname: window.location.hostname,
        pathname: window.location.pathname,
      })
    }

    logStatus('initial')
    const timeout = window.setTimeout(() => logStatus('after-2s'), 2000)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [])

  return null
}
