import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Action, Store } from '@ngrx/store';

import { Booking } from '../models/Booking';
import { AppState } from '../reducers';
import { map } from 'rxjs/operators';
import * as bookingActions from '../pages/bookings/bookings.actions';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingsCollection: AngularFirestoreCollection<Booking> =
    this.afs.collection<Booking>('bookings');
  constructor(private afs: AngularFirestore, store: Store<AppState>) {}

  //Read
  bookings$ = this.bookingsCollection.snapshotChanges().pipe(
    map((actions) => {
      return actions.map((b) => {
        const booking = b.payload.doc;
        const id = booking.id;
        return { id, ...booking.data() } as Booking;
      });
    })
  );

  // Create
  addBooking(booking: Booking): Action {
    let result = null;
    this.bookingsCollection
      .add(Object.assign({}, booking))
      .then((res) =>
        res.get().then((d) => {
          result = bookingActions.addBookingSucceeded({ payload: d.data() });
        })
      )
      .catch((err) => {
        result = bookingActions.addBookingFailed({ payload: err });
      });
    return result;
  }
}
