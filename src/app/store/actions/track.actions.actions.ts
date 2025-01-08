import { createAction, props } from '@ngrx/store';
import { Track } from '../../models/track.model';

export const addTrack = createAction('[Track] Add Track', props<{ track: Track }>());
export const loadTracks = createAction('[Track] Load Tracks', props<{ tracks: Track[] }>());
export const loadTracksSuccess = createAction('[Track] Load Tracks Success', props<{ tracks: Track[] }>());
export const deleteTrack = createAction(
    '[Track] Delete Track',
    props<{ trackId: string }>()
);

export const deleteTrackSuccess = createAction(
    '[Track] Delete Track Success',
    props<{ trackId: string }>()
);

export const updateTrack = createAction(
    '[Track] Update Track',
    props<{ track: Track }>()
);

export const updateTrackSuccess = createAction(
    '[Track] Update Track Success',
    props<{ track: Track }>()
);

export const searchTracks = createAction(
    '[Track] Search Tracks',
    props<{ query: string }>()
  );

  export const loadTracksError = createAction(
    '[Track] Load Tracks Error',
    props<{ error: any }>()
  );