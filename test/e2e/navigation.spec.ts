import { expect, test } from '@playwright/test'
import { ROUTES } from './routes'

test.describe('desktop navigation', () => {
  test.skip(({ isMobile }) => isMobile, 'Desktop only')

  test('header links reach projects and home sections', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Navegação principal' })
    await nav.getByRole('link', { name: 'Projetos' }).click()
    await expect(page).toHaveURL('/projects')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Projetos')

    await nav.getByRole('link', { name: 'Sobre' }).click()
    await expect(page).toHaveURL('/#about')
    await expect(page.locator('#about')).toBeInViewport()

    // After the jump the header is collapsed; keyboard focus expands it.
    await nav.getByRole('link', { name: 'Contato' }).focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/#contact')
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('the footer sentence reads naturally', async ({ page }) => {
    await page.goto('/')
    const spoken = await page
      .locator('footer p')
      .first()
      .evaluate((el) => {
        const clone = el.cloneNode(true) as HTMLElement
        clone.querySelectorAll('[aria-hidden="true"]').forEach((hidden) => hidden.remove())
        return clone.textContent?.replace(/\s+/g, ' ').trim()
      })
    expect(spoken).toBe('Vamos construir o próximo produto juntos.')
  })

  test('the header collapses while scrolling down and expands on focus', async ({ page }) => {
    await page.goto('/projects/auge')
    await page.mouse.wheel(0, 1200)
    await expect(page.locator('html')).toHaveAttribute('data-scroll', 'down')
    // Wheel scrolling glides; let it settle before reversing.
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(900)
    await page.mouse.wheel(0, -300)
    await expect(page.locator('html')).toHaveAttribute('data-scroll', 'up')
  })

  test('a case card opens its page and the case links back', async ({ page }) => {
    await page.goto('/projects')
    await page.getByRole('link', { name: /AUGE/ }).click()
    await expect(page).toHaveURL('/projects/auge')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('AUGE')
    await page.getByRole('link', { name: 'Todos os projetos' }).click()
    await expect(page).toHaveURL('/projects')
  })

  test('case phases are tabs operable by keyboard', async ({ page }) => {
    await page.goto('/projects/pulseboard')
    const tabs = page.getByRole('tab')
    await expect(tabs).toHaveCount(5)
    await tabs.first().focus()
    await page.keyboard.press('ArrowDown')
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true')
    await expect(tabs.nth(1)).toBeFocused()
    await expect(page.getByRole('tabpanel')).toContainText('Sanctum SPA')
  })
})

test.describe('mobile navigation', () => {
  test.skip(({ isMobile }) => !isMobile, 'Mobile only')

  test('menu opens with focus inside, closes on Escape and returns focus', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Abrir ou fechar o menu' })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const menu = page.locator('#mobile-menu')
    await expect(menu).toBeVisible()
    await expect(menu.getByRole('link', { name: 'Projetos' })).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(toggle).toBeFocused()
  })

  test('menu links navigate and close the menu', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Abrir ou fechar o menu' }).click()
    await page.locator('#mobile-menu').getByRole('link', { name: 'Projetos' }).click()
    await expect(page).toHaveURL('/projects')
    await expect(page.locator('#mobile-menu')).toBeHidden()
  })
})

test('language switch keeps the current page', async ({ page }) => {
  await page.goto('/projects/auge')
  await page.locator('a[hreflang="en-US"]:visible').first().click()
  await expect(page).toHaveURL('/en/projects/auge')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US')
  await expect(page.getByRole('link', { name: 'All work' })).toBeVisible()

  await page.locator('a[hreflang="pt-BR"]:visible').first().click()
  await expect(page).toHaveURL('/projects/auge')
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
})

test('no page overflows horizontally', async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route.path)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow, route.path).toBeLessThanOrEqual(0)
  }
})

test('pages load without console errors or WebAssembly downloads', async ({ page }) => {
  const errors: string[] = []
  const wasm: string[] = []
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()))
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('request', (request) => request.url().endsWith('.wasm') && wasm.push(request.url()))

  for (const route of ROUTES) {
    await page.goto(route.path, { waitUntil: 'networkidle' })
  }
  // Client-side navigation exercises the content queries in the browser too.
  await page.goto('/')
  await page
    .getByRole('link', { name: /Ver todos os projetos/ })
    .first()
    .click()
  await expect(page).toHaveURL('/projects')
  await page.waitForLoadState('networkidle')

  expect(errors).toEqual([])
  expect(wasm).toEqual([])
})
