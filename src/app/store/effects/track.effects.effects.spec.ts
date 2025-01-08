import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { TracksEffects } from './track.effects.effects';
import { IndexedDBService } from '../../services/indexeddb.service';
import * as TrackActions from '../actions/track.actions.actions';
import { Track } from '../../models/track.model';

describe('TracksEffects', () => {
  let actions$: Observable<any>;
  let effects: TracksEffects;
  let indexedDBService: jasmine.SpyObj<IndexedDBService>;
  let testScheduler: TestScheduler;

  const mockTrack: Track = {
    id: '1',
    title: 'Test Track',
    artist: 'Test Artist',
    duration: '3:30',
    category: 'Test Category',
    createdAt: new Date(),
    audio: new Blob([''], { type: 'audio/mpeg' })
  };

  beforeEach(() => {
    const indexedDBServiceSpy = jasmine.createSpyObj('IndexedDBService', ['getAllTracks']);

    TestBed.configureTestingModule({
      providers: [
        TracksEffects,
        provideMockActions(() => actions$),
        { provide: IndexedDBService, useValue: indexedDBServiceSpy }
      ]
    });

    effects = TestBed.inject(TracksEffects);
    indexedDBService = TestBed.inject(IndexedDBService) as jasmine.SpyObj<IndexedDBService>;
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should handle loadTracks$ effect', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const tracks: Track[] = [mockTrack];
      actions$ = hot('-a', { a: { type: '[Track] Load Tracks Request' } });
      const response = cold('-b|', { b: tracks });
      indexedDBService.getAllTracks.and.returnValue(response);

      expectObservable(effects.loadTracks$).toBe('--c', {
        c: TrackActions.loadTracksSuccess({ tracks })
      });
    });
  });

  it('should handle loadTracks$ effect error', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: { type: '[Track] Load Tracks Request' } });
  
      const error = new Error('Test error');
      
      // Correctly typed cold observable to match Observable<Track[]>
      const response = cold<Track[]>('-#|', {}, error);
      
      // Mocking the getAllTracks method to return the typed observable
      indexedDBService.getAllTracks.and.returnValue(response);
  
      // Expecting the effects to emit a Load Tracks Error action
      expectObservable(effects.loadTracks$).toBe('--c', {
        c: TrackActions.loadTracksError({ error }) // Adjust the action name if needed
      });
    });
  });
  
  
});