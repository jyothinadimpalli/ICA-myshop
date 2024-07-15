import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  productsChunked: Product[][] = [];
  filteredProductsChunked: Product[][] = [];
  loadTime: string;
  apiResponseTime: string;
  searchTerm: string = '';
  recentlyViewed: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.productsChunked = this.chunkProducts(this.products, 3);
      this.filteredProductsChunked = this.productsChunked;

      const startTime = performance.now();
      this.productService.measureApiResponseTime().then(responseTime => {
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

      // Listen for query parameter changes
      this.route.queryParams.subscribe(params => {
        this.searchTerm = params['search'] || '';
        this.searchProducts();
      });
    });
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

  searchProducts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProductsChunked = this.productsChunked;
      return;
    }

    const filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.filteredProductsChunked = this.chunkProducts(filteredProducts, 3);
  }

  viewProductDetails(id: number): void {
    // Navigate to product details page or show modal with product details
    this.router.navigate(['/products', id]);

    // Retrieve the product from products array by id
    const viewedProduct = this.products.find(product => product.id === id);
    if (viewedProduct && !this.recentlyViewed.some(product => product.id === id)) {
      // Add viewed product to recently viewed array
      this.recentlyViewed.unshift(viewedProduct);
      // Store recently viewed array in session storage
      //sessionStorage.removeItem('recentlyViewed');
      sessionStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
    }
  }

  addToCart(product: Product): void {
    console.log('Adding product to cart:', product);
    // Implement cart functionality as needed
  }
}
