import { Product } from "../models/Product";
import { ActivatedRoute, Router } from '@angular/router';
import { productData } from '../pages/products-page/productData'
import { Route } from "@angular/compiler/src/core";

export function getAllDates(product: Product): string[] {
    let allDates: string[] = [];
    product.bookings.forEach((booking) =>
      booking.dates.forEach((date) => allDates.push(date))
    );
    return allDates;
  }

export function getProductData(productId:string): Product{
    return productData.find(data => data.id === productId)
}
