import { createSelector } from '@ngrx/store';
import { TrackState } from '../../store/reducers/track.reducer.reducer';

export const selectTracks = (state: TrackState) => state.tracks;
export const selectSearchQuery = (state: TrackState) => state.searchQuery;

export const selectFilteredTracks = createSelector(
  selectTracks,
  selectSearchQuery,
  (tracks, searchQuery) => {
    if (!searchQuery) return tracks;
    return tracks.filter((track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
);
