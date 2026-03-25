import { renderHook } from '@testing-library/react'
import { useMemo } from 'react'
import type { EventItem } from '../types'

const createEvent = (overrides: Partial<EventItem> = {}): EventItem => ({
  date: '2025-06-15',
  day: '15',
  month: 'Jun',
  title: 'Test Event',
  location: 'Test Location',
  description: 'Test Description',
  ...overrides,
})

describe('EventModal date logic', () => {
  describe('googleCalendarUrl', () => {
    const useCalendarUrl = (event: EventItem) => {
      return useMemo(() => {
        const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE'
        const title = encodeURIComponent(event.title)
        const details = encodeURIComponent(event.description)
        const location = encodeURIComponent(event.location)
        const timezone = 'America/Argentina/Buenos_Aires'

        let datesParam = ''

        const [year, month, day] = event.date.split('-').map(Number)

        if (event.time) {
          const timeCleaned = event.time.replace(/\s*hs/, '').trim()
          const [hours, minutes] = timeCleaned.split(':').map(Number)

          const startDate = new Date(year, month - 1, day, hours, minutes)
          const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000)

          const format = (d: Date) => [
            d.getFullYear(),
            (d.getMonth() + 1).toString().padStart(2, '0'),
            d.getDate().toString().padStart(2, '0'),
            'T',
            d.getHours().toString().padStart(2, '0'),
            d.getMinutes().toString().padStart(2, '0'),
            '00'
          ].join('')

          datesParam = `${format(startDate)}/${format(endDate)}`
        } else {
          const format = (d: Date) => [
            d.getFullYear(),
            (d.getMonth() + 1).toString().padStart(2, '0'),
            d.getDate().toString().padStart(2, '0')
          ].join('')

          const startDate = new Date(year, month - 1, day)
          const endDate = new Date(year, month - 1, day + 1)

          datesParam = `${format(startDate)}/${format(endDate)}`
        }

        return `${baseUrl}&text=${title}&dates=${datesParam}&details=${details}&location=${location}&ctz=${timezone}`
      }, [event])
    }

    it('should generate calendar URL with time', () => {
      const event = createEvent({ time: '14:30' })
      const { result } = renderHook(() => useCalendarUrl(event))

      expect(result.current).toContain('text=Test%20Event')
      expect(result.current).toContain('dates=20250615T143000/20250615T163000')
      expect(result.current).toContain('ctz=America/Argentina/Buenos_Aires')
    })

    it('should handle time with "hs" suffix', () => {
      const event = createEvent({ time: '14:30hs' })
      const { result } = renderHook(() => useCalendarUrl(event))

      expect(result.current).toContain('dates=20250615T143000/20250615T163000')
    })

    it('should handle time with spaces before hs', () => {
      const event = createEvent({ time: '14:30 hs' })
      const { result } = renderHook(() => useCalendarUrl(event))

      expect(result.current).toContain('dates=20250615T143000/20250615T163000')
    })

    it('should handle single digit hour', () => {
      const event = createEvent({ time: '9:00' })
      const { result } = renderHook(() => useCalendarUrl(event))

      expect(result.current).toContain('dates=20250615T090000/20250615T110000')
    })

    it('should generate all-day event URL', () => {
      const event = createEvent()
      const { result } = renderHook(() => useCalendarUrl(event))

      expect(result.current).toContain('dates=20250615/20250616')
      const datesPart = result.current.split('dates=')[1].split('&')[0]
      expect(datesPart).not.toContain('T')
    })
  })

  describe('showAddToCalendar', () => {
    const useShowCalendar = (event: EventItem) => {
      return useMemo(() => {
        const parseEventDate = (eventItem: EventItem): Date => {
          const [year, month, day] = eventItem.date.split('-').map(Number)
          let hours = 0
          let minutes = 0
          if (eventItem.time) {
            const timeCleaned = eventItem.time.replace(/\s*hs/, '').trim()
            const [parsedHours, parsedMinutes] = timeCleaned.split(':').map(Number)
            hours = parsedHours || 0
            minutes = parsedMinutes || 0
          }
          return new Date(year, month - 1, day, hours, minutes)
        }

        const eventStartDate = parseEventDate(event)
        const now = new Date()

        if (event.time) {
          const visibilityCutoff = new Date(eventStartDate.getTime() + 60 * 60 * 1000)
          return now < visibilityCutoff
        } else {
          const endOfDay = new Date(eventStartDate)
          endOfDay.setHours(23, 59, 59, 999)
          return now <= endOfDay
        }
      }, [event])
    }

    it('should show button for future events with time', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 7)
      const event = createEvent({
        date: `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`,
        time: '14:00'
      })
      const { result } = renderHook(() => useShowCalendar(event))

      expect(result.current).toBe(true)
    })

    it('should show button for all-day events today', () => {
      const today = new Date()
      const event = createEvent({
        date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
      })
      const { result } = renderHook(() => useShowCalendar(event))

      expect(result.current).toBe(true)
    })

    it('should hide button for past all-day events', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 2)
      const event = createEvent({
        date: `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}-${String(pastDate.getDate()).padStart(2, '0')}`
      })
      const { result } = renderHook(() => useShowCalendar(event))

      expect(result.current).toBe(false)
    })
  })
})
