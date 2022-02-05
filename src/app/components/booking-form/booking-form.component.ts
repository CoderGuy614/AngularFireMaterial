import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCalendarCellClassFunction, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Booking } from 'src/app/models/Product';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  addDate(type: number, event: MatDatepickerInputEvent<Date>) {
    this.dates[type] = event.value.toDateString()
  }
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
