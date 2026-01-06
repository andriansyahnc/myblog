'use client'

import { useEffect, useRef } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -100px 0px', triggerOnce = true } = options

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    let hasAnimated = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return

        if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
          element.classList.add('animate-in')
          hasAnimated = true

          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          element.classList.remove('animate-in')
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  return ref
}
