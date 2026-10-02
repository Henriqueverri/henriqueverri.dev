<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <a
    href="#main"
    class="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[100] focus-visible:rounded-full focus-visible:bg-ink-950 focus-visible:px-4 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-medium focus-visible:text-white focus-visible:shadow-button"
  >
    {{ t('a11y.skip') }}
  </a>
</template>
