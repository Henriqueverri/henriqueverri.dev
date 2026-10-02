<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

const isNotFound = computed(() => props.error.statusCode === 404)
const title = computed(() => (isNotFound.value ? t('error.title') : t('error.generic')))

useHead({ title, meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <NuxtLayout>
    <section class="section-y-sm page-top">
      <div class="container-page">
        <p class="enter text-eyebrow text-text-muted">{{ error.statusCode }}</p>
        <h1 class="enter mt-4 max-w-3xl text-display text-ink-950" style="--i: 1">{{ title }}</h1>
        <p v-if="isNotFound" class="enter mt-6 max-w-xl text-lead text-text-subtle" style="--i: 2">
          {{ t('error.text') }}
        </p>
        <div class="enter mt-10 flex flex-wrap gap-3" style="--i: 3">
          <UiButton :to="localePath('/')" icon="lucide:arrow-left">{{ t('error.back') }}</UiButton>
          <UiButton :to="localePath('/projects')" variant="secondary">{{ t('nav.work') }}</UiButton>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
