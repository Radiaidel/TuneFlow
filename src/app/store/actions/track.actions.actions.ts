import { createAction, props } from '@ngrx/store';
import { Track } from '../../models/track.model';

export const addTrack = createAction('[Track] Add Track', props<{ track: Track }>());
export const updateTrack = createAction('[Track] Update Track', props<{ track: Track }>());
export const deleteTrack = createAction('[Track] Delete Track', props<{ id: string }>());
export const loadTracks = createAction('[Track] Load Tracks', props<{ tracks: Track[] }>());
export const loadTracksSuccess = createAction('[Track] Load Tracks Success', props<{ tracks: Track[] }>());