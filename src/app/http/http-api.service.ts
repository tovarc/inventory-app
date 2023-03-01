import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  public apiUrl: string = 'http://ec2-100-25-221-93.compute-1.amazonaws.com';

  public getSingleProduct(productId: number): any {
    return this.http.get(`${this.apiUrl}/products/${productId}`);
  }

  // Update product
  public updateSingeProduct(product: any): any {
    return this.http.put(`${this.apiUrl}/products`, product);
  }
}
