import { BookingsState } from './bookingsReducer';
import { BookingService } from '../../services/BookingService';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  mergeMap,
  catchError,
  switchMapTo,
  switchMap,
  exhaustMap,
  tap,
} from 'rxjs/operators';
import * as actions from './bookings.actions';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from 'src/app/models/Booking';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { BookingConfirmationModalComponent } from '../../components/booking-confirmation-modal/booking-confirmation-modal.component';

@Injectable()
export class BookingEffects {
  private bookingsCollection: AngularFirestoreCollection<Booking> =
    this.afs.collection<Booking>('bookings');
  constructor(
    private afs: AngularFirestore,
    private actions$: Actions,
    private bookingService: BookingService,
    private store: Store<BookingsState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  getBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getBookingsRequested),
      mergeMap(() =>
        this.bookingService.bookings$.pipe(
          map((bookings) =>
            actions.getBookingsSucceeded({ payload: bookings })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  createBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addBookingRequested),
      switchMap(({ payload }) =>
        this.bookingService.addBooking(payload).pipe(
          map((booking) => actions.addBookingSucceeded({ payload: booking })),
          catchError((err) => of(actions.addBookingFailed({ payload: err })))
        )
      )
    )
  );

  closeConfirmationModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.addBookingSucceeded),
        tap(() => {
          this.dialog.closeAll();
        })
      ),
    { dispatch: false }
  );
}
