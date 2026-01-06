import { genPageMetadata } from 'app/seo'
import UsesClient from './UsesClient'

export const metadata = genPageMetadata({
  title: 'Uses',
  description: 'Software, tools, and gear I use for development and productivity',
})

export default function Uses() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-3xl font-extrabold leading-9 tracking-tight text-transparent sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Uses
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Software, tools, and gear I use for development and productivity. Inspired by{' '}
          <a
            href="https://uses.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600 hover:text-blue-600 dark:text-cyan-400 dark:hover:text-blue-400"
          >
            uses.tech
          </a>
        </p>
      </div>

      <UsesClient />
    </div>
  )
}
