'use client'

import { useState, useMemo } from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { useDebounce } from '@/hooks/useDebounce'

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'popular' | 'alphabetical' | 'all'>('popular')
  const [showAll, setShowAll] = useState(false)

  // Debounce search query to prevent re-renders on every keystroke
  const debouncedSearch = useDebounce(searchQuery, 300)

  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => (tagCounts[b] ?? 0) - (tagCounts[a] ?? 0))

  const totalTags = tagKeys.length
  const maxCount = Math.max(...Object.values(tagCounts))

  // Filter tags based on debounced search query
  const filteredTags = useMemo(() => {
    if (!debouncedSearch) return sortedTags
    return sortedTags.filter((tag) => tag.toLowerCase().includes(debouncedSearch.toLowerCase()))
  }, [debouncedSearch, sortedTags])

  // Get top tags (top 12)
  const topTags = sortedTags.slice(0, 12)

  // Group tags alphabetically
  const groupedTags = useMemo(() => {
    const groups: Record<string, string[]> = {}
    const tagsToGroup = debouncedSearch ? filteredTags : sortedTags

    tagsToGroup.forEach((tag) => {
      const firstLetter = tag[0]?.toUpperCase() || '#'
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(tag)
    })
    return groups
  }, [filteredTags, sortedTags, debouncedSearch])

  // Determine which tags to display
  const displayTags = useMemo(() => {
    if (debouncedSearch) return filteredTags

    switch (viewMode) {
      case 'popular':
        return showAll ? sortedTags : topTags
      case 'alphabetical':
        return null // Will use groupedTags
      case 'all':
        return filteredTags
      default:
        return topTags
    }
  }, [viewMode, showAll, filteredTags, sortedTags, topTags, searchQuery])

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold leading-9 tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Topics & Tags
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Exploring software engineering, leadership, and everything in between. Here's what I
            write about.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-xl font-bold text-transparent">
                {totalTags}
              </span>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Topics</span>
            </div>
            {sortedTags.length > 0 && sortedTags[0] && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-xl font-bold text-transparent">
                  {sortedTags[0]}
                </span>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Most Popular ({tagCounts[sortedTags[0]] ?? 0} posts)
                </span>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="relative pt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-11 text-base transition-all focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-400"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* View Mode Toggle */}
          {!searchQuery && (
            <div className="flex flex-wrap gap-2 pt-4">
              <button
                onClick={() => {
                  setViewMode('popular')
                  setShowAll(false)
                }}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-gray-900 ${
                  viewMode === 'popular'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'border border-gray-300 bg-white text-gray-700 hover:border-cyan-500 hover:text-cyan-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-cyan-400 dark:hover:text-cyan-400'
                }`}
              >
                Popular
              </button>
              <button
                onClick={() => setViewMode('alphabetical')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-gray-900 ${
                  viewMode === 'alphabetical'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'border border-gray-300 bg-white text-gray-700 hover:border-cyan-500 hover:text-cyan-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-cyan-400 dark:hover:text-cyan-400'
                }`}
              >
                Alphabetical
              </button>
              <button
                onClick={() => setViewMode('all')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-gray-900 ${
                  viewMode === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'border border-gray-300 bg-white text-gray-700 hover:border-cyan-500 hover:text-cyan-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-cyan-400 dark:hover:text-cyan-400'
                }`}
              >
                All Tags
              </button>
            </div>
          )}
        </div>

        <div className="py-12">
          {filteredTags.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No tags found matching "{searchQuery}"
            </p>
          )}

          {/* Popular Tags View */}
          {!searchQuery && viewMode === 'popular' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {showAll ? 'All Tags by Popularity' : 'Top Tags'}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayTags?.map((t) => {
                  const count = tagCounts[t] ?? 0
                  return (
                    <Link
                      key={t}
                      href={`/tags/${slug(t)}`}
                      className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-cyan-500 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-400 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-gray-900"
                      aria-label={`View ${count} posts tagged ${t}`}
                    >
                      <span className="font-medium text-gray-900 transition-colors group-hover:text-cyan-600 dark:text-gray-100 dark:group-hover:text-cyan-400">
                        {t.split(' ').join('-')}
                      </span>
                      <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-400">
                        {count}
                      </span>
                    </Link>
                  )
                })}
              </div>
              {!showAll && viewMode === 'popular' && sortedTags.length > 12 && (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={() => setShowAll(true)}
                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all hover:border-cyan-500 hover:text-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-cyan-400 dark:hover:text-cyan-400 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-gray-900"
                  >
                    View All {sortedTags.length} Tags
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Alphabetical View */}
          {(viewMode === 'alphabetical' || (searchQuery && filteredTags.length > 0)) && (
            <div className="space-y-8">
              {Object.keys(groupedTags)
                .sort()
                .map((letter) => (
                  <div key={letter}>
                    <h2 className="mb-4 text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                      {letter}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {groupedTags[letter]?.map((t) => {
                        const count = tagCounts[t] ?? 0
                        return (
                          <Link
                            key={t}
                            href={`/tags/${slug(t)}`}
                            className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-cyan-500 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-400 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-gray-900"
                            aria-label={`View ${count} posts tagged ${t}`}
                          >
                            <span className="font-medium text-gray-900 transition-colors group-hover:text-cyan-600 dark:text-gray-100 dark:group-hover:text-cyan-400">
                              {t.split(' ').join('-')}
                            </span>
                            <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-400">
                              {count}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* All Tags View */}
          {!searchQuery && viewMode === 'all' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">All Tags</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayTags?.map((t) => {
                  const count = tagCounts[t] ?? 0
                  return (
                    <Link
                      key={t}
                      href={`/tags/${slug(t)}`}
                      className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-cyan-500 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-400 dark:focus-visible:ring-cyan-400 dark:focus-visible:ring-offset-gray-900"
                      aria-label={`View ${count} posts tagged ${t}`}
                    >
                      <span className="font-medium text-gray-900 transition-colors group-hover:text-cyan-600 dark:text-gray-100 dark:group-hover:text-cyan-400">
                        {t.split(' ').join('-')}
                      </span>
                      <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-400">
                        {count}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
