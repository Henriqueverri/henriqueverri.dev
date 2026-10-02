<script setup lang="ts">
import { TECH } from '#shared/tech'

/**
 * Real screenshot when the work ships one; otherwise an abstract cover built from the case's own
 * data (accent, title, stack). Nothing here pretends to be a screenshot of a confidential product.
 */
const props = withDefaults(
  defineProps<{
    work: Pick<WorkItem, 'title' | 'cover' | 'accent' | 'stack' | 'confidentiality' | 'category'>
    sizes?: string
    priority?: boolean
  }>(),
  { sizes: 'xs:100vw md:50vw lg:600px', priority: false },
)

const stackIcons = computed(() => props.work.stack.slice(0, 4).map((key) => TECH[key]))
</script>

<template>
  <NuxtPicture
    v-if="work.cover"
    legacy-format="webp"
    :src="work.cover.src"
    :alt="work.cover.alt"
    :width="work.cover.width"
    :height="work.cover.height"
    :sizes="sizes"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : 'auto'"
    class="block size-full"
    :img-attrs="{ class: 'size-full object-cover object-top' }"
  />
  <div
    v-else
    class="relative flex size-full items-center justify-center overflow-hidden bg-ink-950"
    :style="{ '--accent': work.accent }"
  >
    <div
      aria-hidden="true"
      class="absolute inset-0 opacity-90"
      style="
        background:
          radial-gradient(
            60% 70% at 85% 10%,
            color-mix(in oklab, var(--accent) 70%, transparent),
            transparent 70%
          ),
          radial-gradient(
            50% 60% at 0% 100%,
            color-mix(in oklab, var(--accent) 35%, transparent),
            transparent 70%
          );
      "
    />
    <div
      aria-hidden="true"
      class="absolute inset-0 [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] bg-[size:36px_36px]"
    />
    <div aria-hidden="true" class="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay" />
    <span
      aria-hidden="true"
      class="relative text-[clamp(3rem,10vw,6.5rem)] font-semibold tracking-[-0.06em] text-white/90"
    >
      {{ work.title }}
    </span>
    <ul aria-hidden="true" class="absolute top-4 right-4 flex gap-1.5 md:top-5 md:right-5">
      <li
        v-for="tech in stackIcons"
        :key="tech.label"
        class="flex size-8 items-center justify-center rounded-full bg-white/10 text-white/80 ring-1 ring-white/15 backdrop-blur"
      >
        <Icon :name="tech.icon" class="size-3.5" />
      </li>
    </ul>
  </div>
</template>
