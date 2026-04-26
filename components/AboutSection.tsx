
import React from 'react';
import Section from './Section';
import { Card } from './ui/card';
import type { AboutSectionData, HistoryContentBlock } from '../types';

interface AboutSectionProps {
  data: AboutSectionData;
}

const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  const textBlocks = Array.isArray(data.history)
    ? data.history.filter((b): b is Extract<HistoryContentBlock, { type: 'text' }> => b.type === 'text')
    : [];

  const imageBlocks = Array.isArray(data.history)
    ? data.history.filter((b): b is Extract<HistoryContentBlock, { type: 'image' }> => b.type === 'image')
    : [];

  return (
    <Section title="Sobre Correla">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Reseña */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-slate-300 italic leading-relaxed">
            &ldquo;{data.review}&rdquo;
          </p>
        </div>

        {/* Historia */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-murga-turquoise tracking-wide animate-murga-glow-soft">Nuestra Historia</h2>
          
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
             {/* Text Column */}
             <div className="w-full lg:w-1/2 space-y-6 text-slate-400 text-base leading-loose text-justify">
                 {textBlocks.map((block, index) => (
                    <p key={`hist-text-${index}`}>{block.content}</p>
                 ))}
             </div>
             
             {/* Image Column */}
             <div className="w-full lg:w-1/2 flex flex-col gap-6">
                 {imageBlocks.map((block, index) => (
<img
                         key={`hist-img-${index}`}
                         src={block.src}
                         alt={block.alt}
                         loading="lazy"
                         className="rounded-lg shadow-lg shadow-red-500/20 object-cover w-full aspect-video transform transition-transform duration-500 hover:scale-105"
                     />
                 ))}
             </div>
          </div>
        </div>

        {/* Ensayos */}
        <Card className="max-w-2xl mx-auto carnival-border p-8 text-center relative">
            <h4 className="font-bold text-xl text-teal-300 mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ¿Cuándo ensayamos?
            </h4>
            <p className="text-slate-300 mb-4 text-lg">{data.rehearsalSchedule}</p>
            
            <a 
                href={data.rehearsalLocationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-slate-300 hover:text-teal-300 transition-colors duration-300 group mb-4"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-lg group-hover:underline">{data.rehearsalLocation}</span>
            </a>

            <p className="font-semibold text-white animate-pulse pt-4 border-t border-slate-700/50">{data.nextRehearsalInfo}</p>
        </Card>
      </div>
    </Section>
  );
};

export default AboutSection;
