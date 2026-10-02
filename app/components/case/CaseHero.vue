<script setup lang="ts">
import { TECH } from '#shared/tech'

const props = defineProps<{ work: WorkItem }>()

const { t, locale } = useI18n()
const localePath = useLocalePath()

const meta = computed(() =>
  [
    props.work.company
      ? { label: t('case.company'), value: props.work.company, note: props.work.companyContext }
      : null,
    { label: t('case.role'), value: props.work.role, note: props.work.team },
    props.work.period
      ? {
          label: t('case.period'),
          value: formatPeriod(props.work.period, locale.value, t('case.present')),
          note: undefined,
        }
      : null,
    { label: t('case.type'), value: t(`work.type.${props.work.type}`), note: undefined },
  ].filter((item) => item !== null),
)

const stack = computed(() => props.work.stack.map((key) => ({ key, ...TECH[key] })))
</script>

<template>
  <section class="page-top">
    <div class="container-page">
      <NuxtLink
        :to="localePath('/projects')"
        class="enter-left inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover-device:hover:text-ink-950"
      >
        <Icon name="lucide:arrow-left" class="size-4" />
        {{ t('case.back') }}
      </NuxtLink>

      <p class="enter mt-10 text-eyebrow text-text-muted">
        {{ t(`work.type.${work.type}`) }} · {{ work.category }}
      </p>
      <h1 class="enter mt-4 text-display text-ink-950" style="--i: 1">{{ work.title }}</h1>
      <p
        class="enter mt-4 max-w-3xl text-title text-text-faint md:text-[2.125rem] md:leading-[1.15]"
        style="--i: 2"
      >
        {{ work.headline }}
      </p>

      <div class="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div class="enter" style="--i: 3">
          <p class="max-w-2xl text-lead text-text-subtle">{{ work.summary }}</p>
          <div
            v-if="work.links?.live || work.links?.github || work.links?.docs"
            class="mt-8 flex flex-wrap gap-3"
          >
            <UiButton v-if="work.links?.live" :href="work.links?.live" icon-right="lucide:arrow-up-right">
              {{ t('case.live') }}
            </UiButton>
            <UiButton
              v-if="work.links?.github"
              :href="work.links?.github"
              variant="secondary"
              icon="simple-icons:github"
            >
              {{ t('case.github') }}
            </UiButton>
            <UiButton
              v-if="work.links?.docs"
              :href="work.links?.docs"
              variant="ghost"
              icon="lucide:book-open"
            >
              {{ t('case.docs') }}
            </UiButton>
          </div>
          <ul class="mt-8 flex flex-wrap gap-2" :aria-label="t('case.scope')">
            <li v-for="item in work.scope" :key="item">
              <UiTag>{{ item }}</UiTag>
            </li>
          </ul>
        </div>

        <dl
          class="enter grid content-start gap-5 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-1 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8"
          style="--i: 4"
        >
          <div v-for="item in meta" :key="item.label">
            <dt class="text-eyebrow text-text-muted">{{ item.label }}</dt>
            <dd class="mt-1.5 text-ink-950">{{ item.value }}</dd>
            <dd v-if="item.note" class="mt-1 text-sm leading-snug text-text-muted">{{ item.note }}</dd>
          </div>
          <div class="sm:col-span-2 lg:col-span-1">
            <dt class="text-eyebrow text-text-muted">{{ t('case.stack') }}</dt>
            <dd class="mt-2.5">
              <ul class="flex flex-wrap gap-1.5">
                <li
                  v-for="tech in stack"
                  :key="tech.key"
                  class="inline-flex items-center gap-1.5 rounded-full bg-surface-muted px-2.5 py-1 text-xs text-ink-700 ring-1 ring-line"
                >
                  <Icon :name="tech.icon" class="size-3" />
                  {{ tech.label }}
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>

      <aside
        v-if="work.disclosure"
        class="enter mt-12 flex gap-4 rounded-[1.25rem] bg-surface-muted p-5 ring-1 ring-line sm:p-6"
        style="--i: 5"
        :aria-label="t('case.disclosure')"
      >
        <span
          class="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-ink-700 ring-1 ring-line"
        >
          <Icon name="lucide:lock" class="size-4" />
        </span>
        <div>
          <p class="font-medium text-ink-950">{{ t('case.disclosure') }}</p>
          <p class="mt-1 max-w-3xl text-sm leading-relaxed text-text-subtle">{{ work.disclosure }}</p>
        </div>
      </aside>

      <div
        class="enter mt-12 overflow-hidden rounded-[1.5rem] bg-ink-100 shadow-card ring-1 ring-black/5 md:mt-16 md:rounded-[2rem]"
        :class="work.cover ? 'aspect-[4/3] md:aspect-[16/9]' : 'aspect-[16/9] md:aspect-[21/8]'"
        style="--i: 6"
      >
        <WorkCover :work="work" priority sizes="xs:100vw lg:1100px" />
      </div>
    </div>
  </section>
</template>
