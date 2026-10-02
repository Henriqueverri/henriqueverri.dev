import { describe, expect, it } from 'vitest'
import { formatPeriod } from '../../app/utils/period'

describe('formatPeriod', () => {
  it('shows a lone year as is', () => {
    expect(formatPeriod({ start: '2026' }, 'pt-BR', 'atual')).toBe('2026')
  })

  it('marks an open month range as current', () => {
    expect(formatPeriod({ start: '2023-03' }, 'pt-BR', 'atual')).toBe('mar de 2023 – atual')
    expect(formatPeriod({ start: '2023-03' }, 'en-US', 'present')).toBe('Mar 2023 – present')
  })

  it('formats closed ranges', () => {
    expect(formatPeriod({ start: '2023-03', end: '2025-06' }, 'en-US', 'present')).toBe('Mar 2023 – Jun 2025')
    expect(formatPeriod({ start: '2021', end: '2023' }, 'pt-BR', 'atual')).toBe('2021 – 2023')
  })
})
