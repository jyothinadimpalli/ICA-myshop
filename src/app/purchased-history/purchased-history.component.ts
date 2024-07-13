import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-purchased-history',
  templateUrl: './purchased-history.component.html',
  styleUrls: ['./purchased-history.component.css']
})
export class PurchasedHistoryComponent implements OnInit {

  carts: any[] = [];
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getCarts().subscribe(carts => {
      this.carts = carts;
      this.carts.forEach(cart => {
        cart.products.forEach((product: { productId: number; quantity: any; }) => {
          this.productService.getProductById(product.productId).subscribe(prod => {
            this.products.push({
              cartId: cart.id,
              title: prod.title,
              quantity: product.quantity,
              price: prod.price,
              image: prod.image,
              date: cart.date // Added date field
            });
          });
        });
      });
    });
  }

}
