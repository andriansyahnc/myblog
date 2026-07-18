import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import { components } from '@/components/MDXComponents'
import { PersonSchema } from '@/components/seo/JsonLd'
import siteMetadata from '@/data/siteMetadata'
import type { Metadata } from 'next'

export const metadata: Metadata = genPageMetadata({ title: 'About', path: '/about' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  const sameAs = [
    siteMetadata.github,
    siteMetadata.linkedin,
    siteMetadata.twitter,
    siteMetadata.drupal,
    siteMetadata.instagram,
    siteMetadata.facebook,
  ].filter((url): url is string => Boolean(url))

  return (
    <>
      <PersonSchema
        siteUrl={siteMetadata.siteUrl}
        person={{
          name: author.name,
          jobTitle: author.occupation,
          url: `${siteMetadata.siteUrl}/about`,
          image: author.avatar,
          sameAs,
        }}
      />
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} components={components} />
      </AuthorLayout>
    </>
  )
}
