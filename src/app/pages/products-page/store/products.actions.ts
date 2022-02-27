import { createAction, props } from '@ngrx/store';
import { Product } from '../../../models/Product';


export const getProductsRequested = createAction(
  '[Products API] Get Products Requested'
);

export const getProductsSucceeded = createAction(
    '[Products API] Get Products Succeeded',
    props<{ payload: any }>()
);

// export const register = createAction(
//   '[Register Page] User Register',
//   props<{ payload: any }>()
// );

