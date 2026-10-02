<script setup lang="ts">
const i18nHead = useLocaleHead()

/**
 * Content is visible by default. Motion-only initial states apply only once this script marks
 * <html data-motion>, and are dropped if the app does not hydrate within 4s.
 */
const motionScript = `(function(){var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.motion='';setTimeout(function(){if(!window.__hvReady)delete d.dataset.motion},4000)}})()`

useHead({
  htmlAttrs: { lang: () => i18nHead.value.htmlAttrs.lang },
  link: () => i18nHead.value.link,
  meta: () => i18nHead.value.meta,
  script: [{ key: 'motion', innerHTML: motionScript, tagPosition: 'head' }],
  titleTemplate: (title) =>
    title && !title.includes('Henrique Verri') ? `${title} · Henrique Verri` : title || 'Henrique Verri',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
