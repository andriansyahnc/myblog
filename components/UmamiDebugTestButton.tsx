'use client'

import { useMemo, useState } from 'react'
import { UMAMI_EVENTS } from '@/data/umamiEvents'
import { useUmamiEvent } from '@/hooks/useUmamiEvent'

export default function UmamiDebugTestButton() {
  const { trackEvent } = useUmamiEvent()
  const [lastSentAt, setLastSentAt] = useState<string | null>(null)

  const enabled = useMemo(() => {
    if (typeof window === 'undefined') return false
    return new URLSearchParams(window.location.search).get('umami-debug') === '1'
  }, [])

  if (!enabled) return null

  const sendManualEvent = () => {
    trackEvent(UMAMI_EVENTS.MANUAL_PROD_TEST)
    setLastSentAt(new Date().toISOString())
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-xl border border-cyan-300 bg-white/95 p-3 shadow-lg backdrop-blur dark:border-cyan-700 dark:bg-gray-900/95">
      <p className="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">Umami Debug</p>
      <button
        type="button"
        onClick={sendManualEvent}
        className="focus-ring rounded-md bg-cyan-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-cyan-700"
      >
        Send manual-prod-test
      </button>
      {lastSentAt && (
        <p className="mt-2 max-w-56 break-all text-[10px] text-gray-500 dark:text-gray-400">
          Sent: {lastSentAt}
        </p>
      )}
    </div>
  )
}
