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

  problemSolution: boolean;
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.product = this.productService.getProduct(params['productId']);
    });

    this.problemSolution = this.findPair3([4, 5, -3, 1, 9], 11);
  }

  ngAfterViewInit() {
    this.calendarComponent
      .getApi()
      .addEventSource(this.createEvents(this.product));
  }

  findPair1(arr, k) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] + arr[j] === k) {
          return true;
        }
      }
    }
    return false;
  }

  findPair2(arr, k) {
    arr = arr.sort((a, b) => a - b);
    let left = 0,
      right = arr.length - 1;
    while (left < right) {
      if (arr[left] + arr[right] === k) return true;
      else if (arr[left] + arr[right] < k) left++;
      else right--;
    }
    return false;
  }

  findPair3(arr, k) {
    let obj = {};
    for (const element of arr) {
      if (obj[k - element]) return true;
      else obj[element] = true;
    }
    return false;
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
