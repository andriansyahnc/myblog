import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { createTagCount, createSearchIndex } from './contentlayer-utils.mjs'
import rss from './rss.mjs'

async function postbuild() {
  await Promise.all([
    Promise.resolve(createTagCount(allBlogs)),
    Promise.resolve(createSearchIndex(allBlogs)),
    rss(),
  ])
}

postbuild()
