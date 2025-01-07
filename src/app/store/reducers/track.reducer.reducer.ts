import { createReducer, on } from '@ngrx/store';
import * as TrackActions from '../actions/track.actions.actions';
import { Track } from '../../models/track.model';

export interface TrackState {
  tracks: Track[];
}

export const initialState: TrackState = {
  tracks: []
};

export const trackReducer = createReducer(
  initialState,
  on(TrackActions.addTrack, (state, { track }) => ({
    ...state,
    tracks: [...state.tracks, track]
  })),
  on(TrackActions.deleteTrackSuccess, (state, { trackId }) => ({
    ...state,
    tracks: state.tracks.filter(track => track.id !== trackId)
  })),
  on(TrackActions.updateTrackSuccess, (state, { track }) => ({
    ...state,
    tracks: state.tracks.map(t => t.id === track.id ? track : t)
  })),
  on(TrackActions.loadTracks, (state, { tracks }) => ({
    ...state,
    tracks
  }))
);
