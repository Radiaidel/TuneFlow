import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { trackReducer } from './store/reducers/track.reducer.reducer';
import { TracksEffects } from './store/effects/track.effects.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideStore({ track: trackReducer }), 
    provideEffects([TracksEffects])
  ]
};