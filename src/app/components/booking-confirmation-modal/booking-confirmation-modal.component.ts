import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/ProductService';
import { Booking } from 'src/app/models/Product';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-confirmation-modal',
  templateUrl: './booking-confirmation-modal.component.html',
  styleUrls: ['./booking-confirmation-modal.component.css'],
})
export class BookingConfirmationModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) {}

  onConfirm() {
    console.log(this.data, 'CONFIRM');
    let booking = new Booking('1', this.mapDates(this.data), 2);
    this.productService.createBooking('1', booking);
  }

  mapDates(data: { checkIn: string; checkOut: string }): string[] {
    let dates = [];
    let nights = moment
      .duration(moment(data.checkOut).diff(moment(data.checkIn)))
      .as('days');
    dates.push(data.checkIn);
    for (let i = 0; i < nights - 1; i++) {
      let nextDate = moment(dates[i]).add(1, 'day').format('YYYY-MM-DD');
      dates.push(nextDate);
    }
    return dates;
  }
}
