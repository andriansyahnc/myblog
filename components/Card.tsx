'use client'

import { useRef, useEffect } from 'react'
import Image from './Image'
import Link from './Link'
import { memo } from 'react'

// Singleton IntersectionObserver shared across all Card instances
let sharedObserver: IntersectionObserver | null = null
const observerCallbacks = new Map<Element, () => void>()

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined') return null
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observerCallbacks.get(entry.target)?.()
            observerCallbacks.delete(entry.target)
            sharedObserver?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
  }
  return sharedObserver
}

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
  role?: string
  period?: string
  techStack?: string[]
  impact?: string
}

const Card = ({ title, description, imgSrc, href, role, period, techStack, impact }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const observer = getSharedObserver()
    if (!observer) return
    observerCallbacks.set(el, () => el.classList.add('animate-in'))
    observer.observe(el)
    return () => {
      observerCallbacks.delete(el)
      observer.unobserve(el)
    }
  }, [])

  return (
    <div ref={cardRef} className="group flex flex-col opacity-0">
      <div
        className={`${
          imgSrc && 'flex flex-col'
        } h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 focus-within:ring-2 focus-within:ring-cyan-500 hover:border-cyan-500/50 hover:bg-gray-50/50 hover:shadow-lg hover:shadow-cyan-500/20 dark:border-gray-800 dark:bg-gradient-to-br dark:from-dark-card dark:to-dark-bg dark:hover:border-cyan-500/30 dark:hover:shadow-cyan-500/10`}
      >
        {imgSrc &&
          (href ? (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className="flex-shrink-0 overflow-hidden"
            >
              <Image
                alt={title}
                src={imgSrc}
                className="w-full object-cover object-top transition-transform duration-300 group-hover:scale-105 md:h-60 lg:h-96"
                width={544}
                height={1000}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="w-full flex-shrink-0 object-cover object-top md:h-60 lg:h-96"
              width={544}
              height={1000}
            />
          ))}
        <div className="flex flex-1 flex-col space-y-4 p-6">
          {(role || period) && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              {role && (
                <span className="rounded-full bg-cyan-100 px-3 py-1 font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                  {role}
                </span>
              )}
              {period && <span className="text-gray-500 dark:text-gray-400">{period}</span>}
            </div>
          )}
          <h2 className="text-xl font-bold leading-snug tracking-tight">
            {href ? (
              <Link
                href={href}
                aria-label={`Link to ${title}`}
                className="rounded px-1 text-gray-900 transition-all hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-gray-50 dark:hover:text-cyan-400"
              >
                {title}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-50">{title}</span>
            )}
          </h2>
          <p className="flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {description}
          </p>
          {impact && (
            <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">💡 {impact}</p>
          )}
          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          {href && (
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded px-1 text-base font-semibold text-cyan-600 transition-all hover:gap-3 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-cyan-400"
              aria-label={`Link to ${title}`}
            >
              Learn more
              <span>→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

Card.displayName = 'Card'
export default memo(Card)
