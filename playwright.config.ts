import { defineConfig, devices } from '@playwright/test'

/**
 * Runs against the static build (`bun run generate` first), served like Cloudflare Pages
 * by scripts/serve-static.ts. Uses the installed Chrome; override with E2E_CHANNEL.
 */
const port = Number(process.env.E2E_PORT ?? 4173)
const channel = process.env.E2E_CHANNEL ?? 'chrome'

export default defineConfig({
  testDir: 'test/e2e',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], channel, viewport: { width: 1440, height: 900 } },
    },
    { name: 'mobile', use: { ...devices['Pixel 7'], channel } },
  ],
  webServer: {
    command: `PORT=${port} bun scripts/serve-static.ts`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  },
})
