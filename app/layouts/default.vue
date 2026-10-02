<template>
  <div class="flex min-h-dvh flex-col">
    <SkipLink />
    <AppHeader />
    <main id="main" tabindex="-1" class="flex-1 outline-none">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
