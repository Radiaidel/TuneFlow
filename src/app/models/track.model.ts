export interface Track {
  id: string;
  title: string;
  artist: string;
  description?: string;
  duration: string;
  category: String;
  coverImage?: string;
  createdAt: Date;
  audio: Blob;
}



