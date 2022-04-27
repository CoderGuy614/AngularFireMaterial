import { from, Observable, of } from 'rxjs';
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
  constructor(private afs: AngularFirestore, private store: Store<AppState>) {}

  addBooking(booking: Booking): Observable<any> {
    const result = this.bookingsCollection
      .add(Object.assign({}, booking))
      .then((res) =>
        res.get().then((d) => {
          d.data();
        })
      )
      .catch((err) => err);

    return from(result);
  }
}
