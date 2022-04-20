import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingConfirmationModalState } from './booking-confirmation-modal.reducer';

export const selectBookingConfirmationModalState =
  createFeatureSelector<BookingConfirmationModalState>('bookingConfirmation');

export const getLoading = createSelector(
  selectBookingConfirmationModalState,
  (state) => state.loading
);

export const getError = createSelector(
  selectBookingConfirmationModalState,
  (state) => state.error
);
