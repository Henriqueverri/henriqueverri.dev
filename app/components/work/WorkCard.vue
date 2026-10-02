<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    work: WorkItem
    wide?: boolean
    priority?: boolean
    headingLevel?: 'h2' | 'h3'
  }>(),
  { wide: false, priority: false, headingLevel: 'h3' },
)

const { t } = useI18n()
const localePath = useLocalePath()

const target = computed(() => workTarget(props.work))
const linkAttrs = computed(() =>
  target.value.external
    ? { href: target.value.href, target: '_blank', rel: 'noopener noreferrer' }
    : { to: localePath(target.value.href) },
)
const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <article class="group relative h-full">
    <component
      :is="target.external ? 'a' : NuxtLink"
      v-bind="linkAttrs"
      class="relative block h-full overflow-hidden rounded-[1.25rem] bg-ink-100 shadow-card ring-1 ring-black/5 md:rounded-[1.5rem]"
      :class="wide ? 'aspect-[4/3] md:aspect-[2/1]' : 'aspect-[4/3]'"
    >
      <div
        class="absolute inset-0 transition-transform duration-700 ease-out-expo hover-device:group-hover:scale-[1.035]"
      >
        <WorkCover
          :work="work"
          :priority="priority"
          :sizes="wide ? 'xs:100vw md:90vw lg:1100px' : 'xs:100vw md:50vw lg:540px'"
        />
      </div>
      <div
        aria-hidden="true"
        class="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-ink-950/85 via-ink-950/35 to-transparent transition-opacity duration-500 hover-device:group-hover:opacity-0"
      />

      <div
        class="work-card-label absolute top-4 left-4 transition-[opacity,transform] duration-500 md:top-5 md:left-5"
      >
        <UiTag
          variant="glass"
          :icon="work.confidentiality === 'public' ? undefined : 'lucide:lock'"
          class="transition-opacity duration-300 hover-device:group-hover:opacity-0"
        >
          {{ t(`work.type.${work.type}`) }}
        </UiTag>
      </div>

      <div
        class="work-card-label absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 transition-[opacity,transform] duration-500 sm:p-5 md:p-6"
      >
        <div class="min-w-0 transition-opacity duration-300 hover-device:group-hover:opacity-0">
          <component :is="headingLevel" class="text-xl font-medium tracking-tight text-white md:text-2xl">
            {{ work.title }}
          </component>
          <p class="mt-1 line-clamp-1 text-sm text-ink-200">{{ work.category }}</p>
        </div>
        <span
          class="flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-medium text-ink-950 shadow-soft"
        >
          <span class="max-xs:sr-only">{{ t(`work.action.${target.action}`) }}</span>
          <Icon :name="target.external ? 'lucide:arrow-up-right' : 'lucide:arrow-right'" class="size-4" />
          <span v-if="target.external" class="sr-only">{{ t('a11y.newTab') }}</span>
        </span>
      </div>
    </component>
  </article>
</template>
