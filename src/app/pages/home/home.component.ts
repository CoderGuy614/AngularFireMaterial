import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { Product } from '../../models/Product';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as productSelectors from '../products-page/products.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(productSelectors.getProducts)
      .pipe((products) => (this.products$ = products));
  }
}
