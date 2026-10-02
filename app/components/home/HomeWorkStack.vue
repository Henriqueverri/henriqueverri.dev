<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { data: works } = await useWorkList()
const { data: profile } = await useProfile()

const featured = computed(() => works.value.filter((work) => work.featured))
const showUpcoming = computed(() => !!profile.value && homeGridNeedsPlaceholder(featured.value.length))

const section = ref<HTMLElement | null>(null)
useStackReveal(section)
</script>

<template>
  <section id="work" ref="section" data-stack aria-labelledby="work-title" class="relative z-10 section-y">
    <div class="container-page">
      <div class="flex items-end justify-between gap-6">
        <UiSectionHeading id="work-title" :title="t('work.heading')" split="letters" />
        <UiButton
          :to="localePath('/projects')"
          variant="ghost"
          size="sm"
          icon-right="lucide:arrow-right"
          class="max-md:hidden"
        >
          {{ t('work.viewAll') }}
        </UiButton>
      </div>

      <ul class="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
        <li
          v-for="(work, i) in featured"
          :key="work.path"
          data-stack-item
          class="relative"
          :class="{ 'md:col-span-2': i === 0 }"
          :style="{ zIndex: featured.length + 1 - i }"
        >
          <div data-stack-card class="h-full origin-center">
            <WorkCard :work="work" :wide="i === 0" :priority="i === 0" />
          </div>
        </li>
        <li v-if="showUpcoming && profile" data-stack-item class="relative z-0">
          <div data-stack-card class="h-full origin-center">
            <UpcomingCard :title="profile.upcoming.title" :text="profile.upcoming.text" />
          </div>
        </li>
      </ul>

      <div class="mt-8 md:hidden">
        <UiButton
          :to="localePath('/projects')"
          variant="secondary"
          icon-right="lucide:arrow-right"
          class="w-full"
        >
          {{ t('work.viewAll') }}
        </UiButton>
      </div>
    </div>
  </section>
</template>
