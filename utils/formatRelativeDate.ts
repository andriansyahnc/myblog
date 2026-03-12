import { formatDate } from 'pliny/utils/formatDate'

const DAY_IN_MS = 24 * 60 * 60 * 1000

export function formatRelativeDate(dateString: string, locale: string, now = new Date()): string {
  const targetDate = new Date(dateString)

  if (Number.isNaN(targetDate.getTime())) {
    return formatDate(dateString, locale)
  }

  const diffMs = targetDate.getTime() - now.getTime()
  const diffDays = Math.round(diffMs / DAY_IN_MS)
  const absDays = Math.abs(diffDays)

  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (absDays < 1) {
    return formatter.format(0, 'day')
  }

  if (absDays < 30) {
    return formatter.format(diffDays, 'day')
  }

  const diffMonths = Math.round(diffDays / 30)
  if (Math.abs(diffMonths) < 12) {
    return formatter.format(diffMonths, 'month')
  }

  const diffYears = Math.round(diffDays / 365)
  return formatter.format(diffYears, 'year')
}
