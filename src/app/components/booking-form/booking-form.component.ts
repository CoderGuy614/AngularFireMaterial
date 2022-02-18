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
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingConfirmationModalComponent } from '../booking-confirmation-modal/booking-confirmation-modal.component';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit, AfterViewInit {
  bookingForm: FormGroup;
  minDate: Date;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
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

  convertToString(date: Date): string {
    return date.toDateString();
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = this.formatDate(cellDate);
      let bookedDates = getAllDates(this.product);
      return bookedDates.includes(date) ? 'date-unavailable' : '';
    }
    return '';
  };

  onSubmit() {
    console.log(this.bookingForm);
    this.dialog.open(BookingConfirmationModalComponent);
  }

  isDateRangeInvalid(form: FormGroup) {
    const isInvalid = form.dirty && form.hasError('dateRangeNotAvailable');
    form.get('checkIn').setErrors(isInvalid ? { valid: false } : null);
    return isInvalid;
  }

  rangeFilter: DateFilterFn<Date> = (date: Date) => {
    let d = this.formatDate(date);
    return !getAllDates(this.product).includes(d);
  };

  formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  private _product: Product = null;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.bookingForm.setValidators(
      validators.dateRangeIsAvailable(this.product)
    );
  }
}
