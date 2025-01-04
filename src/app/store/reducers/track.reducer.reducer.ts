import { Action, createReducer, on } from '@ngrx/store';

export const initialState = {};

const _trackReducer = createReducer(
  initialState,
  // on(...) add your action handlers here
);

export function TrackReducer(state: {} = initialState, action: Action): {} {
  return _trackReducer(state, action);
}
