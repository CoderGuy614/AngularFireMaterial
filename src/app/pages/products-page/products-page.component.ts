import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { productData } from './productData';

@Component({
  selector: 'app-products',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = productData;

  constructor() {}

  ngOnInit(): void {}
}
