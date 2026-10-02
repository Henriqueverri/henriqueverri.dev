import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { ROUTES } from './routes'

// Reduced motion so axe audits final states, not frames of an entrance animation.
test.use({ reducedMotion: 'reduce' })

for (const route of ROUTES) {
  test(`${route.path} has no detectable WCAG A/AA violations`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: 'networkidle' })
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    const summary = results.violations.map((violation) => ({
      id: violation.id,
      targets: violation.nodes.map((node) => node.target.join(' ')),
    }))
    expect(summary).toEqual([])
  })
}

test('skip link moves focus to the main content', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Keyboard flow')
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Pular para o conteúdo' })
  await expect(skip).toBeFocused()
  await expect(skip).toBeInViewport()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL('/#main')
})
