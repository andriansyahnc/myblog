import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from '@/components/Image'
import TechStack from '@/components/TechStack'
import projectsData from '@/data/projectsData'
// import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 3

const STATS = [
  { value: '15+', label: 'Years Experience' },
  { value: '25+', label: 'Microservices Built' },
  { value: '10', label: 'Team Size Led' },
  { value: '180K+', label: 'Users Served' },
]

const FEATURED_WORK = projectsData
  .filter((p) => p.category === 'work' || p.category === 'consulting')
  .slice(0, 3)

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
            className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-semibold text-white transition-all duration-200 hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg hover:shadow-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-white"
          >
            Get in Touch
          </Link>
          <Link
            href="/projects"
            className="rounded-full border-2 border-cyan-500 bg-transparent px-8 py-3 font-semibold text-cyan-500 transition-all duration-200 hover:bg-cyan-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-gray-900 dark:focus:ring-offset-gray-950"
          >
            View Projects
          </Link>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-14">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="gradient-text text-3xl font-extrabold">{stat.value}</div>
              <div className="mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <TechStack />
      </div>

      {/* Featured Work Section */}
      <section className="border-t border-gray-200 py-16 dark:border-gray-700">
        <div className="space-y-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              <span className="gradient-text">Featured Work</span>
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded px-2 py-1 text-sm font-semibold text-cyan-600 transition-all duration-200 hover:gap-3 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-cyan-400"
              aria-label="View all projects"
            >
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                View All
              </span>
              <span className="text-cyan-500 dark:text-cyan-400">→</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURED_WORK.map((work) => (
              <div
                key={work.title}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 dark:border-gray-800 dark:bg-gradient-to-br dark:from-dark-card dark:to-dark-bg dark:hover:border-cyan-500/30"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                    {work.role}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{work.period}</span>
                </div>

                <h3 className="mb-2 text-base font-bold leading-snug text-gray-900 transition-colors group-hover:text-cyan-600 dark:text-gray-100 dark:group-hover:text-cyan-400">
                  {work.href ? (
                    <Link href={work.href} target="_blank" rel="noopener noreferrer">
                      {work.title}
                    </Link>
                  ) : (
                    work.title
                  )}
                </h3>

                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {work.description}
                </p>

                {work.impact && (
                  <p className="mb-3 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    💡 {work.impact}
                  </p>
                )}

                {work.techStack && (
                  <div className="flex flex-wrap gap-1.5">
                    {work.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {work.techStack.length > 4 && (
                      <span className="text-xs text-gray-400">+{work.techStack.length - 4}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="border-t border-gray-200 py-16 dark:border-gray-700">
        <div className="space-y-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              <span className="gradient-text">Latest Posts</span>
            </h2>
            {posts.length > MAX_DISPLAY && (
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded px-2 py-1 text-sm font-semibold text-cyan-600 transition-all duration-200 hover:gap-3 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-cyan-400"
                aria-label="View all articles"
              >
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  View All
                </span>
                <span className="text-cyan-500 dark:text-cyan-400">→</span>
              </Link>
            )}
          </div>

          <ul className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
            {!posts.length && <p className="text-gray-400">No posts found.</p>}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <li key={slug} className="group flex flex-col">
                  <Link
                    href={`/blog/${slug}`}
                    className="flex h-full flex-col rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <article className="h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-gray-50/50 hover:shadow-lg hover:shadow-cyan-500/20 dark:border-gray-800 dark:bg-gradient-to-br dark:from-dark-card dark:to-dark-bg dark:hover:border-cyan-500/30 dark:hover:shadow-cyan-500/10">
                      <div className="flex h-full flex-col space-y-4">
                        <time className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                        <h3 className="group-hover:gradient-text text-lg font-bold leading-snug text-gray-900 transition-all dark:text-gray-50">
                          {title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {tags?.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
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
      </section>

      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">{/*<NewsletterForm />*/}</div>
      )}
    </>
  )
}
