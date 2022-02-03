import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, CalendarEvent } from 'src/app/models/Product';
import { productData } from '../products-page/productData';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { getAllDates, setSomeDates } from '../../shared/helpers';
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
    eventDidMount: function (info) {
      var unavailableTooltip = tippy(info.el, {
        content: 'Unavailable',
        arrow: true,
      });
    },
    select: function (info) {
      // Dispatch an action put the dates in the store
      setSomeDates([info.startStr, info.endStr]);
      // this.dates = [info.startStr, info.endStr];
    },
  };

  productId: string;
  product: Product;
  dates: string[] = [];

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
    console.log(
      this.calendarComponent.getApi().getCurrentData(),
      'current data'
    );
    // this.calendarComponent.getApi().addEventSource(this.createBackgroundEvents());
  }

  private createEvents(product: Product): CalendarEvent[] {
    let events: any[] = [];
    if (product) {
      getAllDates(product).forEach((date) => {
        let newEvent = new CalendarEvent('', date, 'red', 'background');
        events.push(newEvent);
      });
    }
    console.log(events);
    return events;
  }

  public setDates(dates: string[]) {
    //
    console.log('SET DATES', dates);
    this.dates = setSomeDates(dates);
    return dates;
  }

  // private createBackgroundEvents() {
  //   return [
  //     {
  //       groupId: 'testGroupId',
  //       start: '2022-01-01',
  //       end: '2022-01-02',
  //       color: 'green',
  //       display: 'inverse-background'
  //     }
  //   ]
  // }
}
