import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from '@/components/Image'
import { SiNodedotjs, SiNestjs, SiDrupal, SiPhp, SiMysql } from 'react-icons/si'
// import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 3

interface Post {
  slug: string
  date: string
  title: string
  summary?: string
  tags?: string[]
}

interface HomeProps {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      {/* Hero Section */}
      <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-8 py-12 text-center">
        {/* Avatar with gradient background */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 opacity-50 blur-2xl"></div>
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
            <Image
              src="/static/images/avatar.jpeg"
              alt={siteMetadata.author}
              width={160}
              height={160}
              className="object-cover"
              priority
              quality={90}
            />
          </div>
        </div>

        {/* Hero heading */}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            I do code and
            <br />
            make content <span className="gradient-text">about it!</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
            {siteMetadata.description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/about"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold text-white transition-all hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg hover:shadow-cyan-500/50"
          >
            Get in Touch
          </Link>
          <Link
            href="/projects"
            className="rounded-full border-2 border-cyan-500 bg-transparent px-8 py-3 font-semibold text-cyan-500 transition-all hover:bg-cyan-500 hover:text-white dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-gray-900"
          >
            View Projects
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="pt-12">
          <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Experience With
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Node.js */}
            <div className="group flex flex-col items-center gap-2 transition-all">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-br from-dark-card to-dark-bg transition-all group-hover:border-green-500/30 group-hover:shadow-lg group-hover:shadow-green-500/10">
                <SiNodedotjs className="h-10 w-10 text-green-500" />
              </div>
              <span className="text-xs text-gray-400">Node.js</span>
            </div>

            {/* NestJS */}
            <div className="group flex flex-col items-center gap-2 transition-all">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-br from-dark-card to-dark-bg transition-all group-hover:border-pink-500/30 group-hover:shadow-lg group-hover:shadow-pink-500/10">
                <SiNestjs className="h-10 w-10 text-pink-500" />
              </div>
              <span className="text-xs text-gray-400">NestJS</span>
            </div>

            {/* Drupal */}
            <div className="group flex flex-col items-center gap-2 transition-all">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-br from-dark-card to-dark-bg transition-all group-hover:border-blue-400/30 group-hover:shadow-lg group-hover:shadow-blue-400/10">
                <SiDrupal className="h-10 w-10 text-blue-400" />
              </div>
              <span className="text-xs text-gray-400">Drupal</span>
            </div>

            {/* PHP */}
            <div className="group flex flex-col items-center gap-2 transition-all">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-br from-dark-card to-dark-bg transition-all group-hover:border-indigo-400/30 group-hover:shadow-lg group-hover:shadow-indigo-400/10">
                <SiPhp className="h-10 w-10 text-indigo-400" />
              </div>
              <span className="text-xs text-gray-400">PHP</span>
            </div>

            {/* MySQL */}
            <div className="group flex flex-col items-center gap-2 transition-all">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-gray-800 bg-gradient-to-br from-dark-card to-dark-bg transition-all group-hover:border-amber-500/30 group-hover:shadow-lg group-hover:shadow-amber-500/10">
                <SiMysql className="h-10 w-10 text-amber-500" />
              </div>
              <span className="text-xs text-gray-400">MySQL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className="space-y-8 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="gradient-text">Latest Posts</span>
          </h2>
          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
              aria-label="All posts"
            >
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                View All
              </span>
              <span className="text-cyan-500">→</span>
            </Link>
          )}
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!posts.length && <p className="text-gray-400">No posts found.</p>}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="group">
                <Link href={`/blog/${slug}`}>
                  <article className="h-full rounded-2xl border border-gray-300 bg-gray-50 p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-white hover:shadow-lg hover:shadow-cyan-500/20 dark:border-gray-800 dark:bg-gradient-to-br dark:from-dark-card dark:to-dark-bg dark:hover:border-cyan-500/30 dark:hover:shadow-cyan-500/10">
                    <div className="flex h-full flex-col space-y-3">
                      <time className="text-xs font-medium text-gray-500 dark:text-gray-500">
                        {formatDate(date, siteMetadata.locale)}
                      </time>
                      <h3 className="group-hover:gradient-text text-xl font-bold leading-tight text-gray-900 transition-all dark:text-gray-50">
                        {title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-600 dark:text-cyan-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="line-clamp-3 flex-1 text-sm text-gray-600 dark:text-gray-400">
                        {summary}
                      </p>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 transition-all group-hover:gap-3 dark:text-cyan-400">
                        Read more <span>→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">{/*<NewsletterForm />*/}</div>
      )}
    </>
  )
}
