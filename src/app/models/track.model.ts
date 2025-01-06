export interface Track {
  id: string;
  title: string;
  artist: string;
  description?: string;
  duration: string;
  category: MusicCategory;
  coverImage?: string;
  createdAt: Date;
  audio: Blob;
}

export enum MusicCategory {
  POP = 'pop',
  ROCK = 'rock',
  RAP = 'rap',
  CHAABI = 'cha3bi',
  JAZZ = 'jazz',
  CLASSICAL = 'classical',
  OTHER = 'other'
}

