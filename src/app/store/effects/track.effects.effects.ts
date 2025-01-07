import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TrackActions from '../actions/track.actions.actions';
import { IndexedDBService } from '../../services/indexeddb.service';

@Injectable()
export class TracksEffects {
  loadTracks$ = createEffect(() => 
    this.actions$.pipe(
      ofType('[Track] Load Tracks Request'),
      mergeMap(() => this.indexedDBService.getAllTracks()
        .pipe(
          map(tracks => TrackActions.loadTracksSuccess({ tracks })),
          catchError(error => of({ type: '[Track] Load Tracks Error', error }))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private indexedDBService: IndexedDBService
  ) {}
}