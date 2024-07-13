// product-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: number | null;
  product: Product | undefined;
  similarProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.productId = +id;
        this.loadProductDetails();
      } else {
        console.error('Product ID is null');
      }
    });
  }

  loadProductDetails(): void {
    if (this.productId !== null && this.productId !== undefined) {
      this.productService.getProductById(this.productId).subscribe(product => {
        this.product = product;
        this.loadSimilarProducts(); // Load similar products after product is fetched
      });
    }
  }

  loadSimilarProducts(): void {
    if (this.product !== undefined && this.product !== null) {
      this.productService.getProductsByCategory(this.product.category).subscribe(products => {
        // Filter out the current product from similar products
        this.similarProducts = products.filter(p => p.id !== this.productId);
      });
    }
  }
}
