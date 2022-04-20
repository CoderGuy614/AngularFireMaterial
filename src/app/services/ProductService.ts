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
  products: Observable<Product[]>;
  constructor(private afs: AngularFirestore, private store: Store<AppState>) {}

  //Read
  // products$ = this.productsCollection.snapshotChanges().pipe(
  //   map((actions) => {
  //     return actions.map((p) => {
  //       const product = p.payload.doc;
  //       const id = product.id;
  //       return { id, ...product.data() } as Product;
  //     });
  //   })
  // );

  products$ = this.productsCollection.valueChanges({ idField: 'id' });

  // getProduct(id: string) {
  //   this.afs.collection('products').doc(id).ref.get().then();
  // }

  // Create
  addProduct(product: any): void {
    console.log(product, 'product');
    this.productsCollection.add(product);
  }
}
