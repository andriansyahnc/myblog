import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'

// Custom heading component that generates IDs from text
const createHeading = (level: number) => {
  const HeadingComponent = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const Heading = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

    // Extract text from children (handles strings, arrays, and React nodes)
    const getText = (node: unknown): string => {
      if (typeof node === 'string') return node
      if (Array.isArray(node)) return node.map(getText).join('')
      if (
        node &&
        typeof node === 'object' &&
        'props' in node &&
        node.props &&
        typeof node.props === 'object' &&
        'children' in node.props
      ) {
        return getText(node.props.children)
      }
      return ''
    }

    const text = getText(children)

    // Generate ID from heading text
    let id = ''
    if (text.includes('Work Experience')) {
      id = 'experience'
    } else if (text.includes('Tech Stack')) {
      id = 'skills'
    } else if (text.includes("Let's Connect")) {
      id = 'contact'
    }

    const headingProps = {
      ...props,
      id,
      className: id ? 'scroll-mt-24' : props.className || '',
    }

    return <Heading {...headingProps}>{children}</Heading>
  }
  HeadingComponent.displayName = `Heading${level}`
  return HeadingComponent
}

export const components: MDXComponents = {
  Image,
  TOCInline,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: CustomLink as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pre: Pre as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: TableWrapper as any,
  BlogNewsletterForm,
  h2: createHeading(2),
}
