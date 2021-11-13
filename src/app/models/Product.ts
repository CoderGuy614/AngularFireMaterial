export interface Product {
  id: string,
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAltText: string;
  bookings: Booking[]
}

export interface Booking {
  // id: string,
  // userId: string,
  startDate: Date;
  nights: number;
  // endDate: Date;
  // guests: number;
}

// interface Date {
//   month: number;
//   day: number;
//   year: number
// }