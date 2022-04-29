import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingsState } from './productDetailReducer';
import * as routerSelectors from '../../router.selectors';

export const selectBookingsState =
  createFeatureSelector<BookingsState>('bookings');

export const getBookings = createSelector(
  selectBookingsState,
  (state) => state.bookings
);

export const getLoading = createSelector(
  selectBookingsState,
  (state) => state.loading
);

export const getBookingsUpdated = createSelector(
  selectBookingsState,
  (state) => state.bookingsUpdated
);

export const getBookingsByProdId = createSelector(
  getBookings,
  routerSelectors.selectQueryParam('productId'),
  (bookings, prodId) => bookings.filter((b) => b.productId == prodId)
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
