
import React, { useState, useMemo } from 'react';
import Section from './Section';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { EventItem } from '../types';
import EventModal from './EventModal';

interface CalendarSectionProps {
  events: EventItem[];
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const processedEvents = useMemo(() => {
    const now = new Date();
    // Set cutoff to 48 hours ago
    const cutoffDate = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    const parseEventDate = (event: EventItem): Date => {
        const [year, month, day] = event.date.split('-').map(Number);
        let hours = 0;
        let minutes = 0;
        // Check if time is provided and parse it
        if (event.time) {
            const timeCleaned = event.time.replace(/\s*hs/, '').trim();
            const timeParts = timeCleaned.split(':').map(Number);
            hours = timeParts[0] || 0;
            minutes = timeParts[1] || 0;
        }
        // Month is 0-indexed in JS Date constructor
        return new Date(year, month - 1, day, hours, minutes);
    };

    return events
        .map(event => ({ ...event, parsedDate: parseEventDate(event) }))
        // Filter out events that ended more than 48 hours ago
        .filter(event => event.parsedDate >= cutoffDate)
        // Sort the remaining events chronologically
        .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());
  }, [events]);

  const nextEvent = useMemo(() => {
    const now = new Date();
    return processedEvents.find(event => {
      if (event.time) {
        // Event has a specific time, highlight ends 1 hour after start
        const highlightEndTime = new Date(event.parsedDate.getTime() + 60 * 60 * 1000);
        return now < highlightEndTime;
      } else {
        // All-day event, highlight for the entire day
        const endOfDay = new Date(event.parsedDate);
        endOfDay.setHours(23, 59, 59, 999); // Set to end of the day
        return now <= endOfDay;
      }
    });
  }, [processedEvents]);


  return (
    <>
      <Section title="Calendario de Presentaciones">
        <div className="max-w-3xl mx-auto space-y-4">
          {processedEvents.length > 0 ? (
            processedEvents.map((event, index) => {
              const isNextEvent = event === nextEvent;
              return (
                <Card
                  as="button"
                  key={`${event.date}-${event.title}-${index}`}
                  onClick={() => setSelectedEvent(event)}
                  className={`w-full text-left flex items-center p-4 transition-all duration-300 cursor-pointer hover:bg-slate-800 focus:outline-none relative overflow-hidden ${
                    isNextEvent
                      ? 'border-teal-400 ring-2 ring-teal-400 ring-offset-2 ring-offset-black'
                      : 'border-slate-700 hover:border-red-500 focus:ring-2 focus:ring-red-500'
                  }`}
                  aria-label={`Ver detalles para ${event.title}`}
                >
                  {isNextEvent && (
                     <Badge className="absolute top-0 right-0 rounded-none rounded-bl-lg px-2 py-1">
                       Próximo
                     </Badge>
                  )}
                  <div className="flex flex-col items-center justify-center text-center pr-4 border-r border-slate-600">
                    <span className="text-3xl font-bold text-red-500">{event.day}</span>
                    <span className="text-sm font-semibold text-slate-400">{event.month}</span>
                  </div>
                  <div className="pl-4 flex-grow">
                    <h3 className="font-bold text-lg text-white">{event.title}</h3>
                    <p className="text-sm text-slate-400">{event.location}</p>
                  </div>
                  {event.time && (
                    <div className="text-right text-sm font-semibold text-murga-turquoise pl-4 flex-shrink-0">
                      {event.time}
                    </div>
                  )}
                </Card>
              );
            })
          ) : (
            <Card className="text-center text-slate-400 p-6 border-slate-700">
              <p>No hay presentaciones programadas próximamente.</p>
              <p className="text-sm mt-2">¡Vuelve a consultar pronto para enterarte de las novedades!</p>
            </Card>
          )}
        </div>
      </Section>
      
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </>
  );
};

export default CalendarSection;