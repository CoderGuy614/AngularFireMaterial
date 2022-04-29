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
  '[Bookings API] Add Booking Requested',
  props<{ payload: Booking }>()
);

export const addBookingSucceeded = createAction(
  '[Bookings API] Add Booking Succeeded',
  props<{ payload: any }>()
);

export const addBookingFailed = createAction(
  '[Bookings API] Add Booking Failed',
  props<{ payload: any }>()
);

export const bookingConfirmationModalClosed = createAction(
  '[Bookings API] Confirmation Modal Closed'
);

export const refreshCalendarEvents = createAction(
  '[Bookings API] RefreshCalendarEvents'
);
