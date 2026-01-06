import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        {/* Social Icons - Grouped by Platform Type */}
        <div className="mb-3 flex flex-wrap items-center justify-center gap-3">
          {/* Professional */}
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <span className="hidden text-gray-300 dark:text-gray-600 sm:inline">|</span>
          {/* Developer Community */}
          <SocialIcon kind="drupal" href={siteMetadata.drupal} size={6} />
          <span className="hidden text-gray-300 dark:text-gray-600 sm:inline">|</span>
          {/* Microblogging */}
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
          <span className="hidden text-gray-300 dark:text-gray-600 sm:inline">|</span>
          {/* Media */}
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
        </div>

        {/* Tools & Resources */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Tools & Resources:</span>
          <Link
            href="/playground"
            className="text-cyan-600 transition-colors hover:text-blue-600 dark:text-cyan-400 dark:hover:text-blue-400"
          >
            Playground
          </Link>
          <span className="text-gray-400">•</span>
          <Link
            href="/cheatsheet"
            className="text-cyan-600 transition-colors hover:text-blue-600 dark:text-cyan-400 dark:hover:text-blue-400"
          >
            Cheatsheet
          </Link>
          <span className="text-gray-400">•</span>
          <Link
            href="/uses"
            className="text-cyan-600 transition-colors hover:text-blue-600 dark:text-cyan-400 dark:hover:text-blue-400"
          >
            Uses
          </Link>
        </div>

        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}
