'use client'

import { ReactNode, useState, useEffect } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

const sections = [
  { id: 'about', label: 'About', icon: '👋' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'skills', label: 'Skills', icon: '🛠️' },
  { id: 'contact', label: 'Contact', icon: '📧' },
]

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github, drupal, stats } =
    content

  const [activeSection, setActiveSection] = useState('about')
  const [isScrolling, setIsScrolling] = useState(false)

  // Update active section based on scroll position using IntersectionObserver
  useEffect(() => {
    if (isScrolling) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio and position
          const mostVisible = visibleEntries.reduce((prev, current) => {
            if (current.intersectionRatio > prev.intersectionRatio) return current
            if (current.intersectionRatio === prev.intersectionRatio) {
              // If ratios are equal, prefer the one higher on the page
              return current.boundingClientRect.top < prev.boundingClientRect.top ? current : prev
            }
            return prev
          })
          setActiveSection(mostVisible.target.id)
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-100px 0px -50% 0px',
      }
    )

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [isScrolling])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setIsScrolling(true)

    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })

      // Re-enable scroll detection after animation completes
      setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Hero Section */}
        <div className="space-y-4 pb-8 pt-6 md:space-y-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {avatar && (
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-75 blur"></div>
                <Image
                  src={avatar}
                  alt="avatar"
                  width={160}
                  height={160}
                  className="relative h-40 w-40 rounded-full ring-4 ring-white dark:ring-gray-800"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                {name}
              </h1>
              <p className="mt-2 text-xl font-semibold text-cyan-600 dark:text-cyan-400">
                {occupation}
              </p>
              <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">{company}</p>

              {/* Social Links */}
              <div className="mt-4 flex justify-center gap-3 md:justify-start">
                <SocialIcon kind="mail" href={`mailto:${email}`} />
                <SocialIcon kind="github" href={github} />
                <SocialIcon kind="linkedin" href={linkedin} />
                <SocialIcon kind="twitter" href={twitter} />
                <SocialIcon kind="drupal" href={drupal} />
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <a
                  href="/static/cv.pdf"
                  download="Andriansyah-CV.pdf"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/50 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download CV
                </a>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-cyan-500 hover:text-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact Me
                </a>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 gap-4 pt-6 md:grid-cols-4">
              {stats.map((stat: { label: string; value: string }) => (
                <div
                  key={stat.label}
                  className="group rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 text-center transition-all hover:border-cyan-500 hover:shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-900 dark:hover:border-cyan-400"
                >
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-4xl font-bold text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
          <nav className="flex justify-center gap-1 overflow-x-auto border-b border-gray-200 py-4 dark:border-gray-700">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-cyan-400 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Sections */}
        <div className="space-y-16 py-12">
          {/* About — MDX content */}
          <div className="prose max-w-none dark:prose-invert">
            <div id="about" className="scroll-mt-24">
              {children}
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-cyan-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-400">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                <svg
                  className="h-6 w-6 text-cyan-600 dark:text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  Bekasi, Indonesia
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-cyan-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-400">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
                <svg
                  className="h-6 w-6 text-cyan-600 dark:text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Languages</div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  English, Indonesian
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
