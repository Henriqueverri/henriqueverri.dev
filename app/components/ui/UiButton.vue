<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** Internal route (already localized by the caller). */
    to?: string
    /** External or mailto URL. */
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'md' | 'sm'
    icon?: string
    iconRight?: string
  }>(),
  { to: undefined, href: undefined, variant: 'primary', size: 'md', icon: undefined, iconRight: undefined },
)

const { t } = useI18n()
const NuxtLink = resolveComponent('NuxtLink')

const opensNewTab = computed(() => !!props.href && /^https?:\/\//.test(props.href))

const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'button'))

const linkAttrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) {
    return opensNewTab.value
      ? { href: props.href, target: '_blank', rel: 'noopener noreferrer' }
      : { href: props.href }
  }
  return { type: 'button' }
})

const VARIANTS = {
  primary: 'btn-sheen bg-ink-950 text-white shadow-button hover-device:hover:bg-ink-800',
  secondary:
    'btn-sheen bg-surface text-ink-900 shadow-soft ring-1 ring-line hover-device:hover:ring-line-strong',
  ghost: 'text-ink-700 hover-device:hover:bg-ink-100 hover-device:hover:text-ink-950',
} as const

const SIZES = {
  md: 'h-12 gap-2 px-5 text-[0.9375rem]',
  sm: 'h-10 gap-1.5 px-4 text-sm',
} as const
</script>

<template>
  <component
    :is="tag"
    v-bind="linkAttrs"
    class="relative inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 ease-out-expo select-none active:translate-y-px"
    :class="[VARIANTS[variant], SIZES[size]]"
  >
    <Icon v-if="icon" :name="icon" class="size-[1.1em] shrink-0" />
    <slot />
    <Icon v-if="iconRight" :name="iconRight" class="size-[1.1em] shrink-0" />
    <span v-if="opensNewTab" class="sr-only">{{ t('a11y.newTab') }}</span>
  </component>
</template>
