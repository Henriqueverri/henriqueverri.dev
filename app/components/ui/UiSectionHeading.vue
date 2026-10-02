<script setup lang="ts">
/**
 * Section title revealed word by word (or letter by letter) on scroll.
 * Words remain real text, so screen readers and search engines read the plain sentence.
 */
const props = withDefaults(
  defineProps<{
    title: string
    muted?: string
    as?: 'h1' | 'h2' | 'h3'
    split?: 'words' | 'letters'
    size?: 'heading' | 'display' | 'title'
    /** Always puts the muted part on its own line (by default only on small screens). */
    stacked?: boolean
  }>(),
  { muted: undefined, as: 'h2', split: 'words', size: 'heading', stacked: false },
)

const words = computed(() => props.title.split(' '))
const mutedWords = computed(() => props.muted?.split(' ') ?? [])
/** Letters keep a global index for the stagger, grouped by word so lines only break between words. */
const letterWords = computed(() => {
  let index = 0
  return words.value.map((word) => ({
    letters: Array.from(word).map((char) => ({ char, index: index++ })),
  }))
})
</script>

<template>
  <component
    :is="as"
    data-reveal
    class="text-ink-950"
    :class="{
      'text-heading': size === 'heading',
      'text-display': size === 'display',
      'text-title': size === 'title',
    }"
  >
    <template v-if="split === 'letters'">
      <span class="sr-only">{{ title }}</span>
      <span aria-hidden="true">
        <template v-for="(word, w) in letterWords" :key="w">
          <span class="inline-block whitespace-nowrap"
            ><span
              v-for="letter in word.letters"
              :key="letter.index"
              class="reveal-item inline-block"
              :style="{ '--i': letter.index * 0.4 }"
              >{{ letter.char }}</span
            ></span
          >{{ ' ' }}
        </template>
      </span>
    </template>
    <template v-else>
      <template v-for="(word, i) in words" :key="`w${i}`">
        <span class="reveal-item inline-block" :style="{ '--i': i }">{{ word }}</span
        >{{ ' ' }}
      </template>
      <template v-if="mutedWords.length">
        <span class="text-text-faint" :class="stacked ? 'block' : 'max-sm:block'">
          <template v-for="(word, i) in mutedWords" :key="`m${i}`">
            <span class="reveal-item inline-block" :style="{ '--i': words.length + i }">{{ word }}</span
            >{{ ' ' }}
          </template>
        </span>
      </template>
    </template>
  </component>
</template>
