import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'JSON Beautifier - Playground',
  description:
    'Format, validate, and beautify JSON data with syntax highlighting. Free online JSON formatter and validator.',
})

export default function JsonBeautifierLayout({ children }: { children: React.ReactNode }) {
  return children
}
