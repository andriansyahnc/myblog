'use client'

import { useState, useEffect } from 'react'

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      // Calculate scroll percentage
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100
      setProgress(Math.min(scrollPercent, 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
