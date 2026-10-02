<script setup lang="ts">
/** `:case-decisions` — each decision with its reason (when documented) and its trade-off. */
const work = useCaseData()
const { t } = useI18n()
const id = useId()

const decisions = computed(() => work.value?.decisions ?? [])
</script>

<template>
  <section v-if="decisions.length" class="case-block my-16 md:my-24" :aria-labelledby="`${id}-title`">
    <div class="container-page">
      <h3 :id="`${id}-title`" class="text-title text-ink-950">
        {{ t('case.decisions') }} <span class="text-text-faint">{{ t('case.decisionsMuted') }}</span>
      </h3>
      <ol class="mt-8 grid gap-4 md:grid-cols-2">
        <li
          v-for="(item, i) in decisions"
          :key="item.decision"
          data-reveal="self"
          class="flex flex-col rounded-[1.25rem] bg-surface p-6 shadow-soft ring-1 ring-line sm:p-7"
          :style="{ '--i': i % 2 }"
        >
          <span class="text-eyebrow text-text-muted">{{ String(i + 1).padStart(2, '0') }}</span>
          <h4 class="mt-3 text-lg leading-snug font-medium tracking-tight text-ink-950">
            {{ item.decision }}
          </h4>
          <p v-if="item.why" class="mt-3 text-[0.9375rem] leading-relaxed text-text-subtle">
            <span class="font-medium text-ink-900">{{ t('case.why') }}:</span> {{ item.why }}
          </p>
          <p
            class="mt-4 flex gap-3 border-t border-line pt-4 text-[0.9375rem] leading-relaxed text-text-subtle"
          >
            <Icon name="lucide:scale" class="mt-0.5 size-4.5 shrink-0 text-accent-700" />
            <span
              ><span class="font-medium text-ink-900">{{ t('case.tradeoff') }}:</span>
              {{ item.tradeoff }}</span
            >
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>
