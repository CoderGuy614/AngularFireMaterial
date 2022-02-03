import { Component, OnInit, Input } from '@angular/core';
import { Booking } from 'src/app/models/Product';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  @Input() dates: string[];

  displayedColumns: string[] = ['checkInDate', 'checkOutDate'];

  constructor() {}

  ngOnInit(): void {}
}
