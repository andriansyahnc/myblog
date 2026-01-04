import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'

export const metadata = genPageMetadata({
  title: 'Playground',
  description:
    'Interactive tools and live demonstrations - JSON beautifier, formatters, and developer utilities',
})

const liveProjects = [
  {
    title: 'JSON Beautifier',
    description: 'Format, validate, and beautify JSON data with syntax highlighting',
    href: '/playground/json-beautifier',
    icon: '📝',
    status: 'active',
    tags: ['JSON', 'Formatter', 'Developer Tools'],
  },
  {
    title: 'Coming Soon',
    description: 'More interactive tools and live projects coming soon...',
    href: '#',
    icon: '🚀',
    status: 'planned',
    tags: ['Upcoming'],
  },
]

export default function LiveProjects() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold leading-9 tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Playground
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Interactive tools and live demonstrations of various projects and utilities
        </p>
      </div>

      <div className="container py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {liveProjects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className={`group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 ${
                project.status === 'planned'
                  ? 'cursor-not-allowed opacity-60'
                  : 'hover:border-cyan-500 dark:hover:border-cyan-400'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-2xl">
                  {project.icon}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.status === 'active' && (
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-cyan-600 dark:text-cyan-400">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
                      </span>
                      Live & Active
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
