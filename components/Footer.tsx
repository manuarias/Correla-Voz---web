import React from 'react';
import { ICONS } from '../constants';
import type { SocialLinkItem } from '../types';

interface FooterProps {
  socialLinks: SocialLinkItem[];
}

const Footer: React.FC<FooterProps> = ({ socialLinks }) => {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800 mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-slate-400">
        <div className="flex justify-center space-x-6 mb-4">
          {socialLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.url} 
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Seguir en ${link.name}`}
              className="hover:text-red-400 transition-colors duration-300"
            >
              {ICONS[link.name]}
            </a>
          ))}
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Correla Voz. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;