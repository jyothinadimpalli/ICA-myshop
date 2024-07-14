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
  recentlyViewed: Product[] = [];
  sliderImages = [
    { url: 'https://img.freepik.com/premium-psd/black-friday-watch-post_917890-9.jpg?w=740', alt: 'Image 1', title: '', description: 'Friday sale' },
    { url: 'https://www.olie.co.in/cdn/shop/products/gift-card-1000.jpg?v=1567489016&width=750', alt: 'Image 2', title: 'July Month', description: ' Min purchase 10,000/- ' },
    { url: 'https://cdn.zeebiz.com/sites/default/files/styles/zeebiz_850x478/public/2021/08/13/156544-sbi-fp.jpg?itok=51xvUl3G&c=c5af8c0f92ccc8e249257bf0f1cb18e8', alt: 'Image 3', title: 'New User', description:'' }
  ];
    
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCategories();
          // Retrieve recently viewed items from session storage
          const storedRecentlyViewed = sessionStorage.getItem('recentlyViewed');
          if (storedRecentlyViewed) {
            this.recentlyViewed = JSON.parse(storedRecentlyViewed);
            console.log(this.recentlyViewed);
          }
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

  addToCart(product: Product): void {
    console.log('Adding product to cart:', product);
    // Implement cart functionality as needed
  }
}
