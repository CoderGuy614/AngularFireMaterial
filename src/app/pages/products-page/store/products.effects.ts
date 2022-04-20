import { ProductService } from '../../../services/ProductService';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, mergeMap, catchError } from 'rxjs/operators';
import * as actions from './products.actions';
import { Action, Store } from '@ngrx/store';
import { ProductsState } from '../store/productsReducer';
import { EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getProductsRequested),
      mergeMap(() =>
        this.productService.products$.pipe(
          map((products) =>
            actions.getProductsSucceeded({ payload: products })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
