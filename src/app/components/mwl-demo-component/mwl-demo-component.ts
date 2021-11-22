import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Booking, Product } from 'src/app/models/Product';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['mwl-demo-component.css'],
  templateUrl: 'mwl-demo-component.html',
})
export class DemoComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @Input() product: Product;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal) {}

  checkIfDayIsBooked(calendarDay: Date, product: Product): boolean {
    function checkIfDatesArrayIncludesDate(date: Date, dateArray: Date[]): boolean {
      console.log(date, dateArray)
      let isIncluded = false;
      dateArray.forEach(d => {
        if(isSameDay(date, d)){
          console.log("MATCH")
          isIncluded = true
        }
      })
      return isIncluded;
      // return dateArray.includes(date) ? true : false;
    }
    if(product.bookings){
      let isBooked = false;
      product.bookings.forEach(booking => {
        if(checkIfDatesArrayIncludesDate(calendarDay, booking.dates)){
          isBooked = true;
        }
      })
      // console.log(isBooked, 'IS BOOKED')
      return isBooked;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
