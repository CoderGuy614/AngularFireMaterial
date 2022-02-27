import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from 'src/app/services/ProductService';
import { ProductsState } from './store/productsReducer';
import { Store } from '@ngrx/store';
import * as productActions from './store/products.actions';
import * as selectors from './store/products.selectors';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  products$: Observable<Product[]> = of([]);

  constructor(
    private productService: ProductService,
    private store: Store<ProductsState>
  ) {}

  ngOnInit() {
    this.store.dispatch(productActions.getProductsRequested());
    this.products$ = this.store.select(selectors.getProducts);
  }
}
