import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';

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
  totalPrice: number = 0; 

  constructor(private cartService: CartService, private router: Router) {}
  recentlyViewed: Product[] = [];

  ngOnInit(): void {
    const cartId = 6; // Replace with the actual cart ID or dynamically pass it
    this.fetchCartDetails(cartId);

    const startTime = performance.now();
    this.cartService.measureApiResponseTime().then(responseTime => {
      this.apiResponseTime = responseTime;
      const endTime = performance.now();
      this.loadTime = (endTime - startTime).toFixed(2);
    });

    // Retrieve recently viewed items from session storage
    const storedRecentlyViewed = sessionStorage.getItem('recentlyViewed');
    if (storedRecentlyViewed) {
      this.recentlyViewed = JSON.parse(storedRecentlyViewed);
      console.log(this.recentlyViewed);
    }
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
          this.calculateTotalPrice(); // Update total price after fetching product details
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
        this.calculateTotalPrice(); // Recalculate total price after deletion
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

  calculateTotalPrice(): void {
    // Calculate total price based on products in the cart
    this.totalPrice = this.products.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  }

  proceedToCheckout(): void {
    // Navigate to payment options component and pass cart data
    this.router.navigate(['/payment-options'], { state: { cart: this.cart, totalPrice: this.totalPrice } });
  }
}
