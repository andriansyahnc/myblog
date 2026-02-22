import { writeFileSync } from 'fs'
import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import siteMetadata from '../data/siteMetadata.js'

const isProduction = process.env.NODE_ENV === 'production'

export function createTagCount(allBlogs) {
  const tagCount = {}
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] = (tagCount[formattedTag] ?? 0) + 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
}

export function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    )
    console.log('Local search index generated...')
  }
}
