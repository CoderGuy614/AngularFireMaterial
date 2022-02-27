export class Booking {
  productId: string;
  userId: string;
  dates: string[];

  constructor(productId: string, userId: string, dates: string[]) {
    this.productId = productId;
    this.userId = userId;
    this.dates = dates;
  }
}
