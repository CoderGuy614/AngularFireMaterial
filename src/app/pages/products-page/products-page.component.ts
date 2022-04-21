import { Component, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { Observable  } from 'rxjs';
import { User } from 'src/app/auth/model/user.model';

@Component({
  selector: 'app-products',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  @Input() products: Observable<Product[]>; 
  @Input() user: Observable<User>;

  constructor() {}

}
