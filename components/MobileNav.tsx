'use client'

import { useState, useEffect } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`h-6 w-6 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
  >
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
)

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
)

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  // Close nav when route changes
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && navShow) {
        setNavShow(false)
        document.body.style.overflow = 'auto'
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [navShow])

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        aria-label="Toggle Menu"
        aria-expanded={navShow}
        onClick={onToggleNav}
        className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 p-2 text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 sm:hidden"
      >
        <HamburgerIcon open={navShow} />
      </button>

      {/* Mobile Menu Overlay */}
      {navShow && (
        <div
          className="fixed inset-0 z-20 bg-black/70 sm:hidden"
          onClick={onToggleNav}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-x-0 top-0 z-30 max-h-screen overflow-y-auto bg-white shadow-lg transition-all duration-300 ease-in-out dark:bg-gray-950 sm:hidden ${
          navShow ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0'
        }`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-end border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            aria-label="Close Menu"
            onClick={onToggleNav}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="overflow-y-auto px-6 py-8">
          <div className="space-y-2">
            {headerNavLinks.map((link, index) => (
              <Link
                key={link.title}
                href={link.href}
                className={`focus-ring block rounded-lg px-4 py-3 font-medium text-gray-900 transition-colors hover:bg-cyan-50 hover:text-cyan-600 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-cyan-400 ${
                  navShow ? 'animate-slide-up' : ''
                }`}
                style={navShow ? { animationDelay: `${index * 60}ms` } : undefined}
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}

export default MobileNav
