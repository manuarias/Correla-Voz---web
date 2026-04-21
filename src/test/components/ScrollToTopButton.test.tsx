import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import ScrollToTopButton from '../../../components/ScrollToTopButton'

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

describe('ScrollToTopButton', () => {
  it('is initially hidden', () => {
    render(<ScrollToTopButton />)

    const button = screen.getByLabelText('Volver arriba')
    expect(button).toHaveClass('opacity-0')
    expect(button).toHaveClass('pointer-events-none')
  })

  it('becomes visible after scrolling down', () => {
    Object.defineProperty(window, 'scrollY', { value: 1000, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true })

    render(<ScrollToTopButton />)

    // Simulate scroll event wrapped in act
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    const button = screen.getByLabelText('Volver arriba')
    expect(button).toHaveClass('opacity-100')
    expect(button).toHaveClass('scale-100')
  })
})
