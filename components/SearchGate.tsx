'use client'

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react'
import dynamic from 'next/dynamic'

interface SearchGateValue {
  ready: boolean
  activate: () => void
}

const SearchGateContext = createContext<SearchGateValue>({ ready: false, activate: () => {} })

export function useSearchGate() {
  return useContext(SearchGateContext)
}

// pliny's kbar search provider fetches search.json unconditionally on mount,
// and pulls in the kbar library. Since it wraps the whole app, that meant
// every page view fetched search.json and downloaded kbar's JS — even for
// visitors who never open search. This file stays tiny and always-loaded
// (just a context + keyboard listener); the actual provider is dynamically
// imported only once the user signals search intent.
const SearchProviderMounted = dynamic(() => import('@/components/SearchProviderMounted'), {
  ssr: false,
})

export default function SearchGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  const activate = useCallback(() => setReady(true), [])

  useEffect(() => {
    if (ready) return
    // Matches kbar's default toggle shortcut ($mod+k) so the shortcut works
    // even before the real provider (which registers its own listener) has
    // loaded.
    const onKeyDown = (event: KeyboardEvent) => {
      const isToggleShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      if (isToggleShortcut) activate()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [ready, activate])

  return (
    <SearchGateContext.Provider value={{ ready, activate }}>
      {ready ? <SearchProviderMounted>{children}</SearchProviderMounted> : children}
    </SearchGateContext.Provider>
  )
}
