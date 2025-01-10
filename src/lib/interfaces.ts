export interface Show {
  id: number;
  image: string;
  title: string;
  year: string;
  rating: number;
  language: string;
  genres: string[];
  isFavorite?: boolean;
}

export interface Filters {
  rating: number[];
  languages: string[];
  genres: string[];
}


export interface Episode {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  number: number; // Added episode number
}

export interface Season {
  id: number;
  seasonNumber: number;
  episodeCount: number;
  premiereDate: string;
  endDate: string;
}

export interface ShowExtend {
  id: number;
  title: string;
  year: string;
  rating: number;
  language: string;
  genres: string[];
  description: string;
  cast: string[];
  creator: string;
  episodes: Episode[];
  coverImage: string;
  isFavorite: boolean;
}

export interface SearchHistoryItem {
  id: number;
  query: string;
  filters: Record<string, any>;
  timestamp: string;
}