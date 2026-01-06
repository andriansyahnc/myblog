import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

const footerLinkClass =
  'transition-colors duration-200 hover:text-cyan-600 dark:hover:text-cyan-400 underline-offset-2 hover:underline'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-2xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        {/* Social Icons - Grouped by Platform Type */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {/* Professional */}
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <span
            className="hidden px-1 text-gray-300 dark:text-gray-600 sm:inline"
            aria-hidden="true"
          >
            |
          </span>
          {/* Developer Community */}
          <SocialIcon kind="drupal" href={siteMetadata.drupal} size={6} />
          <span
            className="hidden px-1 text-gray-300 dark:text-gray-600 sm:inline"
            aria-hidden="true"
          >
            |
          </span>
          {/* Microblogging */}
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
          <span
            className="hidden px-1 text-gray-300 dark:text-gray-600 sm:inline"
            aria-hidden="true"
          >
            |
          </span>
          {/* Media */}
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
        </div>

        {/* Tools & Resources */}
        <nav className="flex flex-col items-center gap-4 text-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-0 sm:gap-3">
          <span className="w-full text-center font-semibold text-gray-700 dark:text-gray-300 sm:w-auto">
            Tools & Resources:
          </span>
          <Link
            href="/playground"
            className={`text-gray-700 dark:text-gray-300 ${footerLinkClass}`}
          >
            Playground
          </Link>
          <span className="hidden text-gray-400 sm:inline" aria-hidden="true">
            •
          </span>
          <Link
            href="/cheatsheet"
            className={`text-gray-700 dark:text-gray-300 ${footerLinkClass}`}
          >
            Cheatsheet
          </Link>
          <span className="hidden text-gray-400 sm:inline" aria-hidden="true">
            •
          </span>
          <Link href="/uses" className={`text-gray-700 dark:text-gray-300 ${footerLinkClass}`}>
            Uses
          </Link>
        </nav>

        {/* Copyright & Credits */}
        <div className="space-y-3 border-t border-gray-200 pt-6 text-center dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>{siteMetadata.author}</span>
            <span aria-hidden="true">•</span>
            <span>{`© ${new Date().getFullYear()}`}</span>
            <span aria-hidden="true">•</span>
            <Link href="/" className={footerLinkClass}>
              {siteMetadata.title}
            </Link>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
              className={footerLinkClass}
            >
              Tailwind Nextjs Theme
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
