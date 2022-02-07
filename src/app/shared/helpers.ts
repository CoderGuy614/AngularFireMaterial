import { Product } from '../models/Product';
import { productData } from '../pages/products-page/productData';

export function getAllDates(product: Product): string[] {
  let allDates: string[] = [];
  product.bookings.forEach((booking) =>
    booking.dates.forEach((date) => allDates.push(date))
  );
  return allDates;
}

export function getAllProductDates() {
  return getAllDates(productData[0]);
}