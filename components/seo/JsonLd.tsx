interface JsonLdProps {
  data: Record<string, unknown>
}

// Escape characters that could break out of the <script> tag or the JSON when the data ever
// contains them (e.g. a post title with "</script>"). JSON.stringify alone does NOT escape these.
function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} />
  )
}

// Turn a possibly-relative image path into an absolute URL for schema.org.
function absoluteUrl(siteUrl: string, pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http')) return pathOrUrl
  return `${siteUrl}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

interface BlogPost {
  title: string
  summary?: string
  date: string
  lastmod?: string
  author?: string
  slug: string
  tags?: string[]
  images?: string | string[]
}

export function BlogPostingSchema({ post, siteUrl }: { post: BlogPost; siteUrl: string }) {
  const rawImage = Array.isArray(post.images) ? post.images[0] : post.images
  const image = absoluteUrl(siteUrl, rawImage || '/static/images/twitter-card.png')
  const url = `${siteUrl}/blog/${post.slug}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary || post.title,
    image,
    url,
    datePublished: post.date,
    dateModified: post.lastmod || post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'M Andriansyah Nurcahya (NC)',
    },
    publisher: {
      '@type': 'Organization',
      name: "NC's Daily Tech",
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/static/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags?.join(', '),
  }

  return <JsonLd data={schema} />
}

export function WebSiteSchema({ siteUrl, name }: { siteUrl: string; name: string }) {
  // No SearchAction: this site has no server-rendered /search results route
  // (search is a client-side kbar modal), so advertising one would 404.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: name,
    url: siteUrl,
  }

  return <JsonLd data={schema} />
}

export function BreadcrumbListSchema({
  items,
  siteUrl,
}: {
  items: { name: string; path?: string }[]
  siteUrl: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(siteUrl, item.path) } : {}),
    })),
  }

  return <JsonLd data={schema} />
}

interface PersonSchemaInput {
  name: string
  jobTitle?: string
  url: string
  image?: string
  sameAs?: string[]
}

export function PersonSchema({ person, siteUrl }: { person: PersonSchemaInput; siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    url: person.url,
    ...(person.jobTitle ? { jobTitle: person.jobTitle } : {}),
    ...(person.image ? { image: absoluteUrl(siteUrl, person.image) } : {}),
    ...(person.sameAs && person.sameAs.length > 0 ? { sameAs: person.sameAs } : {}),
  }

  return <JsonLd data={schema} />
}
