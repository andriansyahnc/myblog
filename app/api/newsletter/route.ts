import { NextRequest, NextResponse } from 'next/server'
import { NewsletterAPI } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'

// pliny's handler has no rate limiting, minimal email validation, and echoes
// raw exception messages to the client on 500s — so we validate + rate-limit
// before delegating to it, and sanitize its response afterward.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5

// In-memory, per-instance only — resets on cold start and isn't shared across
// instances. That's a real limitation on serverless, but it's a meaningful
// speed bump against casual abuse for a low-traffic newsletter form, without
// adding an external store for a personal blog.
const requestLog = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = requestLog.get(ip)

  if (!entry || now > entry.resetAt) {
    requestLog.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > RATE_LIMIT_MAX_REQUESTS
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || 'unknown'
}

const plinyHandler = NewsletterAPI({
  // @ts-ignore
  provider: siteMetadata.newsletter.provider,
})

async function handler(request: NextRequest, context: { params: Promise<Record<string, string>> }) {
  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  let email: unknown
  try {
    const body = await request.clone().json()
    email = body?.email
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
  }

  // pliny's handler branches on `"params" in res` to distinguish App Router
  // from Pages Router — it needs the route context forwarded, not consumed.
  const response = await plinyHandler(request, context)

  if (response.status >= 500) {
    return NextResponse.json(
      { error: 'Something went wrong subscribing you. Please try again later.' },
      { status: response.status }
    )
  }

  return response
}

export { handler as GET, handler as POST }
