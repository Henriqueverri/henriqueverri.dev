<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const siteUrl = useRuntimeConfig().public.siteUrl
const { data: works } = await useWorkList()
const { data: profile } = await useProfile()

const groups = computed(() => [
  {
    key: 'professional',
    title: t('projects.professional'),
    text: t('projects.professionalText'),
    items: works.value.filter((work) => work.type === 'professional'),
    upcoming: profile.value?.upcoming,
  },
  {
    key: 'personal',
    title: t('projects.personal'),
    text: t('projects.personalText'),
    items: works.value.filter((work) => work.type === 'personal'),
    upcoming: undefined,
  },
])

usePageSeo({
  title: () => t('seo.projectsTitle'),
  description: () => t('seo.projectsDescription'),
  image: () => `/og/projects-${locale.value}.png`,
  jsonLd: () => [
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
      ],
    },
  ],
})
</script>

<template>
  <div>
    <section class="page-top">
      <div class="container-page">
        <h1 class="enter max-w-4xl text-display text-ink-950">
          {{ t('projects.title') }} <span class="text-text-faint">{{ t('projects.titleMuted') }}</span>
        </h1>
        <p class="enter mt-6 max-w-2xl text-lead text-text-subtle" style="--i: 1">
          {{ t('projects.intro') }}
        </p>
      </div>
    </section>

    <section
      v-for="group in groups"
      :key="group.key"
      :aria-labelledby="`group-${group.key}`"
      class="section-y-sm"
    >
      <div class="container-page">
        <div
          data-reveal
          class="flex flex-col gap-2 border-t border-line pt-6 md:flex-row md:items-baseline md:justify-between"
        >
          <h2 :id="`group-${group.key}`" class="reveal-item text-title text-ink-950">{{ group.title }}</h2>
          <p class="reveal-item max-w-md text-text-muted md:text-right" style="--i: 1">{{ group.text }}</p>
        </div>
        <ul class="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
          <li
            v-for="(work, i) in group.items"
            :key="work.path"
            data-reveal="self"
            :class="{ 'md:col-span-2': spansFullRow(i, group.items.length + (group.upcoming ? 1 : 0)) }"
            :style="{ '--i': i }"
          >
            <WorkCard
              :work="work"
              :wide="spansFullRow(i, group.items.length + (group.upcoming ? 1 : 0))"
              :priority="i === 0 && group.key === 'professional'"
            />
          </li>
          <li v-if="group.upcoming" data-reveal="self" :style="{ '--i': group.items.length }">
            <UpcomingCard :title="group.upcoming.title" :text="group.upcoming.text" />
          </li>
        </ul>
      </div>
    </section>
    <ContactCard />
  </div>
</template>
