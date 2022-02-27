import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './productsReducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const getProducts = createSelector(
  selectProductsState,
  (products) => !!products
);

// export const getUser = createSelector(
//   selectAuthState,
//   (auth) => auth.user
// );

// export const isAuthLoading = createSelector(
//   selectAuthState,
//   (auth) => auth.loading
// );

// export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);

// export const isLoading = createSelector(selectAuthState, (auth) => auth.loading);

