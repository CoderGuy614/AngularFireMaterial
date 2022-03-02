import { createAction, props } from '@ngrx/store';
import { Booking } from '../../models/Booking';

export const getBookingsRequested = createAction(
  '[Bookings API] Get Bookings Requested'
);

export const getBookingsSucceeded = createAction(
  '[Bookings API] Get Bookings Succeeded',
  props<{ payload: any }>()
);

export const addBookingRequested = createAction(
  '[Bookings API] Add Bookings Requested'
);

export const addBookingSucceeded = createAction(
  '[Bookings API] Add Bookings Succeeded',
  props<{ payload: any }>()
);

export const addBookingFailed = createAction(
  '[Bookings API] Add Bookings Failed',
  props<{ payload: any }>()
);
