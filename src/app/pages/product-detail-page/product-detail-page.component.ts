import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, Booking } from 'src/app/models/Product';
import { productData } from '../products-page/productData';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.css'],
})
export class ProductDetailPageComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', date: '2022-01-01', color: 'red' },
      { title: 'event 2', date: '2022-01-02', color: 'green' },
    ],
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

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

  private showUnavailableDates(product: Product) {
    let unavailableDates: Date[];
    if (product) {
      this.getAllDates(product);
      // Will use this to push dates into the events array
    }
  }

  private getAllDates(product: Product): Date[] {
    let result: Date[] = [];
    product.bookings.forEach((booking) =>
      booking.dates.forEach((date) => result.push(date))
    );
    return result;
  }
}
