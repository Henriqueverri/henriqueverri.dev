<script setup lang="ts">
/** Horizontal, swipeable list (native scroll-snap). Buttons only page through it on pointer devices. */
defineProps<{ items: WorkItem[]; upcoming?: { title: string; text: string } }>()

const { t } = useI18n()
const track = ref<HTMLElement | null>(null)
const atStart = ref(true)
const atEnd = ref(false)

function update() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft <= 4
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
}

function page(direction: 1 | -1) {
  const el = track.value
  if (!el) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: reduced ? 'auto' : 'smooth' })
}

let observer: ResizeObserver | undefined
onMounted(() => {
  update()
  observer = new ResizeObserver(update)
  if (track.value) observer.observe(track.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div>
    <div class="container-page flex items-end justify-between gap-4">
      <slot name="heading" />
      <div v-if="!(atStart && atEnd)" class="hidden gap-2 md:flex">
        <button
          v-for="dir in [-1, 1] as const"
          :key="dir"
          type="button"
          :disabled="dir === -1 ? atStart : atEnd"
          class="flex size-11 items-center justify-center rounded-full bg-surface text-ink-800 shadow-soft ring-1 ring-line transition-opacity disabled:opacity-40"
          @click="page(dir)"
        >
          <Icon :name="dir === -1 ? 'lucide:arrow-left' : 'lucide:arrow-right'" class="size-4.5" />
          <span class="sr-only">{{ dir === -1 ? t('a11y.previous') : t('a11y.next') }}</span>
        </button>
      </div>
    </div>
    <div class="container-page mt-8 md:mt-10">
      <ul
        ref="track"
        :aria-label="t('a11y.carousel')"
        class="-mx-6 flex snap-x snap-mandatory scroll-px-6 [scrollbar-width:none] gap-4 overflow-x-auto px-6 pb-4 md:-mx-11 md:scroll-px-11 md:gap-6 md:px-11 [&::-webkit-scrollbar]:hidden"
        @scroll.passive="update"
      >
        <li
          v-for="work in items"
          :key="work.path"
          class="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] md:w-[calc(50%-0.75rem)]"
        >
          <WorkCard :work="work" />
        </li>
        <li
          v-if="upcoming"
          class="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] md:w-[calc(50%-0.75rem)]"
        >
          <UpcomingCard :title="upcoming.title" :text="upcoming.text" />
        </li>
      </ul>
    </div>
  </div>
</template>
