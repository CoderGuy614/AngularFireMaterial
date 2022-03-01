import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatCalendarCellClassFunction,
  DateFilterFn,
} from '@angular/material/datepicker';
import { Product } from 'src/app/models/Product';
import * as moment from 'moment';
import * as productSelectors from '../../pages/products-page/store/products.selectors';
import * as bookingSelectors from '../../pages/bookings/bookings.selectors';
import * as validators from '../../auth/utils/validators';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingConfirmationModalComponent } from '../booking-confirmation-modal/booking-confirmation-modal.component';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/Booking';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit, AfterViewInit {

  bookings$: Observable<Booking[]>;
  product$: Observable<Product>;

  bookingForm: FormGroup;
  minDate: Date;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private store: Store<AppState>) {
    this.minDate = new Date();
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.product$ = this.store.select(productSelectors.getProduct);
    this.bookings$ = this.store.select(bookingSelectors.getBookingsByProdId);
  }


  convertToString(date: Date): string {
    return date.toDateString();
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    return this.store.select(bookingSelectors.getAllProdBookingDates)
    .subscribe(dates => {
      console.log(dates, 'dates')
      if (view === 'month') {
        const date = this.formatDate(cellDate);
        return dates.includes(date) ? 'date-unavailable' : '';
      }
      return '';
    })
  };

  onSubmit() {
    if (this.bookingForm.valid) {
      let { checkIn, checkOut } = this.bookingForm.value;
      checkIn = this.formatDate(checkIn);
      checkOut = this.formatDate(checkOut);
      this.dialog.open(BookingConfirmationModalComponent, {
        data: { checkIn, checkOut },
      });
    }
    console.log(this.bookingForm.value);
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
    let result;
    let d = this.formatDate(date);
    this.store.select(bookingSelectors.getAllProdBookingDates).subscribe(dates => {
      if(!dates.includes(d)){
        result = true;
      } else {
        result = false;
      }
    })
    return result;
  };

  formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }


  ngAfterViewInit() {
    this.store.select(bookingSelectors.getAllProdBookingDates).subscribe(dates => {
      this.bookingForm.setValidators([
        validators.dateRangeIsAvailable(dates),
        validators.minStayLength(),
      ]);
    })
  }

}
