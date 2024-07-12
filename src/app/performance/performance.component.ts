import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  loadTime: string;
  apiResponseTime: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    const startTime = performance.now();

    this.productService.measureApiResponseTime().then(responseTime => {
      this.apiResponseTime = responseTime;
      const endTime = performance.now();
      this.loadTime = (endTime - startTime).toFixed(2);
    });
  }
}
