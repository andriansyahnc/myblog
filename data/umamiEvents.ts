export const UMAMI_EVENTS = {
  NEWSLETTER_SUBMIT_ATTEMPT: 'newsletter-submit-attempt',
  NEWSLETTER_SUBMIT_SUCCESS: 'newsletter-submit-success',
  NEWSLETTER_SUBMIT_FAILURE: 'newsletter-submit-failure',
  RELATED_POST_CLICK: 'related-post-click',
  RESUME_READING_CLICK: 'resume-reading-click',
  SEARCH_OPEN: 'search-open',
  SEARCH_QUERY_CHANGED: 'search-query-changed',
  TAG_FILTER_CHANGED: 'tag-filter-changed',
  TAG_FILTER_CLEARED: 'tag-filter-cleared',
  POST_SCROLL_DEPTH: 'post-scroll-depth',
} as const

export type UmamiEventName = (typeof UMAMI_EVENTS)[keyof typeof UMAMI_EVENTS]

export type UmamiEventPayloadMap = {
  [UMAMI_EVENTS.NEWSLETTER_SUBMIT_ATTEMPT]: undefined
  [UMAMI_EVENTS.NEWSLETTER_SUBMIT_SUCCESS]: undefined
  [UMAMI_EVENTS.NEWSLETTER_SUBMIT_FAILURE]: {
    status?: number
    reason?: string
  }
  [UMAMI_EVENTS.RELATED_POST_CLICK]: {
    title?: string
  }
  [UMAMI_EVENTS.RESUME_READING_CLICK]: {
    title?: string
  }
  [UMAMI_EVENTS.SEARCH_OPEN]: undefined
  [UMAMI_EVENTS.SEARCH_QUERY_CHANGED]: {
    queryLength: number
    hasQuery: boolean
  }
  [UMAMI_EVENTS.TAG_FILTER_CHANGED]: {
    tag: string
    selectedCount: number
  }
  [UMAMI_EVENTS.TAG_FILTER_CLEARED]: {
    hadTags: boolean
    hadQuery: boolean
  }
  [UMAMI_EVENTS.POST_SCROLL_DEPTH]: {
    depth: number
    slug: string
    title: string
  }
}

type PayloadValidator = (payload: unknown) => string[]

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isString = (value: unknown) => typeof value === 'string'
const isNumber = (value: unknown) => typeof value === 'number' && Number.isFinite(value)
const isBoolean = (value: unknown) => typeof value === 'boolean'

const payloadValidators: Record<UmamiEventName, PayloadValidator> = {
  [UMAMI_EVENTS.NEWSLETTER_SUBMIT_ATTEMPT]: () => [],
  [UMAMI_EVENTS.NEWSLETTER_SUBMIT_SUCCESS]: () => [],
  [UMAMI_EVENTS.NEWSLETTER_SUBMIT_FAILURE]: (payload) => {
    if (payload === undefined) return []
    if (!isRecord(payload)) return ['payload must be an object']
    const errors: string[] = []
    if ('status' in payload && payload.status !== undefined && !isNumber(payload.status)) {
      errors.push('status must be a number when provided')
    }
    if ('reason' in payload && payload.reason !== undefined && !isString(payload.reason)) {
      errors.push('reason must be a string when provided')
    }
    return errors
  },
  [UMAMI_EVENTS.RELATED_POST_CLICK]: () => [],
  [UMAMI_EVENTS.RESUME_READING_CLICK]: () => [],
  [UMAMI_EVENTS.SEARCH_OPEN]: () => [],
  [UMAMI_EVENTS.SEARCH_QUERY_CHANGED]: (payload) => {
    if (!isRecord(payload)) return ['payload must be an object']
    const errors: string[] = []
    if (!isNumber(payload.queryLength)) errors.push('queryLength must be a number')
    if (!isBoolean(payload.hasQuery)) errors.push('hasQuery must be a boolean')
    return errors
  },
  [UMAMI_EVENTS.TAG_FILTER_CHANGED]: (payload) => {
    if (!isRecord(payload)) return ['payload must be an object']
    const errors: string[] = []
    if (!isString(payload.tag)) errors.push('tag must be a string')
    if (!isNumber(payload.selectedCount)) errors.push('selectedCount must be a number')
    return errors
  },
  [UMAMI_EVENTS.TAG_FILTER_CLEARED]: (payload) => {
    if (!isRecord(payload)) return ['payload must be an object']
    const errors: string[] = []
    if (!isBoolean(payload.hadTags)) errors.push('hadTags must be a boolean')
    if (!isBoolean(payload.hadQuery)) errors.push('hadQuery must be a boolean')
    return errors
  },
  [UMAMI_EVENTS.POST_SCROLL_DEPTH]: (payload) => {
    if (!isRecord(payload)) return ['payload must be an object']
    const errors: string[] = []
    if (!isNumber(payload.depth)) errors.push('depth must be a number')
    if (!isString(payload.slug)) errors.push('slug must be a string')
    if (!isString(payload.title)) errors.push('title must be a string')
    return errors
  },
}

export function validateUmamiEventPayload(eventName: UmamiEventName, payload: unknown): string[] {
  return payloadValidators[eventName](payload)
}
