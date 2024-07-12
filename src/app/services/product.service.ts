import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      address: {
        geolocation: { lat: '-37.3159', long: '81.1496' },
        city: 'kilcoole',
        street: 'new road',
        number: 7682,
        zipcode: '12926-3874'
      },
      id: 1,
      email: 'john@gmail.com',
      username: 'johnd',
      password: 'm38rmF$',
      name: { firstname: 'john', lastname: 'doe' },
      phone: '1-570-236-7033',
      __v: 0
    }
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}
