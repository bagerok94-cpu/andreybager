export interface SiteSettings {
  title: string;
  description: string;
  author: string;
  siteUrl: string;
  defaultLocale: string;
}

export interface About {
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  skills: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  gallery: string[];
  url?: string;
  year: number;
  status: string;
  order: number;
  published: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  order: number;
  published: boolean;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  description?: string;
  icon?: string;
  proficiency?: string;
}

export interface Contact {
  email: string;
  telegram?: string;
  github?: string;
  linkedin?: string;
  location?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string;
  order: number;
  published: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}
