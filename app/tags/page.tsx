import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => (tagCounts[b] ?? 0) - (tagCounts[a] ?? 0))

  const totalTags = tagKeys.length
  const maxCount = Math.max(...Object.values(tagCounts))
  const minCount = Math.min(...Object.values(tagCounts))

  // Calculate font size based on tag frequency
  const getTagSize = (count: number) => {
    if (maxCount === minCount) return 'text-base'
    const ratio = (count - minCount) / (maxCount - minCount)
    if (ratio > 0.7) return 'text-2xl'
    if (ratio > 0.5) return 'text-xl'
    if (ratio > 0.3) return 'text-lg'
    return 'text-base'
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="gradient-text text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Topics & Tags
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Exploring software engineering, leadership, and everything in between. Here's what I
            write about.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-dark-card">
              <span className="gradient-text text-xl font-bold">{totalTags}</span>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Topics</span>
            </div>
            {sortedTags.length > 0 && sortedTags[0] && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-dark-card">
                <span className="gradient-text text-xl font-bold">{sortedTags[0]}</span>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Most Popular ({tagCounts[sortedTags[0]] ?? 0} posts)
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="py-12">
          {tagKeys.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">No tags found.</p>
          )}

          {/* Tag Cloud */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {sortedTags.map((t) => {
              const count = tagCounts[t] ?? 0
              const sizeClass = getTagSize(count)
              return (
                <Link
                  key={t}
                  href={`/tags/${slug(t)}`}
                  className={`group inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white px-4 py-2 font-semibold text-gray-700 transition-all hover:border-cyan-500/50 hover:from-cyan-50 hover:to-blue-50 hover:shadow-lg hover:shadow-cyan-500/20 dark:border-gray-700 dark:from-dark-card dark:to-dark-bg dark:text-gray-300 dark:hover:border-cyan-500/50 dark:hover:from-cyan-900/20 dark:hover:to-blue-900/20 ${sizeClass}`}
                  aria-label={`View ${count} posts tagged ${t}`}
                >
                  <span className="transition-colors group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent">
                    {t.split(' ').join('-')}
                  </span>
                  <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-xs font-bold text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-400">
                    {count}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
