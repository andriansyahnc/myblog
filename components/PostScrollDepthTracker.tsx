'use client'

import { useEffect, useRef } from 'react'
import { UMAMI_EVENTS } from '@/data/umamiEvents'
import { useUmamiEvent } from '@/hooks/useUmamiEvent'

interface PostScrollDepthTrackerProps {
  slug: string
  title: string
}

const DEPTH_STEPS = [25, 50, 75, 100]

export default function PostScrollDepthTracker({ slug, title }: PostScrollDepthTrackerProps) {
  const { trackEvent } = useUmamiEvent()
  const reachedDepths = useRef(new Set<number>())

  useEffect(() => {
    reachedDepths.current.clear()

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const maxScrollable = scrollHeight - clientHeight
      const percent = maxScrollable <= 0 ? 100 : Math.round((scrollTop / maxScrollable) * 100)

      DEPTH_STEPS.forEach((depth) => {
        if (percent >= depth && !reachedDepths.current.has(depth)) {
          reachedDepths.current.add(depth)
          trackEvent(UMAMI_EVENTS.POST_SCROLL_DEPTH, { depth, slug, title })
        }
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug, title, trackEvent])

  return null
}
