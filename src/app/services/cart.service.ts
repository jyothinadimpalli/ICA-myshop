import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carts: Cart[] = [
    {
      id: 1,
      userId: 1,
      date: '2020-03-02T00:00:00.000Z',
      products: [
        { productId: 1, quantity: 4 },
        { productId: 2, quantity: 1 },
        { productId: 3, quantity: 6 }
      ],
      __v: 0
    },
    {
      id: 2,
      userId: 1,
      date: '2020-01-02T00:00:00.000Z',
      products: [
        { productId: 2, quantity: 4 },
        { productId: 1, quantity: 10 },
        { productId: 5, quantity: 2 }
      ],
      __v: 0
    }
  ];

  constructor() {}

  getCarts(): Observable<Cart[]> {
    return of(this.carts);
  }
}
