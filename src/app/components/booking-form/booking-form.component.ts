import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatCalendarCellClassFunction,
  MatDatepickerInputEvent,
  DateFilterFn,
} from '@angular/material/datepicker';
import { Booking, Product } from 'src/app/models/Product';
import * as moment from 'moment';
import { getAllDates } from 'src/app/shared/helpers';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  get product(): Product {
    return this._product;
  }

  @Input() set product(value: Product) {
    this._product = value;
  }

  minDate: Date;
  bookingForm = this.fb.group({
    checkIn: ['', Validators.required],
    checkOut: ['', Validators.required],
  });

  convertToString(date: Date): string {
    return date.toDateString();
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();
      console.log(date, 'DATE');

      // Highlight the 1st and 20th day of each month.
      return date === 2 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  onSubmit() {
    console.log(this.bookingForm);
  }

  rangeFilter(date: Date): boolean {
    let d = moment(date).format('YYYY-MM-DD');
    let result = !getAllDates(this.product).includes(d);
    console.log(result);
    return result;
  }

  constructor(private fb: FormBuilder) {
    this.minDate = new Date();
  }

  private _product: Product = null;

  ngOnInit(): void {}
}
