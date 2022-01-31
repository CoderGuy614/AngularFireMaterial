import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, CalendarEvent } from 'src/app/models/Product';
import { productData } from '../products-page/productData';
import {
  CalendarOptions,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import { getAllDates } from '../../shared/helpers';

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
    selectOverlap: false,
    select: function (info) {
      console.log(`You selected ${info.startStr}, ${info.endStr}`);
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
  }

  private createEvents(product: Product): CalendarEvent[] {
    let events: CalendarEvent[] = [];
    if (product) {
      getAllDates(product).forEach((date) => {
        let newEvent = new CalendarEvent(
          '',
          date,
          'red',
          'background'
        );
        events.push(newEvent);
      });
    }
    return events;
  }

}
