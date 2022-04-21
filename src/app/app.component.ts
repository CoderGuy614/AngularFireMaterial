import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from './reducers';
import * as authActions from './auth/auth.actions';
import { isAuthLoading, isLoggedIn } from './auth/auth.selectors';
import * as productActions from './pages/products-page/store/products.actions';
import * as bookingActions from './pages/bookings/bookings.actions';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Product } from './models/Product';
import { Booking } from './models/Booking';
import { User } from './auth/model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthLoading$: Observable<boolean>;

  private productsCollection: AngularFirestoreCollection<Product> =
  this.afs.collection<Product>('products');

  private bookingsCollection: AngularFirestoreCollection<Booking> =
  this.afs.collection<Booking>('bookings');

  private fromFirebaseUser(firebaseUser): User {
    const { uid, displayName, email, phoneNumber, emailVerified, photoURL } = firebaseUser;
    const user = { uid, displayName, email, phoneNumber, emailVerified, photoURL } as User;
    return user;
  };

  constructor(private store: Store<AppState>,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    ) {}

  ngOnInit() {
    this.productsCollection.valueChanges({ idField: 'id' }).subscribe((products) => {
      this.store.dispatch(productActions.getProductsSucceeded({ payload: products }))
    })

    this.bookingsCollection.valueChanges({ idField: 'id' }).subscribe((bookings) => {
      this.store.dispatch(bookingActions.getBookingsSucceeded({ payload: bookings }))
    })

    this.afAuth.authState.subscribe((auth) => {
      if(auth) {
        this.store.dispatch(authActions.authenticated({ payload: this.fromFirebaseUser(auth) }))
      } else {
        this.isAuthLoading$ = this.store.select(isAuthLoading);
        this.store.dispatch(authActions.notAuthenticated())
      }
    })


  }

}
