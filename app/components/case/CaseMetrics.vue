<script setup lang="ts">
import type { WorkMetric } from '#shared/content-schema'

/** Documented numbers only: every metric carries its source (enforced by the content schema). */
defineProps<{ metrics: WorkMetric[] }>()

const { t } = useI18n()
</script>

<template>
  <div v-if="metrics.length">
    <h3 class="text-eyebrow text-text-muted">{{ t('case.metrics') }}</h3>
    <ul
      class="mt-5 grid gap-px overflow-hidden rounded-[1.25rem] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4"
    >
      <li v-for="metric in metrics" :key="metric.label" class="flex flex-col bg-surface p-6">
        <p class="text-[2.5rem] leading-none font-medium tracking-[-0.04em] text-ink-950">
          {{ metric.value }}
        </p>
        <p class="mt-4 font-medium text-ink-900">{{ metric.label }}</p>
        <p class="mt-2 text-sm leading-relaxed text-text-muted">{{ metric.context }}</p>
        <p class="mt-auto pt-5 font-mono text-[0.6875rem] leading-snug text-text-muted">
          {{ t('case.source') }}: {{ metric.source
          }}<template v-if="metric.period"> · {{ metric.period }}</template>
        </p>
      </li>
    </ul>
  </div>
</template>
