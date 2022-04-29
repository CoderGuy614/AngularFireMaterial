import { Calendar } from '@fullcalendar/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CalendarEvent } from 'src/app/models/Event';

import tippy from 'tippy.js';
import { Store } from '@ngrx/store';
import * as productSelectors from '../products-page/products.selectors';
import * as bookingSelectors from './product-detail-page.selectors';
import * as authSelectors from '../../auth/auth.selectors';
import * as moment from 'moment';
import { User } from 'src/app/auth/model/user.model';
import { isAuthLoading } from '../../auth/auth.selectors';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailPageComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  isAuthLoading$: Observable<boolean>;
  calendarOptions: CalendarOptions;
  product$: Observable<Product>;
  dates: string[];
  user$: Observable<User>;
  bookingsUpdated$: Observable<boolean>;
  currentEvents: any[] = [];
  calendarApi: Calendar;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select(isAuthLoading)
      .pipe((isLoading) => (this.isAuthLoading$ = isLoading));
    this.store
      .select(productSelectors.getProduct)
      .pipe((product) => (this.product$ = product));
    this.store
      .select(bookingSelectors.getAllProdBookingDates)
      .subscribe((dates) => (this.dates = dates));
    this.store
      .select(authSelectors.getUser)
      .pipe((user) => (this.user$ = user));

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      events: this.currentEvents,
      selectable: false,
      defaultAllDay: true,
      selectOverlap: false,
      eventDidMount: function (info) {
        var unavailableTooltip = tippy(info.el, {
          content: 'Unavailable',
          arrow: true,
        });
      },
    };
  }

  showDates() {
    console.log('showDates');
    this.setEvents(this.dates);
    console.log(this.currentEvents);
    this.calendarComponent.getApi().addEventSource(this.currentEvents);
  }

  setEvents(dates: string[]) {
    console.log(dates, 'dates');
    dates.forEach((date) => {
      let newEvent = new CalendarEvent(
        moment(date).format('YYYY-MM-DD'),
        'red'
      );
      this.currentEvents.push(newEvent);
    });
  }
}
