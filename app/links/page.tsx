import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'
import Image from '@/components/Image'
import TrackedLink from '@/components/TrackedLink'
import TrackedNewsletterForm from '@/components/TrackedNewsletterForm'
import siteMetadata from '@/data/siteMetadata'
import { UMAMI_EVENTS } from '@/data/umamiEvents'

export const metadata: Metadata = genPageMetadata({
  title: 'Links',
  path: '/links',
  description:
    'Everything from M Andriansyah Nurcahya (NC) in one place — blog, consulting, newsletter, and socials.',
})

// Primary destinations, shown as full-width buttons.
const PRIMARY_LINKS = [
  { href: '/blog', label: '📝 Read the blog', target: 'blog' },
  { href: '/hire-me', label: '🤝 Work with me', target: 'hire-me' },
  { href: siteMetadata.booking, label: '📅 Book a 30-min call', target: 'booking' },
]

// A few flagship posts worth surfacing to first-time visitors.
const FEATURED_POSTS = [
  {
    href: '/blog/introduction-to-asynclocalstorage-beginner-guide',
    label: 'A beginner’s guide to AsyncLocalStorage in Node.js',
    target: 'post-asynclocalstorage',
  },
  {
    href: '/blog/kafkajs-graceful-shutdown',
    label: 'KafkaJS graceful shutdown: a clean exit for your consumers',
    target: 'post-kafkajs-shutdown',
  },
  {
    href: '/blog/setting-mongodb-unit-tests-mongodb-memory-server-seamless-testing',
    label: 'MongoDB unit tests with mongodb-memory-server',
    target: 'post-mongodb-testing',
  },
]

const SOCIAL_LINKS = [
  { href: siteMetadata.github, label: 'GitHub', target: 'github' },
  { href: siteMetadata.linkedin, label: 'LinkedIn', target: 'linkedin' },
  { href: siteMetadata.twitter, label: 'X / Twitter', target: 'twitter' },
  { href: siteMetadata.instagram, label: 'Instagram', target: 'instagram' },
  { href: siteMetadata.drupal, label: 'Drupal.org', target: 'drupal' },
  { href: `mailto:${siteMetadata.email}`, label: 'Email', target: 'email' },
]

const primaryButtonClass =
  'flex w-full items-center justify-center rounded-xl border border-cyan-500/30 bg-white px-6 py-4 text-center font-semibold text-gray-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-cyan-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:bg-gray-800/60 dark:text-gray-100 dark:focus:ring-offset-gray-950'

const secondaryButtonClass =
  'flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-left text-sm text-gray-700 transition-all hover:border-cyan-500/60 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-300 dark:hover:text-cyan-400 dark:focus:ring-offset-gray-950'

export default function LinksPage() {
  return (
    <div className="mx-auto max-w-lg py-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4 h-24 w-24">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 opacity-50 blur-xl" />
          <Image
            src="/static/images/avatar.jpeg"
            alt={siteMetadata.author}
            width={96}
            height={96}
            className="relative h-24 w-24 rounded-full border-4 border-cyan-500/30 object-cover"
            priority
          />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
          M Andriansyah Nurcahya <span className="text-gray-400">(NC)</span>
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Backend engineer &amp; tech lead. Distributed systems, Node.js, Go, Kafka — and helping
          teams ship reliable backends.
        </p>
      </div>

      {/* Primary links */}
      <div className="mt-8 space-y-3">
        {PRIMARY_LINKS.map((link) => (
          <TrackedLink
            key={link.target}
            href={link.href}
            event={UMAMI_EVENTS.LINKS_CLICK}
            eventData={{ target: link.target }}
            className={primaryButtonClass}
          >
            {link.label}
          </TrackedLink>
        ))}
      </div>

      {/* Newsletter */}
      <div className="mt-6 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-white to-cyan-50/40 p-5 dark:border-cyan-500/20 dark:from-dark-card dark:to-cyan-950/20">
        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
          Get new backend posts by email
        </h2>
        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
          War stories and practical fixes when I publish. No spam.
        </p>
        <div className="mt-4">
          <TrackedNewsletterForm title="" />
        </div>
      </div>

      {/* Featured posts */}
      <div className="mt-6 space-y-2.5">
        <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Start here
        </h2>
        {FEATURED_POSTS.map((post) => (
          <TrackedLink
            key={post.target}
            href={post.href}
            event={UMAMI_EVENTS.LINKS_CLICK}
            eventData={{ target: post.target }}
            className={secondaryButtonClass}
          >
            <span>{post.label}</span>
            <span aria-hidden="true" className="ml-3 text-cyan-500">
              →
            </span>
          </TrackedLink>
        ))}
      </div>

      {/* Socials */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {SOCIAL_LINKS.map((social) => (
          <TrackedLink
            key={social.target}
            href={social.href}
            event={UMAMI_EVENTS.LINKS_CLICK}
            eventData={{ target: social.target }}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-cyan-500/60 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:border-gray-700 dark:text-gray-400 dark:hover:text-cyan-400 dark:focus:ring-offset-gray-950"
          >
            {social.label}
          </TrackedLink>
        ))}
      </div>
    </div>
  )
}
