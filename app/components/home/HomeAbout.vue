<script setup lang="ts">
const { t } = useI18n()
const { profile } = useAppConfig()
const { data: content } = await useProfile()
</script>

<template>
  <section v-if="content" id="about" aria-labelledby="about-title" class="section-y">
    <div class="container-page grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
      <div data-reveal class="lg:sticky lg:top-28 lg:self-start">
        <div
          class="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[1.75rem] bg-ink-950 shadow-card lg:max-w-none"
        >
          <NuxtImg
            v-if="profile.photo"
            :src="profile.photo"
            :alt="t('about.portraitAlt')"
            width="640"
            height="800"
            sizes="xs:100vw sm:384px lg:440px"
            class="size-full object-cover"
          />
          <!-- Monogram portrait until a real photo is configured in app.config.ts. -->
          <div v-else aria-hidden="true" class="absolute inset-0">
            <div
              class="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_10%,color-mix(in_oklab,var(--color-accent-500)_45%,transparent),transparent_70%)]"
            />
            <div
              class="absolute inset-0 [background-image:linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent)] bg-[size:40px_40px]"
            />
            <div class="absolute inset-0 bg-noise opacity-[0.07] mix-blend-overlay" />
            <span
              class="absolute top-8 left-7 font-mono text-[clamp(6rem,22vw,9rem)] leading-none font-medium tracking-[-0.08em] text-white"
            >
              {{ profile.initials }}<span class="text-accent-400">.</span>
            </span>
            <span class="absolute right-7 bottom-7 left-7 flex items-end justify-between gap-4 text-white">
              <span class="leading-tight">
                <span class="block text-lg font-medium">{{ profile.name }}</span>
                <span class="text-sm text-ink-300">{{ profile.role }}</span>
              </span>
              <span class="font-mono text-xs text-ink-400">{{ t('footer.location') }}</span>
            </span>
          </div>
          <div aria-hidden="true" class="curtain absolute inset-0 bg-accent-100" />
        </div>
      </div>

      <div data-reveal class="lg:pt-6">
        <h2 id="about-title" class="reveal-item text-eyebrow text-text-muted">{{ t('about.title') }}</h2>
        <p
          class="reveal-item mt-6 text-title text-balance text-ink-950 md:text-[2.125rem] md:leading-[1.15]"
          style="--i: 1"
        >
          {{ content.about.intro }}
        </p>
        <div class="mt-10 space-y-6 text-[1.0625rem] leading-relaxed text-text-subtle">
          <p
            v-for="(paragraph, i) in content.about.paragraphs"
            :key="i"
            class="reveal-item"
            :style="{ '--i': i + 2 }"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
