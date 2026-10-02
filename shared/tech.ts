/**
 * Technologies that can appear in the toolkit and in a work item's stack.
 * Content files reference the keys; the schema rejects unknown keys so every chip has an icon.
 * `group` only orders the home toolkit; frontend comes first because it is the main focus.
 */
export const TECH_GROUPS = ['frontend', 'quality', 'backend', 'design'] as const

export type TechGroup = (typeof TECH_GROUPS)[number]

export const TECH = {
  vue: { label: 'Vue.js', icon: 'simple-icons:vuedotjs', group: 'frontend' },
  nuxt: { label: 'Nuxt', icon: 'simple-icons:nuxt', group: 'frontend' },
  typescript: { label: 'TypeScript', icon: 'simple-icons:typescript', group: 'frontend' },
  pinia: { label: 'Pinia', icon: 'simple-icons:pinia', group: 'frontend' },
  tailwindcss: { label: 'Tailwind CSS', icon: 'simple-icons:tailwindcss', group: 'frontend' },
  vitest: { label: 'Vitest', icon: 'simple-icons:vitest', group: 'quality' },
  playwright: { label: 'Playwright', icon: 'simple-icons:playwright', group: 'quality' },
  githubactions: { label: 'GitHub Actions', icon: 'simple-icons:githubactions', group: 'quality' },
  laravel: { label: 'Laravel', icon: 'simple-icons:laravel', group: 'backend' },
  php: { label: 'PHP', icon: 'simple-icons:php', group: 'backend' },
  postgresql: { label: 'PostgreSQL', icon: 'simple-icons:postgresql', group: 'backend' },
  docker: { label: 'Docker', icon: 'simple-icons:docker', group: 'backend' },
  cloudflare: { label: 'Cloudflare', icon: 'simple-icons:cloudflare', group: 'backend' },
  figma: { label: 'Figma', icon: 'simple-icons:figma', group: 'design' },
} as const satisfies Record<string, { label: string; icon: string; group: TechGroup }>

export type TechKey = keyof typeof TECH

export const TECH_KEYS = Object.keys(TECH) as [TechKey, ...TechKey[]]
