import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BookingService } from '../../services/BookingService';
import { Booking } from '../../models/Booking';
import * as moment from 'moment';
import { getUser } from '../../auth/auth.selectors';
import { getProduct } from '../../pages/products-page/store/products.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-booking-confirmation-modal',
  templateUrl: './booking-confirmation-modal.component.html',
  styleUrls: ['./booking-confirmation-modal.component.css'],
})
export class BookingConfirmationModalComponent {
  currentUserId:string = null;
  currentProductId:string = null;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingService,
    private store: Store<AppState>
  ) {}

  onConfirm() {
    
    this.store.select(getUser).subscribe(user => this.currentUserId = user.uid);
    this.store.select(getProduct).subscribe(prod => this.currentProductId = prod.id); 

    let booking = new Booking(
      this.currentProductId,
      this.currentUserId,
      this.mapDates(this.data)
    );
    this.bookingService.addBooking(booking);
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
