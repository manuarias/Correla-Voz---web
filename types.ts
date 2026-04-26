export interface LinkItem {
  title: string;
  url: string;
  iconName: 'youtube' | 'spotify' | 'instagram';
}

export interface EventItem {
  date: string;
  day: string;
  month: string;
  title: string;
  location: string;
  time?: string;
  description: string;
}

export interface AlbumItem {
  title: string;
  imageUrl: string;
  albumUrl: string;
  /**
   * Fecha del álbum en formato legible (ej: "15 de Noviembre, 2025").
   * Opcional — si no existe, el alt text no incluye fecha.
   */
  date?: string;
}

export interface SocialLinkItem {
    name: 'instagram' | 'youtube' | 'spotify';
    url: string;
}

export type HistoryContentBlock = 
  | { type: 'text'; content: string }
  | { type: 'image'; src: string; alt: string };

export interface AboutSectionData {
  review: string;
  history: HistoryContentBlock[];
  rehearsalSchedule: string;
  rehearsalLocation: string;
  rehearsalLocationUrl: string;
  nextRehearsalInfo: string;
}

export interface ConfigData {
    heroText: string;
    importantLinks: LinkItem[];
    calendarEvents: EventItem[];
    photoAlbums: AlbumItem[];
    socialLinks: SocialLinkItem[];
    aboutSection: AboutSectionData;
}