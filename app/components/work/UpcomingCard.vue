<script setup lang="ts">
withDefaults(defineProps<{ title: string; text: string; headingLevel?: 'h2' | 'h3' }>(), {
  headingLevel: 'h3',
})
</script>

<template>
  <article
    class="relative flex aspect-[4/3] h-full flex-col justify-between overflow-hidden rounded-[1.25rem] border border-dashed border-line-strong bg-surface-muted p-5 md:rounded-[1.5rem] md:p-6"
  >
    <div aria-hidden="true" class="absolute inset-0 bg-noise opacity-[0.04]" />
    <span
      class="relative flex size-11 items-center justify-center rounded-full bg-surface text-ink-700 shadow-soft ring-1 ring-line"
    >
      <Icon name="lucide:file-pen-line" class="size-5" />
    </span>
    <div class="relative">
      <component :is="headingLevel" class="text-xl font-medium tracking-tight text-ink-950 md:text-2xl">
        {{ title }}
      </component>
      <p class="mt-2 max-w-sm text-sm leading-relaxed text-text-muted">{{ text }}</p>
    </div>
  </article>
</template>
