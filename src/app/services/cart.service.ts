import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerformanceService } from './performance.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient, private performanceService: PerformanceService) { }


  // Method to fetch cart details by cart ID
  getCartById(cartId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/carts/${cartId}`);
  }

  // Method to fetch product details by product ID
  getProductById(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${productId}`);
  }

  // Method to delete a product from a cart
  deleteProductFromCart(cartId: number, productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/carts/${cartId}/${productId}`);
  }
  measureApiResponseTime(): Promise<string> {
    return this.performanceService.getApiResponseTime(`${this.apiUrl}/carts/${1}`).then(responseTime => responseTime.toFixed(2));
  }

}
