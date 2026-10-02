<script setup lang="ts">
/** Profile photo when configured; otherwise a monogram. Decorative: the name is always next to it. */
withDefaults(defineProps<{ size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' })

const { profile } = useAppConfig()
</script>

<template>
  <span
    aria-hidden="true"
    class="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink-950 font-mono font-medium tracking-tight text-white ring-1 ring-black/5"
    :class="{
      'size-8 text-[0.6875rem]': size === 'sm',
      'size-11 text-sm': size === 'md',
      'size-16 text-lg': size === 'lg',
    }"
  >
    <NuxtImg
      v-if="profile.photo"
      :src="profile.photo"
      alt=""
      :width="128"
      :height="128"
      class="size-full object-cover"
    />
    <template v-else>
      {{ profile.initials }}
      <span class="absolute right-[18%] bottom-[18%] size-[14%] rounded-full bg-accent-400" />
    </template>
  </span>
</template>
