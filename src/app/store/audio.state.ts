import { Track } from '../models/track.model';

export interface AudioState {
  currentTrack: Track | null;
  playlist: Track[];
  currentIndex: number;
  volume: number;
  progress: number;
  duration: number;
  playbackState: 'playing' | 'paused' | 'buffering' | 'stopped' | 'loading' | 'error';
  error: string | null;
  currentCategory: String | null;
}