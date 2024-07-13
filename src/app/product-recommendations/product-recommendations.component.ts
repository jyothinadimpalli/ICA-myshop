// product-recommendations.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-recommendations',
  templateUrl: './product-recommendations.component.html',
  styleUrls: ['./product-recommendations.component.css']
})
export class ProductRecommendationsComponent implements OnInit {
  products: any[] = [];
  topRatedProducts: any[] = [];
  recommendedProducts: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
        this.filterTopRatedProducts();
        this.generateRecommendations();
      },
      (error: any) => {
        console.error('Error fetching product data:', error);
      }
    );
  }

  filterTopRatedProducts(): void {
    // Assuming rating is an object with a rate property
    this.topRatedProducts = this.products
      .filter(product => product.rating && product.rating.rate >= 4)
      .sort((a, b) => b.rating.rate - a.rating.rate)
      .slice(0, 10); // Top 10 rated products
  }

  generateRecommendations(): void {
    const categories = [...new Set(this.products.map(p => p.category))];
    categories.forEach(category => {
      const productsInCategory = this.products.filter(p => p.category === category);
      const topRatedInCategory = productsInCategory
        .filter(product => product.rating && product.rating.rate >= 4)
        .sort((a, b) => b.rating.rate - a.rating.rate)
        .slice(0, 5); // Top 5 rated products in each category
      this.recommendedProducts.push(...topRatedInCategory);
    });
  }
}
