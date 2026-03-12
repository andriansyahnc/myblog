'use client'

import { useState } from 'react'
import { useUmamiEvent } from '@/hooks/useUmamiEvent'
import { UMAMI_EVENTS } from '@/data/umamiEvents'

interface DebugEvent {
  name: string
  payload?: unknown
  at: string
}

export default function AnalyticsEventTester() {
  const { trackEvent } = useUmamiEvent()
  const [lastEvent, setLastEvent] = useState<DebugEvent | null>(null)

  const unsafeTrack = trackEvent as unknown as (eventName: string, eventData?: unknown) => void

  const recordAndTrack = (name: string, payload?: unknown) => {
    setLastEvent({
      name,
      payload,
      at: new Date().toISOString(),
    })

    if (payload === undefined) {
      unsafeTrack(name)
      return
    }

    unsafeTrack(name, payload)
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/60">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Last Dispatched Event
          </h2>
          {lastEvent && (
            <button
              type="button"
              onClick={() => setLastEvent(null)}
              className="focus-ring rounded-md px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Clear
            </button>
          )}
        </div>
        {!lastEvent ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">No event dispatched yet.</p>
        ) : (
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">Event:</span>{' '}
              <span className="text-cyan-700 dark:text-cyan-300">{lastEvent.name}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">At:</span>{' '}
              <span className="text-gray-700 dark:text-gray-300">{lastEvent.at}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">Payload:</span>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-white p-3 text-xs text-gray-800 dark:bg-gray-950 dark:text-gray-200">
                {JSON.stringify(lastEvent.payload ?? null, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Valid Event Tests
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            These emit correctly typed events and should appear in Umami without warnings.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => recordAndTrack(UMAMI_EVENTS.NEWSLETTER_SUBMIT_ATTEMPT)}
              className="focus-ring rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
            >
              Newsletter Attempt
            </button>
            <button
              type="button"
              onClick={() =>
                recordAndTrack(UMAMI_EVENTS.SEARCH_QUERY_CHANGED, {
                  queryLength: 5,
                  hasQuery: true,
                })
              }
              className="focus-ring rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
            >
              Search Query Changed
            </button>
            <button
              type="button"
              onClick={() =>
                recordAndTrack(UMAMI_EVENTS.POST_SCROLL_DEPTH, {
                  depth: 50,
                  slug: 'dev-test-post',
                  title: 'Dev Test Post',
                })
              }
              className="focus-ring rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
            >
              Scroll Depth 50
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
          <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-200">
            Invalid Payload Tests
          </h2>
          <p className="mt-2 text-sm text-amber-800 dark:text-amber-300">
            These intentionally send malformed payloads. In development, check console for payload
            validation warnings from the tracking hook.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                recordAndTrack(UMAMI_EVENTS.POST_SCROLL_DEPTH, {
                  depth: 'fifty',
                  slug: 123,
                  title: true,
                })
              }
              className="focus-ring rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
            >
              Invalid Scroll Payload
            </button>
            <button
              type="button"
              onClick={() =>
                recordAndTrack(UMAMI_EVENTS.TAG_FILTER_CHANGED, {
                  tag: null,
                  selectedCount: 'two',
                })
              }
              className="focus-ring rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
            >
              Invalid Filter Payload
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
