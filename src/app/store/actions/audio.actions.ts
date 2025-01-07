import { createAction, props } from '@ngrx/store';
import { Track, MusicCategory } from '../../models/track.model';

export const playTrack = createAction('[Audio] Play Track', props<{ track: Track }>());
export const pauseTrack = createAction('[Audio] Pause Track');
export const resumeTrack = createAction('[Audio] Resume Track');
export const stopTrack = createAction('[Audio] Stop Track');
export const nextTrack = createAction('[Audio] Next Track');
export const previousTrack = createAction('[Audio] Previous Track');
export const setVolume = createAction('[Audio] Set Volume', props<{ volume: number }>());
export const setProgress = createAction('[Audio] Set Progress', props<{ progress: number }>());
export const setCategory = createAction('[Audio] Set Category', props<{ category: MusicCategory }>());
export const loadTrackSuccess = createAction('[Audio] Load Track Success', props<{ track: Track }>());
export const loadTrackError = createAction('[Audio] Load Track Error', props<{ error: string }>());
export const updatePlaybackState = createAction(
  '[Audio] Update Playback State',
  props<{ state: 'playing' | 'paused' | 'buffering' | 'stopped' | 'loading' | 'error' }>()
);