---
name: myblog-patterns
description: Coding patterns extracted from andriansyahnc-blog (Next.js 16 personal blog with Contentlayer, Tailwind, Umami analytics)
version: 1.0.0
source: local-git-analysis
analyzed_commits: 50
---

# myblog Patterns

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 18
- **Content**: Contentlayer2 + MDX (blog posts in `data/blog/*.mdx`)
- **Styling**: Tailwind CSS v3 + `@tailwindcss/typography`
- **Analytics**: Umami (self-hosted, type-safe event tracking)
- **Package manager**: pnpm (workspace, `engines.node >=24.x`)
- **Linting/formatting**: ESLint + Prettier + Husky lint-staged (auto-fix on commit)

## Commit Conventions

This project uses **Conventional Commits** enforced by commitlint (`@commitlint/config-conventional`).

Format: `type(scope?): description`

| Type       | Use for                              |
| ---------- | ------------------------------------ |
| `feat`     | New feature or page                  |
| `fix`      | Bug fix                              |
| `chore`    | Maintenance, deps, config            |
| `docs`     | Documentation                        |
| `style`    | Formatting, no logic change          |
| `refactor` | Code restructure without new feature |
| `perf`     | Performance improvement              |
| `test`     | Tests                                |
| `ci`       | CI/CD config                         |

Examples:

```
feat: add experience page
fix(header): resolve flicker on dark mode toggle
chore: upgrade dependencies
perf: optimize image loading in PostLayout
```

Scope is optional — use it when the change is limited to one area (e.g., `fix(comments)`, `feat(playground)`).

The `commit-msg` Husky hook runs `commitlint` automatically and rejects non-conforming messages.

## Code Architecture

```
app/                   # Next.js App Router pages
├── (route)/page.tsx   # Server component by default
├── (route)/Client.tsx # Client parts split into *Client.tsx
├── layout.tsx         # Root layout
├── seo.tsx            # Centralized SEO/metadata helpers
├── sitemap.ts         # Dynamic sitemap
└── robots.ts          # robots.txt

components/            # Shared UI components (PascalCase.tsx)
├── seo/               # SEO-specific components (JsonLd.tsx)
└── social-icons/      # Grouped icon exports

layouts/               # Page layout templates (AuthorLayout, PostLayout, etc.)

data/
├── blog/*.mdx         # Blog posts
├── authors/*.mdx      # Author profiles
├── siteMetadata.js    # Central site config (URL, social links, analytics)
├── umamiEvents.ts     # All Umami event names + typed payloads + validators
└── *.ts               # Other typed data files (headerNavLinks, projectsData)

hooks/                 # Custom React hooks (use*.ts prefix)
utils/                 # Pure utility functions

scripts/               # Build-time Node scripts (.mjs)
css/tailwind.css       # Global Tailwind CSS base
contentlayer.config.ts # Contentlayer document schemas
```

## Client/Server Component Pattern

Pages are **server components by default**. Interactive parts are extracted into a `*Client.tsx` sibling:

```
app/cheatsheet/page.tsx              ← server: fetches data, exports metadata
app/cheatsheet/CheatsheetClient.tsx  ← 'use client': interactive state
```

Hooks (`use*.ts`) always include `'use client'` at the top.

## Analytics Pattern (Umami)

All Umami events are centrally defined and **typed** in `data/umamiEvents.ts`:

1. Add event name to `UMAMI_EVENTS` const object
2. Add payload type to `UmamiEventPayloadMap`
3. Add validator to `payloadValidators`

Use the `useUmamiEvent` hook in client components:

```tsx
'use client'
import { useUmamiEvent } from '@/hooks/useUmamiEvent'
import { UMAMI_EVENTS } from '@/data/umamiEvents'

function MyComponent() {
  const { trackEvent } = useUmamiEvent()
  trackEvent(UMAMI_EVENTS.SEARCH_OPEN)
  trackEvent(UMAMI_EVENTS.TAG_FILTER_CHANGED, { tag: 'react', selectedCount: 1 })
}
```

Never call `window.umami.track()` directly — always go through the hook.

## MDX Blog Post Frontmatter

```mdx
---
title: 'Post Title'
date: '2026-01-01'
tags: ['tag1', 'tag2']
summary: 'One-sentence description'
draft: false # omit or false to publish
lastmod: '2026-01-10' # optional, for update date
images: ['/static/images/cover.jpg'] # optional OG image
layout: PostLayout # optional, defaults to PostLayout
---
```

## Workflows

### Adding a New Blog Post

1. Create `data/blog/slug-in-kebab-case.mdx` with required frontmatter
2. Run `pnpm dev` — Contentlayer auto-generates types and `app/tag-data.json`
3. Build verifies: `pnpm build` runs `contentlayer2 build && next build && node ./scripts/postbuild.mjs`

### Adding a New Page

1. Create `app/<route>/page.tsx` (server component, export `metadata`)
2. If interactive, add `app/<route>/<Name>Client.tsx` with `'use client'`
3. Add to `data/headerNavLinks.ts` if it should appear in nav

### Adding a New Umami Event

1. Add to `UMAMI_EVENTS` in `data/umamiEvents.ts`
2. Add payload type to `UmamiEventPayloadMap`
3. Add validator function to `payloadValidators`
4. Use via `useUmamiEvent()` hook

### Adding a New Component

1. Create `components/ComponentName.tsx` (PascalCase)
2. No barrel `index.ts` — import directly from file path
3. Use `'use client'` only if it uses hooks or browser APIs

## Path Aliases

All imports use `@/` alias mapping to root:

```ts
import { UMAMI_EVENTS } from '@/data/umamiEvents'
import { useUmamiEvent } from '@/hooks/useUmamiEvent'
```

## Styling Conventions

- Tailwind utility classes only — no CSS modules, no styled-components
- Dark mode via `next-themes` + Tailwind `dark:` variants
- Prose content styled with `@tailwindcss/typography` (`prose` class)
- Custom global styles in `css/tailwind.css`

## Build Scripts

```bash
pnpm dev          # Start dev server (alias: pnpm start)
pnpm build        # contentlayer2 build + next build + postbuild.mjs
pnpm serve        # next start (production server)
pnpm lint         # eslint --fix across app, components, lib, layouts, scripts
pnpm optimize-images  # Run sharp image optimization
```

## Contentlayer Schema Extension

To add a field to Blog posts:

1. Add it to `contentlayer.config.ts` inside `Blog` `fields`
2. Rebuild types: `pnpm build` or let `pnpm dev` pick it up

Computed fields (`readingTime`, `slug`, `path`, `toc`) are auto-derived — never add them to frontmatter.
