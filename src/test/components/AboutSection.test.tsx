import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutSection from '../../../components/AboutSection'
import type { AboutSectionData } from '../../../types'

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
    takeRecords() {
      return []
    }
  } as unknown as typeof IntersectionObserver
})

const mockData: AboutSectionData = {
  review: 'An amazing choir with a unique sound.',
  history: [
    { type: 'text', content: 'Founded in 2010, we started as a small group.' },
    { type: 'text', content: 'We have grown to over 30 members.' },
  ],
  rehearsalSchedule: 'Every Tuesday at 7 PM',
  rehearsalLocation: 'Cultural Center',
  rehearsalLocationUrl: 'https://maps.example.com',
  nextRehearsalInfo: 'Next rehearsal: May 15th',
}

describe('AboutSection', () => {
  it('renders the review text', () => {
    render(<AboutSection data={mockData} />)

    expect(screen.getByText(/An amazing choir with a unique sound/)).toBeInTheDocument()
  })

  it('renders history text blocks', () => {
    render(<AboutSection data={mockData} />)

    expect(screen.getByText('Founded in 2010, we started as a small group.')).toBeInTheDocument()
    expect(screen.getByText('We have grown to over 30 members.')).toBeInTheDocument()
  })

  it('renders rehearsal schedule and location', () => {
    render(<AboutSection data={mockData} />)

    expect(screen.getByText('Every Tuesday at 7 PM')).toBeInTheDocument()
    expect(screen.getByText('Cultural Center')).toBeInTheDocument()
    expect(screen.getByText('Next rehearsal: May 15th')).toBeInTheDocument()
  })
})
