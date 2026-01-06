'use client'

import { useEffect } from 'react'

interface UseKeyboardShortcutOptions {
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
}

export const useKeyboardShortcut = (
  key: string,
  callback: () => void,
  options: UseKeyboardShortcutOptions = { metaKey: true }
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { ctrlKey, metaKey, shiftKey, altKey } = options

      const ctrlMatch = ctrlKey ? e.ctrlKey : !e.ctrlKey
      const metaMatch = metaKey ? e.metaKey : !e.metaKey
      const shiftMatch = shiftKey ? e.shiftKey : !e.shiftKey
      const altMatch = altKey ? e.altKey : !e.altKey

      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        ctrlMatch &&
        metaMatch &&
        shiftMatch &&
        altMatch
      ) {
        e.preventDefault()
        callback()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [key, callback, options])
}
