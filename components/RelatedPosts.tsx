'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'

interface RelatedPost {
  title: string
  slug: string
  tags: string[]
  summary?: string
}

interface RelatedPostsProps {
  currentTags: string[]
  allPosts: RelatedPost[]
  currentSlug: string
}

export default function RelatedPosts({ currentTags, allPosts, currentSlug }: RelatedPostsProps) {
  // Find posts with shared tags, excluding current post
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      sharedTagCount: post.tags.filter((tag) => currentTags.includes(tag)).length,
    }))
    .filter((item) => item.sharedTagCount > 0)
    .sort((a, b) => b.sharedTagCount - a.sharedTagCount)
    .slice(0, 3)
    .map((item) => item.post)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div className="space-y-6 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Related Posts</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-cyan-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-400"
          >
            <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-cyan-600 dark:text-gray-100 dark:group-hover:text-cyan-400">
              {post.title}
            </h3>
            {post.summary && (
              <p className="mb-3 line-clamp-2 flex-1 text-xs text-gray-600 dark:text-gray-400">
                {post.summary}
              </p>
            )}
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
              {post.tags.length > 3 && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
