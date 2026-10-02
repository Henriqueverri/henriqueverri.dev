import { mountSuspended } from '@nuxt/test-utils/runtime'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { computed, nextTick } from 'vue'
import { makeWork } from './fixtures'
import CasePhases from '~/components/content/CasePhases.vue'
import AppMobileMenu from '~/components/layout/AppMobileMenu.vue'
import { caseKey } from '~/composables/useContent'

function mockMatchMedia(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string) =>
      ({
        matches,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      }) as unknown as MediaQueryList,
  )
}

describe('CasePhases', () => {
  const mountPhases = () =>
    mountSuspended(CasePhases, {
      global: { provide: { [caseKey as symbol]: computed(() => makeWork()) } },
    })

  it('lists every phase on small screens', async () => {
    mockMatchMedia(false)
    const wrapper = await mountPhases()
    expect(wrapper.find('[role="tablist"]').exists()).toBe(false)
    expect(wrapper.findAll('ol > li')).toHaveLength(3)
  })

  it('works as keyboard-operable tabs on large screens', async () => {
    mockMatchMedia(true)
    const wrapper = await mountPhases()
    await nextTick()
    const tabs = () => wrapper.findAll('[role="tab"]')
    expect(tabs()).toHaveLength(3)
    expect(tabs()[0]!.attributes('aria-selected')).toBe('true')

    await tabs()[0]!.trigger('keydown', { key: 'ArrowDown' })
    expect(tabs()[1]!.attributes('aria-selected')).toBe('true')
    expect(tabs()[1]!.attributes('tabindex')).toBe('0')
    expect(tabs()[0]!.attributes('tabindex')).toBe('-1')

    await tabs()[1]!.trigger('keydown', { key: 'End' })
    expect(tabs()[2]!.attributes('aria-selected')).toBe('true')

    await tabs()[2]!.trigger('keydown', { key: 'ArrowDown' })
    expect(tabs()[0]!.attributes('aria-selected')).toBe('true')

    const panel = wrapper.get('[role="tabpanel"]')
    expect(panel.attributes('aria-labelledby')).toBe(tabs()[0]!.attributes('id'))
  })

  it('renders nothing for a case without phases', async () => {
    const wrapper = await mountSuspended(CasePhases, {
      global: { provide: { [caseKey as symbol]: computed(() => makeWork({ phases: [] })) } },
    })
    expect(wrapper.find('section').exists()).toBe(false)
  })
})

describe('AppMobileMenu', () => {
  afterEach(() => {
    document.body.style.overflow = ''
  })

  const links = [
    { key: 'work', label: 'Projetos', to: '/projects' },
    { key: 'about', label: 'Sobre', to: '/#about' },
  ]

  it('toggles with aria-expanded, locks scroll and closes on Escape', async () => {
    const wrapper = await mountSuspended(AppMobileMenu, { props: { links }, attachTo: document.body })
    const button = wrapper.get('button[aria-controls="mobile-menu"]')
    expect(button.attributes('aria-expanded')).toBe('false')

    await button.trigger('click')
    await wrapper.setProps({ open: true })
    await nextTick()
    expect(wrapper.get('button[aria-controls="mobile-menu"]').attributes('aria-expanded')).toBe('true')
    expect(document.getElementById('mobile-menu')).not.toBeNull()
    expect(document.body.style.overflow).toBe('hidden')

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
    wrapper.unmount()
  })
})
