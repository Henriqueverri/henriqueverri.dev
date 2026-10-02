<script setup lang="ts">
/** `:case-outcome` — qualitative outcomes, plus metrics only when the case documents them with a source. */
const work = useCaseData()
const { t } = useI18n()
const id = useId()

const outcomes = computed(() => work.value?.outcomes ?? [])
</script>

<template>
  <section v-if="work && outcomes.length" class="case-block my-16 md:my-24" :aria-labelledby="`${id}-title`">
    <div class="container-page">
      <h2 :id="`${id}-title`" class="case-section-title">
        {{ t('case.outcome') }} <span class="text-text-faint">{{ t('case.outcomeMuted') }}</span>
      </h2>

      <ul class="mt-8 grid gap-3 md:grid-cols-2">
        <li
          v-for="(outcome, i) in outcomes"
          :key="outcome"
          data-reveal="self"
          class="flex gap-4 rounded-[1.25rem] bg-surface-muted p-5 ring-1 ring-line sm:p-6"
          :style="{ '--i': i % 2 }"
        >
          <span
            class="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-100 text-accent-700"
          >
            <Icon name="lucide:check" class="size-4" />
          </span>
          <span class="leading-relaxed text-ink-800">{{ outcome }}</span>
        </li>
      </ul>

      <p
        v-if="work.outcomeNote"
        class="mt-5 flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
      >
        <Icon name="lucide:info" class="mt-0.5 size-4 shrink-0" />
        {{ work.outcomeNote }}
      </p>

      <CaseMetrics :metrics="work.metrics ?? []" class="mt-12" />
    </div>
  </section>
</template>
