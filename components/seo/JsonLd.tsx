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

interface BlogPost {
  title: string
  summary?: string
  date: string
  lastmod?: string
  author?: string
  slug: string
  tags?: string[]
}

export function BlogPostingSchema({ post, siteUrl }: { post: BlogPost; siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary || post.title,
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
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', '),
  }

  return <JsonLd data={schema} />
}

export function WebSiteSchema({ siteUrl, name }: { siteUrl: string; name: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: name,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return <JsonLd data={schema} />
}
