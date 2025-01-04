import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { TrackReducer } from './store/reducers/track.reducer.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({ track: TrackReducer })]
};
