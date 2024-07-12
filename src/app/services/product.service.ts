// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { PerformanceService } from './performance.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://fakestoreapi.com/products';
d:any;
  constructor(private http: HttpClient, private performanceService: PerformanceService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProductImage(productId: number) {
   this.d=this.http.get<Product>(`https://fakestoreapi.com/products/${productId}`).pipe(
      map((product: Product) => product.image)
    );
    console.log(this.d);
  }
  measureApiResponseTime(): Promise<string> {
    return this.performanceService.getApiResponseTime(this.apiUrl).then(responseTime => responseTime.toFixed(2));
  }


  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }



}
