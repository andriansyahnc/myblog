import Link from 'next/link'
import { slug } from 'github-slugger'
import { memo } from 'react'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-700 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1 dark:text-cyan-400 dark:focus:ring-offset-gray-900"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

Tag.displayName = 'Tag'

export default memo(Tag)
