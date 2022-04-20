import { AppState } from 'src/app/reducers';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { Store } from '@ngrx/store';
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
    this.products$ = this.store.select(selectors.getProducts);
  }
}
