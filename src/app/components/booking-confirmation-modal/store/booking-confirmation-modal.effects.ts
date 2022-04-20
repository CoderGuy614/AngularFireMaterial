// import { BookingService } from './../../../services/BookingService';
// import { Injectable } from '@angular/core';
// import { act, Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { map, exhaustMap, catchError } from 'rxjs/operators';
// import * as actions from './booking-confirmation-modal.actions';
// import { Store } from '@ngrx/store';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import * as authActions from '../../../auth/auth.actions';
// import { Booking } from 'src/app/models/Booking';

// @Injectable()
// export class BookingConfirmationModalEffects {
//   constructor(
//     private actions$: Actions,
//     private bookingService: BookingService,
//     private snackBar: MatSnackBar
//   ) {}

//   createBooking$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(actions.createBookingRequested),
//       map((action) => this.bookingService.addBooking(action.payload))
//     )
//   );
// }
