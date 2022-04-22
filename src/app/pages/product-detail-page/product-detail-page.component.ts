import { AppState } from 'src/app/reducers';
import { Observable, of } from 'rxjs';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CalendarEvent } from 'src/app/models/Event';

import {
  CalendarOptions,
  EventApi,
  EventInput,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import tippy from 'tippy.js';
import { Store } from '@ngrx/store';
import * as productSelectors from '../../pages/products-page/store/products.selectors';
import * as bookingSelectors from '../bookings/bookings.selectors';
import * as authSelectors from '../../auth/auth.selectors';
import * as moment from 'moment';
import { User } from 'src/app/auth/model/user.model';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailPageComponent implements OnInit {
  calendarOptions: CalendarOptions;
  product$: Observable<Product>;
  dates: string[];
  user$: Observable<User>;
  currentEvents: any[] = [];
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
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
      // select: this.handleSelect.bind(this),
    };

    this.dates.forEach((date) => {
      let newEvent = new CalendarEvent(
        moment(date).format('YYYY-MM-DD'),
        'red'
      );
      this.currentEvents.push(newEvent);
    });

    // this.dates$.subscribe((dates) => {
    //   dates.forEach((d) => {
    //     let newEvent = new CalendarEvent(
    //       moment(d).format('YYYY-MM-DD'),
    //       'red'
    //     ) as any;
    //     this.currentEvents.push(newEvent);
    //   });

    // this.currentEvents = this.createEvents(dates);
    // console.log(this.currentEvents, 'currentEvents');
    // });
  }

  // ngAfterViewInit(): void {
  //   this.handleEvents(this.createEvents(this.dates));
  // }

  // private handleEvents() {
  //   console.log('handleEvents');
  //   this.dates$.subscribe((dates) => {
  //     console.log(dates, 'HDATES');
  //     this.currentEvents = this.createEvents(dates);
  //   });
  // }

  private createEvents(dates): any[] {
    console.log('createEvents', dates);
    let events = [];
    dates.map((d) => {
      let e = new CalendarEvent(moment(d).format('YYYY-MM-DD'), 'red') as any;
      events.push(e);
    });
    return events;
  }
}

// { start: '2022-04-22', allDay: true, backgroundColor: 'red' },
