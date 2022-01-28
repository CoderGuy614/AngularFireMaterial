import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Booking, CalendarEvent } from 'src/app/models/Product';
import { productData } from '../products-page/productData';
import { CalendarOptions, EventApi } from '@fullcalendar/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
})
export class ProductDetailPageComponent implements OnInit {
  // This should be typed as CalendarOptions
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    events: [],
  };

  productId: string;
  product: Product;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.productId = params['productId'];
    });
    this.product = productData.find((product) => product.id === this.productId);

    this.showUnavailableDates(this.product);
  }

  private showUnavailableDates(product: Product) {
    let unavailableDates: moment.Moment[];
    if (product) {
      this.getAllDates(product).forEach((date) => {
        let newEvent = new CalendarEvent(
          'Booked',
          date.format('YYYY-MM-DD'),
          'red'
        );
        this.calendarOptions.events.push(newEvent);
        console.log(date.format('YYYY-MM-DD'));
      });

      // Will use this to push dates into the events array
    }
  }

  private getAllDates(product: Product): moment.Moment[] {
    let allDates: moment.Moment[] = [];
    product.bookings.forEach((booking) =>
      booking.dates.forEach((date) => allDates.push(date))
    );
    return allDates;
  }
}
