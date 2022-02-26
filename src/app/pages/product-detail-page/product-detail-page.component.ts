import { Observable } from 'rxjs';
import { BookingConfirmationModalComponent } from './../../components/booking-confirmation-modal/booking-confirmation-modal.component';
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

  product: Product;
  products$: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.product = this.productService.getProduct(params['productId']);
      this.products$ = this.productService.products$;
    });
  }

  ngAfterViewInit() {
    this.calendarComponent
      .getApi()
      .addEventSource(this.createEvents(this.product));
  }

  fetchEvents() {
    this.products$.subscribe((x) => console.log(x, 'products'));
  }

  // handleSelect(arg) {
  //   this.dates = [arg.startStr, arg.endStr];
  // }

  private createEvents(product: Product): CalendarEvent[] {
    let events: any[] = [];
    if (product) {
      getAllDates(product).forEach((date) => {
        let newEvent = new CalendarEvent('', date, 'red', 'background');
        events.push(newEvent);
      });
    }
    return events;
  }
}
