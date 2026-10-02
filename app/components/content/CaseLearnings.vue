<script setup lang="ts">
/** `:case-learnings` */
const work = useCaseData()
const { t } = useI18n()
const id = useId()

const learnings = computed(() => work.value?.learnings ?? [])
</script>

<template>
  <section v-if="learnings.length" class="case-block my-16 md:my-24" :aria-labelledby="`${id}-title`">
    <div class="container-page">
      <h2 :id="`${id}-title`" class="case-section-title">{{ t('case.learnings') }}</h2>
      <ol class="mt-8 divide-y divide-line border-y border-line">
        <li
          v-for="(learning, i) in learnings"
          :key="learning"
          data-reveal="self"
          class="grid gap-3 py-7 md:grid-cols-[6rem_minmax(0,1fr)] md:py-9"
        >
          <span class="font-mono text-sm text-text-muted">{{ String(i + 1).padStart(2, '0') }}</span>
          <p class="max-w-3xl text-lead text-ink-900">{{ learning }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
