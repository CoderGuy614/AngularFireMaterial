import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Booking } from '../../models/Booking';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import * as actions from '../../pages/product-detail-page/product-detail-page.actions';
import * as selectors from '../../pages/product-detail-page/product-detail-page.selectors';

@Component({
  selector: 'app-booking-confirmation-modal',
  templateUrl: './booking-confirmation-modal.component.html',
  styleUrls: ['./booking-confirmation-modal.component.css'],
})
export class BookingConfirmationModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<any>
  ) {}

  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  ngOnInit() {
    this.isLoading$ = this.store.select(selectors.getLoading);
  }

  onConfirm() {
    let booking = new Booking(
      this.data.product.id,
      this.data.user.uid,
      this.mapDates(this.data)
    );

    this.store.dispatch(actions.addBookingRequested({ payload: booking }));
  }

  mapDates(data: { checkIn: string; checkOut: string }): string[] {
    let dates = [];
    let nights = moment
      .duration(moment(data.checkOut).diff(moment(data.checkIn)))
      .as('days');
    dates.push(data.checkIn);
    for (let i = 0; i < nights - 1; i++) {
      let nextDate = moment(dates[i]).add(1, 'day').format('MM-DD-YYYY');
      dates.push(nextDate);
    }
    return dates;
  }
}
