export interface Period {
  start: string
  end?: string
}

function formatPoint(value: string, locale: string): string {
  const [year, month] = value.split('-')
  if (!month) return year ?? value
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1))
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(date)
    .replace('.', '')
}

/** "2026", "mar 2023 – atual" or "mar 2023 – jun 2025". A start without end and without month is a single year. */
export function formatPeriod(period: Period, locale: string, presentLabel: string): string {
  const start = formatPoint(period.start, locale)
  if (period.end) return `${start} – ${formatPoint(period.end, locale)}`
  if (!period.start.includes('-')) return start
  return `${start} – ${presentLabel}`
}
