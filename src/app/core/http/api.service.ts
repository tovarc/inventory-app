import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  public apiUrl: string = 'https://api-sales-app.josetovar.dev';
  // public apiUrl: string = 'http://localhost:8000';

  // Get Auth
  public getAuth(): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth`, {});
  }

  // Get All Products
  public getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  // Get Single Product
  public getSingleProduct(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${productId}`);
  }

  // Update product
  public updateSingleProduct(product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products`, product);
  }

  //Update Product Status
  public updateProductStatus(
    productId: number,
    status: boolean
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/product-status/${productId}?status=${status}`,
      {}
    );
  }

  // Delete Single Product
  public deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }

  // Get All Products
  public getAllClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients`);
  }

  // Update Client
  public updateClient(client: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/clients`, client);
  }

  // Create Client
  public createClient(client: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clients`, client);
  }

  // Get All Products
  public getAllSales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sales`);
  }

  // Get All Products
  public getAllQuickSales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/quick-sales`);
  }
}
