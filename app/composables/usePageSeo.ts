interface PageSeoOptions {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  /** Absolute path under /public, e.g. `/og/home-pt.png`. Defaults to the locale's home image. */
  image?: MaybeRefOrGetter<string | undefined>
  imageAlt?: MaybeRefOrGetter<string | undefined>
  type?: 'website' | 'article'
  jsonLd?: MaybeRefOrGetter<Record<string, unknown>[] | undefined>
}

export function usePageSeo(options: PageSeoOptions) {
  const { locale } = useI18n()
  const route = useRoute()
  const siteUrl = useRuntimeConfig().public.siteUrl

  const url = computed(() => `${siteUrl}${route.path === '/' ? '' : route.path.replace(/\/$/, '')}`)
  const image = computed(() => `${siteUrl}${toValue(options.image) ?? `/og/home-${locale.value}.png`}`)

  useSeoMeta({
    title: () => toValue(options.title),
    description: () => toValue(options.description),
    ogTitle: () => toValue(options.title),
    ogDescription: () => toValue(options.description),
    ogType: options.type ?? 'website',
    ogUrl: () => url.value,
    ogSiteName: 'Henrique Verri',
    ogImage: () => image.value,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: () => toValue(options.imageAlt) ?? toValue(options.title),
    twitterCard: 'summary_large_image',
    twitterTitle: () => toValue(options.title),
    twitterDescription: () => toValue(options.description),
    twitterImage: () => image.value,
  })

  useHead({
    script: () =>
      (toValue(options.jsonLd) ?? []).map((data) => ({
        key: `ld-${String(data['@type'])}`,
        type: 'application/ld+json',
        // `<` is escaped so content can never close the script tag.
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...data }).replace(/</g, '\\u003c'),
      })),
  })

  return { url }
}

export function personJsonLd(siteUrl: string, jobTitle: string, sameAs: string[]) {
  return {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Henrique Verri',
    jobTitle,
    url: siteUrl,
    sameAs,
    knowsAbout: ['Vue.js', 'Nuxt', 'TypeScript', 'Design Systems', 'Frontend architecture', 'Laravel'],
  }
}
