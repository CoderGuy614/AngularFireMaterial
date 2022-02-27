import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingsState } from './bookingsReducer';

export const selectBookingsState =
  createFeatureSelector<BookingsState>('bookings');

export const getBookings = createSelector(
  selectBookingsState,
  (state) => state.bookings
);

// export const getUser = createSelector(
//   selectAuthState,
//   (auth) => auth.user
// );

// export const isAuthLoading = createSelector(
//   selectAuthState,
//   (auth) => auth.loading
// );

// export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);

// export const isLoading = createSelector(selectAuthState, (auth) => auth.loading);
