// src/app/product/product.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  filteredProducts: Product[] = [];
  searchQuery = '';

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filterProducts();
      this.productsChunked = this.chunkProducts(this.filteredProducts, 3);
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  chunkProducts(products: Product[], chunkSize: number): Product[][] {
    const chunkedArray: Product[][] = [];
    let index = 0;
    while (index < products.length) {
      chunkedArray.push(products.slice(index, index + chunkSize));
      index += chunkSize;
    }
    return chunkedArray;
  }

  filledStars(count: number): number[] {
    return Array.from({ length: count });
  }

  emptyStars(count: number): number[] {
    return Array.from({ length: 5 - count });
  }
}
