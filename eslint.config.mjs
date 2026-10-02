// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['.output/**', 'dist/**', 'coverage/**', 'test-results/**', 'playwright-report/**'],
})
