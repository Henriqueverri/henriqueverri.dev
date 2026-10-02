import { defineCollection, defineContentConfig } from '@nuxt/content'
import { profileSchema, workSchema } from './shared/content-schema'

export default defineContentConfig({
  collections: {
    work_pt: defineCollection({ type: 'page', source: 'pt/work/*.md', schema: workSchema }),
    work_en: defineCollection({ type: 'page', source: 'en/work/*.md', schema: workSchema }),
    profile_pt: defineCollection({ type: 'data', source: 'pt/profile.yml', schema: profileSchema }),
    profile_en: defineCollection({ type: 'data', source: 'en/profile.yml', schema: profileSchema }),
  },
})
