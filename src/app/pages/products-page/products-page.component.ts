import { AppState } from 'src/app/reducers';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { Store } from '@ngrx/store';
import * as productActions from './store/products.actions';
import * as bookingActions from '../bookings/bookings.actions';
import * as selectors from './store/products.selectors';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  products$: Observable<Product[]> = of([]);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(productActions.getProductsRequested());
    this.store.dispatch(bookingActions.getBookingsRequested());
    this.products$ = this.store.select(selectors.getProducts);
  }
}
