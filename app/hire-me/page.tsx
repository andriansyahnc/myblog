import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { SiNodedotjs, SiGo, SiTypescript } from 'react-icons/si'
import { MdArchitecture, MdGroups, MdStream } from 'react-icons/md'

export const metadata: Metadata = genPageMetadata({
  title: 'Hire Me',
  path: '/hire-me',
  description:
    'Backend engineering consulting — microservices, APIs, Node.js, Go, TypeScript. 15+ years experience.',
})

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
  { value: '180K+', label: 'Users Served' },
]

export default function HireMe() {
  return (
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

      {/* CTA + Stats */}
      <div className="py-10">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Let&apos;s work together
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="https://www.upwork.com/freelancers/~019f0231bf928ca773"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
            >
              View my Upwork profile →
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              or email me at{' '}
              <a
                href={`mailto:${siteMetadata.email}`}
                className="font-medium text-cyan-600 underline underline-offset-2 hover:text-cyan-500 dark:text-cyan-400"
              >
                {siteMetadata.email}
              </a>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-cyan-500">{stat.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
