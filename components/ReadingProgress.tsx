'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ReadingProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="fixed left-0 top-0 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-200 ease-out dark:from-cyan-400 dark:to-cyan-300"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  )
}
