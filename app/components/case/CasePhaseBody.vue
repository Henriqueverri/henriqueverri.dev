<script setup lang="ts">
defineProps<{ phase: NonNullable<WorkItem['phases']>[number]; index: number }>()

const { t } = useI18n()
</script>

<template>
  <div>
    <div class="flex items-center gap-3">
      <span
        class="flex size-10 items-center justify-center rounded-full bg-surface text-ink-800 shadow-soft ring-1 ring-line"
      >
        <Icon :name="phase.icon ?? 'lucide:circle-dot'" class="size-[1.1rem]" />
      </span>
      <span class="text-eyebrow text-text-muted">{{
        t('case.phaseLabel', { n: String(index + 1).padStart(2, '0') })
      }}</span>
    </div>
    <p class="mt-6 text-sm font-medium text-accent-700">{{ phase.subtitle }}</p>
    <h4 class="mt-1 text-title text-ink-950">{{ phase.title }}</h4>
    <p class="mt-4 leading-relaxed text-text-subtle">{{ phase.description }}</p>
    <ul v-if="phase.points?.length" class="mt-5 space-y-2.5">
      <li
        v-for="point in phase.points"
        :key="point"
        class="flex gap-3 text-[0.9375rem] leading-relaxed text-text-subtle"
      >
        <Icon name="lucide:arrow-right" class="mt-1 size-4 shrink-0 text-ink-400" />
        <span>{{ point }}</span>
      </li>
    </ul>
  </div>
</template>
