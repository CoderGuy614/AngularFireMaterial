import { createReducer, on } from '@ngrx/store';
import { Booking } from '../../models/Booking';
import * as actions from '../bookings/bookings.actions';

export interface BookingsState {
  loading: boolean;
  bookings: Booking[];
  error: any;
}

export const initialState: BookingsState = {
  loading: false,
  bookings: [],
  error: null,
};

export const bookingsReducer = createReducer(
  initialState,
  on(actions.getBookingsRequested, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(actions.getBookingsSucceeded, (state, action) => {
    return {
      ...state,
      loading: false,
      bookings: action.payload,
    };
  })
);
