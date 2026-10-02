import type { Collections } from '@nuxt/content'
import type { InjectionKey } from 'vue'

export type WorkItem = Collections['work_pt']
export type ProfileItem = Collections['profile_pt']

function useLocaleCollections() {
  const { locale } = useI18n()
  return {
    locale,
    work: computed(() => (locale.value === 'en' ? 'work_en' : 'work_pt') as 'work_pt'),
    profile: computed(() => (locale.value === 'en' ? 'profile_en' : 'profile_pt') as 'profile_pt'),
  }
}

/** Published work for the current locale, ordered. Queries run at build time and ship in the payload. */
export function useWorkList() {
  const { locale, work } = useLocaleCollections()
  return useAsyncData(
    () => `work-list-${locale.value}`,
    () => queryCollection(work.value).where('status', '=', 'published').order('order', 'ASC').all(),
    { default: () => [] as WorkItem[] },
  )
}

export function useWorkItem(slug: MaybeRefOrGetter<string>) {
  const { locale, work } = useLocaleCollections()
  return useAsyncData(
    () => `work-${locale.value}-${toValue(slug)}`,
    () =>
      queryCollection(work.value)
        .where('status', '=', 'published')
        .where('stem', 'LIKE', `%/work/${toValue(slug)}`)
        .first(),
  )
}

export function useProfile() {
  const { locale, profile } = useLocaleCollections()
  return useAsyncData(
    () => `profile-${locale.value}`,
    () => queryCollection(profile.value).first(),
  )
}

export const caseKey: InjectionKey<ComputedRef<WorkItem | null | undefined>> = Symbol('case')

/** Data of the case page, read by the MDC blocks (`:case-phases`, `:case-outcome`...) inside the markdown body. */
export function useCaseData() {
  return inject(
    caseKey,
    computed(() => null),
  )
}
