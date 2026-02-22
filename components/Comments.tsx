'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)

  if (!siteMetadata.comments?.provider) {
    return null
  }
  return (
    <>
      {loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      ) : (
        <button
          onClick={() => setLoadComments(true)}
          className="rounded-lg border border-cyan-500 px-4 py-2 text-sm font-medium text-cyan-600 transition-colors hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-900/20 dark:focus:ring-offset-gray-900"
        >
          Load Comments
        </button>
      )}
    </>
  )
}
