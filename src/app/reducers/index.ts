import { bookingsReducer } from './../pages/bookings/bookingsReducer';
import { authReducer } from '../auth/reducers/authReducer';
import { productsReducer } from '../pages/products-page/store/productsReducer';
import { bookingConfirmationModalReducer } from '../components/booking-confirmation-modal/store/booking-confirmation-modal.reducer';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer,
  products: productsReducer,
  bookings: bookingsReducer,
  bookingConfirmation: bookingConfirmationModalReducer,
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
