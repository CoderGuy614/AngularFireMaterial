import { Component, OnInit, Input } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Booking } from 'src/app/models/Product';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };
  @Input() dates: string[];

  constructor() {}

  ngOnInit(): void {}
}
