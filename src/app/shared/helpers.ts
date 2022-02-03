import { Product } from '../models/Product';

export function getAllDates(product: Product): string[] {
  let allDates: string[] = [];
  product.bookings.forEach((booking) =>
    booking.dates.forEach((date) => allDates.push(date))
  );
  return allDates;
}

export function setSomeDates(dates: string[]) {
  return dates;
}
