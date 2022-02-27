import { Booking } from './Booking';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAltText: string;
  bookings: Booking[];
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
}
