import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { parse } from 'yaml'
import { profileSchema, workSchemaStrict, type WorkData } from '../../shared/content-schema'

const root = join(import.meta.dirname, '..', '..')
const LOCALES = ['pt', 'en'] as const

function readWork(locale: string) {
  const dir = join(root, 'content', locale, 'work')
  return Object.fromEntries(
    readdirSync(dir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const source = readFileSync(join(dir, file), 'utf8')
        const [, frontmatter = '', body = ''] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? []
        return [file.replace(/\.md$/, ''), { data: parse(frontmatter) as unknown, body }]
      }),
  )
}

const work = Object.fromEntries(LOCALES.map((locale) => [locale, readWork(locale)])) as Record<
  (typeof LOCALES)[number],
  Record<string, { data: unknown; body: string }>
>

describe.each(LOCALES)('work content (%s)', (locale) => {
  const entries = Object.entries(work[locale])

  it.each(entries)('%s passes the strict schema', (_slug, { data }) => {
    const result = workSchemaStrict.safeParse(data)
    expect(result.error?.issues ?? []).toEqual([])
  })

  it.each(entries)('%s only references images that exist', (_slug, { data }) => {
    const item = workSchemaStrict.parse(data)
    for (const image of [item.cover, ...item.gallery].filter(Boolean)) {
      expect(existsSync(join(root, 'public', image!.src)), image!.src).toBe(true)
    }
  })

  it.each(entries)('%s uses only MDC blocks that exist', (_slug, { body }) => {
    const blocks = [...body.matchAll(/^::([a-z-]+)$/gm)].map((match) => match[1])
    const available = readdirSync(join(root, 'app/components/content')).map((file) =>
      file
        .replace(/\.vue$/, '')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase(),
    )
    for (const block of blocks) expect(available).toContain(block)
  })
})

describe('locale parity', () => {
  it('publishes the same work in every locale', () => {
    expect(Object.keys(work.en).sort()).toEqual(Object.keys(work.pt).sort())
  })

  it.each(Object.keys(work.pt))('%s keeps facts aligned between locales', (slug) => {
    const pt = workSchemaStrict.parse(work.pt[slug]!.data)
    const en = workSchemaStrict.parse(work.en[slug]!.data)
    const facts = (item: WorkData) => ({
      type: item.type,
      detail: item.detail,
      status: item.status,
      featured: item.featured,
      order: item.order,
      confidentiality: item.confidentiality,
      visuals: item.visuals,
      company: item.company,
      period: item.period,
      stack: item.stack,
      links: item.links,
      cover: item.cover?.src,
      gallery: item.gallery.map((image) => image.src),
      counts: [item.phases.length, item.decisions.length, item.outcomes.length, item.learnings.length],
      // Values may be translated ("1 a 4" / "1 to 4"); the numbers must not change.
      metrics: item.metrics.map((metric) => metric.value.match(/\d+/g)?.join(' ')),
    })
    expect(facts(en)).toEqual(facts(pt))
  })

  it('has the same i18n keys in every locale', () => {
    const keys = (value: unknown, prefix = ''): string[] =>
      typeof value === 'object' && value !== null
        ? Object.entries(value).flatMap(([key, nested]) => keys(nested, `${prefix}${key}.`))
        : [prefix.slice(0, -1)]
    const messages = LOCALES.map((locale) =>
      keys(JSON.parse(readFileSync(join(root, 'i18n/locales', `${locale}.json`), 'utf8'))).sort(),
    )
    expect(messages[1]).toEqual(messages[0])
  })
})

describe('profile content', () => {
  it.each(LOCALES)('%s passes the schema', (locale) => {
    const data = parse(readFileSync(join(root, 'content', locale, 'profile.yml'), 'utf8'))
    expect(profileSchema.safeParse(data).error?.issues ?? []).toEqual([])
  })

  it('has the same structure in every locale', () => {
    const [pt, en] = LOCALES.map((locale) =>
      profileSchema.parse(parse(readFileSync(join(root, 'content', locale, 'profile.yml'), 'utf8'))),
    )
    expect(en!.about.paragraphs).toHaveLength(pt!.about.paragraphs.length)
    expect(en!.toolkit.stack).toEqual(pt!.toolkit.stack)
    expect(en!.toolkit.capabilities.map((c) => c.icon)).toEqual(pt!.toolkit.capabilities.map((c) => c.icon))
  })
})

describe('editorial rules', () => {
  const FORBIDDEN = [
    /\bj[uú]nior\b/i,
    /\bs[eê]nior\b/i,
    /\btech lead\b/i,
    /\benterprise\b/i,
    /\bproduction[- ]ready\b/i,
    /\bexpert\b/i,
    /\b10x\b/i,
    /passionate developer/i,
    /coding enthusiast/i,
    /love technology/i,
    /building amazing things/i,
    /lorem ipsum/i,
  ]

  const files = [
    ...LOCALES.flatMap((locale) => [
      join('content', locale, 'profile.yml'),
      ...readdirSync(join(root, 'content', locale, 'work')).map((file) =>
        join('content', locale, 'work', file),
      ),
      join('i18n/locales', `${locale}.json`),
    ]),
    'app/app.config.ts',
  ]

  it.each(files)('%s avoids seniority labels and filler claims', (file) => {
    const text = readFileSync(join(root, file), 'utf8')
    for (const pattern of FORBIDDEN) expect(text, `${pattern} in ${file}`).not.toMatch(pattern)
  })

  it('only links to real, known profiles and repositories', () => {
    const allowed = [
      'https://github.com/Henriqueverri',
      'https://www.linkedin.com/in/henriqueverri',
      'https://app.henriqueverri.dev',
      'https://henriqueverri.dev',
    ]
    for (const locale of LOCALES) {
      for (const { data } of Object.values(work[locale])) {
        const { links, externalUrl } = workSchemaStrict.parse(data)
        for (const url of [...Object.values(links), externalUrl].filter(Boolean)) {
          expect(
            allowed.some((prefix) => url!.startsWith(prefix)),
            url,
          ).toBe(true)
        }
      }
    }
  })
})
