import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from './reducers';
import * as authActions from './auth/auth.actions';
import { isAuthLoading, isLoggedIn } from './auth/auth.selectors';
import { getProducts } from './pages/products-page/store/products.selectors';
import * as productActions from './pages/products-page/store/products.actions';
import * as bookingActions from './pages/bookings/bookings.actions';
import { getBookings } from './pages/bookings/bookings.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(getProducts).subscribe((products) => {
      if (products.length === 0) {
        this.store.dispatch(productActions.getProductsRequested());
      }
    });

    this.store.select(getBookings).subscribe((bookings) => {
      if (bookings.length === 0) {
        this.store.dispatch(bookingActions.getBookingsRequested());
      }
    });

    this.store.select(isLoggedIn).subscribe((isAuth) => {
      if (!isAuth) {
        this.isAuthLoading$ = this.store.select(isAuthLoading);
        this.store.dispatch(authActions.getUser());
      }
    });
  }
}
