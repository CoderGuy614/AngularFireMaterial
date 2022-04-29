import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './productsReducer';

import * as fromRouter from '@ngrx/router-store';
import { StoreRootState } from 'src/app/router.reducer';

export const getRouterState = (state: StoreRootState) => state.router;

export const getCurrentRouteState = createSelector(
  getRouterState,
  (state: fromRouter.RouterReducerState) => state.state
);

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const getProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const getProduct = createSelector(
  getProducts,
  getCurrentRouteState,
  (products, routeState) =>
    products.find((p) => p.id == routeState.root.queryParams['productId'])
);
