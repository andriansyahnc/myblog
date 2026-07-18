import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import ReadingProgress from '@/components/ReadingProgress'
import RelatedPosts from '@/components/RelatedPosts'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Breadcrumb from '@/components/Breadcrumb'
import { formatDate } from 'pliny/utils/formatDate'
import { formatRelativeDate } from '@/utils/formatRelativeDate'
import TrackReadingHistory from '@/components/TrackReadingHistory'
import PostScrollDepthTracker from '@/components/PostScrollDepthTracker'
import { BlogPostingSchema, BreadcrumbListSchema } from '@/components/seo/JsonLd'
import PostCTA from '@/components/PostCTA'

const CalendarIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const ClockIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const TwitterIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
)

const EditIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
)

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const LinkedInIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 17V10.24H6.09V17h2.25zM7.21 9.23a1.3 1.3 0 1 0 0-2.61 1.3 1.3 0 0 0 0 2.61zM18 17v-3.71c0-1.98-.42-3.5-2.74-3.5-1.11 0-1.86.61-2.17 1.19h-.03v-1.01H10.9V17h2.25v-3.35c0-.88.17-1.74 1.26-1.74 1.08 0 1.09 1.01 1.09 1.8V17H18z" />
  </svg>
)

const GitHubIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0 1 12 6.8c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
  </svg>
)

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  posts?: Array<{ title: string; slug: string; tags: string[]; summary?: string }>
  children: ReactNode
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  posts,
  children,
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags, readingTime } = content
  const basePath = path?.split('/')[0] || 'blog'
  const sectionLabel = basePath.charAt(0).toUpperCase() + basePath.slice(1)

  return (
    <>
      <TrackReadingHistory slug={slug} path={path} title={title} date={date} />
      <PostScrollDepthTracker slug={slug} title={title} />
      <BlogPostingSchema post={content} siteUrl={siteMetadata.siteUrl} />
      <BreadcrumbListSchema
        siteUrl={siteMetadata.siteUrl}
        items={[
          { name: 'Home', path: '/' },
          { name: sectionLabel, path: `/${basePath}` },
          { name: title, path: `/${path}` },
        ]}
      />
      <ReadingProgress />
      <SectionContainer>
        <ScrollTopAndComment />
        <article>
          <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
            <header className="animate-fade-in pt-6 xl:pb-6">
              <div className="space-y-6">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/' },
                    { label: sectionLabel, href: `/${basePath}` },
                    { label: title },
                  ]}
                />

                {/* Metadata: Date, Reading Time, Author */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-700 dark:text-gray-400">
                  <time dateTime={date} className="flex items-center gap-1.5">
                    <CalendarIcon />
                    <span title={formatDate(date, siteMetadata.locale)}>
                      {formatRelativeDate(date, siteMetadata.locale)}
                    </span>
                  </time>
                  {readingTime && (
                    <>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <span className="flex items-center gap-1.5">
                        <ClockIcon />
                        {readingTime.text}
                      </span>
                    </>
                  )}
                  {authorDetails.length > 0 && (
                    <>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <div className="flex items-center gap-2">
                        {authorDetails[0]?.avatar && (
                          <Image
                            src={authorDetails[0]?.avatar || ''}
                            width={24}
                            height={24}
                            alt={authorDetails[0]?.name || 'Author avatar'}
                            className="h-6 w-6 rounded-full"
                          />
                        )}
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {authorDetails[0]?.name}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Title */}
                <div className="text-center">
                  <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold leading-tight tracking-tight text-transparent sm:text-4xl md:text-5xl md:leading-tight">
                    {title}
                  </h1>
                </div>

                {/* Tags at top */}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                )}
              </div>
            </header>

            {/* Main Content */}
            <div className="pb-8 pt-10">
              <div className="prose max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-cyan-600 hover:prose-a:text-blue-600 dark:prose-a:text-cyan-400 dark:hover:prose-a:text-blue-400">
                {children}
              </div>

              {/* Conversion CTA: newsletter + consulting nudge */}
              <PostCTA slug={slug} />

              {/* Edit link */}
              <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                <Link
                  href={editUrl(filePath)}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
                >
                  <EditIcon />
                  Edit this page on GitHub
                </Link>
              </div>

              {/* Author Bio Section */}
              {authorDetails.length > 0 && (
                <div className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-700">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
                    About the Author
                  </h3>
                  <div className="space-y-6">
                    {authorDetails.map((author) => (
                      <div key={author.name} className="flex gap-4">
                        {author.avatar && (
                          <div className="flex-shrink-0">
                            <div className="relative">
                              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-75 blur"></div>
                              <Image
                                src={author.avatar}
                                width={80}
                                height={80}
                                alt={author.name}
                                className="relative h-20 w-20 rounded-full border-4 border-white dark:border-gray-800"
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {author.name}
                          </h4>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Backend engineer & tech lead. I write about distributed systems and help
                            teams design, scale, and rescue their backends.
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                            <Link
                              href="/hire-me"
                              className="inline-flex items-center gap-1 font-semibold text-cyan-600 transition-colors hover:text-blue-600 dark:text-cyan-400 dark:hover:text-blue-400"
                            >
                              Work with me →
                            </Link>
                            {author.linkedin && (
                              <Link
                                href={author.linkedin}
                                className="inline-flex items-center gap-1 text-gray-600 transition-colors hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400"
                              >
                                <LinkedInIcon />
                                LinkedIn
                              </Link>
                            )}
                            {author.github && (
                              <Link
                                href={author.github}
                                className="inline-flex items-center gap-1 text-gray-600 transition-colors hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400"
                              >
                                <GitHubIcon />
                                GitHub
                              </Link>
                            )}
                            {author.twitter && (
                              <Link
                                href={author.twitter}
                                className="inline-flex items-center gap-1 text-gray-600 transition-colors hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400"
                              >
                                <TwitterIcon />
                                {author.twitter
                                  .replace('https://twitter.com/', '@')
                                  .replace('https://x.com/', '@')}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation: Prev/Next Articles */}
              {(prev || next) && (
                <div className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-700">
                  <div className="grid gap-4 md:grid-cols-2">
                    {prev && prev.path ? (
                      <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-cyan-400">
                        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          <ChevronLeftIcon />
                          Previous Article
                        </div>
                        <Link
                          href={`/${prev.path}`}
                          className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                        >
                          <div className="line-clamp-2 font-semibold text-gray-900 dark:text-gray-100">
                            {prev.title}
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {next && next.path && (
                      <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-cyan-400">
                        <div className="mb-2 flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                          <ChevronRightIcon />
                        </div>
                        <Link
                          href={`/${next.path}`}
                          className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400"
                        >
                          <div className="line-clamp-2 text-right font-semibold text-gray-900 dark:text-gray-100">
                            {next.title}
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Back to Blog Link */}
              <div className="mt-8 text-center">
                <Link
                  href={`/${basePath}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 transition-all hover:gap-3 hover:text-blue-600 dark:text-cyan-400 dark:hover:text-blue-400"
                  aria-label="Back to the blog"
                >
                  <ArrowLeftIcon />
                  Back to all articles
                </Link>
              </div>

              {/* Related Posts */}
              {posts && posts.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <RelatedPosts currentTags={tags} allPosts={posts} currentSlug={slug} />
                </div>
              )}
            </div>

            {/* Comments */}
            {siteMetadata.comments && (
              <div
                className="border-t border-gray-200 pb-6 pt-6 text-center dark:border-gray-700"
                id="comment"
              >
                <Comments slug={slug} />
              </div>
            )}
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
