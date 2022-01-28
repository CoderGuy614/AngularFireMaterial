import * as moment from 'moment';
export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAltText: string;
  bookings: Booking[];
}

export interface Booking {
  // id: string,
  // userId: string,
  dates: moment.Moment[];
  // endDate: Date;
  // guests: number;
}

export class CalendarEvent {
  title: string;
  date: string;
  color: string;
  constructor(title: string, date: string, color: string) {
    this.title = title;
    this.date = date;
    this.color = color;
  }

  setEvent() {
    return { title: this.title, date: this.date, color: this.color };
  }
}
