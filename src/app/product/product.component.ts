// product.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productsChunked: Product[][] = [];
  loadTime: string;
  apiResponseTime: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.productsChunked = this.chunkProducts(this.products, 3);
      const startTime = performance.now();

      this.productService.measureApiResponseTime().then(responseTime => {
        this.apiResponseTime = responseTime;
        const endTime = performance.now();
        this.loadTime = (endTime - startTime).toFixed(2);
      });
      
      // Chunk into rows of 3 products
    });
  }

  // Function to chunk array into rows
  chunkProducts(products: Product[], chunkSize: number): Product[][] {
    const chunkedArray: Product[][] = [];
    let index = 0;
    while (index < products.length) {
      chunkedArray.push(products.slice(index, index + chunkSize));
      index += chunkSize;
    }
    return chunkedArray;
  }

  // Helper function to generate array of filled stars
  filledStars(count: number): number[] {
    return Array.from({ length: count });
  }

  // Helper function to generate array of empty stars (bordered stars)
  emptyStars(count: number): number[] {
    return Array.from({ length: 5 - count });
  }
}
