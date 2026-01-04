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
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="gradient-text text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Curriculum Vitae
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Full-stack software engineer passionate about building scalable systems
          </p>
        </div>

        {/* Stats Section */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
            {stats.map((stat: { label: string; value: string }) => (
              <div
                key={stat.label}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center transition-all hover:border-cyan-500 hover:shadow-lg dark:border-gray-700 dark:bg-dark-card dark:hover:border-cyan-400"
              >
                <div className="gradient-text text-3xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="items-start space-y-8 pt-8 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          {/* Sidebar */}
          <div className="flex flex-col items-center space-y-4">
            {avatar && (
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-primary opacity-75 blur"></div>
                <Image
                  src={avatar}
                  alt="avatar"
                  width={192}
                  height={192}
                  className="relative h-48 w-48 rounded-full ring-4 ring-white dark:ring-gray-800"
                />
              </div>
            )}
            <div className="text-center">
              <h3 className="text-2xl font-bold leading-8 tracking-tight">{name}</h3>
              <div className="text-cyan-600 dark:text-cyan-400">{occupation}</div>
              <div className="text-gray-500 dark:text-gray-400">{company}</div>
            </div>

            {/* Download CV Button */}
            <a
              href="/static/cv.pdf"
              download="Andriansyah-CV.pdf"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-6 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-cyan-500/50"
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

            {/* Social Links */}
            <div className="flex space-x-3 pt-4">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
              <SocialIcon kind="drupal" href={drupal} />
            </div>

            {/* Quick Info */}
            <div className="w-full space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-dark-card">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-cyan-600 dark:text-cyan-400"
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
                <span className="text-sm">Bekasi, Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-cyan-600 dark:text-cyan-400"
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
                <span className="text-sm">English, Indonesian</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="prose max-w-none pb-8 dark:prose-invert xl:col-span-2">{children}</div>
        </div>
      </div>
    </>
  )
}
