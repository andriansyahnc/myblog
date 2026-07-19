import { describe, expect, it } from 'vitest'
import { formatRelativeDate } from './formatRelativeDate'

describe('formatRelativeDate', () => {
  const now = new Date('2026-07-19T00:00:00Z')

  it('formats a date from earlier today as "today"', () => {
    expect(formatRelativeDate('2026-07-19T00:00:00Z', 'en-US', now)).toBe('today')
  })

  it('formats a date a few days in the past', () => {
    expect(formatRelativeDate('2026-07-16T00:00:00Z', 'en-US', now)).toBe('3 days ago')
  })

  it('formats a date a few days in the future', () => {
    expect(formatRelativeDate('2026-07-22T00:00:00Z', 'en-US', now)).toBe('in 3 days')
  })
})
