import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BookingService } from '../../services/BookingService';
import { Booking } from '../../models/Booking';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-confirmation-modal',
  templateUrl: './booking-confirmation-modal.component.html',
  styleUrls: ['./booking-confirmation-modal.component.css'],
})
export class BookingConfirmationModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private BookingService: BookingService
  ) {}

  onConfirm() {
    // Get the Correct ProductID and UserId from store
    let booking = new Booking(
      '2RINayWEzjx9CvN6EfYd',
      'W34DOFYC4AhAZYzOksdCUNghYta2',
      this.mapDates(this.data)
    );
    this.BookingService.addBooking(booking);
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
