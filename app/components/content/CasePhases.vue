<script setup lang="ts">
/**
 * `:case-phases` — vertical tabs on large screens, a plain list everywhere else (and before
 * hydration, so the content never depends on JavaScript).
 */
const work = useCaseData()
const { t } = useI18n()
const id = useId()

const phases = computed(() => work.value?.phases ?? [])
const active = ref(0)
const tabsMode = ref(false)
const tabs = ref<HTMLButtonElement[]>([])

let media: MediaQueryList | undefined
const syncMode = () => (tabsMode.value = !!media?.matches)

onMounted(() => {
  media = window.matchMedia('(min-width: 1024px)')
  syncMode()
  media.addEventListener('change', syncMode)
})
onBeforeUnmount(() => media?.removeEventListener('change', syncMode))

function select(index: number, focus = false) {
  const count = phases.value.length
  active.value = (index + count) % count
  if (focus) tabs.value[active.value]?.focus()
}

function onKeydown(event: KeyboardEvent) {
  const moves: Record<string, number> = {
    ArrowDown: active.value + 1,
    ArrowRight: active.value + 1,
    ArrowUp: active.value - 1,
    ArrowLeft: active.value - 1,
    Home: 0,
    End: phases.value.length - 1,
  }
  const next = moves[event.key]
  if (next === undefined) return
  event.preventDefault()
  select(next, true)
}
</script>

<template>
  <section v-if="phases.length" class="case-block my-16 md:my-24" :aria-labelledby="`${id}-title`">
    <div class="container-page">
      <h3 :id="`${id}-title`" class="text-title text-ink-950">
        {{ t('case.phases') }} <span class="text-text-faint">{{ t('case.phasesMuted') }}</span>
      </h3>

      <div v-if="tabsMode" class="mt-10 grid grid-cols-[17rem_minmax(0,1fr)] gap-8">
        <div
          role="tablist"
          aria-orientation="vertical"
          :aria-labelledby="`${id}-title`"
          class="relative flex flex-col"
        >
          <span
            aria-hidden="true"
            class="absolute top-0 left-0 w-0.5 rounded-full bg-ink-950 transition-transform duration-500 ease-out-expo"
            :style="{ height: `${100 / phases.length}%`, transform: `translateY(${active * 100}%)` }"
          />
          <button
            v-for="(phase, i) in phases"
            :id="`${id}-tab-${i}`"
            :key="phase.title"
            ref="tabs"
            type="button"
            role="tab"
            :aria-selected="i === active"
            :aria-controls="`${id}-panel`"
            :tabindex="i === active ? 0 : -1"
            class="group flex h-[4.75rem] flex-col justify-center border-l border-line pl-6 text-left transition-colors"
            @click="select(i)"
            @keydown="onKeydown"
          >
            <span class="text-eyebrow text-text-muted">{{ String(i + 1).padStart(2, '0') }}</span>
            <span
              class="mt-1 text-lg tracking-tight transition-colors"
              :class="i === active ? 'text-ink-950' : 'text-ink-500 group-hover:text-ink-800'"
            >
              {{ phase.title }}
            </span>
          </button>
        </div>

        <div
          :id="`${id}-panel`"
          role="tabpanel"
          :aria-labelledby="`${id}-tab-${active}`"
          tabindex="0"
          class="min-h-full rounded-[1.5rem] bg-surface-muted p-10 ring-1 ring-line"
        >
          <Transition
            mode="out-in"
            enter-from-class="translate-y-2 opacity-0"
            enter-active-class="transition-[opacity,transform] duration-400 ease-out-expo"
            leave-active-class="transition-opacity duration-150"
            leave-to-class="opacity-0"
          >
            <CasePhaseBody :key="active" :phase="phases[active]!" :index="active" class="max-w-2xl" />
          </Transition>
        </div>
      </div>

      <ol v-else class="mt-8 grid gap-4 md:grid-cols-2">
        <li
          v-for="(phase, i) in phases"
          :key="phase.title"
          class="rounded-[1.25rem] bg-surface-muted p-6 ring-1 ring-line sm:p-7"
        >
          <CasePhaseBody :phase="phase" :index="i" />
        </li>
      </ol>
    </div>
  </section>
</template>
