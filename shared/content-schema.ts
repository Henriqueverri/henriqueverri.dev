import { z } from 'zod'
import { TECH_KEYS } from './tech'

const media = z.object({
  src: z.string().startsWith('/'),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  caption: z.string().optional(),
})

const yearMonth = z.string().regex(/^\d{4}(-\d{2})?$/, 'Use YYYY or YYYY-MM')

export const metricSchema = z.object({
  label: z.string(),
  value: z.string(),
  context: z.string(),
  /** Required on purpose: a number without a source is not published. */
  source: z.string().min(3),
  period: z.string().optional(),
})

const workFields = z.object({
  title: z.string(),
  headline: z.string(),
  summary: z.string(),
  type: z.enum(['professional', 'personal']),
  category: z.string(),
  detail: z.enum(['case', 'external']),
  externalUrl: z.string().url().optional(),
  status: z.enum(['published', 'draft']),
  featured: z.boolean().default(false),
  order: z.number(),
  accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),

  company: z.string().optional(),
  companyContext: z.string().optional(),
  role: z.string(),
  period: z.object({ start: yearMonth, end: yearMonth.optional() }).optional(),
  team: z.string().optional(),

  scope: z.array(z.string()).min(1),
  stack: z.array(z.enum(TECH_KEYS)).min(1),
  links: z
    .object({
      live: z.string().url().optional(),
      github: z.string().url().optional(),
      docs: z.string().url().optional(),
    })
    .default({}),

  confidentiality: z.enum(['public', 'restricted', 'confidential']),
  visuals: z.enum(['screenshots', 'recreated', 'none']),
  disclosure: z.string().optional(),

  cover: media.optional(),
  gallery: z.array(media).default([]),
  phases: z
    .array(
      z.object({
        title: z.string(),
        subtitle: z.string(),
        description: z.string(),
        points: z.array(z.string()).default([]),
        icon: z.string().optional(),
      }),
    )
    .default([]),
  decisions: z
    .array(z.object({ decision: z.string(), why: z.string().optional(), tradeoff: z.string() }))
    .default([]),
  outcomes: z.array(z.string()).min(1),
  outcomeNote: z.string().optional(),
  metrics: z.array(metricSchema).default([]),
  learnings: z.array(z.string()).default([]),
  seo: z.object({ title: z.string().optional(), description: z.string().optional() }).default({}),
})

/** Schema handed to @nuxt/content (no refinements, so the module can derive SQL columns). */
export const workSchema = workFields

/** Full validation, including cross-field rules. Used by the content tests. */
export const workSchemaStrict = workFields.superRefine((work, ctx) => {
  if (work.detail === 'external' && !work.externalUrl) {
    ctx.addIssue({ code: 'custom', path: ['externalUrl'], message: 'External items need externalUrl' })
  }
  if (work.visuals === 'none' && (work.cover || work.gallery.length)) {
    ctx.addIssue({ code: 'custom', path: ['visuals'], message: 'visuals: none cannot ship images' })
  }
  if (work.confidentiality !== 'public' && !work.disclosure) {
    ctx.addIssue({ code: 'custom', path: ['disclosure'], message: 'Restricted work needs a disclosure note' })
  }
  if (work.type === 'professional' && !work.company) {
    ctx.addIssue({ code: 'custom', path: ['company'], message: 'Professional cases need a company' })
  }
})

export type WorkData = z.infer<typeof workFields>
export type WorkMetric = z.infer<typeof metricSchema>

export const profileSchema = z.object({
  hero: z.object({
    status: z.string(),
    /** One short line under the name. */
    lead: z.string(),
  }),
  about: z.object({
    intro: z.string(),
    paragraphs: z.array(z.string()).min(1),
  }),
  toolkit: z.object({
    description: z.string(),
    stack: z.array(z.enum(TECH_KEYS)).min(1),
    capabilities: z.array(z.object({ icon: z.string(), label: z.string() })).min(1),
  }),
  contact: z.object({
    headline: z.string(),
    headlineMuted: z.string(),
    text: z.string(),
  }),
  footer: z.object({
    lead: z.string(),
    /** Exactly three: the footer cycle shows each word for 2s in a 6s loop. */
    words: z.array(z.string()).length(3),
    tail: z.string(),
  }),
  upcoming: z.object({
    title: z.string(),
    text: z.string(),
  }),
})

export type ProfileData = z.infer<typeof profileSchema>
