<script setup lang="ts">
import { TECH, TECH_GROUPS } from '#shared/tech'

const { t } = useI18n()
const { data: content } = await useProfile()

const groups = computed(() => {
  const stack = content.value?.toolkit.stack.map((key) => ({ key, ...TECH[key] })) ?? []
  let index = 0
  return TECH_GROUPS.map((group) => ({
    group,
    items: stack.filter((tech) => tech.group === group).map((tech) => ({ ...tech, index: index++ })),
  })).filter(({ items }) => items.length > 0)
})
</script>

<template>
  <section v-if="content" aria-labelledby="toolkit-title" class="section-y">
    <div class="container-page grid gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20 xl:gap-28">
      <div>
        <UiSectionHeading
          id="toolkit-title"
          :title="t('toolkit.title')"
          :muted="t('toolkit.titleMuted')"
          stacked
        />
        <p class="mt-6 max-w-md text-lead text-text-subtle">{{ content.toolkit.description }}</p>

        <div data-reveal class="mt-12 flex flex-wrap gap-x-12 gap-y-10 md:mt-16">
          <div v-for="{ group, items } in groups" :key="group">
            <h3
              :id="`toolkit-${group}`"
              class="flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.08em] uppercase"
              :class="group === 'frontend' ? 'text-accent-800' : 'text-text-muted'"
            >
              <span
                aria-hidden="true"
                class="size-1.5 rounded-full"
                :class="group === 'frontend' ? 'bg-accent-500' : 'bg-ink-300'"
              />
              {{ t(`toolkit.groups.${group}`) }}
            </h3>
            <ul :aria-labelledby="`toolkit-${group}`" class="mt-4 flex flex-wrap gap-x-3 gap-y-5">
              <li
                v-for="tech in items"
                :key="tech.key"
                class="reveal-item group flex w-[4.5rem] flex-col items-center gap-2.5 text-center"
                :style="{ '--i': tech.index * 0.5 }"
              >
                <span
                  class="flex size-14 items-center justify-center rounded-2xl bg-surface shadow-soft ring-1 transition-transform duration-300 ease-out-expo hover-device:group-hover:-translate-y-1"
                  :class="group === 'frontend' ? 'text-ink-950 ring-accent-200' : 'text-ink-700 ring-line/80'"
                >
                  <Icon :name="tech.icon" class="size-6" />
                </span>
                <span
                  class="text-xs leading-tight"
                  :class="group === 'frontend' ? 'font-medium text-ink-900' : 'text-ink-600'"
                  >{{ tech.label }}</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div data-reveal class="lg:pt-3">
        <h3 class="text-eyebrow text-text-muted">{{ t('toolkit.capabilitiesLabel') }}</h3>
        <ul class="mt-6">
          <li
            v-for="(capability, i) in content.toolkit.capabilities"
            :key="capability.label"
            class="reveal-item flex items-center gap-4 border-b border-line/70 py-4 last:border-b-0"
            :style="{ '--i': i }"
          >
            <span
              class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-100"
            >
              <Icon :name="capability.icon" class="size-[1.1rem]" />
            </span>
            <span class="text-[1.0625rem] text-ink-900">{{ capability.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
