'use client'

import { ReactNode, useEffect } from 'react'
import { useKBar } from 'kbar'
import { SearchProvider, SearchConfig } from 'pliny/search'
import siteMetadata from '@/data/siteMetadata'

// Opens the palette once, right after this (dynamically-imported) module
// mounts — so the interaction that triggered loading it still feels like
// it opened search immediately, not like a no-op.
function AutoOpenOnMount() {
  const { query } = useKBar()
  useEffect(() => {
    query.toggle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

export default function SearchProviderMounted({ children }: { children: ReactNode }) {
  return (
    <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
      <AutoOpenOnMount />
      {children}
    </SearchProvider>
  )
}
