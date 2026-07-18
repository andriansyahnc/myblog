import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'
import TagsPageClient from './TagsPageClient'

export const metadata: Metadata = genPageMetadata({
  title: 'Tags',
  path: '/tags',
  description: 'Browse all topics and tags on the blog.',
})

export default function Page() {
  return <TagsPageClient />
}
