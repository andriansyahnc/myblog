import { Metadata } from 'next'
import { genPageMetadata } from 'app/seo'
import CheatsheetClient from './CheatsheetClient'

export const metadata: Metadata = genPageMetadata({
  title: 'Cheatsheet',
  description: 'Quick-reference commands for Git, Docker, databases, Linux, and development tools.',
})

export default function CheatsheetPage() {
  return <CheatsheetClient />
}
