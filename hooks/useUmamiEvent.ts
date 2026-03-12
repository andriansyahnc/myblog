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

export function useUmamiEvent() {
  const trackEvent = useCallback(
    <TEventName extends UmamiEventName>(
      eventName: TEventName,
      eventData?: UmamiEventPayloadMap[TEventName]
    ) => {
      if (process.env.NODE_ENV !== 'production') {
        const payloadErrors = validateUmamiEventPayload(eventName, eventData)
        if (payloadErrors.length > 0) {
          console.warn(
            `[umami] invalid payload for ${eventName}: ${payloadErrors.join(', ')}`,
            eventData
          )
        }
      }

      if (typeof window !== 'undefined' && window.umami?.track) {
        window.umami.track(eventName, eventData as Record<string, unknown> | undefined)
      }
    },
    []
  )

  return { trackEvent }
}
