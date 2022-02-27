import { ProductService } from '../../../services/ProductService';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, mergeMap, catchError } from 'rxjs/operators';
import * as actions from './products.actions';
import { Action, Store } from '@ngrx/store';
import { ProductsState } from '../store/productsReducer';
import { AngularFireAuth } from '@angular/fire/auth';
import { Product } from '../../../models/Product';
import { EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<ProductsState>,
    private snackBar: MatSnackBar

  ) {}

//   getProducts$ = createEffect(() => this.actions$.pipe(
//     .ofType(actions.getProductsRequested)
//     .switchMap(() =>
//       const ref = this.afs.collection<Product>('products');
//       return ref.snapshotChanges().map(arr => {
//       return arr.map(action => {
//         const data = action.payload.doc.data() as Product;
//         const id = action.payload.doc.id;
//         return { id, ...data };
//       })
//     })
//   )


//   .map(data => new fromActions.LoadArticlesSuccess({ articles: data }));


//   getProducts$ = createEffect(() => this.actions$.pipe(
//     ofType(actions.getProductsRequested)
//     .switchMap(() => 
//     const ref = this.afs.collection<Product>('products');
//     return ref.snapshotChanges().map(arr => {
//         return arr.map(action => {
//             const data = action.payload.doc.data() as Product;
//             const id = action.payload.doc.id;
//             return { id, ...data };
//         })
//     })
//       .pipe(
//         map(products => new actions.getProductsSucceeded({payload: products})),
//         catchError(() => EMPTY)
//       ))
//     )
//   );
  
getProducts$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getProductsRequested),
    mergeMap(() => this.productService.products$
      .pipe(
        map(products => actions.getProductsSucceeded({ payload: products})),
        catchError(() => EMPTY)
      ))
    )
  );


//   getProducts$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(actions.getProductsRequested)
//     this.afs.collection<Product>('products').valueChanges().pipe(
//         map((products) => {
//             return actions.getProductsSucceeded({ payload: products})
//         }

//     )

//       ) 
//     )
//   )
// );

// @Effect()
// getData$ = this.dataDb.getFakeDataStateChanges().pipe(
//   mergeMap(actions => actions),
//   map(action => {
//     return {
//       type: `[FirstData] ${action.type}`,
//       payload: { 
//         id: action.payload.doc.id, 
//         ...action.payload.doc.data() 
//       }
//     };
//   })
// );



//   getUser$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(actions.getUser),
//       exhaustMap((action) =>
//         this.afAuth.authState.pipe(
//           map((firebaseUser) => {
//             if(firebaseUser) {
//               return actions.authenticated({ payload: this.fromFirebaseUser(firebaseUser) })
//             } else { 
//               return actions.notAuthenticated();
//             }
//           }
//           )
//         ) 
//       )
//     )
//   );



};