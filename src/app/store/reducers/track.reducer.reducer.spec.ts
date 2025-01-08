import { trackReducer, initialState, TrackState } from './track.reducer.reducer';
import * as TrackActions from '../actions/track.actions.actions';
import { Track } from '../../models/track.model';

describe('Track Reducer', () => {
  const mockTrack: Track = {
    id: '1',
    title: 'Test Track',
    artist: 'Test Artist',
    duration: '3:30',
    category: 'Test Category',
    createdAt: new Date(),
    audio: new Blob([''], { type: 'audio/mpeg' })
  };

  it('should return the default state', () => {
    const action = { type: 'NOOP' } as any;
    const state = trackReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add a track', () => {
    const newState = trackReducer(initialState, TrackActions.addTrack({ track: mockTrack }));
    expect(newState.tracks.length).toBe(1);
    expect(newState.tracks[0]).toEqual(mockTrack);
  });

  it('should delete a track', () => {
    const stateWithTrack: TrackState = {
      ...initialState,
      tracks: [mockTrack]
    };
    const newState = trackReducer(stateWithTrack, TrackActions.deleteTrackSuccess({ trackId: '1' }));
    expect(newState.tracks.length).toBe(0);
  });

  it('should update a track', () => {
    const stateWithTrack: TrackState = {
      ...initialState,
      tracks: [mockTrack]
    };
    const updatedTrack: Track = { ...mockTrack, title: 'Updated Track' };
    const newState = trackReducer(stateWithTrack, TrackActions.updateTrackSuccess({ track: updatedTrack }));
    expect(newState.tracks[0].title).toBe('Updated Track');
  });

  it('should load tracks', () => {
    const tracks: Track[] = [mockTrack];
    const newState = trackReducer(initialState, TrackActions.loadTracks({ tracks }));
    expect(newState.tracks).toEqual(tracks);
  });

  it('should update search query', () => {
    const query = 'test';
    const newState = trackReducer(initialState, TrackActions.searchTracks({ query }));
    expect(newState.searchQuery).toBe(query);
  });
});