import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github, drupal, stats } =
    content

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Hero */}
      <div className="space-y-8 pb-10 pt-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          {avatar && (
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-75 blur" />
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

        {/* Stats — inline row matching homepage style */}
        {stats && stats.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8 border-t border-gray-200 pt-6 dark:border-gray-700 md:gap-14">
            {stats.map((stat: { label: string; value: string }) => (
              <div key={stat.label} className="text-center">
                <div className="gradient-text text-3xl font-extrabold">{stat.value}</div>
                <div className="mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MDX Content */}
      <div className="prose max-w-none py-10 dark:prose-invert">{children}</div>
    </div>
  )
}
