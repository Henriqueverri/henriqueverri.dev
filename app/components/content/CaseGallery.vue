<script setup lang="ts">
/** `:case-gallery` — landscape screenshots in a wide column, portrait (mobile) ones beside them. */
const work = useCaseData()
const { t } = useI18n()
const id = useId()

const gallery = computed(() => work.value?.gallery ?? [])
const landscape = computed(() => gallery.value.filter((image) => image.width >= image.height))
const portrait = computed(() => gallery.value.filter((image) => image.width < image.height))
</script>

<template>
  <section v-if="gallery.length" class="case-block my-16 md:my-20" :aria-labelledby="`${id}-title`">
    <div class="container-page">
      <h3 :id="`${id}-title`" class="sr-only">{{ t('case.gallery') }}</h3>
      <div
        class="grid gap-4 md:gap-6"
        :class="{ 'md:grid-cols-[2fr_1fr]': landscape.length && portrait.length }"
      >
        <div
          v-for="(column, c) in [landscape, portrait].filter((list) => list.length)"
          :key="c"
          class="flex flex-col gap-4 md:gap-6"
        >
          <figure v-for="image in column" :key="image.src" data-reveal="self">
            <div class="overflow-hidden rounded-[1.25rem] bg-ink-100 shadow-card ring-1 ring-black/5">
              <NuxtPicture
                legacy-format="webp"
                :src="image.src"
                :alt="image.alt"
                :width="image.width"
                :height="image.height"
                :sizes="
                  image.width >= image.height ? 'xs:100vw md:66vw lg:760px' : 'xs:100vw md:33vw lg:380px'
                "
                loading="lazy"
                class="block"
                :img-attrs="{ class: 'h-auto w-full' }"
              />
            </div>
            <figcaption v-if="image.caption" class="mt-3 text-sm leading-relaxed text-text-muted">
              {{ image.caption }}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
