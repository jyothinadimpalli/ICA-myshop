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
  recommendedProducts: any[] = [];
  recommendedProductIds: Set<number> = new Set<number>(); // Set to track recommended product IDs

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
            this.fetchRecommendedProducts(prod.category, prod.id);
          });
        });
      });
    });
  }

  fetchRecommendedProducts(category: string, currentProductId: number): void {
    this.productService.getRecommendedProducts(category).subscribe(products => {
      products.forEach(product => {
        if (!this.recommendedProductIds.has(product.id) && product.id !== currentProductId) {
          this.recommendedProductIds.add(product.id);
          this.recommendedProducts.push(product);
        }
      });
    });
  }
}
