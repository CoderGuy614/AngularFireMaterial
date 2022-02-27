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
import * as productActions from '../products-page/store/products.actions';
import { Store, select } from '@ngrx/store';
import { ProductsState } from '../products-page/store/productsReducer';
import * as selectors from '../../pages/products-page/store/products.selectors';
import { filter, map } from 'rxjs/operators';
import { id } from 'date-fns/locale';

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

  product$: Observable<Product>;
  // products$: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store<ProductsState>
  ) {}

  ngOnInit() {
    this.product$ = this.store.select(selectors.getProduct);
    // this.products$ = this.productService.products$;
  }

  ngAfterViewInit() {
    // this.calendarComponent
    //   .getApi()
    //   .addEventSource(this.createEvents(this.product));
  }

  addProduct(data) {
    this.productService.addProduct(data);
  }

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
