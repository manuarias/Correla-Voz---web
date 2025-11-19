
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LinksSection from './components/LinksSection';
import AboutSection from './components/AboutSection';
import CalendarSection from './components/CalendarSection';
import PhotosSection from './components/PhotosSection';
import Footer from './components/Footer';
import ConfettiBackground from './components/ConfettiBackground';
import ScrollToTopButton from './components/ScrollToTopButton';
import type { ConfigData } from './types';

const App: React.FC = () => {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/config.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ConfigData = await response.json();
        setConfig(data);
      } catch (e) {
        if (e instanceof Error) {
            setError(`Failed to load configuration: ${e.message}`);
        } else {
            setError('An unknown error occurred while loading configuration.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-teal-400">Cargando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-red-400 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Error al Cargar la Página</h1>
        <p>No se pudo cargar la configuración necesaria.</p>
        <p className="text-sm text-slate-500 mt-2">{error}</p>
      </div>
    );
  }

  if (!config) {
    return null;
  }

  return (
    <div className="min-h-screen text-gray-200 flex flex-col relative z-0">
      <ConfettiBackground />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <LinksSection links={config.importantLinks} />

        <div className="pt-12 md:pt-16">
          <AboutSection data={config.aboutSection} />
        </div>
        
        <div className="pt-12 md:pt-16">
          <CalendarSection events={config.calendarEvents} />
        </div>

        <div className="pt-12 md:pt-16">
          <PhotosSection albums={config.photoAlbums} />
        </div>
      </main>
      <Footer socialLinks={config.socialLinks} />
      <ScrollToTopButton />
    </div>
  );
};

export default App;