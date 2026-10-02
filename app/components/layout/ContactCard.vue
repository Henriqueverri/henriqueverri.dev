<script setup lang="ts">
const { t } = useI18n()
const { profile } = useAppConfig()
const { data: content } = await useProfile()
</script>

<template>
  <section v-if="content" id="contact" aria-labelledby="contact-title" class="section-y">
    <div class="container-page">
      <div
        data-reveal="self"
        class="relative overflow-hidden rounded-[1.75rem] bg-surface-muted px-6 py-12 ring-1 ring-line sm:px-10 md:rounded-[2.25rem] md:px-16 md:py-20"
      >
        <div
          aria-hidden="true"
          class="absolute -top-32 -right-24 size-80 rounded-full bg-accent-200/50 blur-3xl md:size-[28rem]"
        />
        <div class="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div class="max-w-2xl">
            <div class="flex items-center gap-3">
              <UiAvatar size="md" />
              <p class="leading-tight">
                <span class="block font-medium text-ink-950">{{ profile.name }}</span>
                <span class="text-sm text-text-muted">{{ profile.role }}</span>
              </p>
            </div>
            <h2 id="contact-title" class="mt-8 text-heading text-ink-950">
              {{ content.contact.headline }}
              <span class="block text-text-faint">{{ content.contact.headlineMuted }}</span>
            </h2>
            <p class="mt-5 max-w-xl text-lead text-text-subtle">{{ content.contact.text }}</p>
          </div>
          <div class="flex flex-wrap gap-3 md:shrink-0 md:justify-end">
            <UiButton v-if="profile.email" :href="`mailto:${profile.email}`" icon="lucide:mail">
              {{ t('contact.email') }}
            </UiButton>
            <UiButton
              :href="profile.links.linkedin"
              :variant="profile.email ? 'secondary' : 'primary'"
              icon="simple-icons:linkedin"
            >
              {{ t('contact.linkedin') }}
            </UiButton>
            <UiButton :href="profile.links.github" variant="secondary" icon="simple-icons:github">
              {{ t('contact.github') }}
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
