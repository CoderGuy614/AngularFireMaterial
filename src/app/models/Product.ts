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

// export interface Booking {
//   userId: string;
//   guests: number;
//   dates: string[];
// }

export class Booking {
  userId: string;
  dates: string[];
  guests: number;
  bookingId?: string;

  constructor(uid: string, dates: string[], guests: number) {
    this.userId = uid;
    this.dates = dates;
    this.guests = guests;
  }
}

export class CalendarEvent {
  title: string;
  date: string;
  color: string;
  display?: string;
  constructor(title: string, date: string, color: string, display?: string) {
    this.title = title;
    this.date = date;
    this.color = color;
    this.display = display;
  }

  // Some Test Comment

  // setEvent() {
  //   return {
  //     title: this.title,
  //     date: this.date,
  //     color: this.color,
  //     display: 'background',
  //   };
  // }
}
