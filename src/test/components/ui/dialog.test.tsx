import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { createRef } from 'react'
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../../components/ui/dialog'

describe('Dialog', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('renders children when open is true', () => {
    render(
      <Dialog open={true} onClose={mockOnClose}>
        <DialogContent>
          <p>Dialog Content</p>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText('Dialog Content')).toBeInTheDocument()
  })

  it('does not render when open is false', () => {
    render(
      <Dialog open={false} onClose={mockOnClose}>
        <DialogContent>
          <p>Dialog Content</p>
        </DialogContent>
      </Dialog>
    )
    expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument()
  })

  it('calls onClose when Escape key is pressed', () => {
    render(
      <Dialog open={true} onClose={mockOnClose}>
        <DialogContent>
          <p>Dialog Content</p>
        </DialogContent>
      </Dialog>
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when clicking overlay', () => {
    render(
      <Dialog open={true} onClose={mockOnClose}>
        <DialogOverlay data-testid="overlay" />
        <DialogContent>
          <p>Dialog Content</p>
        </DialogContent>
      </Dialog>
    )
    const overlay = screen.getByTestId('overlay')
    fireEvent.click(overlay)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose when clicking inside content', () => {
    render(
      <Dialog open={true} onClose={mockOnClose}>
        <DialogContent>
          <p>Dialog Content</p>
        </DialogContent>
      </Dialog>
    )
    const content = screen.getByText('Dialog Content')
    fireEvent.click(content)
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('has correct accessibility attributes', () => {
    render(
      <Dialog open={true} onClose={mockOnClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modal Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByRole('dialog')).toHaveAttribute(
      'aria-labelledby',
      expect.stringContaining('dialog-title')
    )
  })

  it('renders DialogHeader, DialogTitle, DialogFooter', () => {
    render(
      <Dialog open={true} onClose={mockOnClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
          <p>Body</p>
          <DialogFooter>Footer</DialogFooter>
        </DialogContent>
      </Dialog>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('forwards ref on DialogContent', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Dialog open={true} onClose={mockOnClose}>
        <DialogContent ref={ref}>
          <p>Content</p>
        </DialogContent>
      </Dialog>
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies custom className on DialogContent', () => {
    const { container } = render(
      <Dialog open={true} onClose={mockOnClose}>
        <DialogContent className="custom-content">
          <p>Content</p>
        </DialogContent>
      </Dialog>
    )
    expect(container.querySelector('.custom-content')).toBeInTheDocument()
  })
})
