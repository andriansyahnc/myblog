import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

// Generates a branded 1200x630 social-share card per post (title in the
// query string) or a generic default when no title is given. Fixes a real
// bug found while building this: siteMetadata.socialBanner pointed at
// public/static/images/twitter-card.png, which doesn't exist — every
// page's fallback OG/Twitter image was already broken (404).
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postTitle = searchParams.get('title')?.slice(0, 200)
  const isDefault = !postTitle
  const title = postTitle || 'M Andriansyah Nurcahya (NC)'
  const byline = isDefault
    ? 'Backend Engineer & Tech Lead — distributed systems, Node.js, Go, Kafka'
    : 'M Andriansyah Nurcahya (NC) — Backend Engineer & Tech Lead'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(6,182,212,0.25), transparent 55%), radial-gradient(circle at 5% 95%, rgba(59,130,246,0.2), transparent 50%)',
          padding: '72px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 28,
            fontWeight: 700,
            color: '#22d3ee',
          }}
        >
          nc-andriansyah.me
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: isDefault ? 64 : 58,
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#f9fafb',
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 26,
            color: '#9ca3af',
          }}
        >
          {byline}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
