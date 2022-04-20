import { createReducer, on } from '@ngrx/store';
import * as actions from './booking-confirmation-modal.actions';

export interface BookingConfirmationModalState {
  loading: boolean;
  error: boolean;
}

export const initialState: BookingConfirmationModalState = {
  loading: false,
  error: null,
};

export const bookingConfirmationModalReducer = createReducer(
  initialState,
  on(actions.createBookingRequested, (state, action) => {
    return {
      ...state,
      error: false,
      loading: true,
    };
  }),

  on(actions.createBookingSucceeded, (state, action) => {
    return {
      ...state,
      loading: false,
    };
  }),

  on(actions.createBookingErrored, (state, action) => {
    return {
      ...state,
      error: true,
      loading: false,
    };
  })
);
