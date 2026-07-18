import 'css/tailwind.css'

import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import SearchGate from '@/components/SearchGate'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { WebSiteSchema } from '@/components/seo/JsonLd'
import Script from 'next/script'
import UmamiDebugProbe from '@/components/UmamiDebugProbe'
import UmamiDebugTestButton from '@/components/UmamiDebugTestButton'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    // Short suffix so post titles don't truncate in search results.
    template: `%s | ${siteMetadata.headerTitle}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [{ url: siteMetadata.socialBanner, width: 1200, height: 630, alt: siteMetadata.title }],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    // No site-wide canonical here — it would be inherited by every child route
    // and tell search engines that all pages are duplicates of the homepage.
    // Each page sets its own canonical (see generateMetadata / genPageMetadata).
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const analyticsConfig = siteMetadata.analytics as AnalyticsConfig
  const umamiWebsiteId = analyticsConfig?.umamiAnalytics?.umamiWebsiteId
  const enableUmamiInDev = process.env.NEXT_PUBLIC_ENABLE_UMAMI_DEV === 'true'
  const enableUmamiDebugButton = process.env.NEXT_PUBLIC_ENABLE_UMAMI_DEBUG === 'true'

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#eaf4ff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-sky-100 pl-[calc(100vw-100%)] text-slate-800 antialiased dark:bg-[#0a0a0a] dark:text-gray-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-cyan-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <WebSiteSchema siteUrl={siteMetadata.siteUrl} name={siteMetadata.title} />
        {enableUmamiDebugButton && <UmamiDebugProbe />}
        {enableUmamiDebugButton && <UmamiDebugTestButton />}
        {process.env.NODE_ENV !== 'production' && enableUmamiInDev && umamiWebsiteId && (
          <Script
            id="umami-dev"
            data-website-id={umamiWebsiteId}
            src="https://analytics.umami.is/script.js"
            strategy="afterInteractive"
          />
        )}
        <SpeedInsights />
        <ThemeProviders>
          <Analytics analyticsConfig={analyticsConfig} />
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans">
              <SearchGate>
                <Header />
                <main id="main-content" className="mb-auto">
                  {children}
                </main>
              </SearchGate>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}
