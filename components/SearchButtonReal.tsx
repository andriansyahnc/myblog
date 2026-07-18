'use client'

import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import { KBarButton } from 'pliny/search/KBarButton'
import siteMetadata from '@/data/siteMetadata'
import { UMAMI_EVENTS } from '@/data/umamiEvents'
import SearchIcon from '@/components/SearchIcon'

export default function SearchButtonReal() {
  if (
    !siteMetadata.search ||
    (siteMetadata.search.provider !== 'algolia' && siteMetadata.search.provider !== 'kbar')
  ) {
    return null
  }

  const SearchButtonWrapper =
    siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton

  return (
    <span data-umami-event={UMAMI_EVENTS.SEARCH_OPEN}>
      <SearchButtonWrapper aria-label="Search">
        <SearchIcon />
      </SearchButtonWrapper>
    </span>
  )
}
