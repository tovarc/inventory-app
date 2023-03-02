import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  public apiUrl: string = 'https://api-sales-app.josetovar.dev';

  public getSingleProduct(productId: number): any {
    return this.http.get(`${this.apiUrl}/products/${productId}`);
  }

  // Update product
  public updateSingeProduct(product: any): any {
    return this.http.put(`${this.apiUrl}/products`, product);
  }
}
