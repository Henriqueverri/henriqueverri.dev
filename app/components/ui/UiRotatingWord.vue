<script setup lang="ts">
/** Cycles through words visually; assistive tech reads only the first one, as part of the sentence. */
defineProps<{ words: string[] }>()
</script>

<template>
  <span class="rotating-word inline-grid overflow-hidden align-baseline">
    <span
      v-for="(word, i) in words"
      :key="word"
      :aria-hidden="i > 0 ? 'true' : undefined"
      class="pb-[0.08em] whitespace-nowrap"
      :style="{ '--i': i }"
      >{{ word }}</span
    >
  </span>
</template>
