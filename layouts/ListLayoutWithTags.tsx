/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav aria-label="Pagination" className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto opacity-50" disabled aria-disabled="true">
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span aria-current="page">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto opacity-50" disabled aria-disabled="true">
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => (tagCounts[b] ?? 0) - (tagCounts[a] ?? 0))
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState('')

  // When filters are active, show all posts; otherwise use paginated posts
  const hasActiveFilters = selectedTags.length > 0 || searchValue !== ''
  const displayPosts = hasActiveFilters
    ? posts
    : initialDisplayPosts.length > 0
      ? initialDisplayPosts
      : posts

  const filteredPosts = displayPosts.filter((post) => {
    const searchContent = post.title + post.summary + (post.tags?.join(' ') || '')
    const matchesSearch = searchContent.toLowerCase().includes(searchValue.toLowerCase())
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => post.tags?.map((t) => slug(t)).includes(tag))
    return matchesSearch && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSelectedTags([])
    setSearchValue('')
  }

  return (
    <>
      <div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold leading-9 tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Technical writings, tutorials, and thoughts on software development
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800/50">
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {filteredPosts.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {selectedTags.length > 0 || searchValue ? 'Filtered' : 'Total'}
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800/50">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {tagKeys.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Topics</div>
            </div>
          </div>
        </div>

        {/* Collapsible Filters */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <div className="flex items-center gap-3">
              <svg
                className="h-5 w-5 text-cyan-600 dark:text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Filters
                {(selectedTags.length > 0 || searchValue) && (
                  <span className="ml-2 text-sm text-cyan-600 dark:text-cyan-400">
                    ({selectedTags.length + (searchValue ? 1 : 0)} active)
                  </span>
                )}
              </span>
            </div>
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform ${filtersOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {filtersOpen && (
            <div className="border-t border-gray-200 p-4 dark:border-gray-700">
              {/* Search */}
              <div className="mb-4">
                <label
                  htmlFor="search"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Search
                </label>
                <input
                  id="search"
                  type="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                />
              </div>

              {/* Tags */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filter by Topics
                  </span>
                  {(selectedTags.length > 0 || searchValue) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-cyan-600 hover:text-blue-600 dark:text-cyan-400 dark:hover:text-blue-400"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {sortedTags.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleTag(slug(t))}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800 ${
                        selectedTags.includes(slug(t))
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                          : 'border border-gray-300 bg-white text-gray-700 hover:border-cyan-500 hover:text-cyan-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:border-cyan-400 dark:hover:text-cyan-400'
                      }`}
                    >
                      {t} ({tagCounts[t]})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Grid Layout */}
        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center">
            <svg
              className="mx-auto mb-4 h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg text-gray-600 dark:text-gray-400">No articles found</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPosts.map((post) => {
              const { path, date, title, summary, tags, readingTime } = post
              return (
                <article
                  key={path}
                  className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:border-cyan-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-cyan-400"
                >
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      {readingTime && (
                        <>
                          <span>•</span>
                          <span>{readingTime.text}</span>
                        </>
                      )}
                    </div>
                    <h2 className="mb-3 line-clamp-2 text-xl font-bold leading-tight">
                      <Link
                        href={`/${path}`}
                        className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent transition-all group-hover:from-cyan-600 group-hover:to-blue-600 dark:from-gray-100 dark:to-gray-300 dark:group-hover:from-cyan-400 dark:group-hover:to-blue-400"
                      >
                        {title}
                      </Link>
                    </h2>
                    <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-600 dark:text-gray-400">
                      {summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tags?.slice(0, 3).map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                      {tags && tags.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {!hasActiveFilters && pagination && pagination.totalPages > 1 && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
      <ScrollTopAndComment />
    </>
  )
}
