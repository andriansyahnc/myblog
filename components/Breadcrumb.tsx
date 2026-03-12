import Link from '@/components/Link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="focus-ring rounded text-gray-700 transition-colors hover:text-cyan-600 dark:text-gray-200 dark:hover:text-cyan-400"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={isLast ? 'font-medium text-gray-900 dark:text-gray-100' : ''}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-gray-400 dark:text-gray-600">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
