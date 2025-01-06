import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { TrackService } from '../../services/track.service';
import { loadTracks, loadTracksSuccess } from '../actions/track.actions.actions';

@Injectable()
export class TracksEffects {
//   constructor(private actions$: Actions, private tracksService: TrackService) {}

//   loadTracks$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadTracks),
//       mergeMap(() =>
//         this.tracksService.getTracks().pipe(
//           map((tracks) => loadTracksSuccess({ tracks }))
//         )
//       )
//     )
//   );
}
