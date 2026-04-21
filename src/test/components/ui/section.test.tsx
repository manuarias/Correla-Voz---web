import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { Section } from '../../../../components/ui/section'

class MockIntersectionObserver implements IntersectionObserver {
  root: Document | Element | null = null
  rootMargin: string = '0px'
  thresholds: ReadonlyArray<number> = [0]
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])

  constructor(
    private callback: IntersectionObserverCallback,
    private options?: IntersectionObserverInit
  ) {}

  trigger(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this)
  }
}

describe('Section', () => {
  let mockIO: MockIntersectionObserver

  beforeEach(() => {
    mockIO = new MockIntersectionObserver(() => {})
    window.IntersectionObserver = vi.fn(
      function (
        this: IntersectionObserver,
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit
      ) {
        mockIO = new MockIntersectionObserver(callback, options)
        return mockIO
      }
    ) as unknown as typeof IntersectionObserver
  })

  it('renders children', () => {
    render(<Section>Content</Section>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Section title="My Section">Content</Section>)
    expect(screen.getByRole('heading', { name: /my section/i })).toBeInTheDocument()
  })

  it('does not render title when not provided', () => {
    render(<Section>Content</Section>)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLElement>()
    render(<Section ref={ref}>Content</Section>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('applies custom className', () => {
    const { container } = render(
      <Section className="custom-section">Content</Section>
    )
    expect(container.firstChild).toHaveClass('custom-section')
  })

  it('applies custom titleClassName', () => {
    render(
      <Section title="My Section" titleClassName="custom-title">
        Content
      </Section>
    )
    expect(screen.getByRole('heading')).toHaveClass('custom-title')
  })

  it('renders with as prop', () => {
    render(<Section as="article">Content</Section>)
    expect(screen.getByText('Content').tagName).toBe('ARTICLE')
  })

  it('applies visible classes when intersecting', async () => {
    const { container } = render(<Section>Content</Section>)
    const section = container.firstChild as HTMLElement

    mockIO.trigger([
      { isIntersecting: true, target: section } as IntersectionObserverEntry,
    ])

    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(section).toHaveClass('opacity-100', 'translate-y-0')
  })

  it('applies hidden classes initially', () => {
    const { container } = render(<Section>Content</Section>)
    const section = container.firstChild as HTMLElement
    expect(section).toHaveClass('opacity-0', 'translate-y-10')
  })
})
