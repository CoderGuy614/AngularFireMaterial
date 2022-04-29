import { BookingService } from '../../services/BookingService';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import * as actions from './product-detail-page.actions';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from 'src/app/models/Booking';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class BookingEffects {
  private bookingsCollection: AngularFirestoreCollection<Booking> =
    this.afs.collection<Booking>('bookings');
  constructor(
    private afs: AngularFirestore,
    private actions$: Actions,
    private bookingService: BookingService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

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
          this.snackBar.open('Your booking was successfully created!', null, {
            duration: 3000,
          });
          this.dialog.closeAll();
        })
      ),
    { dispatch: false }
  );
}
