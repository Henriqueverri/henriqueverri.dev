<script setup lang="ts">
const { t } = useI18n()
const { profile } = useAppConfig()
const siteUrl = useRuntimeConfig().public.siteUrl

usePageSeo({
  title: () => t('seo.homeTitle'),
  description: () => t('seo.homeDescription'),
  jsonLd: () => [
    personJsonLd(siteUrl, profile.role, [profile.links.github, profile.links.linkedin]),
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Henrique Verri',
      inLanguage: ['pt-BR', 'en-US'],
      author: { '@id': `${siteUrl}/#person` },
    },
  ],
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeWorkStack />
    <HomeAbout />
    <HomeToolkit />
    <ContactCard />
  </div>
</template>
