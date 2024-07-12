// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  productsByCategory: { [key: string]: Product[] } = {};
  selectedCategory: string = '';
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.selectedCategory = categories[0]; // Set default category
      this.loadProductsByCategory();
    });
  }

  loadProductsByCategory(): void {
    this.categories.forEach(category => {
      this.productService.getProductsByCategory(category).subscribe(products => {
        this.productsByCategory[category] = products;
        if (category === this.selectedCategory) {
          this.filteredProducts = products;
        }
      });
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filteredProducts = this.productsByCategory[category];
  }

  filledStars(count: number): number[] {
    return Array.from({ length: Math.floor(count) });
  }

  emptyStars(count: number): number[] {
    return Array.from({ length: 5 - Math.floor(count) });
  }
}
