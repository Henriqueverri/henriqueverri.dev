import { expect, test } from '@playwright/test'

test.describe('featured work stack', () => {
  test('starts stacked over the hero and becomes an interactive grid on scroll', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('#work')
    await expect(page.locator('html')).toHaveAttribute('data-motion', '')
    await expect(section).toHaveAttribute('data-stack-ready', '')
    await expect(section).toHaveAttribute('data-stack', 'stacked')

    const firstCard = section.locator('[data-stack-card]').first()
    expect(await firstCard.evaluate((el) => getComputedStyle(el).pointerEvents)).toBe('none')

    await page.getByRole('link', { name: 'Ver projetos' }).click()
    await expect(section).toHaveAttribute('data-stack', 'revealed', { timeout: 5000 })
    expect(await firstCard.evaluate((el) => getComputedStyle(el).pointerEvents)).toBe('auto')

    await firstCard.getByRole('link').click()
    await expect(page).toHaveURL('/projects/pulseboard')
  })

  test('keyboard focus on a stacked card reveals the grid', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Keyboard flow')
    await page.goto('/')
    await page.locator('#work [data-stack-card] a').first().focus()
    await expect(page.locator('#work')).toHaveAttribute('data-stack', 'revealed', { timeout: 5000 })
  })
})

test.describe('smooth wheel scrolling', () => {
  test('a wheel step glides to its destination instead of jumping', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Touch keeps native scrolling')
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-motion', '')
    await page.mouse.wheel(0, 600)
    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(500)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500)
  })
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('wheel scrolling stays native', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Touch keeps native scrolling')
    await page.goto('/')
    await page.mouse.wheel(0, 600)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(600)
  })

  test('shows the plain grid with no motion states', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).not.toHaveAttribute('data-motion', /.*/)
    const section = page.locator('#work')
    await expect(section).toHaveAttribute('data-stack', '')
    await expect(section).not.toHaveAttribute('data-stack-ready', /.*/)
    await expect(page.locator('[data-stack-target]')).toBeHidden()

    const card = section.locator('[data-stack-card]').first()
    expect(await card.evaluate((el) => getComputedStyle(el).transform)).toBe('none')
    await expect(card.getByRole('link')).toBeVisible()
  })
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('all content is visible and navigable', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const opacities = await page
      .locator('.reveal-item, [data-reveal="self"], [data-stack-card]')
      .evaluateAll((elements) => elements.map((el) => getComputedStyle(el).opacity))
    expect(opacities.length).toBeGreaterThan(10)
    expect(new Set(opacities)).toEqual(new Set(['1']))

    await page.goto('/projects/auge')
    await expect(page.getByRole('heading', { name: /Abordagem/ })).toBeVisible()
    await expect(page.getByText('Mapeamento por família').first()).toBeVisible()
  })
})
