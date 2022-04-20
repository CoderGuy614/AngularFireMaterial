import { createAction, props } from '@ngrx/store';

export const createBookingRequested = createAction(
  '[Booking Confirmation Modal] Create Booking Requested',
  props<{ payload: any }>()
);

export const createBookingSucceeded = createAction(
  '[Booking Confirmation] Create Booking Succeeded'
);

export const createBookingErrored = createAction(
  '[Booking Confirmation] Create Booking Errored'
);
