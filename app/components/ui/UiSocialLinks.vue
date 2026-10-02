<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'light' | 'dark' }>(), { tone: 'light' })

const { t } = useI18n()
const { profile } = useAppConfig()

const links = computed(() =>
  [
    { key: 'github', label: 'GitHub', href: profile.links.github, icon: 'simple-icons:github' },
    { key: 'linkedin', label: 'LinkedIn', href: profile.links.linkedin, icon: 'simple-icons:linkedin' },
    profile.email
      ? { key: 'email', label: t('contact.email'), href: `mailto:${profile.email}`, icon: 'lucide:mail' }
      : null,
  ].filter((link) => link !== null),
)
</script>

<template>
  <ul class="flex items-center gap-2">
    <li v-for="link in links" :key="link.key">
      <a
        :href="link.href"
        v-bind="link.key === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' }"
        class="flex size-11 items-center justify-center rounded-full transition-[background-color,color,transform] duration-200 active:scale-95"
        :class="
          tone === 'dark'
            ? 'bg-white/8 text-ink-200 ring-1 ring-white/10 hover-device:hover:bg-white/15 hover-device:hover:text-white'
            : 'bg-surface text-ink-700 shadow-soft ring-1 ring-line hover-device:hover:text-ink-950 hover-device:hover:ring-line-strong'
        "
      >
        <Icon :name="link.icon" class="size-[1.15rem]" />
        <span class="sr-only"
          >{{ link.label }}<template v-if="link.key !== 'email'"> {{ t('a11y.newTab') }}</template></span
        >
      </a>
    </li>
  </ul>
</template>
