import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCarts().subscribe(data => this.carts = data);
  }
}
