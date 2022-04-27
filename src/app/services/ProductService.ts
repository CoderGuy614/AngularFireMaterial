import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Product } from '../models/Product';
import { AppState } from '../reducers';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product> =
    this.afs.collection<Product>('products');

  constructor(private afs: AngularFirestore, private store: Store<AppState>) {}

  // Create
  addProduct(product: any): void {
    console.log(product, 'product');
    this.productsCollection.add(product);
  }
}
