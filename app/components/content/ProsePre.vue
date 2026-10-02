<script setup lang="ts">
/** Code blocks scroll horizontally on small screens, so they must be reachable by keyboard. */
defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
  class?: string | null
}>()
</script>

<template>
  <pre tabindex="0" :class="$props.class"><slot /></pre>
</template>
