import { BookingsState } from './bookingsReducer';
import { BookingService } from '../../services/BookingService';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as actions from './bookings.actions';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class BookingEffects {
  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
    private store: Store<BookingsState>,
    private snackBar: MatSnackBar
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
}
