import { render, screen, fireEvent } from '@testing-library/react'
import EventModal from './EventModal'
import type { EventItem } from '../types'
import { vi, describe, it, expect, beforeEach } from 'vitest'

const createEvent = (overrides: Partial<EventItem> = {}): EventItem => ({
  date: '2026-06-15',
  day: '15',
  month: 'Jun',
  title: 'Test Event',
  location: 'Test Location',
  description: 'Test Description',
  ...overrides,
})

describe('EventModal', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('should render event title', () => {
    const event = createEvent()
    render(<EventModal event={event} onClose={mockOnClose} />)

    expect(screen.getByText('Test Event')).toBeInTheDocument()
  })

  it('should render event date and month', () => {
    const event = createEvent()
    render(<EventModal event={event} onClose={mockOnClose} />)

    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('Jun')).toBeInTheDocument()
  })

  it('should render event location', () => {
    const event = createEvent({ location: 'Buenos Aires' })
    render(<EventModal event={event} onClose={mockOnClose} />)

    expect(screen.getByText('Buenos Aires')).toBeInTheDocument()
  })

  it('should render event description', () => {
    const event = createEvent({ description: 'This is a test description' })
    render(<EventModal event={event} onClose={mockOnClose} />)

    expect(screen.getByText('This is a test description')).toBeInTheDocument()
  })

  it('should render event time when provided', () => {
    const event = createEvent({ time: '14:30' })
    render(<EventModal event={event} onClose={mockOnClose} />)

    expect(screen.getByText('14:30')).toBeInTheDocument()
  })

  it('should not render time when not provided', () => {
    const event = createEvent()
    render(<EventModal event={event} onClose={mockOnClose} />)

    expect(screen.queryByText(/\d{1,2}:\d{2}/)).not.toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    const event = createEvent()
    render(<EventModal event={event} onClose={mockOnClose} />)

    const closeButton = screen.getByLabelText('Cerrar modal')
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when clicking outside modal', () => {
    const event = createEvent()
    const { container } = render(<EventModal event={event} onClose={mockOnClose} />)

    const overlay = container.firstChild as HTMLElement
    fireEvent.click(overlay)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should not call onClose when clicking inside modal content', () => {
    const event = createEvent()
    render(<EventModal event={event} onClose={mockOnClose} />)

    const modalContent = screen.getByText('Test Event')
    fireEvent.click(modalContent)

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('should have correct accessibility attributes', () => {
    const event = createEvent()
    render(<EventModal event={event} onClose={mockOnClose} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby', 'event-modal-title')
  })

  it('should render with custom event data', () => {
    const event = createEvent({
      title: 'Custom Title',
      location: 'Custom Location',
      description: 'Custom Description',
      day: '20',
      month: 'Dec',
      date: '2026-12-20',
    })

    render(<EventModal event={event} onClose={mockOnClose} />)

    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Custom Location')).toBeInTheDocument()
    expect(screen.getByText('Custom Description')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('Dec')).toBeInTheDocument()
  })
})
