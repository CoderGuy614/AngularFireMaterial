import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers/authReducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

export const getUser = createSelector(
  selectAuthState,
  (auth) => auth.user
);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);

export const isLoading = createSelector(selectAuthState, (auth) => auth.loading);

