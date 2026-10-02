<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { profile } = useAppConfig()
const { data: content } = await useProfile()

const year = new Date().getFullYear()

const nav = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.work'), to: localePath('/projects') },
  { label: t('nav.about'), to: `${localePath('/')}#about` },
  { label: t('nav.contact'), to: `${localePath('/')}#contact` },
])
</script>

<template>
  <footer class="px-2 pb-2 md:px-3 md:pb-3">
    <div
      class="relative mx-auto max-w-page overflow-hidden rounded-[1.75rem] bg-ink-950 text-ink-300 md:rounded-[2.25rem]"
    >
      <div class="px-6 pt-14 sm:px-10 md:px-14 md:pt-20">
        <!-- The tail starts a new line so the rotating word's reserved width never leaves a gap mid-line. -->
        <p v-if="content" class="max-w-3xl text-heading text-white">
          {{ content.footer.lead }}
          <UiRotatingWord :words="content.footer.words" class="text-accent-300" />
          {{ ' ' }}<span class="block text-ink-400">{{ content.footer.tail }}</span>
        </p>

        <div class="mt-14 flex flex-col gap-8 md:mt-20 md:flex-row md:items-center md:justify-between">
          <nav :aria-label="t('footer.navigation')">
            <ul class="flex flex-wrap gap-x-7 gap-y-3">
              <li v-for="item in nav" :key="item.to">
                <NuxtLink :to="item.to" class="link-underline text-ink-200 hover-device:hover:text-white">
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
          <div class="flex items-center gap-3">
            <UiSocialLinks tone="dark" />
            <LocaleSwitch tone="dark" />
          </div>
        </div>

        <p class="mt-10 text-xs text-ink-400">© {{ year }} {{ profile.name }}</p>
      </div>

      <!-- Signature: generated content, so it is not part of the text of the page. -->
      <div aria-hidden="true" :data-wordmark="profile.name" class="footer-wordmark mt-6 md:mt-10" />
    </div>
  </footer>
</template>
