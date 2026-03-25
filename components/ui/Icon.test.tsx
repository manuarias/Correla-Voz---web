import { render } from '@testing-library/react'
import { Icon } from './Icon'
import { describe, it, expect } from 'vitest'

describe('Icon', () => {
  it('should Render instagram icon', () => {
    const { container } = render(<Icon name="instagram" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should Render youtube icon', () => {
    const { container } = render(<Icon name="youtube" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should render spotify icon', () => {
    const { container } = render(<Icon name="spotify" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('should apply size prop', () => {
    const { container } = render(<Icon name="instagram" size={48} />)
    const span = container.querySelector('span')
    expect(span).toHaveStyle({ width: '48px', height: '48px' })
  })

  it('should apply className prop', () => {
    const { container } = render(<Icon name="instagram" className="custom-class" />)
    const span = container.querySelector('span')
    expect(span).toHaveClass('custom-class')
  })

  it('should have default size of 24', () => {
    const { container } = render(<Icon name="instagram" />)
    const span = container.querySelector('span')
    expect(span).toHaveStyle({ width: '24px', height: '24px' })
  })

  it('should have default strokeWidth of 2', () => {
    const { container } = render(<Icon name="instagram" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('stroke-width', '2')
  })

  it('should apply custom strokeWidth', () => {
    const { container } = render(<Icon name="instagram" strokeWidth={4} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('stroke-width', '4')
  })

  it('should have aria-hidden attribute on container', () => {
    const { container } = render(<Icon name="instagram" />)
    const span = container.querySelector('span')
    expect(span).toHaveAttribute('aria-hidden', 'true')
  })
})
