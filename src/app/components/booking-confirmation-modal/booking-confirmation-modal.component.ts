import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/ProductService';
import { Booking } from 'src/app/models/Product';

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
    let booking: Booking = {
      userId: '1234abc',
      guests: 2,
      dates: this.data.checkIn,
    };
    this.productService.createBooking('1', booking);
    console.log(this.data, 'CONFIRM');
  }
}
