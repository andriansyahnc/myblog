'use client'

import projectsData from '@/data/projectsData'
import Link from '@/components/Link'

type ProjectEntry = (typeof projectsData)[number]
type Category = 'work' | 'consulting' | 'client'

type CompanyGroup = {
  company: string
  companyHref?: string
  period: string
  category: Category
  entries: ProjectEntry[]
}

const CATEGORY_BADGE: Record<Category, { label: string; className: string }> = {
  work: {
    label: 'Employment',
    className: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  },
  consulting: {
    label: 'Consulting',
    className: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  },
  client: {
    label: 'Freelance',
    className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
}

// Group all entries by company, preserving insertion order
const companies: CompanyGroup[] = []
const seen = new Map<string, CompanyGroup>()

for (const item of projectsData) {
  const key = item.company || item.title
  if (!seen.has(key)) {
    const group: CompanyGroup = {
      company: key,
      companyHref: item.href,
      period: item.period ?? '',
      category: (item.category ?? 'work') as Category,
      entries: [],
    }
    seen.set(key, group)
    companies.push(group)
  }
  seen.get(key)!.entries.push(item)
}

// Compute combined period for multi-entry companies
for (const group of companies) {
  if (group.entries.length > 1) {
    const periods = group.entries.map((e) => e.period ?? '').filter(Boolean)
    const starts = periods.map((p) => p.split(' - ')[0])
    const ends = periods.map((p) => p.split(' - ')[1] ?? p.split(' - ')[0])
    const earliest = starts.sort()[0]
    const latest = ends.includes('Present') ? 'Present' : ends.sort().reverse()[0]
    group.period = `${earliest} - ${latest}`
  }
}

function PositionEntry({ item }: { item: ProjectEntry }) {
  return (
    <div>
      <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">{item.role}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {item.description}
      </p>
      {item.impact && (
        <p className="mt-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
          💡 {item.impact}
        </p>
      )}
      {item.techStack && item.techStack.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {item.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function WorkTimeline() {
  return (
    <div className="relative mt-2">
      {/* Vertical line */}
      <div className="absolute bottom-0 left-4 top-2 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-blue-600 md:left-5" />

      <ol className="space-y-10">
        {companies.map((group, index) => {
          const badge = CATEGORY_BADGE[group.category]
          return (
            <li key={group.company} className="relative flex gap-6 pl-12 md:pl-14">
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-white shadow-md shadow-cyan-500/30 md:h-10 md:w-10">
                {companies.length - index}
              </div>

              {/* Company card */}
              <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-cyan-500/50 hover:shadow-md hover:shadow-cyan-500/10 dark:border-gray-700 dark:bg-gray-800/60 dark:hover:border-cyan-500/30">
                {/* Company header */}
                <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                      {group.companyHref ? (
                        <Link
                          href={group.companyHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-cyan-600 dark:hover:text-cyan-400"
                        >
                          {group.company}
                        </Link>
                      ) : (
                        group.company
                      )}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    {group.period}
                  </span>
                </div>

                {group.entries.length === 1 ? (
                  <PositionEntry item={group.entries[0]!} />
                ) : (
                  <div className="space-y-4">
                    {group.entries.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-lg border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-600 dark:bg-gray-700/30"
                      >
                        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {item.href ? (
                              <Link
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-cyan-600 dark:hover:text-cyan-400"
                              >
                                {item.title}
                              </Link>
                            ) : (
                              item.title
                            )}
                          </h4>
                          <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                            {item.period}
                          </span>
                        </div>
                        <PositionEntry item={item} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
