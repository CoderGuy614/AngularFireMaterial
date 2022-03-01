import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingsState } from './bookingsReducer';
import * as fromRouter from '@ngrx/router-store';
import { StoreRootState } from 'src/app/router.reducer';

export const getRouterState = (state: StoreRootState) => state.router;

export const getCurrentRouteState = createSelector(
  getRouterState,
  (state: fromRouter.RouterReducerState) => state.state
);

export const selectBookingsState =
  createFeatureSelector<BookingsState>('bookings');

export const getBookings = createSelector(
  selectBookingsState,
  (state) => state.bookings
);

export const getBookingsByProdId = createSelector(
  getBookings,
  getCurrentRouteState,
  (bookings, routeState) =>
    bookings.filter(
      (b) => b.productId == routeState.root.queryParams['productId']
    )
);

export const getAllProdBookingDates = createSelector(
  getBookingsByProdId,
  (prodBookings) => {
    let allDates = [];
    prodBookings.forEach((b) => {
      b.dates.forEach((d) => {
        allDates.push(d);
      });
    });
    return allDates;
  }
);
