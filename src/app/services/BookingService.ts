import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Booking } from '../models/Booking';
import { AppState } from '../reducers';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingsCollection: AngularFirestoreCollection<Booking> =
    this.afs.collection<Booking>('bookings');
  constructor(private afs: AngularFirestore) {}

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
  // addBooking(booking: Booking): void {
  //   console.log(booking, 'booking');
  //   this.bookingsCollection.add(booking);
  // }
}
