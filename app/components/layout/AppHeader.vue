<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { profile } = useAppConfig()

const menuOpen = ref(false)

const links = computed(() => [
  { key: 'work', label: t('nav.work'), to: localePath('/projects') },
  { key: 'about', label: t('nav.about'), to: `${localePath('/')}#about` },
  { key: 'contact', label: t('nav.contact'), to: `${localePath('/')}#contact` },
])

const isCurrent = (to: string) => !to.includes('#') && route.path.startsWith(to)

/** The collapsed desktop nav expands again on demand, as if the user had scrolled up. */
function expandNav() {
  document.documentElement.dataset.scroll = 'up'
}
</script>

<template>
  <header
    class="pointer-events-none fixed inset-x-0 top-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))] md:pt-5"
  >
    <div class="container-page flex justify-center">
      <!--
        One centered pill: identity on the left, navigation on the right. The blur sits on its own layer
        because backdrop-filter on an ancestor would trap the mobile menu's fixed panel inside the pill.
      -->
      <div class="pointer-events-auto relative isolate flex h-12 items-center rounded-full p-1">
        <span
          aria-hidden="true"
          class="absolute inset-0 -z-10 rounded-full bg-surface/95 shadow-soft ring-1 ring-line/60 backdrop-blur-xl"
        />
        <NuxtLink
          :to="localePath('/')"
          class="flex h-10 items-center gap-2.5 rounded-full pr-3.5 pl-0.5 transition-transform active:scale-[0.98]"
        >
          <span class="sr-only">{{ t('a11y.home') }}</span>
          <UiAvatar size="sm" />
          <span aria-hidden="true" class="text-sm leading-none font-medium text-ink-950">{{
            profile.name
          }}</span>
        </NuxtLink>

        <!-- Desktop: the links collapse into a "more" button while scrolling down. -->
        <nav
          :aria-label="t('a11y.mainNav')"
          class="relative hidden items-center md:flex"
          @focusin="expandNav"
        >
          <div
            class="grid grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-out-expo scrolled-down:grid-cols-[0fr]"
          >
            <div
              class="flex min-w-0 items-center overflow-hidden transition-opacity duration-300 scrolled-down:pointer-events-none scrolled-down:opacity-0"
            >
              <span class="mr-1 h-5 w-px shrink-0 bg-line" aria-hidden="true" />
              <ul class="flex items-center">
                <li v-for="link in links" :key="link.key">
                  <NuxtLink
                    :to="link.to"
                    :aria-current="isCurrent(link.to) ? 'page' : undefined"
                    class="flex h-10 items-center rounded-full px-4 text-sm whitespace-nowrap text-ink-600 transition-colors aria-[current=page]:text-ink-950 hover-device:hover:bg-ink-100 hover-device:hover:text-ink-950"
                  >
                    {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
              <span class="mx-1 h-5 w-px shrink-0 bg-line" aria-hidden="true" />
              <LocaleSwitch />
            </div>
          </div>
          <button
            type="button"
            tabindex="-1"
            aria-hidden="true"
            class="flex h-10 w-0 items-center justify-center gap-1 overflow-hidden rounded-full opacity-0 transition-[width,opacity] duration-500 ease-out-expo scrolled-down:w-10 scrolled-down:opacity-100"
            @click="expandNav"
          >
            <span v-for="i in 3" :key="i" class="size-1 rounded-full bg-ink-900" />
          </button>
        </nav>

        <AppMobileMenu v-model:open="menuOpen" :links="links" class="md:hidden" />
      </div>
    </div>
  </header>
</template>
