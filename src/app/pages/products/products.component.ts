import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { productData } from './productData';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = productData;

  constructor() {}

  ngOnInit(): void {}
}
