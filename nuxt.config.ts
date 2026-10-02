import tailwindcss from '@tailwindcss/vite'

const siteUrl = 'https://henriqueverri.dev'

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/i18n', '@nuxt/image', '@nuxt/icon', '@nuxtjs/sitemap', '@nuxt/eslint'],

  components: [
    { path: '~/components/content', global: true, pathPrefix: false },
    { path: '~/components', pathPrefix: false },
  ],

  devtools: { enabled: true },

  app: {
    viewTransition: true,
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'author', content: 'Henrique Verri' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },

  css: [
    '@fontsource-variable/geist/wght.css',
    '@fontsource-variable/geist-mono/wght.css',
    '~/assets/css/main.css',
  ],

  site: {
    url: siteUrl,
    name: 'Henrique Verri',
  },

  runtimeConfig: {
    public: {
      siteUrl,
    },
  },

  compatibilityDate: '2026-09-01',

  typescript: {
    nodeTsConfig: {
      compilerOptions: {
        types: ['bun'],
        paths: { '#shared/*': ['../shared/*'] },
      },
      include: [
        '../test/unit/**/*',
        '../test/e2e/**/*',
        '../scripts/**/*',
        '../vitest.config.ts',
        '../playwright.config.ts',
        '../content.config.ts',
      ],
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en', '/sitemap_index.xml'],
      failOnError: true,
      // Cloudflare Pages serves `projects.html` at `/projects`, so URLs stay without a trailing slash.
      autoSubfolderIndex: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
    build: {
      markdown: {
        highlight: false,
      },
    },
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },

  i18n: {
    baseUrl: siteUrl,
    defaultLocale: 'pt',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'pt', language: 'pt-BR', name: 'Português', file: 'pt.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
  },

  icon: {
    mode: 'svg',
    serverBundle: { collections: ['lucide', 'simple-icons'] },
    // Static hosting has no icon endpoint: every icon, including those named in content, ships in the bundle.
    clientBundle: {
      scan: { globInclude: ['app/**/*.{vue,ts}', 'shared/**/*.ts', 'content/**/*.{md,yml}'] },
      sizeLimitKb: 96,
    },
  },

  image: {
    quality: 78,
    format: ['avif', 'webp'],
    screens: { xs: 480, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },
  },

  sitemap: {
    exclude: ['/404', '/en/404'],
  },
})
