// performance.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor() { }

  getApiResponseTime(apiUrl: string): Promise<number> {
    const startTime = performance.now();
    return fetch(apiUrl)
      .then(response => response.json())
      .then(() => performance.now() - startTime);
  }
}
