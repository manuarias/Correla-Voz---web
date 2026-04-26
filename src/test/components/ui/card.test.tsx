import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '../../../../components/ui/card'

describe('Card', () => {
  it('renders Card with children', () => {
    render(<Card>Content</Card>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with as prop', () => {
    render(<Card as="article">Article</Card>)
    expect(screen.getByText('Article').tagName).toBe('ARTICLE')
  })

  it('composes with CardHeader, CardContent, CardFooter', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('applies custom className on Card', () => {
    const { container } = render(<Card className="my-card">Content</Card>)
    expect(container.firstChild).toHaveClass('my-card')
  })

  it('applies custom className on CardHeader', () => {
    const { container } = render(
      <CardHeader className="my-header">Header</CardHeader>
    )
    expect(container.firstChild).toHaveClass('my-header')
  })

  it('applies custom className on CardContent', () => {
    const { container } = render(
      <CardContent className="my-content">Content</CardContent>
    )
    expect(container.firstChild).toHaveClass('my-content')
  })

  it('applies custom className on CardFooter', () => {
    const { container } = render(
      <CardFooter className="my-footer">Footer</CardFooter>
    )
    expect(container.firstChild).toHaveClass('my-footer')
  })
})
