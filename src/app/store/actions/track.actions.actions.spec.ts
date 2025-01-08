import * as fromActions from './track.actions.actions';
import { Track } from '../../models/track.model';

describe('Track Actions', () => {
  const mockTrack: Track = {
    id: '1',
    title: 'Test Track',
    artist: 'Test Artist',
    duration: '3:30',
    category: 'Test Category',
    createdAt: new Date(),
    audio: new Blob([''], { type: 'audio/mpeg' })
  };

  it('should create an addTrack action', () => {
    const action = fromActions.addTrack({ track: mockTrack });
    expect(action.type).toBe('[Track] Add Track');
    expect(action.track).toEqual(mockTrack);
  });

  it('should create a loadTracks action', () => {
    const tracks: Track[] = [mockTrack];
    const action = fromActions.loadTracks({ tracks });
    expect(action.type).toBe('[Track] Load Tracks');
    expect(action.tracks).toEqual(tracks);
  });

  it('should create a loadTracksSuccess action', () => {
    const tracks: Track[] = [mockTrack];
    const action = fromActions.loadTracksSuccess({ tracks });
    expect(action.type).toBe('[Track] Load Tracks Success');
    expect(action.tracks).toEqual(tracks);
  });

  it('should create a deleteTrack action', () => {
    const action = fromActions.deleteTrack({ trackId: '1' });
    expect(action.type).toBe('[Track] Delete Track');
    expect(action.trackId).toBe('1');
  });

  it('should create a deleteTrackSuccess action', () => {
    const action = fromActions.deleteTrackSuccess({ trackId: '1' });
    expect(action.type).toBe('[Track] Delete Track Success');
    expect(action.trackId).toBe('1');
  });

  it('should create an updateTrack action', () => {
    const action = fromActions.updateTrack({ track: mockTrack });
    expect(action.type).toBe('[Track] Update Track');
    expect(action.track).toEqual(mockTrack);
  });

  it('should create an updateTrackSuccess action', () => {
    const action = fromActions.updateTrackSuccess({ track: mockTrack });
    expect(action.type).toBe('[Track] Update Track Success');
    expect(action.track).toEqual(mockTrack);
  });

  it('should create a searchTracks action', () => {
    const query = 'test';
    const action = fromActions.searchTracks({ query });
    expect(action.type).toBe('[Track] Search Tracks');
    expect(action.query).toBe(query);
  });
});