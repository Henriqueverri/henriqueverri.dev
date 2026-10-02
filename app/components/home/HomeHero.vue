<script setup lang="ts">
const { t } = useI18n()
const { profile } = useAppConfig()
const { data: content } = await useProfile()
</script>

<template>
  <section
    v-if="content"
    aria-labelledby="hero-title"
    class="relative overflow-x-clip pt-32 pb-8 xs:pt-36 md:pt-44 md:pb-12 lg:pt-52 lg:pb-16"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(50%_60%_at_75%_20%,var(--color-accent-100),transparent_70%)] opacity-50"
    />
    <div
      class="container-page grid items-center gap-14 motion:lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] motion:lg:gap-20"
    >
      <div>
        <p class="enter inline-flex items-center gap-2 text-sm text-text-muted">
          <span class="relative flex size-2">
            <span class="absolute inset-0 rounded-full bg-accent-500 opacity-60 motion:animate-ping" />
            <span class="relative size-2 rounded-full bg-accent-500" />
          </span>
          {{ content.hero.status }}
        </p>
        <h1 id="hero-title" class="hero-title enter mt-6 text-ink-950" style="--i: 1">
          <span class="block">{{ profile.name }}</span>
          <span class="block text-text-faint">{{ t('hero.portfolio') }}</span>
        </h1>
        <p class="enter mt-6 text-lead text-text-subtle" style="--i: 2">{{ content.hero.lead }}</p>
        <div class="enter mt-10 flex flex-wrap gap-3" style="--i: 3">
          <UiButton href="#work" icon-right="lucide:arrow-down">{{ t('hero.primary') }}</UiButton>
          <UiButton :href="profile.links.github" variant="secondary" icon="simple-icons:github">
            {{ t('hero.github') }}
          </UiButton>
        </div>
      </div>

      <!-- Landing spot of the featured work stack; only exists when motion is on. -->
      <div class="hidden justify-center motion:flex">
        <div data-stack-target class="relative aspect-[4/3] w-[min(72vw,17rem)] sm:w-[19rem] lg:w-full">
          <div
            aria-hidden="true"
            class="absolute inset-[-15%] -z-10 rounded-full bg-[radial-gradient(closest-side,var(--color-accent-200),transparent)] opacity-50 blur-2xl"
          />
          <a href="#work" tabindex="-1" aria-hidden="true" class="absolute inset-0 rounded-3xl">
            <span class="sr-only">{{ t('hero.toWork') }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
