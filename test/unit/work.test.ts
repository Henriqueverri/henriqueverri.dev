import { describe, expect, it } from 'vitest'
import {
  homeGridNeedsPlaceholder,
  relatedWork,
  sortWork,
  spansFullRow,
  workSlug,
  workTarget,
} from '../../app/utils/work'

const base = { detail: 'case' as const, externalUrl: undefined, links: {}, order: 1 }

describe('workSlug', () => {
  it('takes the last path segment', () => {
    expect(workSlug('/pt/work/pulseboard')).toBe('pulseboard')
    expect(workSlug('/work/auge/')).toBe('auge')
  })
})

describe('workTarget', () => {
  it('links cases to their own page', () => {
    expect(workTarget({ ...base, path: '/pt/work/auge' })).toEqual({
      action: 'case',
      href: '/projects/auge',
      external: false,
    })
  })

  it('links external work straight to GitHub', () => {
    const target = workTarget({
      ...base,
      detail: 'external',
      path: '/pt/work/lib',
      externalUrl: 'https://github.com/Henriqueverri/lib',
    })
    expect(target).toEqual({ action: 'github', href: 'https://github.com/Henriqueverri/lib', external: true })
  })

  it('treats non-GitHub external URLs as live projects', () => {
    const target = workTarget({
      ...base,
      detail: 'external',
      path: '/x',
      links: { live: 'https://example.org' },
    })
    expect(target.action).toBe('live')
    expect(target.href).toBe('https://example.org')
  })
})

describe('home grid layout', () => {
  it('completes an odd remainder with the upcoming card', () => {
    expect(homeGridNeedsPlaceholder(0)).toBe(false)
    expect(homeGridNeedsPlaceholder(1)).toBe(false)
    expect(homeGridNeedsPlaceholder(2)).toBe(true)
    expect(homeGridNeedsPlaceholder(3)).toBe(false)
    expect(homeGridNeedsPlaceholder(4)).toBe(true)
  })

  it('spans a lone last card across the row', () => {
    expect(spansFullRow(0, 1)).toBe(true)
    expect(spansFullRow(0, 2)).toBe(false)
    expect(spansFullRow(2, 3)).toBe(true)
    expect(spansFullRow(1, 3)).toBe(false)
  })
})

describe('ordering', () => {
  it('sorts by order without mutating the input', () => {
    const items = [{ order: 3 }, { order: 1 }, { order: 2 }]
    expect(sortWork(items).map((item) => item.order)).toEqual([1, 2, 3])
    expect(items[0]!.order).toBe(3)
  })

  it('lists related work without the current item', () => {
    const items = [
      { path: '/a', order: 2 },
      { path: '/b', order: 1 },
      { path: '/c', order: 3 },
    ]
    expect(relatedWork(items, '/a').map((item) => item.path)).toEqual(['/b', '/c'])
  })
})
