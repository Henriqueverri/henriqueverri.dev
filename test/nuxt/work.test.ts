import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import { makeWork } from './fixtures'
import CaseMetrics from '~/components/case/CaseMetrics.vue'
import WorkCard from '~/components/work/WorkCard.vue'

describe('WorkCard', () => {
  it('links a case to its page with a descriptive action', async () => {
    const wrapper = await mountSuspended(WorkCard, { props: { work: makeWork() } })
    const link = wrapper.get('a')
    expect(link.attributes('href')).toBe('/projects/sample')
    expect(wrapper.get('h3').text()).toBe('Sample')
    expect(link.text()).toContain('Ver case')
  })

  it('sends external work straight to GitHub in a new tab', async () => {
    const work = makeWork({ detail: 'external', externalUrl: 'https://github.com/Henriqueverri/sample' })
    const wrapper = await mountSuspended(WorkCard, { props: { work } })
    const link = wrapper.get('a')
    expect(link.attributes('href')).toBe('https://github.com/Henriqueverri/sample')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.text()).toContain('Ver no GitHub')
  })

  it('flags restricted work and draws an abstract cover instead of an image', async () => {
    const wrapper = await mountSuspended(WorkCard, {
      props: { work: makeWork({ type: 'professional', confidentiality: 'restricted', company: 'ACME' }) },
    })
    expect(wrapper.text()).toContain('Case profissional')
    expect(wrapper.find('img').exists()).toBe(false)
  })
})

describe('CaseMetrics', () => {
  it('renders nothing without documented metrics', async () => {
    const wrapper = await mountSuspended(CaseMetrics, { props: { metrics: [] } })
    expect(wrapper.find('li').exists()).toBe(false)
  })

  it('always shows where a number comes from', async () => {
    const wrapper = await mountSuspended(CaseMetrics, {
      props: {
        metrics: [{ label: 'Tests', value: '42', context: 'Unit', source: 'README', period: 'Sep 2026' }],
      },
    })
    expect(wrapper.text()).toContain('42')
    expect(wrapper.text()).toContain('Fonte: README · Sep 2026')
  })
})
