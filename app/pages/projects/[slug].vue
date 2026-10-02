<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const siteUrl = useRuntimeConfig().public.siteUrl

const slug = computed(() => String(route.params.slug))
const { data: work } = await useWorkItem(slug)

if (!work.value) {
  throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })
}

provide(
  caseKey,
  computed(() => work.value),
)

const { data: works } = await useWorkList()
const { data: profile } = await useProfile()
const related = computed(() => (work.value ? relatedWork(works.value, work.value.path) : []))

usePageSeo({
  title: () => work.value?.seo?.title ?? work.value?.title ?? '',
  description: () => work.value?.seo?.description ?? work.value?.summary ?? '',
  image: () => `/og/work-${slug.value}-${locale.value}.png`,
  type: 'article',
  jsonLd: () => {
    const item = work.value
    if (!item) return []
    const url = `${siteUrl}${localePath(`/projects/${slug.value}`)}`
    return [
      {
        '@type': 'CreativeWork',
        name: item.title,
        headline: item.headline,
        description: item.summary,
        url,
        inLanguage: locale.value === 'en' ? 'en-US' : 'pt-BR',
        author: { '@type': 'Person', name: 'Henrique Verri', url: siteUrl },
        keywords: item.scope.join(', '),
        ...(item.links?.github ? { codeRepository: item.links?.github } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('nav.home'),
            item: `${siteUrl}${localePath('/')}`.replace(/\/$/, ''),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('projects.title'),
            item: `${siteUrl}${localePath('/projects')}`,
          },
          { '@type': 'ListItem', position: 3, name: item.title, item: url },
        ],
      },
    ]
  },
})
</script>

<template>
  <div v-if="work">
    <CaseHero :work="work" />
    <ContentRenderer :value="work" tag="article" class="case-body section-y-sm" />
    <section v-if="related.length || profile" aria-labelledby="more-title" class="section-y-sm">
      <WorkCarousel :items="related" :upcoming="profile?.upcoming">
        <template #heading>
          <h2 id="more-title" class="text-heading text-ink-950">{{ t('case.more') }}</h2>
        </template>
      </WorkCarousel>
    </section>
    <ContactCard />
  </div>
</template>
