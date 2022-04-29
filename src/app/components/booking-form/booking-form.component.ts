import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatCalendarCellClassFunction,
  DateFilterFn,
} from '@angular/material/datepicker';
import { Product } from 'src/app/models/Product';
import * as moment from 'moment';
import * as validators from '../../auth/utils/validators';
import { MatDialog } from '@angular/material/dialog';
import { BookingConfirmationModalComponent } from '../booking-confirmation-modal/booking-confirmation-modal.component';
import { Booking } from 'src/app/models/Booking';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { User } from 'src/app/auth/model/user.model';

import * as authSelectors from '../../auth/auth.selectors';
import * as productSelectors from '../../pages/products-page/products.selectors';
import * as bookingSelectors from '../../pages/product-detail-page/product-detail-page.selectors';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit, AfterViewInit {
  product: Product;
  bookings$: Observable<Booking[]>;
  user: User;
  dates$: Observable<string[]>;

  bookingForm: FormGroup;
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.minDate = new Date();
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store
      .select(authSelectors.getUser)
      .subscribe((user) => (this.user = user)),
      this.store
        .select(productSelectors.getProduct)
        .subscribe((product) => (this.product = product));
    this.store
      .select(bookingSelectors.getBookingsByProdId)
      .pipe((bookings) => (this.bookings$ = bookings));
    this.store
      .select(bookingSelectors.getAllProdBookingDates)
      .pipe((dates) => (this.dates$ = dates));
  }

  convertToString(date: Date): string {
    return date.toDateString();
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      let returnClass = '';
      const date = this.formatDate(cellDate);
      this.dates$.subscribe((dates) => {
        returnClass = dates.includes(date) ? 'date-unavailable' : '';
      });
      return returnClass;
    }
  };

  onSubmit() {
    if (this.bookingForm.valid) {
      let { checkIn, checkOut } = this.bookingForm.value;
      checkIn = this.formatDate(checkIn);
      checkOut = this.formatDate(checkOut);
      let { user, product } = this;
      console.log('DIALOG OPEN BOOKING FORM');
      this.dialog.open(BookingConfirmationModalComponent, {
        data: { checkIn, checkOut, user, product },
      });
    }
  }

  isDateRangeInvalid(form: FormGroup) {
    const isInvalid = form.dirty && form.hasError('dateRangeNotAvailable');
    form.get('checkIn').setErrors(isInvalid ? { dateRangeValid: false } : null);
    return isInvalid;
  }

  isMinLengthInvalid(form: FormGroup) {
    const isInvalid = form.dirty && form.hasError('minLength');
    form
      .get('checkOut')
      .setErrors(isInvalid ? { minLengthValid: false } : null);
    return isInvalid;
  }

  rangeFilter: DateFilterFn<Date> = (date: Date) => {
    let returnValue = false;
    let d = this.formatDate(date);
    this.dates$.subscribe((dates) => {
      returnValue = !dates.includes(d);
    });
    return returnValue;
  };

  formatDate(date: Date): string {
    return moment(date).format('MM-DD-YYYY');
  }

  ngAfterViewInit() {
    this.dates$.subscribe((dates) => {
      this.bookingForm.setValidators([
        validators.dateRangeIsAvailable(dates),
        validators.minStayLength(),
      ]);
    });
  }
}
