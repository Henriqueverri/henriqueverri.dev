<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'outline' | 'solid' | 'glass'; icon?: string }>(), {
  variant: 'outline',
  icon: undefined,
})
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full text-xs leading-none font-medium whitespace-nowrap"
    :class="{
      'bg-surface px-3 py-1.5 text-ink-700 ring-1 ring-line': variant === 'outline',
      'bg-ink-950 px-3 py-1.5 text-white': variant === 'solid',
      'bg-ink-950/55 px-2.5 py-1.5 text-white ring-1 ring-white/15 backdrop-blur-md': variant === 'glass',
    }"
  >
    <Icon v-if="icon" :name="icon" class="size-3.5 shrink-0" />
    <slot />
  </span>
</template>
