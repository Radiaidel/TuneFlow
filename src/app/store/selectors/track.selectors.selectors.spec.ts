import { TrackState } from '../../store/reducers/track.reducer.reducer';
import * as fromSelectors from './track.selectors.selectors';
import { Track } from '../../models/track.model';

describe('Track Selectors', () => {
  const mockTrack1: Track = {
    id: '1',
    title: 'Test Track',
    artist: 'Test Artist',
    duration: '3:30',
    category: 'Rock',
    createdAt: new Date(),
    audio: new Blob([''], { type: 'audio/mpeg' })
  };

  const mockTrack2: Track = {
    id: '2',
    title: 'Another Track',
    artist: 'Another Artist',
    duration: '4:00',
    category: 'Pop',
    createdAt: new Date(),
    audio: new Blob([''], { type: 'audio/mpeg' })
  };

  const initialState: TrackState = {
    tracks: [mockTrack1, mockTrack2],
    searchQuery: ''
  };

  it('should select all tracks', () => {
    const result = fromSelectors.selectTracks(initialState);
    expect(result).toEqual([mockTrack1, mockTrack2]);
  });

  it('should select search query', () => {
    const result = fromSelectors.selectSearchQuery(initialState);
    expect(result).toBe('');
  });

  it('should select filtered tracks when search query is empty', () => {
    const result = fromSelectors.selectFilteredTracks.projector(initialState.tracks, '');
    expect(result).toEqual([mockTrack1, mockTrack2]);
  });

  it('should select filtered tracks by title', () => {
    const result = fromSelectors.selectFilteredTracks.projector(initialState.tracks, 'Another');
    expect(result).toEqual([mockTrack2]);
  });

  it('should select filtered tracks by category', () => {
    const result = fromSelectors.selectFilteredTracks.projector(initialState.tracks, 'Rock');
    expect(result).toEqual([mockTrack1]);
  });

  it('should return empty array when no tracks match the search query', () => {
    const result = fromSelectors.selectFilteredTracks.projector(initialState.tracks, 'NonExistent');
    expect(result).toEqual([]);
  });
});