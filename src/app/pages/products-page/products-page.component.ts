import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-products',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
  }
}
