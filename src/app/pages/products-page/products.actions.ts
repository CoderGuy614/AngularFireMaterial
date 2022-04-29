import { createAction, props } from '@ngrx/store';

export const getProductsRequested = createAction(
  '[Products API] Get Products Requested'
);

export const getProductsSucceeded = createAction(
  '[Products API] Get Products Succeeded',
  props<{ payload: any }>()
);
