'use client'

import { useEffect, useState } from 'react'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { UMAMI_EVENTS } from '@/data/umamiEvents'
import { formatDate } from 'pliny/utils/formatDate'
import { formatRelativeDate } from '@/utils/formatRelativeDate'

const READING_HISTORY_KEY = 'myblog-reading-history'

interface ReadingHistoryItem {
  slug: string
  path: string
  title: string
  date: string
  viewedAt: string
}

export default function ResumeReading() {
  const [recentItem, setRecentItem] = useState<ReadingHistoryItem | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const raw = window.localStorage.getItem(READING_HISTORY_KEY)
    if (!raw) return

    try {
      const parsed: ReadingHistoryItem[] = JSON.parse(raw)
      if (parsed.length > 0 && parsed[0]) {
        setRecentItem(parsed[0])
      }
    } catch {
      window.localStorage.removeItem(READING_HISTORY_KEY)
    }
  }, [])

  if (!recentItem) return null

  return (
    <section className="border-t border-gray-200 py-12 dark:border-gray-700">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-dark-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
              Resume Reading
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">
              Pick up where you left off
            </h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Last visit: {formatRelativeDate(recentItem.viewedAt, siteMetadata.locale)}
            </p>
          </div>
          <Link
            href={`/${recentItem.path}`}
            data-umami-event={UMAMI_EVENTS.RESUME_READING_CLICK}
            data-umami-event-title={recentItem.title}
            className="focus-ring inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-cyan-600 hover:to-blue-700"
          >
            Continue
          </Link>
        </div>
        <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {recentItem.title}
          </h3>
          <p
            className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            title={formatDate(recentItem.date, siteMetadata.locale)}
          >
            Published {formatRelativeDate(recentItem.date, siteMetadata.locale)}
          </p>
        </div>
      </div>
    </section>
  )
}
