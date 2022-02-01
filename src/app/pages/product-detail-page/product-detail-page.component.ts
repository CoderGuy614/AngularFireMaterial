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
import tippy from 'tippy.js';

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
    eventDidMount: function(info) {
      var tooltip = tippy(info.el, {
        content: 'Tooltip',
        arrow: true
        
      })
    },
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
    // this.calendarComponent.getApi().addEventSource(this.createBackgroundEvents());
  }

  private createEvents(product: Product): any[] {
    let events: any[] = [];
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

  // private createBackgroundEvents() {
  //   return [
  //     {
  //       groupId: 'testGroupId',
  //       start: '2022-01-01',
  //     }
  //   ]
  // }

}
