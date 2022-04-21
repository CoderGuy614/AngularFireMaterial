import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { Product } from '../../models/Product';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/model/user.model';

import * as authSelectors from '../../auth/auth.selectors';
import * as productSelectors from '../../pages/products-page/store/products.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  products$: Observable<Product[]>;
  user$: Observable<User>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(authSelectors.getUser).pipe((user) => this.user$ = user);
    this.store.select(productSelectors.getProducts).pipe((products) => this.products$ = products);
  }
};
