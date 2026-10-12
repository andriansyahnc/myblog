import { createRequire } from 'node:module'
import { afterEach, describe, expect, it, vi } from 'vitest'

const require = createRequire(import.meta.url)
const configPath = require.resolve('./next.config.js')

async function loadHeaders(nodeEnv: string) {
  vi.stubEnv('NODE_ENV', nodeEnv)
  delete require.cache[configPath]
  const config = require(configPath)()
  const routes = await config.headers()
  const headers: { key: string; value: string }[] = routes[0].headers
  return {
    config,
    get: (key: string) => headers.find((h) => h.key === key)?.value ?? '',
  }
}

const scriptSrc = (csp: string) => csp.split(';').find((d) => d.trim().startsWith('script-src'))

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('security headers', () => {
  it('drops unsafe-eval from script-src in production, keeps unsafe-inline', async () => {
    const { get } = await loadHeaders('production')
    const src = scriptSrc(get('Content-Security-Policy'))
    expect(src).not.toContain("'unsafe-eval'")
    expect(src).toContain("'unsafe-inline'")
    expect(src).toContain('giscus.app')
  })

  it('keeps unsafe-eval in development', async () => {
    const { get } = await loadHeaders('development')
    expect(scriptSrc(get('Content-Security-Policy'))).toContain("'unsafe-eval'")
  })

  it.each(['production', 'development'])('has no unused allowances (%s)', async (env) => {
    const { get, config } = await loadHeaders(env)
    const csp = get('Content-Security-Policy')
    expect(csp).not.toContain('picsum.photos')
    expect(csp).not.toContain('s3.amazonaws.com')
    expect(csp).not.toContain('media-src')
    expect(csp).toContain("img-src 'self' blob: data:;")
    expect(config.images.remotePatterns).toBeUndefined()
  })

  it('leaves HSTS unchanged', async () => {
    const { get } = await loadHeaders('production')
    expect(get('Strict-Transport-Security')).toBe('max-age=31536000; includeSubDomains')
  })
})
