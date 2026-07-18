import TrackedNewsletterForm from '@/components/TrackedNewsletterForm'
import TrackedLink from '@/components/TrackedLink'
import { UMAMI_EVENTS } from '@/data/umamiEvents'

/**
 * End-of-post conversion block: newsletter signup + a soft consulting nudge.
 * Rendered on every post so organic search traffic always has a next step.
 */
export default function PostCTA({ slug }: { slug?: string }) {
  return (
    <div className="mt-12 space-y-4">
      {/* Newsletter */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-white to-cyan-50/40 p-6 dark:border-cyan-500/20 dark:from-dark-card dark:to-cyan-950/20 sm:p-8">
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Get new backend posts by email
          </h3>
          <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
            War stories and practical fixes on Node.js, Go, Kafka, and databases — sent when I
            publish. No spam, unsubscribe anytime.
          </p>
          <div className="mt-5">
            <TrackedNewsletterForm title="" />
          </div>
        </div>
      </div>

      {/* Consulting nudge */}
      <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/40 sm:flex-row sm:items-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Dealing with something like this in production?
          </span>{' '}
          I help teams design, scale, and rescue backend systems.
        </p>
        <TrackedLink
          href="/hire-me"
          event={UMAMI_EVENTS.POST_HIRE_CTA_CLICK}
          eventData={{ slug }}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Work with me →
        </TrackedLink>
      </div>
    </div>
  )
}
