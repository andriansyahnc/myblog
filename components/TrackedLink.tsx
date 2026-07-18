'use client'

import { ComponentProps, MouseEvent } from 'react'
import Link from '@/components/Link'
import { useUmamiEvent } from '@/hooks/useUmamiEvent'
import type { UmamiEventName, UmamiEventPayloadMap } from '@/data/umamiEvents'

type TrackedLinkProps<E extends UmamiEventName> = ComponentProps<typeof Link> & {
  event: E
  eventData?: UmamiEventPayloadMap[E]
}

/**
 * A Link that fires a typed Umami event when clicked. Use for CTAs and outbound
 * links we want to measure (booking, hire-me, social/link-hub buttons).
 */
export default function TrackedLink<E extends UmamiEventName>({
  event,
  eventData,
  onClick,
  ...linkProps
}: TrackedLinkProps<E>) {
  const { trackEvent } = useUmamiEvent()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event, eventData)
    onClick?.(e)
  }

  return <Link {...linkProps} onClick={handleClick} />
}
