import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-700 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/75">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 sm:py-5">
          {/* Logo */}
          <Link href="/" aria-label={siteMetadata.headerTitle} className="group">
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden text-xl font-bold transition-all sm:block sm:text-2xl">
                <span className="gradient-text inline-block transition-transform group-hover:scale-105">
                  {siteMetadata.headerTitle}
                </span>
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden items-center gap-1 sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="focus-ring inline-flex min-h-11 items-center rounded-lg px-3 py-2 font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-100 hover:text-cyan-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-cyan-400"
                >
                  {link.title}
                </Link>
              ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
