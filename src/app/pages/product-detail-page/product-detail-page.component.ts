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
import { getAllDates } from '../../shared/helpers';
import tippy from 'tippy.js';
import * as productActions from '../products-page/store/products.actions';
import * as bookingActions from '../bookings/bookings.actions';
import { Store, select } from '@ngrx/store';
import { ProductsState } from '../products-page/store/productsReducer';
import { BookingsState } from '../bookings/bookingsReducer';
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
    eventDidMount: function (info) {
      var unavailableTooltip = tippy(info.el, {
        content: 'Unavailable',
        arrow: true,
      });
    },
    // select: this.handleSelect.bind(this),
  };

  product$: Observable<Product> = of(null);
  bookings$: Observable<Booking[]> = of([]);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.product$ = this.store.select(productSelectors.getProduct);
    this.bookings$ = this.store.select(bookingSelectors.getBookings);
  }

  ngAfterViewInit() {
    console.log('AFTER VIEW');
    // this.calendarComponent
    //   .getApi()
    //   .addEventSource(this.createEvents(this.product));
  }

  addProduct(data) {
    this.productService.addProduct(data);
  }

  // private createEvents(product: Product): CalendarEvent[] {
  //   let events: any[] = [];
  //   if (product) {
  //     getAllDates(product).forEach((date) => {
  //       let newEvent = new CalendarEvent('', date, 'red', 'background');
  //       events.push(newEvent);
  //     });
  //   }
  //   return events;
  // }
}
