import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any; // Assuming a single cart object for simplicity
  products: any[] = [];
  loadTime: string;
  apiResponseTime: string;
  showMetrics: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const cartId = 6; // Replace with the actual cart ID or dynamically pass it
    this.fetchCartDetails(cartId);
    
    const startTime = performance.now();
    this.cartService.measureApiResponseTime().then(responseTime => {
      this.apiResponseTime = responseTime;
      const endTime = performance.now();
      this.loadTime = (endTime - startTime).toFixed(2);
    });
  }

  fetchCartDetails(cartId: number): void {
    this.cartService.getCartById(cartId).subscribe(
      (data: any) => {
        this.cart = data;
        this.fetchProducts(data.products); // Fetch product details based on product IDs
      },
      (error: any) => {
        console.error('Error fetching cart details:', error);
        // Optionally, handle the error (e.g., show a message to the user)
      }
    );
  }

  fetchProducts(products: any[]): void {
    products.forEach(product => {
      this.cartService.getProductById(product.productId).subscribe(
        (productData: any) => {
          this.products.push({
            ...productData,
            quantity: product.quantity
          });
        },
        (error: any) => {
          console.error(`Error fetching product ${product.productId} details:`, error);
          // Optionally, handle the error (e.g., show a placeholder for the product)
        }
      );
    });
  }

  deleteProduct(productId: number): void {
    // Assuming you want to delete the product from cart ID 6
    const cartId = 6;
    this.cartService.deleteProductFromCart(cartId, productId).subscribe(
      () => {
        // Refresh products list after deletion
        this.products = this.products.filter(p => p.id !== productId);
      },
      (error: any) => {
        console.error(`Error deleting product ${productId} from cart ${cartId}:`, error);
        // Optionally, handle the error (e.g., show a message to the user)
      }
    );
  }

  toggleMetrics(): void {
    this.showMetrics = !this.showMetrics;
  }
}
