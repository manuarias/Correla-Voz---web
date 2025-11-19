
import React from 'react';
import Section from './Section';
import { ICONS } from '../constants';
import type { LinkItem } from '../types';

interface LinksSectionProps {
  links: LinkItem[];
}

const LinksSection: React.FC<LinksSectionProps> = ({ links }) => {
  return (
    <Section title="Conócenos Más">
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-slate-800/50 border border-slate-700 rounded-lg p-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:border-red-500 hover:bg-red-900/30 w-40 md:w-60"
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-slate-300 group-hover:text-red-500 transition-colors duration-300">
                {ICONS[link.iconName]}
              </div>
              <span className="mt-3 text-sm md:text-base font-semibold text-slate-300 group-hover:text-white transition-colors duration-300">
                {link.title}
              </span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
};

export default LinksSection;
