import { createAction, props } from '@ngrx/store';
import { Booking } from '../../models/Booking';

export const getBookingsRequested = createAction(
  '[Bookings API] Get Bookings Requested'
);

export const getBookingsSucceeded = createAction(
  '[Bookings API] Get Bookings Succeeded',
  props<{ payload: any }>()
);

// export const register = createAction(
//   '[Register Page] User Register',
//   props<{ payload: any }>()
// );
