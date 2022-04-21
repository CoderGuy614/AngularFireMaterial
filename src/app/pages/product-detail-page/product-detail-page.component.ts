import { AppState } from 'src/app/reducers';
import { Observable, of } from 'rxjs';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Product, CalendarEvent } from 'src/app/models/Product';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
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
export class ProductDetailPageComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
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

  product$: Observable<Product>;
  dates$: Observable<string[]>;
  user$: Observable<User>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select(productSelectors.getProduct)
      .pipe((product) => (this.product$ = product));
    this.store
      .select(bookingSelectors.getAllProdBookingDates)
      .pipe((dates) => (this.dates$ = dates));
    this.store
      .select(authSelectors.getUser)
      .pipe((user) => (this.user$ = user));
  }

  // ngAfterViewInit(): void {
  //   eventSource = this.createEvents();
  // }

  ngAfterViewInit(): void {
    this.calendarComponent.getApi().addEventSource(this.createEvents());
  }

  ngOnChanges(): void {
    this.calendarComponent.getApi().addEventSource(this.createEvents());
  }

  private createEvents(): CalendarEvent[] {
    let events = [];
    this.dates$.subscribe((dates) => {
      return dates.map((d) => {
        let e = new CalendarEvent(
          '',
          moment(d).format('YYYY-MM-DD'),
          'red',
          'background'
        );
        events.push(e);
      });
    });
    return events;
  }
}
