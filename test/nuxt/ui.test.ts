import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import UiButton from '~/components/ui/UiButton.vue'
import UiSectionHeading from '~/components/ui/UiSectionHeading.vue'
import UiSocialLinks from '~/components/ui/UiSocialLinks.vue'

describe('UiButton', () => {
  it('renders an internal link for `to`', async () => {
    const wrapper = await mountSuspended(UiButton, {
      props: { to: '/projects' },
      slots: { default: () => 'Projetos' },
    })
    const link = wrapper.get('a')
    expect(link.attributes('href')).toBe('/projects')
    expect(link.attributes('target')).toBeUndefined()
  })

  it('opens external links in a new tab and says so to screen readers', async () => {
    const wrapper = await mountSuspended(UiButton, {
      props: { href: 'https://github.com/Henriqueverri' },
      slots: { default: () => 'GitHub' },
    })
    const link = wrapper.get('a')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
    expect(link.get('.sr-only').text()).toBe('(abre em nova aba)')
  })

  it('keeps mailto links in the same tab', async () => {
    const wrapper = await mountSuspended(UiButton, {
      props: { href: 'mailto:a@b.dev' },
      slots: { default: () => 'E-mail' },
    })
    expect(wrapper.get('a').attributes('target')).toBeUndefined()
  })

  it('falls back to a type="button"', async () => {
    const wrapper = await mountSuspended(UiButton, { slots: { default: () => 'Ok' } })
    expect(wrapper.get('button').attributes('type')).toBe('button')
  })
})

describe('UiSectionHeading', () => {
  it('keeps the plain sentence readable when split by letters', async () => {
    const wrapper = await mountSuspended(UiSectionHeading, {
      props: { title: 'Trabalho em destaque', split: 'letters' },
    })
    expect(wrapper.get('h2 .sr-only').text()).toBe('Trabalho em destaque')
    expect(wrapper.get('[aria-hidden="true"]').findAll('.reveal-item')).toHaveLength(18)
  })

  it('renders the muted part as text', async () => {
    const wrapper = await mountSuspended(UiSectionHeading, {
      props: { title: 'Engenharia', muted: 'e ferramentas' },
    })
    expect(wrapper.text().replace(/\s+/g, ' ').trim()).toBe('Engenharia e ferramentas')
  })
})

describe('UiSocialLinks', () => {
  it('shows only real channels, including the configured e-mail', async () => {
    const wrapper = await mountSuspended(UiSocialLinks)
    const hrefs = wrapper.findAll('a').map((link) => link.attributes('href'))
    expect(hrefs).toEqual([
      'https://github.com/Henriqueverri',
      'https://www.linkedin.com/in/henriqueverri/',
      'mailto:henriqueverri41@gmail.com',
    ])
  })
})
