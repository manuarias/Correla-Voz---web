import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import LinksSection from '../../../components/LinksSection'
import type { LinkItem } from '../../../types'

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

const mockLinks: LinkItem[] = [
  { title: 'YouTube', url: 'https://youtube.com/test', iconName: 'youtube' },
  { title: 'Spotify', url: 'https://spotify.com/test', iconName: 'spotify' },
  { title: 'Instagram', url: 'https://instagram.com/test', iconName: 'instagram' },
]

describe('LinksSection', () => {
  it('renders link titles', () => {
    render(<LinksSection links={mockLinks} />)

    expect(screen.getByText('YouTube')).toBeInTheDocument()
    expect(screen.getByText('Spotify')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
  })

  it('renders links with correct hrefs', () => {
    render(<LinksSection links={mockLinks} />)

    expect(screen.getByText('YouTube').closest('a')).toHaveAttribute(
      'href',
      'https://youtube.com/test'
    )
    expect(screen.getByText('Spotify').closest('a')).toHaveAttribute(
      'href',
      'https://spotify.com/test'
    )
  })
})
