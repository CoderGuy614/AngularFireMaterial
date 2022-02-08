import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatCalendarCellClassFunction,
  DateFilterFn,
} from '@angular/material/datepicker';
import { Booking, Product } from 'src/app/models/Product';
import * as moment from 'moment';
import { getAllDates } from 'src/app/shared/helpers';
import { ProductService } from '../../services/ProductService';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.minDate = new Date();
  }

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

  rangeFilter: DateFilterFn<Date> = (date: Date) => {
    let d = moment(date).format('YYYY-MM-DD');
    return !getAllDates(this.product).includes(d);
  };

  private _product: Product = null;

  ngOnInit(): void {}
}
