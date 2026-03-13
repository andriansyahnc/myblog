import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  path?: string
  alternates?: Metadata['alternates']
  openGraph?: Metadata['openGraph']
  twitter?: Metadata['twitter']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  path,
  alternates,
  openGraph,
  twitter,
  ...rest
}: PageSEOProps): Metadata {
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : ''
  const pageUrl = normalizedPath ? `${siteMetadata.siteUrl}${normalizedPath}` : siteMetadata.siteUrl
  const defaultImages = image
    ? [{ url: image, width: 1200, height: 630, alt: title }]
    : [{ url: siteMetadata.socialBanner, width: 1200, height: 630, alt: siteMetadata.title }]

  return {
    title,
    ...rest,
    alternates: {
      ...alternates,
      canonical: alternates?.canonical ?? pageUrl,
    },
    openGraph: {
      title: openGraph?.title ?? `${title} | ${siteMetadata.title}`,
      description: openGraph?.description ?? (description || siteMetadata.description),
      url: openGraph?.url ?? pageUrl,
      siteName: openGraph?.siteName ?? siteMetadata.title,
      images: openGraph?.images ?? defaultImages,
      locale: openGraph?.locale ?? 'en_US',
      type: 'website',
      ...openGraph,
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: defaultImages,
      ...twitter,
    },
  }
}
