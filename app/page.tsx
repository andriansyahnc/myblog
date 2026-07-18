import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import Main from './Main'

export const metadata: Metadata = {
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
}

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
