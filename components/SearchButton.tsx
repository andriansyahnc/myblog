'use client'

import dynamic from 'next/dynamic'
import siteMetadata from '@/data/siteMetadata'
import { UMAMI_EVENTS } from '@/data/umamiEvents'
import { useSearchGate } from '@/components/SearchGate'
import SearchIcon from '@/components/SearchIcon'

// Keeps pliny/search and kbar (and their JS) out of the bundle until the
// user actually opens search — see SearchGate.
const SearchButtonReal = dynamic(() => import('@/components/SearchButtonReal'), { ssr: false })

const SearchButton = () => {
  const { ready, activate } = useSearchGate()

  if (
    !siteMetadata.search ||
    (siteMetadata.search.provider !== 'algolia' && siteMetadata.search.provider !== 'kbar')
  ) {
    return null
  }

  if (!ready) {
    return (
      <span data-umami-event={UMAMI_EVENTS.SEARCH_OPEN}>
        <button type="button" aria-label="Search" onClick={activate}>
          <SearchIcon />
        </button>
      </span>
    )
  }

  return <SearchButtonReal />
}

export default SearchButton
