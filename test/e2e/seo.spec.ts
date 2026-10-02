import { expect, test } from '@playwright/test'
import { ROUTES } from './routes'

const SITE = 'https://henriqueverri.dev'

test.describe('routes and head', () => {
  for (const route of ROUTES) {
    test(`${route.path} renders with complete metadata`, async ({ page, request }) => {
      const response = await page.goto(route.path)
      expect(response?.status()).toBe(200)

      await expect(page.locator('html')).toHaveAttribute('lang', route.lang)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page).toHaveTitle(/Henrique Verri/)

      const description = await page.locator('meta[name="description"]').getAttribute('content')
      expect(description?.length).toBeGreaterThan(50)

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(canonical).toBe(route.path === '/' ? SITE : `${SITE}${route.path}`)
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveCount(1)
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical!)

      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content')
      expect(ogImage).toMatch(new RegExp(`^${SITE}/og/.+\\.png$`))
      expect((await request.get(ogImage!.replace(SITE, ''))).status()).toBe(200)
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
        'content',
        'summary_large_image',
      )

      for (const script of await page.locator('script[type="application/ld+json"]').allTextContents()) {
        const data = JSON.parse(script)
        expect(data['@context']).toBe('https://schema.org')
      }
    })
  }

  test('unknown routes answer 404 with a localized page', async ({ page }) => {
    const response = await page.goto('/does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Página não encontrada')
    await expect(page.getByRole('link', { name: 'Voltar ao início' })).toBeVisible()
  })

  test('robots, sitemap and icons are published', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text()
    expect(robots).toContain(`Sitemap: ${SITE}/sitemap_index.xml`)

    const index = await request.get('/sitemap_index.xml')
    expect(index.status()).toBe(200)
    const sitemap = await (await request.get('/__sitemap__/pt-BR.xml')).text()
    for (const route of ROUTES.filter((item) => item.lang === 'pt-BR')) {
      expect(sitemap).toContain(`<loc>${SITE}${route.path === '/' ? '/' : route.path}</loc>`)
    }

    for (const icon of ['/favicon.ico', '/favicon.svg', '/apple-touch-icon.png']) {
      expect((await request.get(icon)).status(), icon).toBe(200)
    }
  })
})

test('every internal link resolves', async ({ page, request }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Link graph is the same on every viewport')
  test.setTimeout(90_000)
  const ids = new Map<string, Set<string>>()
  const anchors: { target: string; hash: string; from: string }[] = []
  const queue: string[] = ['/', '/en']
  while (queue.length) {
    const path = queue.shift()!
    if (ids.has(path)) continue
    const response = await page.goto(path)
    expect(response?.status(), path).toBe(200)
    const { hrefs, pageIds } = await page.evaluate(() => ({
      hrefs: [...document.querySelectorAll('a[href^="/"]')].map((link) => link.getAttribute('href')!),
      pageIds: [...document.querySelectorAll('[id]')].map((el) => el.id),
    }))
    ids.set(path, new Set(pageIds))
    for (const href of hrefs) {
      const [clean, hash] = href.split('#')
      const target = clean || '/'
      if (hash) anchors.push({ target, hash, from: path })
      if (!ids.has(target)) queue.push(target)
    }
  }
  for (const { target, hash, from } of anchors) {
    expect(ids.get(target)?.has(hash), `${target}#${hash} (from ${from})`).toBe(true)
  }
  const seen = [...ids.keys()]
  for (const asset of ['/og/home-pt.png', '/og/home-en.png']) {
    expect((await request.get(asset)).status()).toBe(200)
  }
  expect(seen.sort()).toEqual(expect.arrayContaining(ROUTES.map((route) => route.path)))
})
