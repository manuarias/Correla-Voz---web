import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CalendarSection from '../../../components/CalendarSection'
import type { EventItem } from '../../../types'

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

const createFutureDate = (daysFromNow: number = 7): { date: string; day: string } => {
  const d = new Date()
  d.setDate(d.getDate() + daysFromNow)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return {
    date: `${year}-${month}-${day}`,
    day: String(d.getDate()),
  }
}

const createEvent = (overrides: Partial<EventItem> = {}): EventItem => {
  const future = createFutureDate()
  return {
    date: future.date,
    day: future.day,
    month: 'Dic',
    title: 'Test Event',
    location: 'Test Location',
    description: 'Test Description',
    ...overrides,
  }
}

describe('CalendarSection', () => {
  it('renders event titles and locations', () => {
    const events = [
      createEvent({ title: 'Concert A', location: 'Theater X' }),
      createEvent({ title: 'Concert B', location: 'Hall Y' }),
    ]
    render(<CalendarSection events={events} />)

    expect(screen.getByText('Concert A')).toBeInTheDocument()
    expect(screen.getByText('Theater X')).toBeInTheDocument()
    expect(screen.getByText('Concert B')).toBeInTheDocument()
    expect(screen.getByText('Hall Y')).toBeInTheDocument()
  })

  it('shows "Próximo" badge for the next upcoming event', () => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 7)
    const year = futureDate.getFullYear()
    const month = String(futureDate.getMonth() + 1).padStart(2, '0')
    const day = String(futureDate.getDate()).padStart(2, '0')

    const events = [
      createEvent({
        date: `${year}-${month}-${day}`,
        day: String(futureDate.getDate()),
        title: 'Future Concert',
      }),
    ]
    render(<CalendarSection events={events} />)

    expect(screen.getByText('Próximo')).toBeInTheDocument()
  })

  it('shows empty state when no events are provided', () => {
    render(<CalendarSection events={[]} />)

    expect(screen.getByText('No hay presentaciones programadas próximamente.')).toBeInTheDocument()
  })

  it('opens modal when an event is clicked', async () => {
    const events = [
      createEvent({ title: 'Clickable Event', description: 'Event Details' }),
    ]
    render(<CalendarSection events={events} />)

    const eventButton = screen.getByLabelText('Ver detalles para Clickable Event')
    await userEvent.click(eventButton)

    expect(screen.getByText('Event Details')).toBeInTheDocument()
  })
})
