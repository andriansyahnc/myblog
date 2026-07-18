import { mkdirSync, copyFileSync, readdirSync } from 'fs'
import path from 'path'

const KATEX_DIST = path.join('node_modules', 'katex', 'dist')
const OUT_DIR = path.join('public', 'static', 'katex')

// KaTeX's CSS is only referenced (as a <link> tag, not a JS import) on
// posts that actually contain math — see app/blog/[...slug]/page.tsx. A JS
// import gets pulled into a shared CSS chunk loaded on every page
// regardless of a dynamic-import boundary, which defeats the point; a
// plain <link> only costs a request on pages that render it. Copied fresh
// on every build (not committed) so it never drifts from the installed
// katex version.
export function copyKatexAssets() {
  mkdirSync(path.join(OUT_DIR, 'fonts'), { recursive: true })
  copyFileSync(path.join(KATEX_DIST, 'katex.min.css'), path.join(OUT_DIR, 'katex.min.css'))

  const fontsDir = path.join(KATEX_DIST, 'fonts')
  for (const file of readdirSync(fontsDir)) {
    copyFileSync(path.join(fontsDir, file), path.join(OUT_DIR, 'fonts', file))
  }
  console.log('KaTeX assets copied...')
}
