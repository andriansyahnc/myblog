import { describe, expect, it } from 'vitest'
import { parseReadingHistory } from './TrackReadingHistory'

const item = {
  slug: 'a',
  path: 'blog/a',
  title: 'A',
  date: '2026-01-01',
  viewedAt: '2026-01-02T00:00:00.000Z',
}

describe('parseReadingHistory', () => {
  it.each([null, '', 'not json', 'null', '{}', '[null]', '[{"slug":1}]', '"str"', '[1]'])(
    'returns [] for %j',
    (raw) => {
      expect(parseReadingHistory(raw)).toEqual([])
    }
  )

  it('rejects the whole history if one record is malformed', () => {
    expect(parseReadingHistory(JSON.stringify([item, { ...item, viewedAt: 1 }]))).toEqual([])
  })

  it('returns a valid history unchanged', () => {
    const history = [item, { ...item, slug: 'b' }]
    expect(parseReadingHistory(JSON.stringify(history))).toEqual(history)
  })
})
