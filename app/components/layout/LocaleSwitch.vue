<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'light' | 'dark' }>(), { tone: 'light' })

const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const other = computed(() => locales.value.find((item) => item.code !== locale.value)!)
</script>

<template>
  <NuxtLink
    :to="switchLocalePath(other.code)"
    :hreflang="other.language"
    :lang="other.language"
    class="inline-flex items-center justify-center gap-1 rounded-full font-mono text-xs font-medium tracking-wide uppercase"
    :class="
      tone === 'dark'
        ? 'h-11 min-w-11 bg-white/8 px-3.5 text-ink-200 ring-1 ring-white/10 transition-[background-color,color,transform] duration-200 active:scale-95 hover-device:hover:bg-white/15 hover-device:hover:text-white'
        : 'h-9 min-w-9 px-2.5 text-ink-600 transition-colors hover-device:hover:bg-ink-100 hover-device:hover:text-ink-950'
    "
  >
    <Icon name="lucide:languages" class="size-3.5" />
    <span aria-hidden="true">{{ other.code }}</span>
    <span class="sr-only">{{ t('a11y.language') }}: {{ other.name }}</span>
  </NuxtLink>
</template>
