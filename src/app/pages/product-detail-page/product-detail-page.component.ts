import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Booking, CalendarEvent } from 'src/app/models/Product';
import { productData } from '../products-page/productData';
import {
  CalendarOptions,
  EventApi,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
})
export class ProductDetailPageComponent implements OnInit, AfterViewInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    selectable: true,
    defaultAllDay: true,
    select: function () {
      alert('YOU CLICKED A DATE');
    },
  };

  productId: string;
  product: Product;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.productId = params['productId'];
    });
    this.product = productData.find((product) => product.id === this.productId);
  }

  ngAfterViewInit() {
    this.calendarComponent
      .getApi()
      .addEventSource(this.createEvents(this.product));

    this.calendarComponent
      .getApi()
      .select(() => console.log('selected a date'));
  }

  private createEvents(product: Product): CalendarEvent[] {
    let events: CalendarEvent[] = [];
    if (product) {
      this.getAllDates(product).forEach((date) => {
        let newEvent = new CalendarEvent(
          '',
          date.format('YYYY-MM-DD'),
          'red',
          'background'
        );
        events.push(newEvent);
      });
    }
    return events;
  }

  private getAllDates(product: Product): moment.Moment[] {
    let allDates: moment.Moment[] = [];
    product.bookings.forEach((booking) =>
      booking.dates.forEach((date) => allDates.push(date))
    );
    return allDates;
  }

  // someMethod() {
  //   console.log(this.calendarComponent.getApi().removeAllEvents());
  //   this.calendarComponent
  //     .getApi()
  //     .addEventSource(this.createEvents(this.product));
  // }
}
