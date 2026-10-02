<script setup lang="ts">
defineProps<{ links: { key: string; label: string; to: string }[] }>()

const open = defineModel<boolean>('open', { default: false })

const { t } = useI18n()
const route = useRoute()
const button = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)

function close({ restoreFocus = false } = {}) {
  open.value = false
  if (restoreFocus) button.value?.focus()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') return close({ restoreFocus: true })
  if (event.key !== 'Tab' || !button.value || !panel.value) return
  const focusables = [button.value, ...panel.value.querySelectorAll<HTMLElement>('a[href], button')]
  const first = focusables[0]!
  const last = focusables[focusables.length - 1]!
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => route.fullPath,
  () => close(),
)

watch(open, async (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeydown)
    await nextTick()
    panel.value?.querySelector<HTMLElement>('a')?.focus()
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div>
    <button
      ref="button"
      type="button"
      class="relative z-10 flex size-10 items-center justify-center rounded-full transition-[background-color,transform] active:scale-95 active:bg-ink-100"
      :aria-expanded="open"
      aria-controls="mobile-menu"
      @click="open = !open"
    >
      <span class="sr-only">{{ t('a11y.toggleMenu') }}</span>
      <span
        aria-hidden="true"
        class="flex items-center gap-1 transition-[opacity,transform] duration-300"
        :class="open ? 'scale-50 opacity-0' : 'opacity-100'"
      >
        <span v-for="i in 3" :key="i" class="size-1 rounded-full bg-ink-900" />
      </span>
      <Icon
        name="lucide:x"
        class="absolute size-5 text-ink-900 transition-[opacity,transform] duration-300"
        :class="open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'"
      />
    </button>

    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 bg-ink-950/25 backdrop-blur-sm"
        aria-hidden="true"
        @click="close()"
      />
    </Transition>

    <Transition
      enter-from-class="-translate-y-3 scale-[0.97] opacity-0"
      enter-active-class="transition-[opacity,transform] duration-400 ease-out-expo"
      leave-active-class="transition-[opacity,transform] duration-200"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav
        v-if="open"
        id="mobile-menu"
        ref="panel"
        :aria-label="t('a11y.mainNav')"
        class="fixed inset-x-3 top-[calc(max(0.75rem,env(safe-area-inset-top))+3.75rem)] origin-top rounded-3xl bg-surface p-3 shadow-card ring-1 ring-line"
      >
        <ul>
          <li v-for="(link, i) in links" :key="link.key">
            <NuxtLink
              :to="link.to"
              class="enter flex items-center justify-between rounded-2xl px-4 py-3.5 text-2xl font-medium tracking-tight text-ink-950 active:bg-ink-100"
              :style="{ '--i': i }"
              @click="close()"
            >
              {{ link.label }}
              <Icon name="lucide:arrow-up-right" class="size-5 text-ink-400" />
            </NuxtLink>
          </li>
        </ul>
        <div class="mt-2 flex items-center justify-between border-t border-line px-2 pt-3">
          <UiSocialLinks />
          <LocaleSwitch />
        </div>
      </nav>
    </Transition>
  </div>
</template>
