import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'
import TrackedLink from '@/components/TrackedLink'
import JsonLd from '@/components/seo/JsonLd'
import siteMetadata from '@/data/siteMetadata'
import { UMAMI_EVENTS } from '@/data/umamiEvents'
import { SiNodedotjs, SiGo, SiTypescript } from 'react-icons/si'
import { MdArchitecture, MdGroups, MdStream } from 'react-icons/md'

export const metadata: Metadata = genPageMetadata({
  title: 'Hire Me',
  path: '/hire-me',
  description:
    'Backend engineering consulting — microservices, APIs, Node.js, Go, TypeScript. 15+ years experience.',
})

// Proof points pulled from real engagements (see /about and /experience).
const RESULTS = [
  'Cut API response times by up to 80% on high-traffic services',
  'Migrated critical services with zero downtime — no 3am emergencies',
  'Led teams of 10+ engineers through complex, deadline-driven delivery',
  'Built 25+ production microservices handling millions of requests',
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Backend Engineering Consulting — M Andriansyah Nurcahya (NC)',
  description:
    'Backend engineering consulting: microservices and API design, system architecture review, and team/code review in Node.js, Go, and TypeScript.',
  url: `${siteMetadata.siteUrl}/hire-me`,
  provider: {
    '@type': 'Person',
    name: siteMetadata.author,
    url: `${siteMetadata.siteUrl}/about`,
  },
  areaServed: 'Worldwide',
}

const SERVICES = [
  {
    icon: SiNodedotjs,
    title: 'Microservices & API Design',
    description:
      'Build and scale distributed backends in Node.js, TypeScript, and Go. Event-driven architecture, Kafka, REST, and gRPC.',
  },
  {
    icon: MdArchitecture,
    title: 'System Architecture Review',
    description:
      'Audit your existing architecture, identify bottlenecks, and produce an actionable improvement roadmap.',
  },
  {
    icon: MdStream,
    title: 'Backend Consulting',
    description:
      'Hourly sessions to unblock your team — database design, performance issues, scaling strategy, or tricky implementation problems.',
  },
  {
    icon: MdGroups,
    title: 'Code & Team Review',
    description:
      'Deep-dive code reviews and engineering process improvements for teams wanting to level up quality and velocity.',
  },
]

const STATS = [
  { value: '15+', label: 'Years Experience' },
  { value: '25+', label: 'Microservices Built' },
  { value: '10', label: 'Team Size Led' },
  { value: '180K+', label: 'Platform Users Supported' },
]

export default function HireMe() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Header */}
        <div className="space-y-6 pb-10 pt-8 md:space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            Limited availability · Open to the right project
          </span>

          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold leading-tight tracking-tight text-transparent sm:text-4xl md:text-6xl">
              Work With Me
            </h1>
            <p className="max-w-2xl text-lg leading-7 text-gray-600 dark:text-gray-400">
              Backend engineer with 15+ years building distributed systems that scale. I help teams
              ship reliable microservices, untangle gnarly architectures, and move faster with
              confidence.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[SiNodedotjs, SiGo, SiTypescript].map((Icon, i) => (
                <Icon key={i} className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ))}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Node.js · Go · TypeScript · MongoDB · Kafka · PostgreSQL
              </span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="py-10">
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
            What I can help with
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
              >
                <service.icon className="mb-3 h-7 w-7 text-cyan-500" />
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Proof / Selected results */}
        <div className="py-10">
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-gray-100">
            Selected results
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {RESULTS.map((result) => (
              <li
                key={result}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-300"
              >
                <span className="mt-0.5 text-cyan-500" aria-hidden="true">
                  ✓
                </span>
                <span>{result}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-cyan-500">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="py-10">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Let&apos;s work together
              </h2>
              <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
                Book a free 30-minute intro call and tell me what you&apos;re building or where
                things are stuck.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <TrackedLink
                href={siteMetadata.booking}
                event={UMAMI_EVENTS.HIRE_ME_CTA_CLICK}
                eventData={{ source: 'booking' }}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                📅 Book a call →
              </TrackedLink>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                or email{' '}
                <TrackedLink
                  href={`mailto:${siteMetadata.email}`}
                  event={UMAMI_EVENTS.HIRE_ME_CTA_CLICK}
                  eventData={{ source: 'email' }}
                  className="font-medium text-cyan-600 underline underline-offset-2 hover:text-cyan-500 dark:text-cyan-400"
                >
                  {siteMetadata.email}
                </TrackedLink>
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Prefer to hire through a platform? You can also{' '}
              <TrackedLink
                href={siteMetadata.upwork}
                event={UMAMI_EVENTS.HIRE_ME_CTA_CLICK}
                eventData={{ source: 'upwork' }}
                className="font-medium text-cyan-600 underline underline-offset-2 hover:text-cyan-500 dark:text-cyan-400"
              >
                work with me on Upwork
              </TrackedLink>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
