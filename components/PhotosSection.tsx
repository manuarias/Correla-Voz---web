
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Section from './Section';
import type { AlbumItem } from '../types';

const monthMap: { [key: string]: number } = {
  'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
  'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
};

/**
 * Parses a date string from various Spanish formats into a Date object.
 * Handles single days, month-year, and date ranges (uses start of range).
 * @param {string} [dateString] - The date string to parse (e.g., "2 de Marzo, 2024", "Febrero 2024", "Enero - Marzo, 2024").
 * @returns {Date | null} A Date object or null if parsing fails.
 */
const parseAlbumDate = (dateString?: string): Date | null => {
    if (!dateString) return null;

    const lowerDate = dateString.toLowerCase().replace(/,/g, '');

    const yearMatch = lowerDate.match(/\b(\d{4})\b/);
    if (!yearMatch) return null; // A year is mandatory
    const year = parseInt(yearMatch[1], 10);

    const monthNames = Object.keys(monthMap).join('|');
    const monthRegex = new RegExp(`\\b(${monthNames})\\b`);
    const monthMatch = lowerDate.match(monthRegex);
    if (!monthMatch) return null; // A month is mandatory
    const month = monthMap[monthMatch[1] as keyof typeof monthMap];

    let day = 1; // Default to the 1st day of the month
    // Regex to find a day number at the beginning of the string
    const dayMatch = lowerDate.match(/^(\d{1,2})\b/);
    if (dayMatch) {
        day = parseInt(dayMatch[1], 10);
    }
    
    // Check if parsed values are valid numbers before creating a Date
    if (!isNaN(year) && month !== undefined && !isNaN(day)) {
        // JS month is 0-indexed
        return new Date(year, month, day);
    }
    
    return null;
};

// FIX: Define PhotosSectionProps interface for component props.
interface PhotosSectionProps {
  albums: AlbumItem[];
}

const PhotosSection: React.FC<PhotosSectionProps> = ({ albums }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkScrollability();
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);

      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [albums, checkScrollability]);
  
  useEffect(() => {
    const findAndScrollToClosestAlbum = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const albumsWithDates = albums
            .map((album, index) => ({
                ...album,
                index,
                parsedDate: parseAlbumDate(album.date),
            }))
            .filter(album => album.parsedDate instanceof Date);

        if (albumsWithDates.length === 0) return;

        let closestAlbum = albumsWithDates[0];
        let minDiff = Math.abs(closestAlbum.parsedDate!.getTime() - today.getTime());

        for (let i = 1; i < albumsWithDates.length; i++) {
            const diff = Math.abs(albumsWithDates[i].parsedDate!.getTime() - today.getTime());
            if (diff < minDiff) {
                minDiff = diff;
                closestAlbum = albumsWithDates[i];
            }
        }
        
        const targetIndex = closestAlbum.index;
        const el = scrollContainerRef.current;
        if (el && el.children[targetIndex]) {
            const targetElement = el.children[targetIndex] as HTMLElement;
            
            const containerWidth = el.offsetWidth;
            const targetLeft = targetElement.offsetLeft;
            const targetWidth = targetElement.offsetWidth;
            
            const scrollLeft = targetLeft + targetWidth / 2 - containerWidth / 2;
            
            el.scrollTo({
                left: scrollLeft,
                // Using 'auto' behavior for initial load feels less jarring than 'smooth'
                behavior: 'auto', 
            });
        }
    };
    
    // A small timeout ensures that the layout has been painted and dimensions are accurate
    const timer = setTimeout(findAndScrollToClosestAlbum, 100);

    return () => clearTimeout(timer);
  }, [albums]);


  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };


  return (
    <Section title="Galería de Fotos">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <p className="text-slate-400">
          Revive nuestros mejores momentos. Cada foto es un enlace a un álbum completo en Google Fotos.
        </p>
      </div>

      {(!albums || albums.length === 0) ? (
        <div className="text-center text-slate-400">
          <p>No hay álbumes de fotos para mostrar en este momento.</p>
        </div>
      ) : (
        <div className="relative group/carousel">
          <button
            onClick={() => scroll('left')}
            aria-label="Álbum anterior"
            disabled={!canScrollLeft}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 w-12 h-12 bg-red-600/80 hover:bg-red-600 rounded-full text-white shadow-lg z-10 hidden md:flex items-center justify-center transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex space-x-4 md:space-x-6 py-4 -mx-4 px-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
          >
            {albums.map((album, index) => (
              <a
                key={`${album.title}-${index}`}
                href={album.albumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-red-500 snap-start flex-shrink-0 w-5/6 sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={album.imageUrl} alt={album.title} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:-rotate-1" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="font-normal text-white line-clamp-2 leading-tight group-hover:text-red-300 transition-colors duration-300">{album.title}</h3>
                    {album.date && (
                      <p className="mt-1 flex items-center text-xs text-slate-300 group-hover:text-red-200 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <span>{album.date}</span>
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <button
            onClick={() => scroll('right')}
            aria-label="Siguiente álbum"
            disabled={!canScrollRight}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 w-12 h-12 bg-red-600/80 hover:bg-red-600 rounded-full text-white shadow-lg z-10 hidden md:flex items-center justify-center transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      )}
    </Section>
  );
};

export default PhotosSection;
