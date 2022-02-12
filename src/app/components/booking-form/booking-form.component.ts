import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatCalendarCellClassFunction,
  DateFilterFn,
} from '@angular/material/datepicker';
import { Product } from 'src/app/models/Product';
import * as moment from 'moment';
import { getAllDates } from 'src/app/shared/helpers';
import * as validators from '../../auth/utils/validators';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit, AfterViewInit {
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.minDate = new Date();
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
    });
  }

  get product(): Product {
    return this._product;
  }

  @Input() set product(value: Product) {
    this._product = value;
  }

  minDate: Date;

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

  isDateRangeInvalid(form: FormGroup) {
    const isInvalid = form.dirty && form.hasError('dateRangeNotAvailable');
    form.get('checkIn').setErrors(isInvalid ? { valid: false } : null);
    return isInvalid;
  }

  rangeFilter: DateFilterFn<Date> = (date: Date) => {
    let d = moment(date).format('YYYY-MM-DD');
    return !getAllDates(this.product).includes(d);
  };

  private _product: Product = null;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.bookingForm.setValidators(
      validators.dateRangeIsAvailable(this.product)
    );
  }
}
