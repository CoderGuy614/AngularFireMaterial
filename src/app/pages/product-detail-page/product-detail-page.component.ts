import { AppState } from 'src/app/reducers';
import { Observable, of } from 'rxjs';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, CalendarEvent } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/ProductService';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
// import { getAllDates } from '../../shared/helpers';
import tippy from 'tippy.js';
import { Store, select, compose } from '@ngrx/store';
import * as productSelectors from '../../pages/products-page/store/products.selectors';
import * as bookingSelectors from '../bookings/bookings.selectors';
import { filter, map } from 'rxjs/operators';
import { Booking } from 'src/app/models/Booking';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailPageComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    selectable: false,
    defaultAllDay: true,
    selectOverlap: false,
    // eventDidMount: function (info) {
    //   var unavailableTooltip = tippy(info.el, {
    //     content: 'Unavailable',
    //     arrow: true,
    //   });
    // },
    // select: this.handleSelect.bind(this),
  };

  product$: Observable<Product> = of(null);
  bookings$: Observable<Booking[]>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.product$ = this.store.select(productSelectors.getProduct);
    this.bookings$ = this.store.select(bookingSelectors.getBookingsByProdId);
  }

  ngAfterViewInit() {
    let eventSource = this.createEvents();
    console.log(eventSource, 'SRC');
    this.calendarComponent.getApi().addEventSource(eventSource);
    // console.log(this.calendarComponent.getApi().getEvents());
    // this.calendarComponent
    //   .getApi()
    //   .addEventSource(new CalendarEvent('', Date(), 'red', 'background'));
    console.log(this.calendarComponent.getApi().getEvents());
  }

  addProduct(data) {
    this.productService.addProduct(data);
  }

  private createEvents(): CalendarEvent[] {
    let events = [];
    this.store
      .select(bookingSelectors.getAllProdBookingDates)
      .subscribe((dates) => {
        return dates.map((d) => {
          let e = new CalendarEvent('', '2022-03-10', 'red', 'background');
          events.push(e);
        });
      });
    console.log(events);
    return events;
  }
}
