'use client'

import { useCallback } from 'react'

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void
    }
  }
}

export function useUmamiEvent() {
  const trackEvent = useCallback((eventName: string, eventData?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.umami?.track) {
      window.umami.track(eventName, eventData)
    }
  }, [])

  return { trackEvent }
}
