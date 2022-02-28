import { createReducer, on } from '@ngrx/store';
import { Product } from '../../../models/Product';
import * as actions from '../store/products.actions';

export interface ProductsState {
  loading: boolean;
  products: Product[];
  error: any;
}

export const initialState: ProductsState = {
  loading: false,
  products: [],
  error: null,
};

export const productsReducer = createReducer(
  initialState,
  on(actions.getProductsRequested, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(actions.getProductsSucceeded, (state, action) => {
    return {
      ...state,
      loading: false,
      products: action.payload,
    };
  })
);
