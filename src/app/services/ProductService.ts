import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';

import { Booking, Product } from '../models/Product';
import { AppState } from '../reducers';
import { map } from 'rxjs/operators';

export const productData: Product[] = [
  {
    id: '1',
    title: 'Bambi',
    subtitle: 'From $99/Night, Up to 4 Guests',
    description:
      'Heard the Bambi name before? For years, it’s been a nickname for our smallest single-axle travel trailers. But now Bambi is its own official family of lightweight, space-maximizing options ready to deliver a huge step up from the tent camping experience. Bambi takes care of all the little things you need, so you can get out there and have some big adventures.',
    imageUrl:
      'https://cdn.airstream.com/wp-content/uploads/2019/07/2020-Airstream-Bambi-16RB-Exterior-Bug-Eye.jpg?auto=true&crop=edges&fit=clamp&ixlib=imgixjs-3.4.0&w=2258',
    imageAltText: 'Picture of an Airstream Bambi',
    bookings: [
      {
        userId: '1234',
        dates: ['2022-03-01'],
        guests: 2,
      },
    ],
  },

  {
    id: '2',
    title: 'Flying Cloud',
    subtitle: 'From $130/Night, Up to 8 Guests',
    description:
      'The Flying Cloud is our most popular, versatile, and family-friendly travel trailer. With more floor plans available than any other model, there’s a “just right” for everyone. And the light and airy design keeps you ready to float from one adventure to the next, bringing your comfort zone right along with you.',
    imageUrl:
      'https://cdn.airstream.com/wp-content/uploads/2020/06/2021-Airstream-Flying-Cloud-Exterior-Curb-Side.jpg?auto=format&fit=crop&crop=edges&w=1080',
    imageAltText: 'Picture of an Airstream Flying Cloud',
    bookings: [
      {
        userId: '1234',
        dates: ['2022-02-28', '2022-03-01'],
        guests: 3,
      },
    ],
  },

  {
    id: '3',
    title: 'International',
    subtitle: 'From $160/Night, Up to 6 Guests',
    description:
      'With easy, peaceful style and purposeful design, the International Travel Trailer earns its name everywhere you look. Ready to excite as well as comfort, it’s all about a fine balance that makes for the perfect adventure. That’s what the International is here for – a silver sanctuary to help you get back to what really matters.',
    imageUrl:
      'https://cdn.airstream.com/wp-content/uploads/2021/07/International-Nav-Icon.png?auto=format&fit=crop&crop=edges&w=1728',
    imageAltText: 'Picture of an Airstream International',
    bookings: [],
  },

  {
    id: '4',
    title: 'Globetrotter',
    subtitle: 'From $180/Night, Up to 6 Guests',
    description:
      'It’s a design enthusiast’s dream. From its crisp, clean lines to its delicate neutral colors – the Globetrotter Travel Trailer is the epitome of modern style. The interior draws influences from all across Europe, and the exterior is the ever head-turning aerodynamic aluminum shell that’s made Airstream an American icon. It’s the perfect statement-making complement to any unforgettable adventure.',
    imageUrl:
      'https://cdn.airstream.com/wp-content/uploads/2021/07/Globetrotter-Nav-Icon.png?auto=format&fit=crop&crop=edges&w=1728',
    imageAltText: 'Picture of an Airstream Globetrotter',
    bookings: [],
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product> =
    this.afs.collection<Product>('products');
  products: Observable<Product[]>;
  constructor(private afs: AngularFirestore, private store: Store<AppState>) {}

  getProducts(): Product[] {
    return productData;
  }

  getProduct(id: string): Product {
    return productData.find((prod) => prod.id === id);
  }

  createBooking(id: string, booking: Booking) {
    let product = productData.find((prod) => prod.id === id);
    console.log(product, 'PRODUCT');
    product.bookings.push(booking);
    console.log(product.bookings, 'AFTER');
  }

  //Read
  products$ = this.productsCollection.snapshotChanges().pipe(
    map((actions) => {
      return actions.map((p) => {
        const product = p.payload.doc;
        const id = product.id;
        return { id, ...product.data() } as Product;
      });
    })
  );

  // Create
  addProduct(product: any): void {
    console.log(product, 'product');
    this.productsCollection.add(product);
  }
}
