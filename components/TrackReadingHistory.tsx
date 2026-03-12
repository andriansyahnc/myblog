'use client'

import { useEffect } from 'react'

const READING_HISTORY_KEY = 'myblog-reading-history'
const MAX_HISTORY_ITEMS = 8

interface ReadingHistoryItem {
  slug: string
  path: string
  title: string
  date: string
  viewedAt: string
}

interface TrackReadingHistoryProps {
  slug: string
  path: string
  title: string
  date: string
}

export default function TrackReadingHistory({ slug, path, title, date }: TrackReadingHistoryProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const nextItem: ReadingHistoryItem = {
      slug,
      path,
      title,
      date,
      viewedAt: new Date().toISOString(),
    }

    const raw = window.localStorage.getItem(READING_HISTORY_KEY)
    const parsed: ReadingHistoryItem[] = raw ? JSON.parse(raw) : []

    const deduped = parsed.filter((item) => item.slug !== slug)
    const nextHistory = [nextItem, ...deduped].slice(0, MAX_HISTORY_ITEMS)

    window.localStorage.setItem(READING_HISTORY_KEY, JSON.stringify(nextHistory))
  }, [date, path, slug, title])

  return null
}
