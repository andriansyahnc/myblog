'use client'

import { useCallback } from 'react'
import {
  validateUmamiEventPayload,
  type UmamiEventName,
  type UmamiEventPayloadMap,
} from '@/data/umamiEvents'

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void
    }
  }
}

function isUmamiDebugEnabled() {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('umami-debug') === '1'
}

export function useUmamiEvent() {
  const trackEvent = useCallback(
    <TEventName extends UmamiEventName>(
      eventName: TEventName,
      eventData?: UmamiEventPayloadMap[TEventName]
    ) => {
      const debugEnabled = isUmamiDebugEnabled()

      if (process.env.NODE_ENV !== 'production') {
        const payloadErrors = validateUmamiEventPayload(eventName, eventData)
        if (payloadErrors.length > 0) {
          console.warn(
            `[umami] invalid payload for ${eventName}: ${payloadErrors.join(', ')}`,
            eventData
          )
        }
      }

      if (debugEnabled) {
        console.info('[umami-debug] dispatch', {
          eventName,
          eventData,
          hasUmamiRuntime: typeof window !== 'undefined' && Boolean(window.umami?.track),
        })
      }

      if (typeof window !== 'undefined' && window.umami?.track) {
        window.umami.track(eventName, eventData as Record<string, unknown> | undefined)
      }
    },
    []
  )

  return { trackEvent }
}
