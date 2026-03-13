import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  return {
    title,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: siteMetadata.siteUrl,
      siteName: siteMetadata.title,
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : [{ url: siteMetadata.socialBanner, width: 1200, height: 630, alt: siteMetadata.title }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : [{ url: siteMetadata.socialBanner, width: 1200, height: 630, alt: siteMetadata.title }],
    },
    ...rest,
  }
}
