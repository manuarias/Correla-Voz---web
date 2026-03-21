
import React, { useEffect, useMemo } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import type { EventItem } from '../types';

interface EventModalProps {
  event: EventItem;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const containerRef = useFocusTrap(true);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const googleCalendarUrl = useMemo(() => {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(event.location);
    const timezone = 'America/Argentina/Buenos_Aires';

    let datesParam = '';
    
    // Date parts from YYYY-MM-DD
    const [year, month, day] = event.date.split('-').map(Number);

    if (event.time) {
        const timeCleaned = event.time.replace(/\s*hs/, '').trim();
        const [hours, minutes] = timeCleaned.split(':').map(Number);
        
        const startDate = new Date(year, month - 1, day, hours, minutes);
        // Assume a 2-hour duration
        const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

        const format = (d: Date) => [
            d.getFullYear(),
            (d.getMonth() + 1).toString().padStart(2, '0'),
            d.getDate().toString().padStart(2, '0'),
            'T',
            d.getHours().toString().padStart(2, '0'),
            d.getMinutes().toString().padStart(2, '0'),
            '00'
        ].join('');

        datesParam = `${format(startDate)}/${format(endDate)}`;
    } else {
        // All-day event
        const format = (d: Date) => [
            d.getFullYear(),
            (d.getMonth() + 1).toString().padStart(2, '0'),
            d.getDate().toString().padStart(2, '0')
        ].join('');
        
        const startDate = new Date(year, month - 1, day);
        const endDate = new Date(year, month - 1, day + 1);

        datesParam = `${format(startDate)}/${format(endDate)}`;
    }

    return `${baseUrl}&text=${title}&dates=${datesParam}&details=${details}&location=${location}&ctz=${timezone}`;
  }, [event]);

  const showAddToCalendar = useMemo(() => {
    const parseEventDate = (eventItem: EventItem): Date => {
      const [year, month, day] = eventItem.date.split('-').map(Number);
      let hours = 0;
      let minutes = 0;
      if (eventItem.time) {
        const timeCleaned = eventItem.time.replace(/\s*hs/, '').trim();
        const [parsedHours, parsedMinutes] = timeCleaned.split(':').map(Number);
        hours = parsedHours || 0;
        minutes = parsedMinutes || 0;
      }
      return new Date(year, month - 1, day, hours, minutes);
    };
    
    const eventStartDate = parseEventDate(event);
    const now = new Date();
    
    if (event.time) {
      // Event has a specific time, hide button 1 hour after start
      const visibilityCutoff = new Date(eventStartDate.getTime() + 60 * 60 * 1000); 
      return now < visibilityCutoff;
    } else {
      // All-day event, show button for the entire day
      const endOfDay = new Date(eventStartDate);
      endOfDay.setHours(23, 59, 59, 999);
      return now <= endOfDay;
    }
  }, [event]);


  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      <div 
        ref={containerRef}
        className="bg-slate-800 rounded-xl shadow-2xl shadow-red-500/10 w-full max-w-md border border-slate-700 transform transition-all duration-300 ease-in-out scale-95 animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 flex flex-col items-center justify-center text-center bg-slate-700/50 rounded-lg p-3 w-16">
                <span className="text-3xl font-bold text-red-500">{event.day}</span>
                <span className="text-sm font-semibold text-slate-400">{event.month}</span>
            </div>
            <div className="flex-grow">
                <h3 id="event-modal-title" className="font-bold text-xl text-murga-turquoise mb-1">{event.title}</h3>
                <p className="text-sm text-slate-400 mb-1">{event.location}</p>
                {event.time && <p className="text-sm text-slate-400">{event.time}</p>}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-slate-300 whitespace-pre-wrap">{event.description}</p>
          </div>

          {showAddToCalendar && (
            <div className="mt-6 text-center">
              <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zM9 18H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
                  Agregar a Google Calendar
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default EventModal;